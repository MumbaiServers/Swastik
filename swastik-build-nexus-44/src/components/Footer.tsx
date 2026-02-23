import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, Instagram, Facebook, Linkedin, Youtube, Loader2 } from "lucide-react";
import swastikLogo from "@/assets/swastik-logo.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";
import { sectionsApi } from "@/services/cmsApi";

const Footer = () => {
  const [loading, setLoading] = useState(true);
  const [footerData, setFooterData] = useState({
    corporateName: 'SWASTIK BUILDERS AND DEVELOPERS LLP',
    addressLine1: '312, Swastik DSK Corporate Park 6A,',
    addressLine2: 'Mingra Opp. Shreeyes Cinema,',
    addressLine3: 'Ghatkopar West, Mumbai 400086, INDIA',
    phone: '+91-22-6589 0000',
    email: 'sales@swastikgroup.in',
    copyright: 'Copyright 2025 | All Rights Reserved By Swastik Group',
    developer: 'Developed by Signature Advertising',
    instagram: '',
    facebook: '',
    linkedin: '',
    youtube: ''
  });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await sectionsApi.getByKey('footer_info');
        if (response.section && response.section.extraData) {
          const parsed = JSON.parse(response.section.extraData);
          setFooterData(prev => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.error('Failed to fetch footer info:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

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
    { icon: Instagram, href: footerData.instagram || "#", label: "Instagram" },
    { icon: Facebook, href: footerData.facebook || "#", label: "Facebook" },
    { icon: Linkedin, href: footerData.linkedin || "#", label: "LinkedIn" },
    { icon: Youtube, href: footerData.youtube || "#", label: "YouTube" },
  ];

  const { ref: footerRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <footer className="bg-brand-navy text-white" ref={footerRef}>
      {/* Contact CTA Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            {/* Phone */}
            <a href={`tel:${footerData.phone.replace(/[^0-9+]/g, '')}`} className="text-center group">
              <div className="w-full h-auto flex flex-col items-center space-y-2 p-4 bg-white/5 hover:bg-brand-blue/20 border border-white/10 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{footerData.phone}</p>
                  <p className="text-xs text-white/70">Give Us A Call</p>
                </div>
              </div>
            </a>

            {/* Email */}
            <a href={`mailto:${footerData.email}`} className="text-center group">
              <div className="w-full h-auto flex flex-col items-center space-y-2 p-4 bg-white/5 hover:bg-brand-blue/20 border border-white/10 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{footerData.email}</p>
                  <p className="text-xs text-white/70">Drop Us A Line</p>
                </div>
              </div>
            </a>

            {/* Enquiry */}
            <div className="text-center group">
              <div className="w-full h-auto flex flex-col items-center space-y-2 p-4 bg-white/5 hover:bg-brand-blue/20 border border-white/10 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Enquiry Now</p>
                  <p className="text-xs text-white/70">Click to Connect Instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-700 delay-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {/* Company Info */}
          <div className="space-y-4">
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
              <p className="font-semibold text-white text-xs">{footerData.corporateName}</p>
              <p className="text-xs">{footerData.addressLine1}</p>
              <p className="text-xs">{footerData.addressLine2}</p>
              <p className="text-xs">{footerData.addressLine3}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
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
                        className="block text-white/70 hover:text-brand-light-blue transition-colors text-xs hover:translate-x-1 transform duration-200"
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
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Follow Us</h3>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href !== "#" ? social.href : undefined}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-blue transition-all duration-300 hover:scale-110"
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

        {/* Copyright */}
        <div className="border-t border-white/10 mt-6 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-xs text-white/60">
            <p>{footerData.copyright}</p>
            <div className="flex items-center space-x-4">
              <span>{footerData.developer}</span>
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