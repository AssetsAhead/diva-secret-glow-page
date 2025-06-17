
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

export const VideoSection = () => {
  const videos = [
    {
      title: "Diva Secret Presentation",
      description: "Learn how Diva Secret Stem Cells can transform your health",
      thumbnail: "/lovable-uploads/f8b83d5b-cb3a-406d-892a-42aa8873682a.png"
    },
    {
      title: "Real People, Real Results",
      description: "Hear success stories from our community",
      thumbnail: "/lovable-uploads/4e4aa965-0fba-4de1-8b77-6c3c3dcf3ce0.png"
    },
    {
      title: "The Science Behind Stem Cells",
      description: "Understanding how stem cell therapy works",
      thumbnail: "/lovable-uploads/9011eb3e-279d-4abc-af35-373fb7198cd0.png"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See The <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Transformation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch real stories and scientific explanations behind Diva Secret Stem Cells.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <Card key={index} className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 group-hover:bg-white transition-colors duration-300">
                    <Play className="h-8 w-8 text-purple-600 ml-1" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                <p className="text-gray-600">{video.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            <strong>Note:</strong> To add your videos, please upload the MP4 files: 
            Diva Presentation.mp4, Diva Secret Cell_Dialogue_Pippit.mp4, and Diva Secret Cell_EMPOWERED.mp4
          </p>
          <p className="text-sm text-gray-500">
            If video upload fails, please convert to a web-compatible format and try again.
          </p>
        </div>

      </div>
    </section>
  );
};
