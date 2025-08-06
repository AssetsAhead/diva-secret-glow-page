import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Heart, Brain, Dna, Microscope } from "lucide-react";

export const StemCellEducation = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const stemCellTypes = [
    {
      title: "Embryonic Stem Cells",
      description: "Present during embryonic development, these powerful cells can develop into any type of organ or tissue in the body.",
      icon: <Dna className="w-6 h-6" />
    },
    {
      title: "Adult Stem Cells", 
      description: "Maintain body balance throughout adulthood by regenerating and supplying specific cells to developed organs.",
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "Pluripotent Stem Cells",
      description: "Can differentiate into multiple cell types, offering tremendous therapeutic potential for regenerative medicine.",
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Multipotent Stem Cells",
      description: "Specialized in developing specific types of cells, particularly blood cells including red and white blood cells.",
      icon: <Microscope className="w-6 h-6" />
    }
  ];

  const benefits = [
    "Tissue Regeneration & Repair",
    "Treatment of Blood Diseases", 
    "Brain Disease Treatment",
    "Development of Blood Vessels",
    "Regenerative Medicine Applications",
    "Medical Testing & Research"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Understanding <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Stem Cells</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Discover the science behind cellular regeneration and why stem cells are revolutionizing modern medicine
          </p>
        </div>

        {/* What Are Stem Cells */}
        <div className="mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              What Are <span className="text-yellow-400">Stem Cells?</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-200 leading-relaxed mb-6">
                  Stem cells are special unspecialized cells in the human body that serve as the body's repair system. 
                  Unlike other cells that have specific functions, stem cells can:
                </p>
                <div className="space-y-3">
                  {[
                    "Renew themselves through cell division",
                    "Transform into specialized cells (liver, kidney, blood cells)",
                    "Replace old, damaged, or dying cells",
                    "Maintain cellular balance throughout the body",
                    "Activate organs by supplying fresh cells"
                  ].map((point, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-200">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-400/20 to-pink-500/20 rounded-2xl p-8 text-center">
                <Dna className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-3">The Body's Factory</h4>
                <p className="text-gray-200">
                  Stem cells act as the body's manufacturing center, constantly producing new cells to replace damaged ones and maintain optimal health.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Types of Stem Cells */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Types of <span className="text-yellow-400">Stem Cells</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stemCellTypes.map((type, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-yellow-400 mb-4">
                  {type.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{type.title}</h4>
                <p className="text-gray-200 text-sm leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="mb-16 space-y-4">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Deep Dive into <span className="text-yellow-400">Stem Cell Science</span>
          </h3>
          
          {/* Properties Section */}
          <Collapsible open={openSections.properties} onOpenChange={() => toggleSection('properties')}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 p-6 text-left justify-between"
              >
                <span className="text-lg font-semibold">Properties of Stem Cells</span>
                {openSections.properties ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-b-xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-4">Key Characteristics:</h4>
                  <ul className="space-y-3 text-gray-200">
                    <li>• Always remain unspecialized cells</li>
                    <li>• Can renew themselves through division</li>
                    <li>• Modify into specific cell types as needed</li>
                    <li>• Maintain cellular balance in the body</li>
                    <li>• Replace old, dying, or damaged cells</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-white mb-3">Why This Matters</h4>
                  <p className="text-gray-200">
                    These unique properties make stem cells the foundation of regenerative medicine and cellular repair throughout our lives.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Functions Section */}
          <Collapsible open={openSections.functions} onOpenChange={() => toggleSection('functions')}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 p-6 text-left justify-between"
              >
                <span className="text-lg font-semibold">Functions & Medical Applications</span>
                {openSections.functions ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-b-xl p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-gray-200 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-lg text-gray-200 max-w-3xl mx-auto">
                  From treating blood diseases to regenerating damaged brain cells, stem cell therapy represents 
                  the future of personalized medicine and organ repair.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Therapy Section */}
          <Collapsible open={openSections.therapy} onOpenChange={() => toggleSection('therapy')}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 p-6 text-left justify-between"
              >
                <span className="text-lg font-semibold">Stem Cell Therapy & Regenerative Medicine</span>
                {openSections.therapy ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-b-xl p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-4">How It Works:</h4>
                  <div className="space-y-4 text-gray-200">
                    <p>
                      Stem cell therapy, also known as regenerative medicine, works by introducing healthy stem cells 
                      into damaged areas of the body where they can:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li>• Replace damaged or diseased cells</li>
                      <li>• Stimulate the body's natural healing response</li>
                      <li>• Reduce inflammation and promote tissue repair</li>
                      <li>• Restore normal function to affected organs</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-4">Current Applications:</h4>
                  <div className="space-y-3 text-gray-200">
                    <div className="bg-white/10 rounded-lg p-3">
                      <strong>Blood Disorders:</strong> Treatment of leukemia, lymphoma, and other blood cancers
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <strong>Neurological Conditions:</strong> Research into Parkinson's and Alzheimer's disease
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <strong>Cardiovascular Disease:</strong> Repairing damaged heart tissue and blood vessels
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <strong>Organ Regeneration:</strong> Liver, kidney, and skin tissue repair
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Frequently Asked <span className="text-yellow-400">Questions</span>
          </h3>
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-6">
              <h4 className="text-lg font-bold text-yellow-400 mb-3">Q: What are Stem Cells?</h4>
              <p className="text-gray-200">
                <strong>A:</strong> Stem cells are special nonfunctional cells in the human body that can develop by dividing 
                or transform into specific cells with specialized tasks to maintain optimal body function.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h4 className="text-lg font-bold text-yellow-400 mb-3">Q: When does most organ development occur using stem cells?</h4>
              <p className="text-gray-200">
                <strong>A:</strong> In the early embryonic stage of human life, most body organ development takes place using stem cells. 
                At this time, the number of stem cells is much higher than in adult life, making this the most critical period for development.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Support Your Body's <span className="text-yellow-400">Natural Regeneration?</span>
          </h3>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Diva Secret Stem Cells provides the nutritional support your body needs to optimize its natural cellular repair processes.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Learn More About Our Product
          </Button>
        </div>

      </div>
    </section>
  );
};