import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle, ArrowLeft, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PaymentCancelled = () => {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    navigate("/#pricing");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Cancelled
            </h1>
            <p className="text-gray-600">
              Your payment was cancelled. No charges have been made to your account.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-orange-800 mb-2">Need Help?</h3>
            <p className="text-sm text-orange-700">
              If you experienced any issues during checkout, please contact our support team. 
              We're here to help you complete your order.
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleRetryPayment}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Try Again
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
            
            <Button 
              variant="outline"
              className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
              asChild
            >
              <a href="https://wa.me/27679820321?text=Hi!%20I%20had%20trouble%20with%20my%20payment%20and%20need%20assistance">
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