import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DFYOnboardingModalProps {
  children: React.ReactNode;
}

export const DFYOnboardingModal = ({ children }: DFYOnboardingModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    niche: "",
    location: "",
    calUrl: "",
    webhookUrl: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Name, email and phone are required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("dfy-provision", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "DFY Request Received",
        description: "We are provisioning your Done-For-You setup now.",
      });

      // Open provided calendar link so they can start receiving bookings immediately
      if (formData.calUrl) {
        window.open(formData.calUrl, "_blank");
      }

      setOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        niche: "",
        location: "",
        calUrl: "",
        webhookUrl: "",
        notes: "",
      });
    } catch (err) {
      console.error("DFY provisioning error:", err);
      toast({
        title: "Submission failed",
        description: "Please try again or contact us on WhatsApp",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Done-For-You AI Marketing Agency Setup
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground -mt-2 mb-4">
          We’ll connect your calendar, install lead-gen funnels, and wire up automations so clients book directly with you.
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Thabo Nkosi"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+27 XX XXX XXXX"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Your brand or trading name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="niche">Niche / Service</Label>
              <Input
                id="niche"
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                placeholder="e.g. Local leadgen, salons, dentists"
              />
            </div>
            <div>
              <Label htmlFor="location">City / Country</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Johannesburg, South Africa"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="calUrl">Calendar link (optional)</Label>
              <Input
                id="calUrl"
                value={formData.calUrl}
                onChange={(e) => setFormData({ ...formData, calUrl: e.target.value })}
                placeholder="https://cal.com/yourname/intro-call"
              />
            </div>
            <div className="hidden md:block" />
          </div>

          <Collapsible>
            <CollapsibleTrigger className="text-sm text-primary underline-offset-4 hover:underline">
              Advanced options (optional)
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-2">
              <div>
                <Label htmlFor="webhookUrl">Automation link (optional)</Label>
                <Input
                  id="webhookUrl"
                  value={formData.webhookUrl}
                  onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
                  placeholder="https://hooks.zapier.com/..."
                />
                <p className="text-xs text-muted-foreground mt-1">Advanced: Zapier/Pipedream URL. Skip if unsure.</p>
              </div>
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Anything else we should know? Preferences, special requests, etc."
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" disabled={isLoading}>
              {isLoading ? "Provisioning..." : "Get DFY Setup Now"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
