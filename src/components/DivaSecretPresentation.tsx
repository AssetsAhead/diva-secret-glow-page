import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Heart, 
  Brain, 
  Droplets, 
  Shield, 
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Quote,
  Users,
  Activity,
  Bone,
  Apple,
  TreeDeciduous
} from "lucide-react";

export const DivaSecretPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroIngredients = [
    {
      name: "Swiss Apple Stem Cells",
      quote: "A Swiss alchemist's secret… turning back time at the cellular level.",
      benefit: "30% increase in skin elasticity + reduces glycation (diabetes-linked aging)",
      icon: <Apple className="w-8 h-8" />
    },
    {
      name: "Gotu Kola",
      quote: "The elephant's herb… for when your skin needs the memory of resilience.",
      benefit: "Accelerates wound healing by stimulating Type I collagen",
      icon: <Leaf className="w-8 h-8" />
    },
    {
      name: "Alpine Rose",
      quote: "Born in thin air… it teaches your cells to breathe under pressure.",
      benefit: "Lowers cortisol-induced inflammation (linked to hypertension)",
      icon: <Sparkles className="w-8 h-8" />
    },
    {
      name: "Tremella Mushroom",
      quote: "The jellyfish of the forest… a hydration miracle for skin and arteries alike.",
      benefit: "Improves microcirculation (key for heart health)",
      icon: <Droplets className="w-8 h-8" />
    },
    {
      name: "Lion's Mane",
      quote: "The brain's gardener… pruning decay, nurturing new connections.",
      benefit: "Human trials show 12% better recall in mild cognitive decline (2023)",
      icon: <Brain className="w-8 h-8" />
    }
  ];

  const lifestyleDiseases = [
    {
      title: "Diabetes (Type 2)",
      subtitle: "Blood Sugar Balance",
      points: [
        "Gotu Kola boosts insulin sensitivity (Study: J. Ethnopharmacology, 2023)",
        "Swiss Apple Extract reduces glycation (linked to diabetic skin aging)"
      ],
      icon: <Activity className="w-10 h-10" />,
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Hypertension",
      subtitle: "Heart & Vessel Protection",
      points: [
        "Alpine Rose strengthens endothelial function (improves blood flow)",
        "Tremella Mushroom reduces oxidized LDL (key for arterial health)"
      ],
      icon: <Heart className="w-10 h-10" />,
      color: "from-red-500 to-pink-400"
    },
    {
      title: "Arthritis",
      subtitle: "Joint & Inflammation Relief",
      points: [
        "Boswellia (Frankincense) Stem Cells block COX-2 enzymes – nature's ibuprofen",
        "\"Like oil for creaky hinges… soothing the fires of age.\""
      ],
      icon: <Bone className="w-10 h-10" />,
      color: "from-orange-500 to-amber-400"
    },
    {
      title: "Fatty Liver Disease",
      subtitle: "Detox Support",
      points: [
        "Phyllanthus Niruri (Chanca Piedra) Stem Cells – liver enzyme normalization",
        "\"A gentle broom… sweeping toxins from the body's hidden corners.\""
      ],
      icon: <Shield className="w-10 h-10" />,
      color: "from-green-500 to-emerald-400"
    },
    {
      title: "Neurodegeneration",
      subtitle: "Memory & Focus",
      points: [
        "Lion's Mane Mushroom Stem Cells – stimulates NGF (Nerve Growth Factor)",
        "\"Rebuilding the bridges of the mind… one cell at a time.\""
      ],
      icon: <Brain className="w-10 h-10" />,
      color: "from-purple-500 to-violet-400"
    }
  ];

  const targetMarket = [
    { group: "Aging Professionals", description: "Stress + metabolic wear", icon: <Users className="w-6 h-6" /> },
    { group: "Post-Menopausal Women", description: "Bone/joint + skin thinning", icon: <Heart className="w-6 h-6" /> },
    { group: "Recovering Patients", description: "Post-chemo, post-surgery healing", icon: <Shield className="w-6 h-6" /> },
    { group: "Biohackers & Longevity Seekers", description: "Preventive care", icon: <Sparkles className="w-6 h-6" /> }
  ];

  const slides = [
    // Slide 0: Title
    {
      id: "title",
      content: (
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium">
            <TreeDeciduous className="w-4 h-4" />
            Nature's Answer to Aging & Disease
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Diva Secret <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Stem Cells</span>
          </h3>
          <p className="text-xl text-gray-200 italic max-w-2xl mx-auto">
            "Where Science Meets the Soul of the Earth"
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/30 to-pink-500/30 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-yellow-400" />
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400/30 to-emerald-500/30 flex items-center justify-center">
              <Leaf className="w-10 h-10 text-green-400" />
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-500/30 flex items-center justify-center">
              <Heart className="w-10 h-10 text-blue-400" />
            </div>
          </div>
        </div>
      )
    },
    // Slide 1: Power of Plant Stem Cells
    {
      id: "power",
      content: (
        <div className="space-y-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center">
            The Power of <span className="text-yellow-400">Plant Stem Cells</span>
          </h3>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <p className="text-xl text-gray-200 italic leading-relaxed">
                "The earth's oldest healers… hidden in roots, leaves, and bark… now unlocked for you."
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-green-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white">2024 Research</h4>
                </div>
                <p className="text-gray-200">
                  Plant stem cells <strong className="text-yellow-400">activate human stem cell regeneration</strong> (Nat. Journal of Plant Science)
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white">No Side Effects</h4>
                </div>
                <p className="text-gray-200">
                  vs. synthetic drugs – <strong className="text-yellow-400">bio-compatible, non-GMO, and sustainable</strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    // Slide 2: 5 Lifestyle Diseases
    {
      id: "diseases",
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Healing Beyond Beauty – <span className="text-yellow-400">5 Lifestyle Diseases</span>
            </h3>
            <p className="text-lg text-gray-200 italic max-w-3xl mx-auto">
              "These tiny giants don't just smooth wrinkles… they stand guard against the silent storms within."
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lifestyleDiseases.map((disease, index) => (
              <Card key={index} className="bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-5">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${disease.color} flex items-center justify-center mb-4 text-white`}>
                    {disease.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{disease.title}</h4>
                  <p className="text-sm text-yellow-400 mb-3">{disease.subtitle}</p>
                  <ul className="space-y-2">
                    {disease.points.map((point, i) => (
                      <li key={i} className="text-sm text-gray-200 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    // Slide 3: Hero Ingredients
    {
      id: "ingredients",
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The 5 Hero <span className="text-yellow-400">Ingredients</span>
            </h3>
            <p className="text-lg text-gray-200 italic">
              "Let us now meet the quiet guardians of your vitality…"
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroIngredients.map((ingredient, index) => (
              <Card key={index} className="bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center mb-4 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                    {ingredient.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{ingredient.name}</h4>
                  <p className="text-sm text-gray-300 italic mb-4 min-h-[3rem]">"{ingredient.quote}"</p>
                  <div className="bg-yellow-400/10 rounded-lg p-3">
                    <p className="text-sm text-yellow-400 font-medium">{ingredient.benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    // Slide 4: Target Market
    {
      id: "market",
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Who <span className="text-yellow-400">Needs This?</span>
            </h3>
            <p className="text-lg text-gray-200 italic">
              "Not just for the vain… but for the wise."
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {targetMarket.map((market, index) => (
              <Card key={index} className="bg-white/10 border-white/20">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400/20 to-pink-500/20 flex items-center justify-center text-yellow-400">
                    {market.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{market.group}</h4>
                    <p className="text-gray-200">{market.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    // Slide 5: The Science
    {
      id: "science",
      content: (
        <div className="space-y-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center">
            The Science – <span className="text-yellow-400">Why It Works</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Epigenetic Modulation</h4>
                <p className="text-gray-200">
                  Plant RNAs <strong className="text-yellow-400">"train" human cells</strong> to resist disease (Frontiers in Genetics, 2024)
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Phyto-Hormones</h4>
                <p className="text-gray-200">
                  Mimic human growth factors <strong className="text-yellow-400">without synthetic risks</strong>
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <p className="text-xl text-gray-200 italic leading-relaxed">
                "Nature's pharmacy needs no patent… only respect."
              </p>
            </div>
          </div>
        </div>
      )
    },
    // Slide 6: Call to Action
    {
      id: "cta",
      content: (
        <div className="text-center space-y-8">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 max-w-3xl mx-auto">
            <Quote className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
            <p className="text-2xl text-gray-200 italic leading-relaxed">
              "The body remembers how to heal… sometimes, it just needs a reminder."
            </p>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            Try Our <span className="text-yellow-400">90-Day Wellness Reset</span>
          </h3>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Skin + Bloodwork Tracking – For Those Who Demand More Than a Cream… This is <strong className="text-yellow-400">Cellular Revival</strong>.
          </p>
          <div className="bg-gradient-to-r from-yellow-400/10 to-pink-500/10 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-lg text-gray-200 italic">
              "High blood pressure… diabetes… aching joints… we call them 'diseases,' but nature calls them 'imbalance.' And balance… is her specialty."
            </p>
          </div>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Order Your Box Today
          </Button>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="presentation" className="py-20 bg-flora-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Learn More About <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Our Product</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Discover the science, ingredients, and transformative power of Diva Secret Stem Cells
          </p>
        </div>

        {/* Presentation Container */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
          
          {/* Slide Content */}
          <div className="p-8 md:p-12 min-h-[600px] flex items-center justify-center">
            <div className="w-full animate-fade-in" key={currentSlide}>
              {slides[currentSlide].content}
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white/5 border-t border-white/10 p-4 flex items-center justify-between">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </Button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-yellow-400 w-8' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={nextSlide}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};
