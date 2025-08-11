import { Button } from "@/components/ui/button";
import { OrderModal } from "./OrderModal";
import blueberriesImg from "@/assets/fruit-blueberries.jpg";
import citrusImg from "@/assets/fruit-citrus.jpg";
import kaleImg from "@/assets/greens-kale.jpg";
import aloeImg from "@/assets/plant-aloe.jpg";

export const ProductShowcase = () => {
  return (
    <section id="product" className="py-20 bg-flora-strong">
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
              <p className="text-gray-200 mb-4">
                11 sachets × 3000mg of premium stem cell activating formula. 
                Natural fruit flavors make it easy and enjoyable to take daily.
              </p>
              <img 
                src="/lovable-uploads/ea48f368-733d-452c-a05b-562a5582ffe8.png"
                alt="Diva Secret Stem Cells Ingredients"
                className="w-full rounded-xl"
                loading="lazy"
                decoding="async"
              />
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <img src={blueberriesImg} alt="Blueberries rich in antioxidants" className="rounded-xl w-full h-24 object-cover" loading="lazy" decoding="async" />
                  <p className="text-xs text-gray-200 mt-2">Blueberries</p>
                </div>
                <div className="text-center">
                  <img src={citrusImg} alt="Citrus providing natural vitamin C" className="rounded-xl w-full h-24 object-cover" loading="lazy" decoding="async" />
                  <p className="text-xs text-gray-200 mt-2">Citrus</p>
                </div>
                <div className="text-center">
                  <img src={kaleImg} alt="Leafy greens packed with phytonutrients" className="rounded-xl w-full h-24 object-cover" loading="lazy" decoding="async" />
                  <p className="text-xs text-gray-200 mt-2">Leafy Greens</p>
                </div>
                <div className="text-center">
                  <img src={aloeImg} alt="Aloe vera soothing botanical" className="rounded-xl w-full h-24 object-cover" loading="lazy" decoding="async" />
                  <p className="text-xs text-gray-200 mt-2">Aloe</p>
                </div>
              </div>
            </div>

            <OrderModal>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Order Your Box Today
              </Button>
            </OrderModal>
            
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">
              How <span className="text-yellow-400">Stem Cells Work</span>
            </h3>
            <img 
              src="/lovable-uploads/0861c591-6857-4983-a1ff-17d9738c4dba.png"
              alt="How stem cells work in the body"
              className="w-full rounded-2xl shadow-2xl"
            />
            <p className="text-lg text-gray-200 mt-4">
              Diva Secret Stem Cells target and regenerate cells throughout your body for optimal health.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">
              Real Product, Real <span className="text-yellow-400">Results</span>
            </h3>
            <img 
              src="/lovable-uploads/455bcc95-970c-4301-9d15-88f6a7120f79.png"
              alt="Diva Secret product sachets"
              className="w-full rounded-2xl shadow-2xl"
            />
            <p className="text-lg text-gray-200 mt-4">
              Each box contains 11 individually sealed sachets for maximum freshness and potency.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
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
