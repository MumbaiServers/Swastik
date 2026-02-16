
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import StackedCards from "@/components/StackedCards";
import ValuesMissionVisionCards from "@/components/ValuesMissionVisionCards";
import PresencesSection from "@/components/PresencesSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import BlogsSection from "@/components/BlogsSection";
import EMICalculator from "@/components/EMICalculator";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/ContactFormModal";
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const cardData = [
    {
      id: 'values',
      colors: ['hsl(var(--values-bg))', 'hsl(var(--values-bg))'] as [string, string],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      customStyles: {
        maxWidth: '1297px',
        width: '100%',
        minHeight: '476px',
        height: '476px',
        borderTopLeftRadius: '220px',
        borderBottomRightRadius: '220px',
        border: 'none',
      },
      content: (
        <div className="w-full h-full">
          <div className="hidden md:flex h-full">
            <div className="flex-1 bg-values-bg p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
                    Our Values
                  </h3>
                  <div className="w-16 h-1 bg-brand-blue rounded-full mb-6"></div>
                </div>
                <p className="text-brand-gray leading-relaxed text-lg">
                  Integrity, transparency, and excellence form the foundation of everything we do.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative h-full min-h-[300px]">
                <img
                  src={lifestyleInterior}
                  alt="Our Values"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5"></div>
              </div>
            </div>
          </div>
          <div className="md:hidden flex h-full w-full bg-[#DDF4FF]">
            <div className="flex-1 py-6 pl-12 pr-4 flex flex-col justify-center">
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-black border-l-4 border-[#4B9FFF] pl-2 uppercase tracking-tight">
                  Our Values
                </h3>
                <p className="text-black text-[10px] leading-snug font-bold">
                  Integrity, transparency, and excellence form the foundation of everything we do.
                </p>
              </div>
            </div>
            <div className="flex-1 h-full border-l border-white/20">
              <img
                src={lifestyleInterior}
                alt="Our Values"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'vision',
      colors: ['hsl(var(--vision-bg))', 'hsl(var(--vision-bg))'] as [string, string],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      customStyles: {
        maxWidth: '1297px',
        width: '100%',
        minHeight: '476px',
        height: '476px',
        borderTopLeftRadius: '220px',
        borderBottomRightRadius: '220px',
        border: 'none',
      },
      content: (
        <div className="w-full h-full">
          <div className="hidden md:flex h-full">
            <div className="flex-1 bg-vision-bg p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
                    Our Vision
                  </h3>
                  <div className="w-16 h-1 bg-brand-blue rounded-full mb-6"></div>
                </div>
                <p className="text-brand-gray leading-relaxed text-lg">
                  To be Mumbai's most trusted real estate developer, creating sustainable communities.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative h-full min-h-[300px]">
                <img
                  src={lifestyleInterior}
                  alt="Our Vision"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5"></div>
              </div>
            </div>
          </div>
          <div className="md:hidden flex h-full w-full bg-[#EBF7FF]">
            <div className="flex-1 py-6 pl-12 pr-4 flex flex-col justify-center">
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-black border-l-4 border-[#4B9FFF] pl-2 uppercase tracking-tight">
                  Our Vision
                </h3>
                <p className="text-black text-[10px] leading-snug font-bold">
                  To be Mumbai's most trusted real estate developer, creating sustainable communities.
                </p>
              </div>
            </div>
            <div className="flex-1 h-full border-l border-white/20">
              <img
                src={lifestyleInterior}
                alt="Our Vision"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mission',
      colors: ['hsl(var(--mission-bg))', 'hsl(var(--mission-bg))'] as [string, string],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      customStyles: {
        maxWidth: '1297px',
        width: '100%',
        minHeight: '476px', // Overriding the default 80vh
        height: '476px',
        borderTopLeftRadius: '220px',
        borderBottomRightRadius: '220px',
        border: 'none',
        // Preserving other corners from default or setting to a reasonable value if needed, 
        // but strictly following user request for these two.
      },
      content: (
        <div className="w-full h-full">
          <div className="hidden md:flex h-full">
            <div className="flex-1 bg-mission-bg p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
                    Our Mission
                  </h3>
                  <div className="w-16 h-1 bg-brand-blue rounded-full mb-6"></div>
                </div>
                <p className="text-brand-gray leading-relaxed text-lg">
                  Building quality homes that blend contemporary design with innovation and sustainability.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative h-full min-h-[300px]">
                <img
                  src={lifestyleInterior}
                  alt="Our Mission"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5"></div>
              </div>
            </div>
          </div>
          <div className="md:hidden flex h-full w-full bg-[#F5FBFF]">
            <div className="flex-1 py-6 pl-12 pr-4 flex flex-col justify-center">
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-black border-l-4 border-[#4B9FFF] pl-2 uppercase tracking-tight">
                  Our Mission
                </h3>
                <p className="text-black text-[10px] font-bold leading-snug">
                  Our mission is to offer the best and quick real estate solutions that improve people's lives.
                </p>
              </div>
            </div>
            <div className="flex-1 h-full border-l border-white/20">
              <img
                src={lifestyleInterior}
                alt="Our Mission"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )
    }
  ];

  const [isContactOpen, setIsContactOpen] = useState(false);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoPlaying(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Automatic popup temporarily disabled
    return;
    /*
    let cancelled = false;
    const startTimer = () => {
      if (cancelled) return;
      try {
        const submitted = localStorage.getItem('contactFormSubmitted') === 'true';
        if (submitted) return; // stop forever
      } catch (err) {}
      const id = setTimeout(() => {
        try {
          const submitted = localStorage.getItem('contactFormSubmitted') === 'true';
          if (!submitted) setIsContactOpen(true);
        } catch (err) {
          setIsContactOpen(true);
        }
        startTimer();
      }, 12000);
      return () => clearTimeout(id);
    };
    const cleanup = startTimer();
    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
    */
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Who We Are Section */}
      {/* Who We Are Section */}
      <AboutUsSection />
      {/* Values, Vision & Mission Section */}
      <section className="pt-4 pb-2 lg:pt-8 lg:pb-4 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-6 lg:mb-12">
            <h2 className="text-2xl lg:text-4xl font-bold text-brand-navy mb-3 lg:mb-6">
              Our Values, Vision & Mission
            </h2>
            <div className="w-16 lg:w-20 h-1 bg-brand-blue rounded-full mx-auto mb-4 lg:mb-6"></div>
            <p className="text-sm lg:text-lg text-brand-gray max-w-4xl mx-auto leading-relaxed">
              The core principles and aspirations that guide our journey in creating exceptional real estate experiences.
            </p>
          </div>
          <StackedCards cards={cardData} />
        </div>
      </section>

      {/* Stats section */}
      <section className="pt-4 pb-10 lg:pt-4 lg:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-brand p-8 lg:p-12 shadow-brand overflow-hidden" style={{ borderRadius: '20px 60px 20px 60px' }}>
            {/* Unified Marquee Layout for All Screen Sizes */}
            <div
              className="flex items-center w-full overflow-hidden [--duration:30s] [--gap:1.5rem]"
              data-gap="1.5rem"
            >
              <div className="flex w-max animate-marquee hover:pause">
                {/* First set of cards */}
                {[
                  { value: "25+", label: "Years of Excellence" },
                  { value: "1.5", label: "Million Sq. Ft. Developed" },
                  { value: "1500+", label: "Happy Families" },
                  { value: "6.5", label: "Lakh Sq. Ft. Under Construction" },
                  { value: "22", label: "Successful Projects" },
                  { value: "7", label: "Prime Locations" }
                ].map((stat, index) => (
                  <div key={`first-${index}`} className="text-center text-white min-w-[120px] sm:min-w-[160px] lg:min-w-[200px] flex-shrink-0 mx-2 sm:mx-4 lg:mx-6">
                    <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base opacity-90 whitespace-normal leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex w-max animate-marquee hover:pause" aria-hidden="true">
                {[
                  { value: "25+", label: "Years of Excellence" },
                  { value: "1.5", label: "Million Sq. Ft. Developed" },
                  { value: "1500+", label: "Happy Families" },
                  { value: "6.5", label: "Lakh Sq. Ft. Under Construction" },
                  { value: "22", label: "Successful Projects" },
                  { value: "7", label: "Prime Locations" }
                ].map((stat, index) => (
                  <div key={`second-${index}`} className="text-center text-white min-w-[120px] sm:min-w-[160px] lg:min-w-[200px] flex-shrink-0 mx-2 sm:mx-4 lg:mx-6">
                    <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base opacity-90 whitespace-normal leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Projects Section */}
      <ProjectsSection />
      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Our Presence Section */}
      <PresencesSection />

      {/* YouTube Video Section */}
      <section className="py-10 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
              Watch Our Story
            </h2>
            <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-brand-gray max-w-3xl mx-auto leading-relaxed">
              Discover our journey in creating exceptional real estate experiences
            </p>
          </div>

          <div className="max-w-5xl mx-auto" ref={videoSectionRef}>
            <div className="aspect-video bg-black rounded-xl border-2 border-gray-200 overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src={isVideoPlaying
                  ? "https://www.youtube.com/embed/WUq4bKwC-nM?si=sBQAjI_kCXg4-Qwb&autoplay=1&mute=1"
                  : "https://www.youtube.com/embed/WUq4bKwC-nM?si=sBQAjI_kCXg4-Qwb"
                }
                title="Company Overview Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <SocialMediaSection />

      {/* Blogs Section */}
      <BlogsSection />

      {/* EMI Calculator Section */}
      <EMICalculator />

      {/* FAQ Section */}
      <FAQSection />


      <Footer />
    </div>
  );
};

export default Index;
