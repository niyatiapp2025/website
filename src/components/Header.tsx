import { Button } from "@/components/ui/button";
import { Sparkles, Menu } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-cosmic animate-glow" />
          <span className="text-2xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            Niyati
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-foreground/80 hover:text-cosmic transition-colors duration-300 font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Button 
            className="bg-gradient-cosmic hover:shadow-glow transition-all duration-300"
            onClick={() => setIsDialogOpen(true)}
          >
            Join Waitlist
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border/50">
          <nav className="px-6 py-4 space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-foreground/80 hover:text-cosmic transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button 
              className="w-full mt-4 bg-gradient-cosmic"
              onClick={() => {
                setIsDialogOpen(true);
                setIsMenuOpen(false);
              }}
            >
              Join Waitlist
            </Button>
          </nav>
        </div>
      )}

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
    </header>
  );
};

export default Header;