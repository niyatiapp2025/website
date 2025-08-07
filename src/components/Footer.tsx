import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-secondary to-accent text-foreground py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-3">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-cosmic animate-glow" />
              <span className="text-2xl font-bold">Niyati</span>
            </div>
            <p className="text-foreground/70 leading-relaxed mb-6 max-w-md">
              Your personal astrologer, available 24/7 to guide you through life's journey 
              with wisdom, compassion, and celestial insights.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-cosmic" />
                <span className="text-foreground/70">niyatiapp2025@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-cosmic" />
                <span className="text-foreground/70">Available 24/7</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-cosmic" />
                <span className="text-foreground/70">Online • India</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "Love and Relationships",
                "Marriage",
                "Career and Profession",
                "Education",
                "Daily Guidance",
                "Life Transitions"
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="text-foreground/60 hover:text-cosmic transition-colors duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>


        </div>

        {/* Bottom Section */}
        <div className="border-t border-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-sm mb-4 md:mb-0">
            © 2025 Niyati. All rights reserved. Guiding souls with celestial wisdom.
          </p>
          <div className="text-foreground/50 text-sm">
            <span>Made with cosmic love ✨</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;