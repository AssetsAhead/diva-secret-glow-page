
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        {/* Diva Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/31d847f2-6d21-4c6b-bf8f-34eabd0a5cc7.png" 
            alt="Diva Secret International" 
            className="h-20 w-auto md:h-24 lg:h-28 drop-shadow-2xl"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          <div className="space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
              <span className="text-sm font-medium">Trusted by thousands</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                Restore
              </span>
              <br />
              <span className="text-white">Your Health</span>
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Naturally
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
              Revolutionary stem cell technology that repairs, replaces, replicates, 
              restores, rejuvenates and reactivates your body's healing power.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Order with PayFast
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                See How It Works
              </Button>
            </div>
            
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-300 mb-2">Starting from only</p>
              <p className="text-3xl font-bold text-yellow-400">R700</p>
              <p className="text-sm text-gray-300">Free delivery over R820</p>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <img 
                src="/lovable-uploads/7cfeef5a-3fc6-4c21-97cd-b78326973647.png"
                alt="Happy healthy people"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-purple-900 rounded-full p-4 font-bold text-lg shadow-lg">
                ✨ New!
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
