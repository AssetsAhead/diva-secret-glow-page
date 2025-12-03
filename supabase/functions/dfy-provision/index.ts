import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      businessName,
      niche,
      location,
      calUrl,
      webhookUrl,
      notes,
    } = body ?? {};

    if (!name || !email || !phone) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Save DFY lead
    const { error: insertError } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        phone,
        lead_type: "business",
        status: "new",
        metadata: {
          businessName,
          niche,
          location,
          calUrl,
          webhookUrl,
          notes,
          source: "dfy_onboarding",
        },
      });

    if (insertError) {
      console.error("Error inserting lead:", insertError);
      throw insertError;
    }

    // Forward to user-provided automation webhook (Zapier / Pipedream) if present
    if (webhookUrl && typeof webhookUrl === "string") {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "dfy_signup",
            name,
            email,
            phone,
            businessName,
            niche,
            location,
            calUrl,
            notes,
            timestamp: new Date().toISOString(),
            project: Deno.env.get("SUPABASE_URL"),
          }),
        });
      } catch (wErr) {
        console.warn("DFY webhook forward failed:", wErr);
      }
    }

    // Admin WhatsApp notification via Twilio (if configured)
    const twilioSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioFrom = Deno.env.get("TWILIO_WHATSAPP_FROM"); // e.g., "whatsapp:+14155238886"
    const adminWhatsApp = "whatsapp:+27679820321";

    if (twilioSid && twilioToken && twilioFrom) {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
      const bodyParams = new URLSearchParams({
        From: twilioFrom,
        To: adminWhatsApp,
        Body:
          `New DFY Signup\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Phone: ${phone}\n` +
          (businessName ? `Business: ${businessName}\n` : "") +
          (niche ? `Niche: ${niche}\n` : "") +
          (location ? `Location: ${location}\n` : "") +
          (calUrl ? `Calendar: ${calUrl}\n` : "") +
          (notes ? `Notes: ${notes}\n` : "") +
          `Source: dfy_onboarding`,
      });

      const auth = `${twilioSid}:${twilioToken}`;
      try {
        const twilioRes = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(auth)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: bodyParams.toString(),
        });
        if (!twilioRes.ok) {
          const t = await twilioRes.text();
          console.warn("Twilio WhatsApp send failed:", t);
        }
      } catch (twErr) {
        console.warn("Twilio request error:", twErr);
      }
    } else {
      console.log("Twilio not configured. Skipping WhatsApp notification.");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    console.error("dfy-provision error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
