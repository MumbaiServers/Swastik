import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ContactFormModal from "./ContactFormModal";
import aboutInterior from "@/assets/about-interior.jpg";

const AboutUsSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      {/* Mobile Blue Band */}
      <div
        className="md:hidden relative h-16 bg-[#1953B4] flex items-center justify-center z-30 cursor-pointer"
        onClick={() => setIsContactModalOpen(true)}
      >
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-10 bg-[#1953B4] rounded-t-full flex items-center justify-center pt-2"
          style={{ boxShadow: '0 -4px 10px rgba(0,0,0,0.1)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </div>
        <span className="text-white font-bold text-xl tracking-wide">Enquiry Now</span>
      </div>

      <section id="about" className="py-12 md:bg-white bg-[#DDF4FF]">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Mobile Layout (Visible only on small screens) */}
          <div className="md:hidden">
            <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-white/50 text-center mx-auto max-w-[500px]">
              <h2 className="text-3xl font-bold text-black mb-2">
                Who we are?
              </h2>
              <div className="w-24 h-1.5 bg-[#4B9FFF] rounded-full mx-auto mb-8"></div>

              <p className="text-gray-800 text-lg leading-relaxed mb-10">
                At Swastik Group, we're dedicated to honesty, openness, and quality work in each single thing we do. We've successfully completed various projects that blend contemporary design with luxury.....
              </p>

              <Link to="/about-us">
                <Button className="bg-[#1953B4] hover:bg-[#1953B4]/90 text-white font-bold text-lg py-6 px-12 rounded-[12px] shadow-lg shadow-blue-900/20">
                  Know More
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Layout (Original content, hidden on mobile) */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
                  Who we are?
                </h2>
                <div className="w-20 h-1 bg-brand-blue rounded-full mb-6"></div>
              </div>

              <div className="space-y-4 text-lg text-brand-gray leading-relaxed">
                <p>
                  At Swastik Group, we're dedicated to honesty, openness, and
                  quality work in each stage we do. We've successfully
                  completed various projects that blend contemporary design with
                  luxury. We're proud to build durable homes and buildings that
                  are built to last expectations and leave a positive mark in the
                  construction landscape.
                </p>

                <p>
                  Our commitment to excellence and innovation drives us to create
                  spaces that not only meet but exceed expectations, establishing
                  lasting relationships built on trust and quality craftsmanship.
                </p>
              </div>

              <Link to="/about-us" className="inline-block">
                <Button size="lg" className="mt-6 bg-[#1953B4] hover:bg-[#1953B4]/90 text-white">
                  Know More
                </Button>
              </Link>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative overflow-hidden custom-image-radius shadow-2xl">
                <img src={aboutInterior} alt="Modern interior architecture" className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500 custom-image-radius" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Contact Form Modal triggered by the Mobile Band */}
      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default AboutUsSection;