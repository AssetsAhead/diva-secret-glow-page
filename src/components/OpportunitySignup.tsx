import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users, DollarSign, TrendingUp, Star } from "lucide-react";

interface OpportunitySignupProps {
  children: React.ReactNode;
}

export const OpportunitySignup = ({ children }: OpportunitySignupProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    motivation: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Save lead to database
      const { error } = await supabase
        .from('leads')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          lead_type: 'opportunity',
          metadata: {
            experience: formData.experience,
            motivation: formData.motivation,
            source: 'opportunity_signup'
          }
        });

      if (error) throw error;

      // Create WhatsApp message for opportunity follow-up
      const message = `Hi! I'm interested in the Diva Secret business opportunity:

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Experience:* ${formData.experience || 'No prior experience'}
*Motivation:* ${formData.motivation || 'Looking for new opportunities'}

Please send me more information about becoming a distributor.`;

      const whatsappUrl = `https://wa.me/27679820321?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setOpen(false);
      setFormData({ name: "", email: "", phone: "", experience: "", motivation: "" });
      
      toast({
        title: "Application Submitted!",
        description: "We'll contact you soon with opportunity details"
      });
    } catch (error) {
      console.error('Error submitting opportunity signup:', error);
      toast({
        title: "Submission Failed",
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
            Join the Diva Secret Opportunity
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Users className="h-6 w-6 text-purple-600 mx-auto mb-1" />
            <p className="text-xs font-semibold text-purple-800">Build Team</p>
          </div>
          <div className="text-center p-3 bg-pink-50 rounded-lg">
            <DollarSign className="h-6 w-6 text-pink-600 mx-auto mb-1" />
            <p className="text-xs font-semibold text-pink-800">Earn Income</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-1" />
            <p className="text-xs font-semibold text-purple-800">Grow Business</p>
          </div>
          <div className="text-center p-3 bg-pink-50 rounded-lg">
            <Star className="h-6 w-6 text-pink-600 mx-auto mb-1" />
            <p className="text-xs font-semibold text-pink-800">Help Others</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="experience">Previous Business Experience</Label>
            <Input
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              placeholder="e.g., Direct sales, Network marketing, Own business"
            />
          </div>

          <div>
            <Label htmlFor="motivation">Why are you interested in this opportunity?</Label>
            <Textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) => setFormData({...formData, motivation: e.target.value})}
              placeholder="Tell us what motivates you..."
              rows={3}
            />
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">What happens next?</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Immediate WhatsApp consultation</li>
              <li>• Business presentation and training materials</li>
              <li>• Product knowledge and selling techniques</li>
              <li>• Ongoing support and mentorship</li>
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
              {isLoading ? "Submitting..." : "Join Opportunity"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};