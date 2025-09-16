import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift, Clock, X } from "lucide-react";
import { OrderModal } from "./OrderModal";

export const ExitIntentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if already shown today
    const lastShown = localStorage.getItem('exit-intent-shown');
    const today = new Date().toDateString();
    
    if (lastShown === today) {
      setHasTriggered(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the page
      if (e.clientY <= 0 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        localStorage.setItem('exit-intent-shown', today);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  const handleClaim = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] border-0 p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full p-4 w-fit mx-auto mb-4">
              <Gift className="h-12 w-12" />
            </div>
            
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white mb-2">
                Wait! Don't Leave Empty-Handed
              </DialogTitle>
            </DialogHeader>
            
            <p className="text-lg mb-4">
              Get <span className="font-bold text-yellow-300">FREE Priority WhatsApp Support</span> with any order!
            </p>
            
            <div className="bg-yellow-400 text-black rounded-lg p-3 mb-4">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-5 w-5" />
                <span className="font-bold">Limited Time Offer</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <OrderModal>
                <Button 
                  onClick={handleClaim}
                  className="w-full bg-white text-red-600 hover:bg-gray-100 font-bold py-3 text-lg"
                >
                  Claim My Free Support & Order Now
                </Button>
              </OrderModal>
              
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white text-sm underline block mx-auto"
              >
                No thanks, I'll pass on the free support
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};