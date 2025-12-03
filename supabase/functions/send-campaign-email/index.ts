import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { campaignId } = await req.json();
    
    if (!campaignId) {
      throw new Error('Campaign ID is required');
    }

    // Get campaign details
    const { data: campaign, error: campaignError } = await supabaseClient
      .from('email_campaigns')
      .select('*')
      .eq('id', campaignId)
      .single();

    if (campaignError || !campaign) {
      throw new Error('Campaign not found');
    }

    // Get target leads based on campaign audience
    let leadsQuery = supabaseClient.from('leads').select('*');
    
    switch (campaign.target_audience) {
      case 'customers':
        leadsQuery = leadsQuery.eq('lead_type', 'customer');
        break;
      case 'opportunities':
        leadsQuery = leadsQuery.eq('lead_type', 'opportunity');
        break;
      case 'new_leads':
        leadsQuery = leadsQuery.eq('status', 'new');
        break;
      // 'all' requires no additional filter
    }

    const { data: leads, error: leadsError } = await leadsQuery;

    if (leadsError) {
      throw new Error('Failed to fetch leads');
    }

    // Simulate email sending (integrate with your email service here)
    const emailPromises = leads.map(async (lead) => {
      // This is where you'd integrate with Resend, SendGrid, etc.
      console.log(`Sending email to ${lead.email}:`, {
        subject: campaign.subject,
        content: campaign.content.replace(/\{name\}/g, lead.name)
      });

      // Record the email send
      return supabaseClient
        .from('email_sends')
        .insert({
          campaign_id: campaignId,
          lead_id: lead.id,
          sent_at: new Date().toISOString()
        });
    });

    await Promise.all(emailPromises);

    // Update campaign status
    await supabaseClient
      .from('email_campaigns')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString()
      })
      .eq('id', campaignId);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Campaign sent to ${leads.length} recipients`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: unknown) {
    console.error('Error sending campaign:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
