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

    console.log("Fetching all leads with order counts");

    // Fetch leads
    const { data: leads, error: leadsError } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (leadsError) {
      console.error("Error fetching leads:", leadsError);
      throw leadsError;
    }

    // Fetch orders to get counts per lead
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("lead_id, status");

    if (ordersError) {
      console.error("Error fetching orders:", ordersError);
      throw ordersError;
    }

    // Count orders per lead
    const orderCounts: Record<string, { total: number; completed: number }> = {};
    orders?.forEach((order) => {
      if (order.lead_id) {
        if (!orderCounts[order.lead_id]) {
          orderCounts[order.lead_id] = { total: 0, completed: 0 };
        }
        orderCounts[order.lead_id].total++;
        if (order.status === "completed") {
          orderCounts[order.lead_id].completed++;
        }
      }
    });

    // Enrich leads with order counts
    const enrichedLeads = leads?.map((lead) => ({
      ...lead,
      order_count: orderCounts[lead.id]?.total || 0,
      completed_orders: orderCounts[lead.id]?.completed || 0,
    }));

    console.log(`Found ${enrichedLeads?.length || 0} leads`);

    return new Response(
      JSON.stringify({ leads: enrichedLeads }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in get-leads:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
