import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // You could add analytics tracking here
    console.log("Payment success page viewed");
  }, []);

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
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
            <ul className="text-sm text-green-700 space-y-1 text-left">
              <li>✓ You'll receive an order confirmation email shortly</li>
              <li>✓ Your Diva Secret package will be shipped within 24-48 hours</li>
              <li>✓ Track your delivery via SMS updates</li>
              <li>✓ Our team will contact you if needed</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate("/")}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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