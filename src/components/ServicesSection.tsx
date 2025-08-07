import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Stars, Gem, Heart, Diamond, Briefcase, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ServicesSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    placeOfBirth: "",
    email: "",
    question: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.dateOfBirth || !formData.placeOfBirth || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Validate date format (dd-mm-yyyy)
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(formData.dateOfBirth)) {
      alert("Please enter date of birth in dd-mm-yyyy format");
      return;
    }

    try {
      // Send email using Formspree
      const response = await fetch('https://formspree.io/f/xanblnkn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          dateOfBirth: formData.dateOfBirth,
          placeOfBirth: formData.placeOfBirth,
          question: formData.question,
          subject: 'New Niyati Waitlist Registration',
          message: `
New Waitlist Registration:

Name: ${formData.name}
Date of Birth: ${formData.dateOfBirth}
Place of Birth: ${formData.placeOfBirth}
Email: ${formData.email}

Question: ${formData.question || 'Not provided'}
          `
        })
      });

      if (response.ok) {
        console.log('Email sent successfully!');
      } else {
        console.error('Email sending failed');
      }
      
      setIsSubmitted(true);
      setIsDialogOpen(false);
      
      // Reset form
      setFormData({
        name: "",
        dateOfBirth: "",
        placeOfBirth: "",
        email: "",
        question: ""
      });
    } catch (error) {
      console.error('Email error:', error);
      alert("There was an error submitting your form. Please try again.");
    }
  };

  const services = [
    {
      icon: Heart,
      title: "Love & Relationships",
      description: "Navigate the complexities of love and relationships with astrological insights and guidance.",
      features: ["Relationship timing", "Emotional healing", "Romantic compatibility", "Communication patterns"]
    },
    {
      icon: Diamond,
      title: "Marriage",
      description: "Get comprehensive guidance for marriage decisions, timing, and compatibility analysis.",
      features: ["Marriage timing", "Partner compatibility", "Marital harmony", "Communication in Relationships"]
    },
    {
      icon: Briefcase,
      title: "Career and Profession",
      description: "Navigate career path and professional growth opportunities through astrological guidance.",
      features: ["Career choices", "Professional timing", "Workplace Relationships", "Career Growth"]
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Get guidance on educational choices, learning styles, and academic success through astrology.",
      features: ["Study timing", "Higher Education", "Subject choices", "Academic success"]
    },
  /*{
      icon: Sun,
      title: "Birth Chart Reading",
      description: "Discover your life's purpose and potential through a comprehensive analysis of your natal chart.",
      features: ["Personality insights", "Life path guidance", "Strengths & challenges", "Career direction"]
    }, */
    {
      icon: Moon,
      title: "Daily Guidance",
      description: "Receive personalized daily insights and cosmic guidance tailored to your unique astrological profile.",
      features: ["Daily horoscope", "Moon phase guidance", "Lucky colors & numbers", "Best times for decisions"]
    },
  /*{
      icon: Stars,
      title: "Relationship Compatibility",
      description: "Understand your relationships better through astrological compatibility analysis and guidance.",
      features: ["Love compatibility", "Friendship dynamics", "Family relationships", "Communication tips"]
    },*/
    {
      icon: Gem,
      title: "Life Transitions",
      description: "Navigate major life changes with astrological wisdom and personalized spiritual guidance.",
      features: ["Life Changes", "Moving & relocation", "Wealth insights", "Spiritual growth"]
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-cosmic bg-clip-text text-transparent">
            Guidance & Services
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Explore the various ways Niyati can guide and support you on your spiritual journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-cosmic transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card backdrop-blur-sm border-border/50"
            >
              <CardHeader className="text-center pb-4">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-full bg-gradient-cosmic group-hover:animate-glow">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <CardTitle className="text-xl text-card-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-sm text-card-foreground/80 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-cosmic rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="border-cosmic/50 text-cosmic hover:bg-cosmic/10 hover:border-cosmic"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-cosmic rounded-2xl p-12 text-primary-foreground">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Begin Your Journey?
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Connect with Niyati today and start receiving personalized astrological guidance 
            that understands your unique path and supports your spiritual growth.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-6 bg-primary-foreground text-cosmic hover:bg-primary-foreground/90 transform hover:scale-105 transition-all duration-300"
            onClick={() => setIsDialogOpen(true)}
          >
            Join Waitlist
          </Button>
        </div>
      </div>

      {/* Waitlist Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-center bg-gradient-cosmic bg-clip-text text-transparent">
              Join Our Waitlist
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                className="h-10"
                required
              />
            </div>

            {/* Date of Birth and Place of Birth in same row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="dateOfBirth" className="text-sm font-medium">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  placeholder="dd-mm-yyyy"
                  className="h-10"
                  required
                />
              </div>
              <div>
                <Label htmlFor="placeOfBirth" className="text-sm font-medium">
                  Place of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                  placeholder="Enter your place of birth"
                  className="h-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                className="h-10"
                required
              />
            </div>

            {/* Question */}
            <div>
              <Label htmlFor="question" className="text-sm font-medium">
                Question (Optional)
              </Label>
              <p className="text-xs text-muted-foreground mb-2">
                Questions that you would want Niyati to answer once it's live
              </p>
              <Textarea
                id="question"
                value={formData.question}
                onChange={(e) => handleInputChange("question", e.target.value)}
                placeholder="Ask us anything..."
                rows={3}
                className="min-h-[80px]"
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-cosmic h-10">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Message Dialog */}
      <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <DialogContent className="max-w-md mx-auto text-center">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-center bg-gradient-cosmic bg-clip-text text-transparent">
              Thank You!
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-base md:text-lg">
              Thank you for joining the waitlist. We will notify you as soon as we launch.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-cosmic h-10"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;