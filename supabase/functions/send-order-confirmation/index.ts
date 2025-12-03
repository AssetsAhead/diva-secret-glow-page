import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  order_id: string;
}

const packageLabels: Record<string, string> = {
  starter: "Starter Package (1 Box)",
  bronze: "Bronze Package (2 Boxes)",
  standard: "Standard Package (2 Boxes)",
  silver: "Silver Package (4 Boxes)",
  premium: "Premium Package (3 Boxes)",
  gold: "Gold Package (16 Boxes)",
  diamond: "Diamond Package (24 Boxes)",
};

const formatCurrency = (amount: number): string => {
  return `R ${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const generateInvoiceHTML = (order: any): string => {
  const metadata = order.metadata || {};
  const payfastData = metadata.payfast_data || {};
  
  const customerName = metadata.customer_name || 
    (payfastData.name_first && payfastData.name_last 
      ? `${payfastData.name_first} ${payfastData.name_last}`
      : payfastData.name_first || 'Customer');
  const customerEmail = metadata.customer_email || payfastData.email_address || 'N/A';
  const customerPhone = metadata.customer_phone || payfastData.cell_number || '';
  const deliveryAddress = order.delivery_address || '';
  const vatAmount = (order.amount * 0.15 / 1.15).toFixed(2);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #7c3aed, #db2777); padding: 30px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 28px; }
    .header p { color: rgba(255,255,255,0.9); margin: 10px 0 0 0; }
    .content { padding: 30px; }
    .success-badge { background: #dcfce7; color: #166534; padding: 10px 20px; border-radius: 50px; display: inline-block; font-weight: bold; margin-bottom: 20px; }
    .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb; }
    .invoice-title { font-size: 24px; font-weight: bold; color: #7c3aed; }
    .invoice-meta { text-align: right; color: #666; }
    .invoice-meta p { margin: 5px 0; }
    .addresses { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
    .address-block h3 { font-size: 12px; text-transform: uppercase; color: #888; margin-bottom: 10px; letter-spacing: 1px; }
    .address-block p { margin: 5px 0; }
    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .items-table th { background: #f9fafb; padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #666; border-bottom: 2px solid #e5e7eb; }
    .items-table td { padding: 15px 12px; border-bottom: 1px solid #e5e7eb; }
    .items-table .item-name { font-weight: 600; }
    .items-table .item-desc { font-size: 13px; color: #666; }
    .totals { margin-left: auto; width: 250px; }
    .totals-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .totals-row.total { border-top: 2px solid #e5e7eb; padding-top: 15px; margin-top: 10px; font-size: 18px; font-weight: bold; }
    .totals-row.total .amount { color: #7c3aed; }
    .footer { background: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb; }
    .footer p { margin: 5px 0; font-size: 13px; color: #666; }
    .footer a { color: #7c3aed; text-decoration: none; }
    .whats-next { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .whats-next h3 { color: #166534; margin: 0 0 15px 0; }
    .whats-next ul { margin: 0; padding-left: 20px; color: #15803d; }
    .whats-next li { margin: 8px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Diva Secret</h1>
      <p>Stem Cell Wellness</p>
    </div>
    
    <div class="content">
      <div style="text-align: center;">
        <span class="success-badge">✓ PAYMENT CONFIRMED</span>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin: 20px 0 30px 0; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
        <div>
          <div class="invoice-title">INVOICE</div>
          <p style="color: #666; margin: 5px 0 0 0;">Thank you for your order!</p>
        </div>
        <div style="text-align: right; color: #666;">
          <p style="margin: 5px 0;"><strong>Invoice #:</strong> ${order.order_number}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${formatDate(order.created_at)}</p>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
        <div>
          <h3 style="font-size: 12px; text-transform: uppercase; color: #888; margin-bottom: 10px; letter-spacing: 1px;">Bill To</h3>
          <p style="margin: 5px 0; font-weight: 600;">${customerName}</p>
          <p style="margin: 5px 0;">${customerEmail}</p>
          ${customerPhone ? `<p style="margin: 5px 0;">${customerPhone}</p>` : ''}
          ${deliveryAddress ? `<p style="margin: 5px 0; margin-top: 10px;">${deliveryAddress}</p>` : ''}
        </div>
        <div>
          <h3 style="font-size: 12px; text-transform: uppercase; color: #888; margin-bottom: 10px; letter-spacing: 1px;">From</h3>
          <p style="margin: 5px 0; font-weight: 600;">Diva Secret</p>
          <p style="margin: 5px 0;">Stem Cell Wellness</p>
          <p style="margin: 5px 0;">South Africa</p>
          <p style="margin: 5px 0;">support@divasecret.co.za</p>
        </div>
      </div>
      
      <table class="items-table">
        <thead>
          <tr>
            <th>Description</th>
            <th style="text-align: center;">Qty</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="item-name">${packageLabels[order.package_type] || order.package_type}</div>
              <div class="item-desc">Diva Secret Stem Cell Supplement</div>
            </td>
            <td style="text-align: center;">1</td>
            <td style="text-align: right; font-weight: 600;">${formatCurrency(order.amount)}</td>
          </tr>
        </tbody>
      </table>
      
      <div class="totals">
        <div class="totals-row">
          <span>Subtotal</span>
          <span>${formatCurrency(order.amount)}</span>
        </div>
        <div class="totals-row">
          <span>Shipping</span>
          <span>FREE</span>
        </div>
        <div class="totals-row">
          <span>VAT (Included)</span>
          <span>R ${vatAmount}</span>
        </div>
        <div class="totals-row total">
          <span>Total</span>
          <span class="amount">${formatCurrency(order.amount)}</span>
        </div>
      </div>
      
      <div class="whats-next">
        <h3>What's Next?</h3>
        <ul>
          <li>Your Diva Secret package will be shipped within 24-48 hours</li>
          <li>You'll receive SMS updates to track your delivery</li>
          <li>Our team will contact you if needed</li>
        </ul>
      </div>
    </div>
    
    <div class="footer">
      <p>Thank you for choosing Diva Secret!</p>
      <p>Questions? Contact us at <a href="mailto:support@divasecret.co.za">support@divasecret.co.za</a></p>
      <p>or WhatsApp <a href="https://wa.me/27679820321">+27 67 982 0321</a></p>
    </div>
  </div>
</body>
</html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order_id }: OrderConfirmationRequest = await req.json();
    
    if (!order_id) {
      console.error("Missing order_id");
      return new Response(
        JSON.stringify({ error: "order_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Sending order confirmation for:", order_id);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch order data
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("order_number", order_id)
      .maybeSingle();

    if (orderError || !order) {
      console.error("Order not found:", order_id, orderError);
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get customer email
    const metadata = order.metadata || {};
    const payfastData = metadata.payfast_data || {};
    const customerEmail = metadata.customer_email || payfastData.email_address;
    const customerName = metadata.customer_name || 
      (payfastData.name_first && payfastData.name_last 
        ? `${payfastData.name_first} ${payfastData.name_last}`
        : payfastData.name_first || 'Customer');

    if (!customerEmail) {
      console.error("No customer email found for order:", order_id);
      return new Response(
        JSON.stringify({ error: "No customer email found" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Sending email to:", customerEmail);

    // Generate invoice HTML
    const invoiceHtml = generateInvoiceHTML(order);

    // Send email
    const emailResponse = await resend.emails.send({
      from: "Diva Secret <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `Order Confirmed - ${order.order_number}`,
      html: invoiceHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error sending order confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
