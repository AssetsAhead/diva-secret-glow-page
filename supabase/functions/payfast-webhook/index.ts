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
    // Get form data from PayFast webhook
    const formData = await req.formData();
    const paymentData: Record<string, string> = {};
    
    for (const [key, value] of formData.entries()) {
      paymentData[key] = value.toString();
    }

    console.log('PayFast webhook received:', paymentData);

    // Verify the payment status
    const paymentStatus = paymentData.payment_status;
    const orderId = paymentData.m_payment_id;
    const pfPaymentId = paymentData.pf_payment_id;

    if (!orderId) {
      throw new Error("No order ID provided");
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Update order status based on payment status
    let status = 'pending';
    if (paymentStatus === 'COMPLETE') {
      status = 'paid';
    } else if (paymentStatus === 'FAILED' || paymentStatus === 'CANCELLED') {
      status = 'failed';
    }

    // Update the order in the database
    const { error: updateError } = await supabaseClient
      .from('orders')
      .update({
        status: status,
        updated_at: new Date().toISOString(),
        metadata: {
          payfast_payment_id: pfPaymentId,
          payfast_status: paymentStatus,
          webhook_data: paymentData
        }
      })
      .eq('order_number', orderId);

    if (updateError) {
      console.error('Error updating order:', updateError);
      throw updateError;
    }

    console.log(`Order ${orderId} updated to status: ${status}`);

    // Return success response to PayFast
    return new Response('OK', {
      headers: corsHeaders,
      status: 200,
    });

  } catch (error: unknown) {
    console.error('PayFast webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      `Error: ${errorMessage}`, 
      {
        headers: corsHeaders,
        status: 500,
      }
    );
  }
});
