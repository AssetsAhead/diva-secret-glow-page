
import { Card, CardContent } from "@/components/ui/card";

export const BenefitsSection = () => {
  const benefits = [
    {
      title: "Restoring Sick Cells",
      description: "Revolutionary technology repairs damaged cellular structures",
      icon: "🔄"
    },
    {
      title: "Replicating Good Cells", 
      description: "Promotes healthy cell reproduction and multiplication",
      icon: "📈"
    },
    {
      title: "Replacing Dead Cells",
      description: "Removes damaged cells and replaces with healthy ones",
      icon: "♻️"
    },
    {
      title: "Rejuvenating Aged Cells",
      description: "Reverses cellular aging and restores youthful function",
      icon: "⚡"
    },
    {
      title: "Repairing Damage Cells",
      description: "Fixes cellular damage from toxins and free radicals",
      icon: "🛠️"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-flora-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Diva Secret <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Stem Cells</span> Work in 5 Ways
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our revolutionary stem cell technology addresses health at the cellular level, 
            providing comprehensive healing and regeneration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/lovable-uploads/2a89324b-e900-4ad2-b208-848ac69f5176.png"
                alt="The 5 ways stem cells work"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Science-Backed <span className="text-purple-600">Cellular Regeneration</span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Diva Secret Stem Cells contain powerful natural compounds that work at the cellular level 
                to restore your body's natural healing mechanisms. Experience improved energy, better sleep, 
                enhanced immunity, and overall wellness.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Natural ingredients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Clinically tested</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No side effects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Fast results</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-teal-600/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <img 
              src="/lovable-uploads/e4711cf3-9ca2-4957-ad6d-f30407c8913b.png"
              alt="Natural Relief from Kidney Stones with Stem Cells"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
