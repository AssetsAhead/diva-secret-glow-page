
import { Card, CardContent } from "@/components/ui/card";

export const VideoSection = () => {
  const images = [
    {
      title: "Diva Secret Stem Cells",
      description: "Revolutionary stem cell technology for natural healing",
      image: "/lovable-uploads/cd38486d-ec02-4791-8619-6b8d57e5857b.png"
    },
    {
      title: "Transform Your Health",
      description: "Experience the power of cellular regeneration",
      image: "/lovable-uploads/969859d4-026e-4541-9759-d8df0b375b3a.png"
    },
    {
      title: "Natural Wellness Solutions",
      description: "Repair, restore, and rejuvenate at the cellular level",
      image: "/lovable-uploads/31d847f2-6d21-4c6b-bf8f-34eabd0a5cc7.png"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See The <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Transformation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the revolutionary power of Diva Secret Stem Cells through our product showcase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((item, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
