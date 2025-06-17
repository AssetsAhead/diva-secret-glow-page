
import { Button } from "@/components/ui/button";

export const ProductShowcase = () => {
  return (
    <section id="product" className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1">
            <img 
              src="/lovable-uploads/31d847f2-6d21-4c6b-bf8f-34eabd0a5cc7.png"
              alt="Diva Secret Stem Cells Product"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>

          <div className="order-1 lg:order-2 text-white space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                Diva Secret
              </span>
              <br />
              Stem Cells
            </h2>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              Each sachet contains 3000mg of powerful stem cell activating compounds that:
            </p>
            
            <div className="space-y-4">
              {[
                "Restore damaged and dead cells",
                "Rejuvenate weak cells", 
                "Replicate good cells",
                "Replace bad cells",
                "Reproduce healthy cells",
                "Reactivate dead cells"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="text-xl font-bold mb-3 text-yellow-400">What's Inside:</h4>
              <p className="text-gray-200">
                11 sachets × 3000mg of premium stem cell activating formula. 
                Natural fruit flavors make it easy and enjoyable to take daily.
              </p>
            </div>

            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Order Your Box Today
            </Button>
            
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-6">
              The Power of Choice: <span className="text-yellow-400">You Are What You Eat!</span>
            </h3>
            <img 
              src="/lovable-uploads/bf270496-e8ec-49a0-b75a-14b7b7af74fb.png"
              alt="You are what you eat comparison"
              className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl"
            />
            <p className="text-xl text-gray-200 mt-6 max-w-3xl mx-auto">
              Your cells reflect what you feed them. Choose Diva Secret Stem Cells for optimal cellular nutrition and health.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
