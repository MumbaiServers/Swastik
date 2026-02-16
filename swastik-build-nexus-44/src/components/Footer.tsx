import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import swastikLogo from "@/assets/swastik-logo.png";

const Footer = () => {
  const quickLinks = [
    {
      title: "1 BHK Flats",
      locations: ["Ghatkopar", "Mulund", "Chembur", "Vikhroli"]
    },
    {
      title: "2 BHK Flats",
      locations: ["Ghatkopar", "Mulund", "Chembur", "Vikhroli"]
    },
    {
      title: "3 BHK Flats",
      locations: ["Ghatkopar", "Mulund", "Chembur", "Vikhroli"]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-brand-navy text-white">
      {/* Contact CTA Section - Compact */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto projects-scroll snap-x snap-mandatory pb-2">
            {/* Phone */}
            <div className="text-center group min-w-[240px] sm:min-w-0 snap-center">
              <Button
                variant="ghost"
                size="sm"
                className="w-full h-auto flex-col space-y-2 p-4 bg-white/5 hover:bg-brand-blue/20 border border-white/10 rounded-lg transition-all duration-300"
              >
                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">+91-22-6589 0000</p>
                  <p className="text-xs text-white/70">Give Us A Call</p>
                </div>
              </Button>
            </div>

            {/* Email */}
            <div className="text-center group min-w-[240px] sm:min-w-0 snap-center">
              <Button
                variant="ghost"
                size="sm"
                className="w-full h-auto flex-col space-y-2 p-4 bg-white/5 hover:bg-brand-blue/20 border border-white/10 rounded-lg transition-all duration-300"
              >
                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">sales@swastikgroup.in</p>
                  <p className="text-xs text-white/70">Drop Us A Line</p>
                </div>
              </Button>
            </div>

            {/* Enquiry */}
            <div className="text-center group min-w-[240px] sm:min-w-0 snap-center">
              <Button
                variant="ghost"
                size="sm"
                className="w-full h-auto flex-col space-y-2 p-4 bg-white/5 hover:bg-brand-blue/20 border border-white/10 rounded-lg transition-all duration-300"
              >
                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Enquiry Now</p>
                  <p className="text-xs text-white/70">Click to Connect Instantly</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content - Compact */}
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto projects-scroll snap-x snap-mandatory pb-4">
          {/* Company Info */}
          <div className="space-y-4 min-w-[280px] md:min-w-0 snap-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <img src={swastikLogo} alt="Swastik Group" className="h-8 w-auto filter brightness-0 invert" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Corporate Office</h3>
                <p className="text-xs text-white/60">Over 25 years of trust & excellence</p>
              </div>
            </div>
            <div className="space-y-1 text-white/80 text-sm leading-relaxed">
              <p className="font-semibold text-white text-xs">SWASTIK BUILDERS AND DEVELOPERS LLP</p>
              <p className="text-xs">312, Swastik DSK Corporate Park 6A,</p>
              <p className="text-xs">Mingra Opp. Shreeyes Cinema,</p>
              <p className="text-xs">Ghatkopar West, Mumbai 400086, INDIA</p>
            </div>
          </div>

          {/* Quick Links - Compact */}
          <div className="space-y-4 min-w-[280px] md:min-w-0 snap-center">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <div className="grid grid-cols-3 gap-4">
              {quickLinks.map((section, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-sm font-semibold text-white">{section.title}</h4>
                  <div className="space-y-1">
                    {section.locations.map((location) => (
                      <a
                        key={location}
                        href={`#${location.toLowerCase()}`}
                        className="block text-white/70 hover:text-brand-light-blue transition-colors text-xs"
                      >
                        {location}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4 min-w-[280px] md:min-w-0 snap-center">
            <h3 className="text-lg font-bold text-white">Follow Us</h3>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-blue transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-xs text-white/60 italic">
                Premium real estate across Mumbai and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright - Compact */}
        <div className="border-t border-white/10 mt-6 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-xs text-white/60">
            <p>Copyright 2025 | All Rights Reserved By Swastik Group</p>
            <div className="flex items-center space-x-4">
              <span>Developed by Signature Advertising</span>
              <a href="#privacy" className="hover:text-brand-light-blue transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;