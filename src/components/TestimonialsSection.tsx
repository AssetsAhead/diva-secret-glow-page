
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      location: "Cape Town",
      rating: 5,
      text: "After 3 weeks of taking Diva Secret, my energy levels have completely transformed. I feel 10 years younger!",
      condition: "Chronic fatigue"
    },
    {
      name: "John D.", 
      location: "Johannesburg",
      rating: 5,
      text: "My diabetes management has improved significantly. My doctor is amazed at my latest blood work results.",
      condition: "Diabetes management"
    },
    {
      name: "Maria L.",
      location: "Durban", 
      rating: 5,
      text: "The joint pain that plagued me for years is almost completely gone. I can play with my grandchildren again!",
      condition: "Arthritis relief"
    },
    {
      name: "David K.",
      location: "Pretoria",
      rating: 5,
      text: "Better sleep, more energy, and my skin looks amazing. Diva Secret has been life-changing for our whole family.",
      condition: "Overall wellness"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real People, <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Real Results</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of South Africans who have transformed their health with Diva Secret Stem Cells.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <Quote className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900">{testimonial.name}</p>
                          <p className="text-gray-600">{testimonial.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-purple-600 font-medium">{testimonial.condition}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Join Our Success Stories</h3>
            <p className="text-lg text-purple-100 mb-6">
              Start your transformation today and become our next success story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold">
                📞 WhatsApp: 067 982 0321
              </div>
              <div className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold">
                🌐 Visit: Divabyfay.com
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
