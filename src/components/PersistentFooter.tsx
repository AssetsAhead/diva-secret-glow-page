
import { Button } from "@/components/ui/button";
import { ShoppingCart, MessageCircle, Instagram } from "lucide-react";

export const PersistentFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-purple-200 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-1">
          
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-none border-0 h-auto flex flex-col items-center space-y-1"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs font-bold">Buy Now</span>
          </Button>

          <Button 
            className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-none border-0 h-auto flex flex-col items-center space-y-1"
            asChild
          >
            <a href="https://wa.me/27734247729">
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs font-bold">WhatsApp</span>
            </a>
          </Button>

          <Button 
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-4 rounded-none border-0 h-auto flex flex-col items-center space-y-1"
            asChild
          >
            <a href="https://instagram.com/YOUR_HANDLE">
              <Instagram className="h-5 w-5" />
              <span className="text-xs font-bold">Instagram</span>
            </a>
          </Button>

        </div>
      </div>
    </div>
  );
};
