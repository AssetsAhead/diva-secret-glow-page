import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, MessageCircle, FileText } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Invoice } from "@/components/Invoice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface OrderData {
  order_number: string;
  package_type: string;
  amount: number;
  delivery_address: string | null;
  status: string;
  created_at: string;
  metadata: {
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    payfast_data?: {
      name_first?: string;
      name_last?: string;
      email_address?: string;
      cell_number?: string;
    };
  } | null;
}

// Helper to extract customer info from metadata
const getCustomerInfo = (metadata: OrderData['metadata']) => {
  if (!metadata) return { name: 'Customer', email: 'N/A', phone: undefined };
  
  // Check direct fields first, then payfast_data
  const name = metadata.customer_name || 
    (metadata.payfast_data?.name_first && metadata.payfast_data?.name_last 
      ? `${metadata.payfast_data.name_first} ${metadata.payfast_data.name_last}`
      : metadata.payfast_data?.name_first || 'Customer');
  
  const email = metadata.customer_email || metadata.payfast_data?.email_address || 'N/A';
  const phone = metadata.customer_phone || metadata.payfast_data?.cell_number;
  
  return { name, email, phone };
};

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      const orderId = searchParams.get("order_id");
      
      if (orderId) {
        try {
          const { data, error } = await supabase.functions.invoke('get-order', {
            body: { order_id: orderId }
          });

          if (!error && data?.order) {
            setOrderData(data.order as OrderData);
          }
        } catch (err) {
          console.error('Error fetching order:', err);
        }
      }
      setLoading(false);
    };

    fetchOrderData();
    console.log("Payment success page viewed");
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Thank you for your order. Your payment has been processed successfully.
            </p>
            {orderData?.order_number && (
              <p className="text-sm text-gray-500 mt-2">
                Order: <span className="font-semibold">{orderData.order_number}</span>
              </p>
            )}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-2">What&apos;s Next?</h3>
            <ul className="text-sm text-green-700 space-y-1 text-left">
              <li>✓ You&apos;ll receive an order confirmation email shortly</li>
              <li>✓ Your Diva Secret package will be shipped within 24-48 hours</li>
              <li>✓ Track your delivery via SMS updates</li>
              <li>✓ Our team will contact you if needed</li>
            </ul>
          </div>

          <div className="space-y-3">
            {orderData && !loading && (() => {
              const customerInfo = getCustomerInfo(orderData.metadata);
              return (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View & Download Invoice
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Invoice</DialogTitle>
                    </DialogHeader>
                    <Invoice
                      orderNumber={orderData.order_number || "N/A"}
                      customerName={customerInfo.name}
                      customerEmail={customerInfo.email}
                      customerPhone={customerInfo.phone}
                      packageType={orderData.package_type}
                      amount={orderData.amount || 0}
                      deliveryAddress={orderData.delivery_address || undefined}
                      date={orderData.created_at}
                      status={orderData.status || "pending"}
                    />
                  </DialogContent>
                </Dialog>
              );
            })()}

            <Button 
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
            
            <Button 
              variant="outline"
              className="w-full border-green-500 text-green-600 hover:bg-green-50"
              asChild
            >
              <a href="https://wa.me/27679820321?text=Hi!%20I%20just%20completed%20my%20order%20and%20have%20a%20question">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </a>
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Questions? Contact us on WhatsApp or email support@divasecret.co.za
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
