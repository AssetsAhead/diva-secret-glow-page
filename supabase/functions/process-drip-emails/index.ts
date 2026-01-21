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

// Business opportunity nurture sequence (Day 1, 2, 5, 7)
const OPPORTUNITY_DRIP_EMAILS = [
  {
    day: 1,
    subject: "Welcome to Diva Secret International! 🌟 Your Journey to Health & Wealth",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed;">Welcome to the Diva Secret Business Family, ${name}! 🌟</h1>
        <p>Congratulations on taking the first step towards building your Health & Wealth empire!</p>
        <h2 style="color: #a855f7;">What Makes Diva Secret Special?</h2>
        <ul>
          <li>💜 Premium stem cell activation products people love</li>
          <li>💰 Lucrative commission structure</li>
          <li>🤝 Supportive community of like-minded entrepreneurs</li>
          <li>📚 Comprehensive training and support</li>
        </ul>
        <p>Your sponsor will be reaching out shortly to guide you through your first steps!</p>
        <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p style="font-size: 18px; margin: 0;"><strong>"The more you learn, the more you earn!"</strong></p>
        </div>
        <p style="margin-top: 30px;">Welcome aboard!<br><strong>The Diva Secret Team</strong></p>
      </div>
    `,
  },
  {
    day: 2,
    subject: "Real Success Stories from Diva Secret Entrepreneurs 💫",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed;">${name}, See What's Possible! 💫</h1>
        <p>Our community is filled with inspiring success stories. Here are just a few:</p>
        <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p style="font-style: italic;">"I started with Diva Secret while still working my 9-5. Within 6 months, my side income exceeded my salary. Now I'm a full-time entrepreneur!"</p>
          <p><strong>— Precious N., Durban</strong></p>
        </div>
        <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p style="font-style: italic;">"As a single mom, I needed flexible income. Diva Secret gave me the freedom to work from home and be there for my kids."</p>
          <p><strong>— Lindiwe M., Pretoria</strong></p>
        </div>
        <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p style="font-style: italic;">"I retired my husband from his job! We now travel and build our business together. Dreams do come true!"</p>
          <p><strong>— Grace K., Johannesburg</strong></p>
        </div>
        <p><strong>Your story could be next!</strong> Keep learning, keep growing, keep building.</p>
        <p style="margin-top: 30px;">Inspired by you,<br><strong>The Diva Secret Team</strong></p>
      </div>
    `,
  },
  {
    day: 5,
    subject: "🎓 Don't Miss Our Weekly Training - This Thursday!",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed;">${name}, Join Our Live Training! 🎓</h1>
        <p>Success in Diva Secret comes from continuous learning. That's why we invite you to our weekly training session!</p>
        <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 30px; border-radius: 15px; text-align: center; margin: 20px 0;">
          <h2 style="margin: 0; color: white;">DIVA SECRET INTERNATIONAL</h2>
          <p style="font-size: 16px; margin: 10px 0;">Every Thursday - English Product & Business Presentation</p>
          <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">⏰ 7PM SAST (South African Time)</p>
          <p style="font-size: 14px; margin: 15px 0; font-style: italic;">DO NOT COME ALONE - INVITE YOUR TEAM MATES!</p>
          <p style="font-size: 18px; margin: 15px 0;"><strong>The more you learn, the more you earn!</strong></p>
        </div>
        <h2 style="color: #a855f7;">Join Via Zoom</h2>
        <div style="background: #f8f4ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p><strong>🔗 Meeting Link:</strong><br>
          <a href="https://us06web.zoom.us/j/85174957589?pwd=bLFMgPifbLeXxJoSifneEBFw0sWHhL.1" style="color: #7c3aed;">Click here to join</a></p>
          <p><strong>📋 Meeting ID:</strong> 851 7495 7589</p>
          <p><strong>🔐 Passcode:</strong> DIVA</p>
        </div>
        <p style="text-align: center; font-size: 18px; color: #a855f7;"><strong>INVITE, INVITE, INVITE!</strong></p>
        <p>This is your opportunity for <strong>Health & Wealth</strong>. Bring your team and prospects!</p>
        <p style="margin-top: 30px;">See you there!<br><strong>The Diva Secret Team</strong></p>
      </div>
    `,
  },
  {
    day: 7,
    subject: "Let's Connect! Schedule Your Success Call 📞",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #7c3aed;">${name}, It's Time to Take Action! 📞</h1>
        <p>You've been exploring the Diva Secret opportunity for a week now. We'd love to hear from you and answer any questions!</p>
        <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 30px; border-radius: 15px; text-align: center; margin: 20px 0;">
          <h2 style="margin: 0; color: white;">Ready to Start Your Journey?</h2>
          <p style="font-size: 16px; margin: 15px 0;">Let's schedule a personal call to discuss your goals</p>
          <a href="https://wa.me/27679820321?text=Hi!%20I'm%20${encodeURIComponent(name)}%20and%20I'm%20interested%20in%20the%20Diva%20Secret%20business%20opportunity.%20I'd%20like%20to%20schedule%20a%20call." style="display: inline-block; background: white; color: #7c3aed; padding: 15px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; margin-top: 15px;">📱 Schedule Call on WhatsApp</a>
        </div>
        <h2 style="color: #a855f7;">On Your Call, We'll Discuss:</h2>
        <ul>
          <li>📊 Your personal goals and timeline</li>
          <li>💰 How the compensation plan works</li>
          <li>📚 Getting you started with training</li>
          <li>🤝 Connecting you with your support team</li>
        </ul>
        <p><strong>Remember:</strong> Success starts with a single step. Let that step be today!</p>
        <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
          <p style="font-size: 18px; margin: 0;"><strong>🌟 Health & Wealth await you with Diva Secret! 🌟</strong></p>
        </div>
        <p style="margin-top: 30px;">Looking forward to connecting!<br><strong>The Diva Secret Team</strong></p>
      </div>
    `,
  },
];

// Day intervals for when to send each email (hours from sequence start)
const CUSTOMER_SEND_INTERVALS_HOURS = [0, 24, 48, 72, 96, 120, 144]; // Day 1, 2, 3, 4, 5, 6, 7
const OPPORTUNITY_SEND_INTERVALS_HOURS = [0, 24, 96, 144]; // Day 1, 2, 5, 7

// Helper to get email content based on sequence type
function getEmailContent(sequenceType: string, step: number) {
  if (sequenceType === 'opportunity_nurture') {
    return OPPORTUNITY_DRIP_EMAILS[step - 1] || null;
  }
  return CUSTOMER_DRIP_EMAILS[step - 1] || null;
}

// Helper to get total steps for a sequence type
function getTotalSteps(sequenceType: string): number {
  if (sequenceType === 'opportunity_nurture') {
    return OPPORTUNITY_DRIP_EMAILS.length;
  }
  return CUSTOMER_DRIP_EMAILS.length;
}

// Helper to get next interval hours
function getNextIntervalHours(sequenceType: string, currentStep: number): number {
  if (sequenceType === 'opportunity_nurture') {
    return OPPORTUNITY_SEND_INTERVALS_HOURS[currentStep] || 24;
  }
  return CUSTOMER_SEND_INTERVALS_HOURS[currentStep] || 24;
}

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
