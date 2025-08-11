import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { OrderModal } from "./OrderModal";
import heroBg from "@/assets/bg-plants.jpg";
export const HeroSection = () => {
  return <section className="relative min-h-screen text-white overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        
        {/* Diva Logo - Much Larger */}
        <div className="flex justify-center mb-12 rounded-full">
          <img src="/lovable-uploads/969859d4-026e-4541-9759-d8df0b375b3a.png" alt="Diva Secret International" className="w-full max-w-2xl md:max-w-4xl lg:max-w-5xl h-32 md:h-48 lg:h-64 object-contain drop-shadow-2xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          <div className="space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              <span className="text-sm font-medium">Trusted by millions worldwide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent">
                Restore
              </span>
              <br />
              <span className="text-white">Your Health</span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Naturally
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
              Revolutionary stem cell technology that repairs, replaces, replicates, 
              restores, rejuvenates and reactivates your body's healing power.
            </p>
            
              <OrderModal>
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Order with PayFast
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </OrderModal>
            
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-200 mb-2">Starting from only</p>
              <p className="text-3xl font-bold text-orange-400">R700</p>
              <p className="text-sm text-gray-200">Plus R120 delivery fee</p>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <img src="/lovable-uploads/cd38486d-ec02-4791-8619-6b8d57e5857b.png" alt="Diva Secret Stem Cells - Elevate wellness, immune booster, energy booster" loading="lazy" decoding="async" className="rounded-2xl shadow-2xl w-full h-auto object-cover" />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-lime-400 text-black rounded-full p-4 font-bold text-lg shadow-lg">
                ✨ New!
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>;
};