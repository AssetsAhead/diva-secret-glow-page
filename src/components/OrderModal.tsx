import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OrderModalProps {
  children: React.ReactNode;
}

export const OrderModal = ({ children }: OrderModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    package: "",
    message: ""
  });
  const { toast } = useToast();

  const packages = [
    { value: "starter", label: "Starter - R820 (1 Mini Box, 22.5PV)", price: 820 },
    { value: "bronze", label: "Bronze - R1420 (2 Mini Boxes, 45PV)", price: 1420 },
    { value: "silver", label: "Silver - R2520 (4 Mini Boxes, 90PV)", price: 2520 },
    { value: "gold", label: "Gold - R9720 (16 Mini Boxes, 360PV)", price: 9720 },
    { value: "diamond", label: "Diamond - R24120 (24 Mini Boxes, 900PV)", price: 24120 }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.email || !formData.package) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name, phone, email, package)",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const selectedPackage = packages.find(p => p.value === formData.package);
      
      if (!selectedPackage) {
        throw new Error("Invalid package selected");
      }

      // Create PayFast payment
      const { data, error } = await supabase.functions.invoke('create-payfast-payment', {
        body: {
          amount: selectedPackage.price,
          package_type: formData.package,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          delivery_address: formData.address,
          message: formData.message
        }
      });

      if (error) throw error;

      // Open PayFast payment in new window
      const paymentWindow = window.open('', '_blank');
      if (paymentWindow) {
        paymentWindow.document.write(data);
        paymentWindow.document.close();
      }
      
      setOpen(false);
      setFormData({ name: "", phone: "", email: "", address: "", package: "", message: "" });
      
      toast({
        title: "Redirecting to Payment",
        description: "You'll be redirected to PayFast for secure payment processing"
      });
    } catch (error) {
      console.error('Error creating payment:', error);
      toast({
        title: "Payment Failed",
        description: "Please try again or contact us directly",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Order Diva Secret Stem Cells
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+27 XX XXX XXXX"
                required
              />
            </div>
          </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
                required
              />
            </div>

          <div>
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Enter your full delivery address"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="package">Select Package *</Label>
            <Select value={formData.package} onValueChange={(value) => setFormData({...formData, package: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your package" />
              </SelectTrigger>
              <SelectContent>
                {packages.map((pkg) => (
                  <SelectItem key={pkg.value} value={pkg.value}>
                    {pkg.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Any special requests or questions?"
              rows={3}
            />
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Secure Payment Process:</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Click "Pay Now" to proceed to secure PayFast payment</li>
              <li>• Complete payment using your preferred method</li>
              <li>• Receive order confirmation via email</li>
              <li>• Fast delivery across South Africa</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};