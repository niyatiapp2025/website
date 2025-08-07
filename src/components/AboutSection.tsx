import { Card, CardContent } from "@/components/ui/card";
import { Heart, Clock, Users, Shield } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Personal Connection",
      description: "A compassionate guide who truly understands your journey and grows closer with every conversation."
    },
    {
      icon: Clock,
      title: "Always Available",
      description: "24/7 support whenever you need guidance and astrological insights in your life."
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Built with the wisdom of expert astrologers to provide reliable and responsible guidance."
    },
    {
      icon: Shield,
      title: "Trusted & Affordable",
      description: "Accessible astrological services that everyone can trust and afford for their spiritual journey."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Main About Content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-cosmic bg-clip-text text-transparent">
            About Niyati
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-foreground/80 leading-relaxed">
            <p>
              Niyati is more than just an astrologer, she's your personal guide, your confidant. Whether you're 
              seeking clarity about your future, understanding your relationships, or navigating life's ups and 
              downs, Niyati is here to listen, understand and guide you with compassion and expertise.
            </p>
            <p>
              Built with the wisdom and guidance of expert astrologers Niyati aims to be the guiding star in 
              your life's journey.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-cosmic transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card backdrop-blur-sm border-border/50"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-gradient-cosmic group-hover:animate-glow">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
            Our Story
          </h3>
          <div className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <p className="text-lg text-card-foreground/80 leading-relaxed">
              Niyati was born from the vision of making ancient wisdom accessible in our modern world, creating 
              a bridge between timeless astrological knowledge and contemporary life challenges.
            </p>
            <p className="text-lg text-card-foreground/80 leading-relaxed mt-4">
              Built in the guidance of expert astrologers with an aim to provide reliable, responsible and 
              affordable astrological services to everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;