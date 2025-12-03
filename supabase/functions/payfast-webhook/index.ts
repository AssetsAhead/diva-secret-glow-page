import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Format phone number for WhatsApp (ensure it has country code)
const formatWhatsAppNumber = (phone: string): string => {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '27' + cleaned.substring(1); // South Africa country code
  }
  if (!cleaned.startsWith('27')) {
    cleaned = '27' + cleaned;
  }
  return `whatsapp:+${cleaned}`;
};

// Send WhatsApp notification to customer
const sendWhatsAppToCustomer = async (phone: string, orderId: string, packageType: string, amount: number) => {
  const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const fromNumber = Deno.env.get("TWILIO_WHATSAPP_FROM");

  if (!accountSid || !authToken || !fromNumber) {
    console.log('Twilio credentials not configured, skipping WhatsApp notification');
    return;
  }

  const toNumber = formatWhatsAppNumber(phone);
  const message = `✅ *Payment Confirmed!*

Hi there! Your Diva Secret order has been confirmed.

📦 *Order:* ${orderId}
🛍️ *Package:* ${packageType}
💰 *Amount:* R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}

Your order will be shipped within 24-48 hours. We'll send you tracking updates!

Thank you for choosing Diva Secret! 💜

Questions? Reply to this message or call us.`;

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: toNumber,
          From: fromNumber,
          Body: message,
        }),
      }
    );

    if (response.ok) {
      console.log('WhatsApp notification sent to customer:', toNumber);
    } else {
      const errorData = await response.text();
      console.error('Failed to send WhatsApp to customer:', errorData);
    }
  } catch (error) {
    console.error('Error sending WhatsApp to customer:', error);
  }
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

    // Send notifications if payment was successful
    if (status === 'paid') {
      // Fetch order details for notifications
      const { data: order } = await supabaseClient
        .from('orders')
        .select('*')
        .eq('order_number', orderId)
        .maybeSingle();

      // Send order confirmation email
      try {
        console.log('Triggering order confirmation email for:', orderId);
        const emailResponse = await fetch(
          `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-order-confirmation`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
            },
            body: JSON.stringify({ order_id: orderId }),
          }
        );
        
        if (emailResponse.ok) {
          console.log('Order confirmation email sent successfully');
        } else {
          const errorText = await emailResponse.text();
          console.error('Failed to send order confirmation email:', errorText);
        }
      } catch (emailError) {
        console.error('Error sending order confirmation email:', emailError);
      }

      // Send WhatsApp notification to customer
      if (order) {
        const metadata = order.metadata || {};
        const payfastData = metadata.payfast_data || metadata.webhook_data || {};
        const customerPhone = payfastData.cell_number || metadata.customer_phone;
        
        if (customerPhone) {
          await sendWhatsAppToCustomer(
            customerPhone,
            orderId,
            order.package_type,
            order.amount || 0
          );
        } else {
          console.log('No customer phone number found, skipping WhatsApp notification');
        }
      }
    }

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
