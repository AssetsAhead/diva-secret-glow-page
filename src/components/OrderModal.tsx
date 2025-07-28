import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface OrderModalProps {
  children: React.ReactNode;
}

export const OrderModal = ({ children }: OrderModalProps) => {
  const [open, setOpen] = useState(false);
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
    { value: "starter", label: "Starter Package - R299", price: "R299" },
    { value: "premium", label: "Premium Package - R599", price: "R599" },
    { value: "ultimate", label: "Ultimate Package - R899", price: "R899" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
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

    // Create WhatsApp message
    const selectedPackage = packages.find(p => p.value === formData.package);
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
      title: "Order Initiated",
      description: "You'll be redirected to WhatsApp to complete your order"
    });
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
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Order via WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};