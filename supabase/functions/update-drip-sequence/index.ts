import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { sequenceId, action } = await req.json();

    if (!sequenceId || !action) {
      return new Response(
        JSON.stringify({ error: "sequenceId and action are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing ${action} for sequence ${sequenceId}`);

    let updateData: Record<string, unknown> = {};

    switch (action) {
      case "pause":
        updateData = { status: "paused" };
        break;
      case "resume":
        updateData = { 
          status: "active",
          next_send_at: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour from now
        };
        break;
      case "reset":
        updateData = {
          status: "active",
          current_step: 1,
          next_send_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          last_sent_at: null,
          completed_at: null
        };
        break;
      default:
        return new Response(
          JSON.stringify({ error: "Invalid action. Use: pause, resume, or reset" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    const { data, error } = await supabase
      .from("drip_sequences")
      .update(updateData)
      .eq("id", sequenceId)
      .select()
      .single();

    if (error) {
      console.error("Error updating sequence:", error);
      throw error;
    }

    console.log(`Successfully ${action}d sequence ${sequenceId}`);

    return new Response(
      JSON.stringify({ success: true, sequence: data }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in update-drip-sequence:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
