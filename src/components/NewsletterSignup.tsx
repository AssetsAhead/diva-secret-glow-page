import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Gift, Bell, Star } from "lucide-react";

export const NewsletterSignup = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Check if email already exists
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id')
        .eq('email', email)
        .single();

      if (existingLead) {
        toast({
          title: "Already Subscribed",
          description: "You're already signed up for updates!",
        });
        setEmail("");
        setName("");
        setIsLoading(false);
        return;
      }

      // Save newsletter signup to database
      const { error } = await supabase
        .from('leads')
        .insert({
          name: name,
          email: email,
          lead_type: 'customer',
          metadata: {
            source: 'newsletter_signup',
            subscription_date: new Date().toISOString()
          }
        });

      if (error) throw error;
      
      setEmail("");
      setName("");
      
      toast({
        title: "Welcome to Diva Secret!",
        description: "You'll be first to know about new products and special offers"
      });
    } catch (error) {
      console.error('Error submitting newsletter signup:', error);
      toast({
        title: "Signup Failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Diva Secret
          </h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Be the first to know about new products, exclusive offers, and health tips
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center text-white">
            <Gift className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <p className="text-sm font-semibold">Exclusive Offers</p>
          </div>
          <div className="text-center text-white">
            <Bell className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <p className="text-sm font-semibold">New Product Alerts</p>
          </div>
          <div className="text-center text-white">
            <Star className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <p className="text-sm font-semibold">Health Tips</p>
          </div>
          <div className="text-center text-white">
            <Mail className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <p className="text-sm font-semibold">Monthly Updates</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-2xl">
          <div className="space-y-4">
            <div>
              <Label htmlFor="signup-name" className="text-gray-700">Your Name</Label>
              <Input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="signup-email" className="text-gray-700">Email Address</Label>
              <Input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-1"
                required
              />
            </div>
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Get Updates & Offers"}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
};