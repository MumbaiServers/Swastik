
import { useState } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cityscape.jpg";
import ContactFormModal from "./ContactFormModal";

const HeroSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        </div>
        {/* Ribbon at the bottom */}
        <div className="absolute left-0 right-0 bottom-0 z-20 w-full bg-brand-blue flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 px-4 py-3 md:py-4">
          <button className="flex items-center gap-2 text-white font-medium px-4 py-2 focus:outline-none w-full md:w-auto justify-center">
            Location <span className="ml-1">&#9662;</span>
          </button>
          <button className="flex items-center gap-2 text-white font-medium px-4 py-2 focus:outline-none w-full md:w-auto justify-center">
            Property Type <span className="ml-1">&#9662;</span>
          </button>
          <button className="flex items-center gap-2 text-white font-medium px-4 py-2 focus:outline-none w-full md:w-auto justify-center">
            Configuration <span className="ml-1">&#9662;</span>
          </button>
          <button className="flex items-center justify-center text-white px-4 py-2 focus:outline-none w-full md:w-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </div>

        {/* Fixed Enquiry Button */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40">
          <Button 
            variant="enquiry" 
            size="lg"
            onClick={() => setIsContactModalOpen(true)}
            className="rounded-xl py-12 px-6 writing-mode-vertical-rl text-orientation-mixed shadow-brand min-h-[120px] relative overflow-hidden"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            Enquiry Now
          </Button>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Text */}
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Find Your Dream
                <span className="block bg-gradient-to-r from-brand-light-blue to-white bg-clip-text text-transparent">
                  Home Today
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                Discover premium residential properties in Mumbai's most sought-after locations
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
};

export default HeroSection;
