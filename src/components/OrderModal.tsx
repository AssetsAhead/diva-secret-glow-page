import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    package: "",
    message: ""
  });
  const { toast } = useToast();

  const packages = [
    { value: "starter", label: "Starter - R820 (1 Mini Box, 22.5PV)", price: "R820" },
    { value: "bronze", label: "Bronze - R1420 (2 Mini Boxes, 45PV)", price: "R1420" },
    { value: "silver", label: "Silver - R2520 (4 Mini Boxes, 90PV)", price: "R2520" },
    { value: "gold", label: "Gold - R9720 (16 Mini Boxes, 360PV)", price: "R9720" },
    { value: "diamond", label: "Diamond - R24120 (40 Mini Boxes, 900PV)", price: "R24120" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.package) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const selectedPackage = packages.find(p => p.value === formData.package);
      
      // Save lead and order to database
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .insert({
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone,
          lead_type: 'customer',
          metadata: {
            package: formData.package,
            source: 'order_modal'
          }
        })
        .select()
        .single();

      if (leadError) throw leadError;

      // Create order record
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          lead_id: leadData.id,
          package_type: formData.package,
          amount: parseFloat(selectedPackage?.price.replace('R', '') || '0'),
          delivery_address: formData.address,
          whatsapp_message: formData.message,
          metadata: {
            package_label: selectedPackage?.label
          }
        });

      if (orderError) throw orderError;

      // Create WhatsApp message
      const message = `Hi! I'd like to order:

*Package:* ${selectedPackage?.label}
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Address:* ${formData.address}

${formData.message ? `*Additional Message:* ${formData.message}` : ''}

Please confirm my order and payment details.`;

      const whatsappUrl = `https://wa.me/27679820321?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setOpen(false);
      setFormData({ name: "", phone: "", email: "", address: "", package: "", message: "" });
      
      toast({
        title: "Order Submitted!",
        description: "Your order has been saved and you'll be contacted soon"
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Order Failed",
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
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="your@email.com"
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
            <h4 className="font-semibold text-purple-800 mb-2">Order Process:</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Click "Order via WhatsApp" to send your order details</li>
              <li>• You'll be redirected to WhatsApp to confirm with our team</li>
              <li>• Payment options and delivery details will be shared</li>
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
              {isLoading ? "Submitting..." : "Order via WhatsApp"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};