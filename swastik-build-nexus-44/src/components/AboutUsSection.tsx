import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ContactFormModal from "./ContactFormModal";
import aboutInterior from "@/assets/about-interior.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { sectionsApi, getImageUrl } from "@/services/cmsApi";

const AboutUsSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: mobileRef, isVisible: mobileVisible } = useScrollAnimation({ threshold: 0.2 });
  const [whoWeAre, setWhoWeAre] = useState({
    title: 'Who we are?',
    content: `At Swastik Group, we're dedicated to honesty, openness, and quality work in each stage we do. We've successfully completed various projects that blend contemporary design with luxury. We're proud to build durable homes and buildings that are built to last expectations and leave a positive mark in the construction landscape.\n\nOur commitment to excellence and innovation drives us to create spaces that not only meet but exceed expectations, establishing lasting relationships built on trust and quality craftsmanship.`,
    image: null as string | null
  });

  useEffect(() => {
    const fetchWhoWeAre = async () => {
      try {
        const response = await sectionsApi.getByKey('who_we_are');
        if (response.section) {
          setWhoWeAre({
            title: response.section.title,
            content: response.section.content,
            image: response.section.image ? getImageUrl(response.section.image) : null
          });
        }
      } catch (error) {
        console.error('Failed to fetch who_we_are section:', error);
      }
    };
    fetchWhoWeAre();
  }, []);

  return (
    <>
      {/* Mobile Blue Band */}
      <div
        className="md:hidden relative h-16 bg-[#1953B4] flex items-center justify-center z-30 cursor-pointer active:scale-[0.98] transition-transform"
        onClick={() => setIsContactModalOpen(true)}
      >
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-10 bg-[#1953B4] rounded-t-full flex items-center justify-center pt-2"
          style={{ boxShadow: '0 -4px 10px rgba(0,0,0,0.1)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-6 h-6 animate-bounce">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </div>
        <span className="text-white font-bold text-xl tracking-wide">Enquiry Now</span>
      </div>

      <section id="about" className="py-12 md:bg-white bg-[#DDF4FF]">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Mobile Layout */}
          <div className="md:hidden" ref={mobileRef}>
            <div
              className="bg-white rounded-[40px] p-8 shadow-2xl border border-white/50 text-center mx-auto max-w-[500px] transition-all duration-700"
              style={{
                opacity: mobileVisible ? 1 : 0,
                transform: mobileVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
              }}
            >
              <h2 className="text-3xl font-bold text-black mb-2">
                {whoWeAre.title}
              </h2>
              <div
                className="h-1.5 bg-[#4B9FFF] rounded-full mx-auto mb-8 transition-all duration-700 delay-300"
                style={{ width: mobileVisible ? '6rem' : '0' }}
              />

              <p className="text-gray-800 text-lg leading-relaxed mb-10 line-clamp-[8]">
                {whoWeAre.content}
              </p>

              <Link to="/about-us">
                <Button className="bg-[#1953B4] hover:bg-[#1953B4]/90 text-white font-bold text-lg py-6 px-12 rounded-[12px] shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-300 active:scale-95">
                  Know More
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center" ref={sectionRef}>
            <div className="space-y-6">
              <div>
                <h2
                  className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4 transition-all duration-700"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                  }}
                >
                  {whoWeAre.title}
                </h2>
                <div
                  className="h-1 bg-brand-blue rounded-full mb-6 transition-all duration-700 delay-200"
                  style={{ width: isVisible ? '5rem' : '0' }}
                />
              </div>

              <div
                className="space-y-4 text-lg text-brand-gray leading-relaxed transition-all duration-700 delay-300"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                {whoWeAre.content.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <Link to="/about-us" className="inline-block">
                <Button
                  size="lg"
                  className="mt-6 bg-[#1953B4] hover:bg-[#1953B4]/90 text-white hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
                  }}
                >
                  Know More
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div
                className="relative overflow-hidden custom-image-radius shadow-2xl hover:shadow-3xl transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.95)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                }}
              >
                <img
                  src={whoWeAre.image || ""}
                  alt={whoWeAre.title}
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700 custom-image-radius"
                />
                {/* Decorative gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Decorative element behind image */}
              <div
                className="absolute -z-10 -bottom-4 -right-4 w-full h-full border-2 border-brand-blue/20 custom-image-radius transition-all duration-700 delay-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default AboutUsSection;