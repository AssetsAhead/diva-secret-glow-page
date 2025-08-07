
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { OrderModal } from "./OrderModal";
import { OpportunitySignup } from "./OpportunitySignup";

export const PricingSection = () => {
  const handleOrderClick = (packageName: string) => {
    // Redirect to WhatsApp for orders instead of PayFast for now
    console.log(`Ordering ${packageName} package - redirecting to WhatsApp`);
    window.open(`https://wa.me/27679820321?text=Hi!%20I%20want%20to%20order%20the%20${packageName}%20package`, "_blank");
  };

  const packages = [
    {
      name: "Starter",
      price: "R700",
      priceWithDelivery: "R820",
      boxes: "1 Mini Box",
      pv: "22.5PV",
      description: "Try before you commit. Ideal for first-timers.",
      icon: "🧪",
      features: [
        "1 Mini Box",
        "22.5 Point Value",
        "Money-back guarantee",
        "WhatsApp support"
      ],
      popular: false
    },
    {
      name: "Bronze",
      price: "R1300",
      priceWithDelivery: "R1420",
      boxes: "2 Mini Boxes",
      pv: "45PV",
      description: "Great for couples or shared use.",
      icon: "👥",
      features: [
        "2 Mini Boxes",
        "45 Point Value",
        "Money-back guarantee",
        "WhatsApp support",
        "Bulk savings"
      ],
      popular: false
    },
    {
      name: "Silver",
      price: "R2400",
      priceWithDelivery: "R2520",
      boxes: "4 Mini Boxes",
      pv: "90PV",
      description: "Family or chronic care option.",
      icon: "🌿",
      features: [
        "4 Mini Boxes",
        "90 Point Value",
        "Money-back guarantee",
        "Priority WhatsApp support",
        "Bulk savings",
        "Family wellness plan"
      ],
      popular: true
    },
    {
      name: "Gold",
      price: "R9600",
      priceWithDelivery: "R9720",
      boxes: "16 Mini Boxes",
      pv: "360PV",
      description: "For consistent users or wellness enthusiasts.",
      icon: "💼",
      features: [
        "16 Mini Boxes",
        "360 Point Value",
        "Money-back guarantee",
        "Priority support",
        "Maximum bulk savings",
        "Wellness consultation"
      ],
      popular: false
    },
    {
      name: "Diamond",
      price: "R24000",
      priceWithDelivery: "R24120",
      boxes: "40 Mini Boxes",
      pv: "900PV",
      description: "Designed for community impact and business builders.",
      icon: "💎",
      features: [
        "40 Mini Boxes",
        "900 Point Value",
        "Money-back guarantee",
        "VIP support",
        "Best value per sachet",
        "Business opportunity info"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Diva Secret Box</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Start your wellness journey with any package. All include our money-back guarantee.
          </p>
          <div className="bg-orange-500 text-white px-6 py-3 rounded-full inline-block font-bold text-lg">
            📦 Delivery: R120 (added to all orders)
          </div>
        </div>

        <div className="mb-12 text-center">
          <img 
            src="/lovable-uploads/d1d3b786-c3c4-4957-ad6d-f30407c8913b.png"
            alt="Diva Secret Price List"
            className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {packages.map((pkg, index) => (
            <Card key={index} className={`relative hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-xl overflow-hidden ${pkg.popular ? 'ring-4 ring-yellow-400 scale-105' : ''}`}>
              
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-center py-2 font-bold text-sm">
                  <Star className="inline h-4 w-4 mr-1" />
                  MOST POPULAR
                </div>
              )}

              <CardContent className={`p-6 text-center ${pkg.popular ? 'pt-12' : ''}`}>
                <div className="text-4xl mb-4">{pkg.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{pkg.description}</p>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{pkg.price}</div>
                  <div className="text-sm text-gray-500">Excl. Delivery</div>
                  <div className="text-lg font-semibold text-gray-700">{pkg.priceWithDelivery}</div>
                  <div className="text-sm text-gray-500">Incl. Delivery</div>
                  <div className="text-lg font-medium text-purple-600 mt-2">{pkg.boxes}</div>
                </div>

                <ul className="space-y-2 mb-6 text-sm text-left">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <OrderModal>
                  <Button className={`w-full font-bold py-3 transition-all duration-300 ${
                    pkg.popular 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black shadow-lg hover:shadow-xl' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                  }`}>
                    Order Now
                  </Button>
                </OrderModal>
                
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              💡 Loved Diva Secret? <span className="text-yellow-400">You can also share it — and earn.</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Join our wellness community and discover how sharing Diva Secret can create 
              additional income while helping others achieve better health.
            </p>
            <OpportunitySignup>
              <Button 
                variant="outline" 
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold px-8 py-3 mb-6"
              >
                Learn About Business Opportunity
              </Button>
            </OpportunitySignup>
            
            <div className="text-left text-gray-300 space-y-4">
              <p>
                I want to take a moment to talk about something important – your wealth and the health of those you love. Diva Secret Stem Cells isn't just a product; it's a lifeline for so many people suffering from pain, aging, and health challenges.
              </p>
              <p>
                But here's the thing: to help others, you need a way to reach them. That's where your personal capture page comes in. It's your gateway to sales, leads, and success. Without it, you're leaving money on the table.
              </p>
              <p>
                A customisable capture page is your #1 tool for generating leads and sales effortlessly. On its own, creating a professional capture page like this would cost you hundreds, if not thousands, of Rands. But here's the kicker: when you join at the Starter Membership for just ZAR 1500, you get it included! Did you know there are businesses out there struggling because they don't have a capture page or website? Don't let that be you. With Diva Secret, you get everything you need to thrive.
              </p>
              <p className="text-yellow-400 font-bold">
                👉 Get Your Capture Page & Start Helping Others Today.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
