import { Button } from "@/components/ui/button";
import { Star, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-light-cosmic.jpg";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HeroSection = () => {
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
      // Prepare email template parameters
      const templateParams = {
        to_email: 'niyatiapp2025@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        date_of_birth: formData.dateOfBirth,
        place_of_birth: formData.placeOfBirth,
        question: formData.question || 'Not provided',
        message: `
New Waitlist Registration:

Name: ${formData.name}
Date of Birth: ${formData.dateOfBirth}
Place of Birth: ${formData.placeOfBirth}
Email: ${formData.email}

Question: ${formData.question || 'Not provided'}
        `
      };

      // Send email using a simple form submission service
      try {
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
      } catch (emailError) {
        console.error('Email error:', emailError);
        // Fallback: just show success message even if email fails
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
      console.error('Error sending email:', error);
      alert("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20 md:pt-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Cosmic astrology background with stars and constellations"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      {/* Floating Stars Animation */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            <Star className="w-4 h-4 text-cosmic opacity-40" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-float">
          <Sparkles className="w-16 h-16 text-cosmic mx-auto mb-8 animate-glow" />
        </div>
        
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-cosmic bg-clip-text text-transparent leading-tight">
          Niyati
        </h1>
        
        <div className="text-xl md:text-2xl lg:text-3xl text-foreground/70 font-light mb-8 leading-relaxed">
          Your Personal AI Astrologer
        </div>
        
        <p className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed">
          Trained by expert astrologers to guide you through life's journey
        </p>
        
        <div className="flex justify-center items-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-cosmic hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsDialogOpen(true)}
          >
            Join Waitlist
          </Button>
        </div>
        
        <div className="mt-16 text-sm text-foreground/50">
          Available 24/7 • Whenever you need guidance
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

export default HeroSection;