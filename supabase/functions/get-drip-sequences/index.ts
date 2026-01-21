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
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch drip sequences with lead information
    const { data: sequences, error: sequencesError } = await supabaseClient
      .from("drip_sequences")
      .select(`
        id,
        lead_id,
        sequence_type,
        current_step,
        status,
        started_at,
        next_send_at,
        completed_at
      `)
      .order("created_at", { ascending: false });

    if (sequencesError) {
      console.error("Error fetching sequences:", sequencesError);
      throw sequencesError;
    }

    // Fetch lead information for each sequence
    const leadIds = [...new Set(sequences?.map(s => s.lead_id) || [])];
    
    let leadsMap: Record<string, { name: string; email: string }> = {};
    
    if (leadIds.length > 0) {
      const { data: leads, error: leadsError } = await supabaseClient
        .from("leads")
        .select("id, name, email")
        .in("id", leadIds);

      if (leadsError) {
        console.error("Error fetching leads:", leadsError);
      } else if (leads) {
        leadsMap = leads.reduce((acc, lead) => {
          acc[lead.id] = { name: lead.name, email: lead.email };
          return acc;
        }, {} as Record<string, { name: string; email: string }>);
      }
    }

    // Combine sequences with lead data
    const enrichedSequences = sequences?.map(seq => ({
      ...seq,
      lead: leadsMap[seq.lead_id] || null
    })) || [];

    console.log(`Fetched ${enrichedSequences.length} drip sequences`);

    return new Response(
      JSON.stringify({ sequences: enrichedSequences }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in get-drip-sequences:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
