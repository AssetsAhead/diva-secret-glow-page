import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 7-day customer welcome drip sequence content
const CUSTOMER_DRIP_EMAILS = [
  {
    day: 1,
    subject: "Welcome to Diva Secret! 💜 Your Journey Begins",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed;">Welcome to the Diva Secret Family, ${name}! 💜</h1>
        <p>Thank you for your order! We're thrilled to have you join thousands of women who have discovered the power of natural wellness.</p>
        <h2 style="color: #a855f7;">What's Next?</h2>
        <ul>
          <li>📦 Your order is being carefully prepared</li>
          <li>🚚 You'll receive tracking info within 24-48 hours</li>
          <li>✨ Get ready to experience the Diva Secret difference!</li>
        </ul>
        <p><strong>Quick Tip:</strong> For best results, take your supplements consistently at the same time each day.</p>
        <p style="margin-top: 30px;">With love,<br><strong>The Diva Secret Team</strong></p>
      </div>
    `,
  },
  {
    day: 2,
    subject: "How to Get the Most from Your Diva Secret Products 🌿",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed;">Maximize Your Results, ${name}! 🌿</h1>
        <p>Here are some tips to help you get the most from your Diva Secret products:</p>
        <h2 style="color: #a855f7;">Best Practices</h2>
        <ol>
          <li><strong>Consistency is Key:</strong> Take your products at the same time daily</li>
          <li><strong>Stay Hydrated:</strong> Drink plenty of water throughout the day</li>
          <li><strong>Healthy Lifestyle:</strong> Combine with balanced nutrition and exercise</li>
          <li><strong>Be Patient:</strong> Natural products work with your body over time</li>
        </ol>
        <p>Most customers start noticing improvements within 2-4 weeks of consistent use!</p>
        <p style="margin-top: 30px;">Here's to your wellness journey!<br><strong>The Diva Secret Team</strong></p>
      </div>
    `,
  },
  {
    day: 3,
    subject: "The Science Behind Stem Cell Activation 🧬",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed;">Understanding Stem Cell Wellness, ${name} 🧬</h1>
        <p>You've made an incredible choice for your health! Here's why stem cell activation matters:</p>
        <h2 style="color: #a855f7;">Did You Know?</h2>
        <ul>
          <li>🔬 Your body contains millions of stem cells that help repair and regenerate</li>
          <li>🌱 Natural plant compounds can support your body's own renewal processes</li>
          <li>⚡ Proper nutrition helps optimize cellular energy production</li>
          <li>🛡️ Antioxidants protect cells from daily environmental stress</li>
        </ul>
        <p>Our products are formulated with premium ingredients to support your body's natural vitality.</p>
        <p style="margin-top: 30px;">Stay curious!<br><strong>The Diva Secret Team</strong></p>
      </div>
    `,
  },
  {
    day: 4,
    subject: "Real Stories from Our Community 💫",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed;">You're Part of Something Special, ${name}! 💫</h1>
        <p>Join our growing community of empowered women:</p>
        <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p style="font-style: italic;">"I've been using Diva Secret for 3 months now and I feel more energized than ever. My skin is glowing and I have so much more energy!"</p>
          <p><strong>— Thandi M., Johannesburg</strong></p>
        </div>
        <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p style="font-style: italic;">"Finally, a natural supplement that actually works. I recommend it to all my friends!"</p>
          <p><strong>— Nomvula K., Cape Town</strong></p>
        </div>
        <p>We'd love to hear your story too! Reply to this email and share your experience.</p>
        <p style="margin-top: 30px;">With gratitude,<br><strong>The Diva Secret Team</strong></p>
      </div>
    `,
  },
  {
    day: 5,
    subject: "Exclusive Tips for Optimal Wellness 🌸",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed;">Wellness Wisdom for You, ${name}! 🌸</h1>
        <p>Enhance your Diva Secret journey with these lifestyle tips:</p>
        <h2 style="color: #a855f7;">Morning Routine</h2>
        <ul>
          <li>☀️ Start your day with warm lemon water</li>
          <li>🧘 Take 5 minutes for deep breathing or meditation</li>
          <li>💊 Take your Diva Secret supplements with breakfast</li>
        </ul>
        <h2 style="color: #a855f7;">Evening Routine</h2>
        <ul>
          <li>🌙 Wind down an hour before bed (no screens!)</li>
          <li>📓 Journal 3 things you're grateful for</li>
          <li>😴 Aim for 7-8 hours of quality sleep</li>
        </ul>
        <p>Small daily habits lead to big transformations!</p>
        <p style="margin-top: 30px;">Sweet dreams,<br><strong>The Diva Secret Team</strong></p>
      </div>
    `,
  },
  {
    day: 6,
    subject: "Have Questions? We're Here to Help! 💜",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed;">We're Here for You, ${name}! 💜</h1>
        <p>How's your Diva Secret experience going? We want to make sure you're getting the most from your products.</p>
        <h2 style="color: #a855f7;">Common Questions</h2>
        <p><strong>Q: How long until I see results?</strong><br>
        A: Most customers notice improvements within 2-4 weeks of consistent use.</p>
        <p><strong>Q: Can I take it with other supplements?</strong><br>
        A: Yes! Our products are designed to complement a healthy lifestyle.</p>
        <p><strong>Q: What if I miss a dose?</strong><br>
        A: Just continue with your regular schedule - consistency over perfection!</p>
        <h2 style="color: #a855f7;">Need Help?</h2>
        <p>📱 WhatsApp us anytime: <a href="https://wa.me/27679820321">+27 67 982 0321</a></p>
        <p style="margin-top: 30px;">Always here for you,<br><strong>The Diva Secret Team</strong></p>
      </div>
    `,
  },
  {
    day: 7,
    subject: "Ready to Reorder? Special Offer Inside! 🎁",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed;">Time to Stock Up, ${name}! 🎁</h1>
        <p>It's been a week since your order - we hope you're loving your Diva Secret products!</p>
        <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 30px; border-radius: 15px; text-align: center; margin: 20px 0;">
          <h2 style="margin: 0; color: white;">Don't Run Out!</h2>
          <p style="font-size: 18px;">Keep your wellness journey going strong</p>
          <a href="https://diva-secret-glow-page.lovable.app" style="display: inline-block; background: white; color: #7c3aed; padding: 15px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; margin-top: 15px;">Reorder Now</a>
        </div>
        <h2 style="color: #a855f7;">Why Customers Love Reordering</h2>
        <ul>
          <li>✨ Consistent results with uninterrupted use</li>
          <li>📦 Fast, reliable delivery</li>
          <li>💜 Same quality you know and trust</li>
        </ul>
        <p>Thank you for being part of the Diva Secret family!</p>
        <p style="margin-top: 30px;">With love,<br><strong>The Diva Secret Team</strong></p>
      </div>
    `,
  },
];

// Day intervals for when to send each email
const SEND_INTERVALS_HOURS = [0, 24, 48, 72, 96, 120, 144]; // Day 1, 2, 3, 4, 5, 6, 7

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const resend = new Resend(resendApiKey);

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    console.log("Processing drip email sequences...");

    // Get all active sequences that are due for sending
    const { data: dueSequences, error: fetchError } = await supabaseClient
      .from("drip_sequences")
      .select(`
        *,
        leads:lead_id (
          id,
          name,
          email,
          status
        )
      `)
      .eq("status", "active")
      .is("completed_at", null)
      .lte("next_send_at", new Date().toISOString());

    if (fetchError) {
      console.error("Error fetching due sequences:", fetchError);
      throw fetchError;
    }

    console.log(`Found ${dueSequences?.length || 0} sequences due for sending`);

    const results = {
      processed: 0,
      sent: 0,
      completed: 0,
      errors: 0,
    };

    for (const sequence of dueSequences || []) {
      results.processed++;

      const lead = sequence.leads;
      if (!lead || !lead.email) {
        console.log(`Skipping sequence ${sequence.id}: No valid lead/email`);
        results.errors++;
        continue;
      }

      // Check if lead is unsubscribed
      if (lead.status === "unsubscribed") {
        console.log(`Lead ${lead.id} is unsubscribed, marking sequence as unsubscribed`);
        await supabaseClient
          .from("drip_sequences")
          .update({ status: "unsubscribed", updated_at: new Date().toISOString() })
          .eq("id", sequence.id);
        continue;
      }

      const currentStep = sequence.current_step;
      const emailContent = CUSTOMER_DRIP_EMAILS[currentStep - 1];

      if (!emailContent) {
        console.log(`No email content for step ${currentStep}, marking as completed`);
        await supabaseClient
          .from("drip_sequences")
          .update({
            status: "completed",
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", sequence.id);
        results.completed++;
        continue;
      }

      try {
        // Send the email
        console.log(`Sending day ${emailContent.day} email to ${lead.email}`);
        
        const emailResponse = await resend.emails.send({
          from: "Diva Secret <onboarding@resend.dev>",
          to: [lead.email],
          subject: emailContent.subject,
          html: emailContent.html(lead.name || "Beautiful"),
        });

        console.log("Email sent successfully:", emailResponse);
        results.sent++;

        // Calculate next send time
        const isLastEmail = currentStep >= CUSTOMER_DRIP_EMAILS.length;
        const nextStep = currentStep + 1;
        const nextIntervalHours = SEND_INTERVALS_HOURS[currentStep] || 24;
        const nextSendAt = new Date(Date.now() + nextIntervalHours * 60 * 60 * 1000);

        // Update sequence
        if (isLastEmail) {
          await supabaseClient
            .from("drip_sequences")
            .update({
              current_step: nextStep,
              last_sent_at: new Date().toISOString(),
              status: "completed",
              completed_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("id", sequence.id);
          results.completed++;
          console.log(`Sequence ${sequence.id} completed`);
        } else {
          await supabaseClient
            .from("drip_sequences")
            .update({
              current_step: nextStep,
              last_sent_at: new Date().toISOString(),
              next_send_at: nextSendAt.toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("id", sequence.id);
          console.log(`Sequence ${sequence.id} updated to step ${nextStep}, next send at ${nextSendAt}`);
        }

        // Track in email_sends table
        await supabaseClient.from("email_sends").insert({
          lead_id: lead.id,
          sent_at: new Date().toISOString(),
        });

      } catch (emailError) {
        console.error(`Error sending email for sequence ${sequence.id}:`, emailError);
        results.errors++;
      }
    }

    console.log("Drip email processing complete:", results);

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 200,
    });

  } catch (error: unknown) {
    console.error("Drip email processing error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 500,
      }
    );
  }
});
