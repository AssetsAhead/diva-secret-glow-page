import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  amount: number;
  package_type: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address?: string;
  message?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, package_type, customer_name, customer_email, customer_phone, delivery_address, message } = await req.json() as PaymentRequest;

    // Validate required fields
    if (!amount || !package_type || !customer_name || !customer_email) {
      throw new Error("Missing required fields");
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Save lead to database
    const { data: leadData, error: leadError } = await supabaseClient
      .from('leads')
      .insert({
        name: customer_name,
        email: customer_email,
        phone: customer_phone,
        lead_type: 'customer',
        metadata: {
          package: package_type,
          source: 'payfast_payment'
        }
      })
      .select()
      .single();

    if (leadError) throw leadError;

    // Generate unique order ID
    const order_id = `DSC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // PayFast configuration
    const merchant_id = "29838411";
    const merchant_key = Deno.env.get("PAYFAST_MERCHANT_KEY");
    
    if (!merchant_key) {
      throw new Error("PayFast merchant key not configured");
    }

    // PayFast payment data
    const paymentData = {
      merchant_id: merchant_id,
      merchant_key: merchant_key,
      return_url: `${req.headers.get("origin")}/payment-success`,
      cancel_url: `${req.headers.get("origin")}/payment-cancelled`,
      notify_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/payfast-webhook`,
      m_payment_id: order_id,
      amount: amount.toFixed(2),
      item_name: `Diva Secret ${package_type.charAt(0).toUpperCase() + package_type.slice(1)} Package`,
      item_description: `Diva Secret Stem Cells - ${package_type} package`,
      name_first: customer_name.split(' ')[0] || customer_name,
      name_last: customer_name.split(' ').slice(1).join(' ') || '',
      email_address: customer_email,
      cell_number: customer_phone,
    };

    // Create order record
    const { error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        lead_id: leadData.id,
        order_number: order_id,
        package_type: package_type,
        amount: amount,
        currency: 'ZAR',
        delivery_address: delivery_address,
        status: 'pending',
        metadata: {
          payfast_data: paymentData,
          customer_message: message
        }
      });

    if (orderError) throw orderError;

    // Generate PayFast signature
    const generateSignature = (data: Record<string, string>, passPhrase = "") => {
      const pfOutput = Object.keys(data)
        .filter(key => data[key] !== "" && data[key] !== undefined)
        .sort()
        .map(key => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`)
        .join("&");
      
      return pfOutput + (passPhrase ? `&passphrase=${encodeURIComponent(passPhrase)}` : "");
    };

    const signature = generateSignature(paymentData);

    // Create PayFast form HTML
    const formHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Redirecting to PayFast...</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .loader { border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 20px auto; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <h2>Redirecting to secure payment...</h2>
        <div class="loader"></div>
        <p>Please wait while we redirect you to PayFast for secure payment processing.</p>
        
        <form action="https://www.payfast.co.za/eng/process" method="post" id="payfast_form">
          ${Object.entries(paymentData).map(([key, value]) => 
            `<input type="hidden" name="${key}" value="${value}">`
          ).join('')}
          <input type="hidden" name="signature" value="${signature}">
        </form>
        
        <script>
          document.getElementById('payfast_form').submit();
        </script>
      </body>
      </html>
    `;

    return new Response(formHtml, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/html" 
      },
      status: 200,
    });

  } catch (error) {
    console.error('PayFast payment error:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});