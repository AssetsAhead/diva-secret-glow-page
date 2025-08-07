
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, Clock } from "lucide-react";
import { OrderModal } from "./OrderModal";

export const CTASection = () => {

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Start Your <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Transformation</span> Today
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            Join thousands who have already discovered the life-changing power of Diva Secret Stem Cells.
          </p>
          <div className="text-center">
            <p className="text-yellow-400 text-3xl font-bold mb-2">Starting from only R700</p>
            <p className="text-gray-300">Plus R120 delivery fee</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center text-white">
            <Shield className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Money-Back Guarantee</h3>
            <p className="text-gray-300">Try risk-free with our satisfaction guarantee</p>
          </div>
          <div className="text-center text-white">
            <Truck className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-300">Quick R120 delivery to your door</p>
          </div>
          <div className="text-center text-white">
            <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Fast Results</h3>
            <p className="text-gray-300">Feel the difference within days</p>
          </div>
        </div>

        <div className="text-center space-y-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <OrderModal>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                Order with PayFast Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </OrderModal>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-12 py-6 text-xl font-bold transition-all duration-300"
              asChild
            >
            <a href="https://wa.me/27679820321">
                💬 Chat on WhatsApp
              </a>
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Special Launch Offer</h3>
            <p className="text-gray-200 text-lg">
              🎉 Order now and get priority WhatsApp support for your health journey.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
