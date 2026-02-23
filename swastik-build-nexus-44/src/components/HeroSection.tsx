import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cityscape.jpg";
import ContactFormModal from "./ContactFormModal";
import { heroBannerApi, getImageUrl } from "@/services/cmsApi";

const HeroSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroData, setHeroData] = useState({
    heading: 'Find Your Dream Home Today',
    subtext: 'Discover premium residential properties in Mumbai\'s most sought-after locations',
    image2560: null as string | null,
    image1920: null as string | null,
    image1536: null as string | null,
    imageMobile: null as string | null,
    fallbackImage: null as string | null
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await heroBannerApi.get();
        if (response.banner) {
          setHeroData({
            heading: response.banner.heading,
            subtext: response.banner.subtext,
            image2560: response.banner.image2560 ? getImageUrl(response.banner.image2560) : null,
            image1920: response.banner.image1920 ? getImageUrl(response.banner.image1920) : null,
            image1536: response.banner.image1536 ? getImageUrl(response.banner.image1536) : null,
            imageMobile: response.banner.imageMobile ? getImageUrl(response.banner.imageMobile) : null,
            fallbackImage: response.banner.backgroundImage ? getImageUrl(response.banner.backgroundImage) : null
          });
        }
      } catch (error) {
        console.error('Failed to fetch hero banner:', error);
      }
    };
    fetchHero();

    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section id="home" className="relative w-full overflow-hidden bg-black flex flex-col justify-center">
        {/* Background Image dictates section height */}
        <div className="w-full relative z-0 overflow-hidden">
          <picture>
            <source media="(min-width: 1921px)" srcSet={heroData.image2560 || heroData.fallbackImage || ""} />
            <source media="(min-width: 1537px)" srcSet={heroData.image1920 || heroData.fallbackImage || ""} />
            <source media="(min-width: 769px)" srcSet={heroData.image1536 || heroData.fallbackImage || ""} />
            <source media="(max-width: 768px)" srcSet={heroData.imageMobile || heroData.fallbackImage || ""} />
            <img
              src={heroData.fallbackImage || ""}
              alt="Hero Background"
              className="w-full h-auto block transition-transform duration-[20000ms] ease-linear origin-center"
              style={{
                transform: isLoaded ? 'scale(1.02)' : 'scale(1)',
              }}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1953B4]/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Subtle floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float-slow"
              style={{
                left: `${15 + i * 18}%`,
                top: `${20 + i * 12}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Ribbon at the bottom - Desktop */}
        <div
          className="absolute left-0 right-0 bottom-0 z-20 w-full hidden md:flex flex-row items-center justify-center gap-8 px-4 py-4"
          style={{ backgroundColor: '#1953B4' }}
        >
          {['Location', 'Property Type', 'Configuration'].map((label) => (
            <button key={label} className="flex items-center gap-2 text-white font-medium px-4 py-2 focus:outline-none w-auto justify-center hover:bg-white/10 rounded-lg transition-all duration-300">
              {label} <span className="ml-1">&#9662;</span>
            </button>
          ))}
          <button className="flex items-center justify-center text-white px-4 py-2 focus:outline-none w-auto hover:bg-white/10 rounded-lg transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </div>

        {/* Fixed Enquiry Button */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
          <Button
            variant="enquiry"
            size="lg"
            onClick={() => setIsContactModalOpen(true)}
            className="rounded-l-[10px] rounded-r-none relative overflow-hidden text-white hover:opacity-90 transition-all duration-300 animate-glow-pulse"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              width: '60px',
              height: '160px',
              backgroundColor: '#1953B4',
              boxShadow: '0px 10px 20px 0px #00008026',
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
              padding: 0
            }}
          >
            Enquiry Now
          </Button>
        </div>

        {/* Content - Staggered reveal */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 pb-8 md:pb-0">
          <div className="container mx-auto px-4 lg:px-8 text-center pointer-events-auto">
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 mt-12 md:mt-0">
              {/* Hero Text */}
              <div className="space-y-4">
                <h1
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight transition-all duration-1000"
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
                  }}
                >
                  {heroData.heading.split(' ').map((word, i, arr) => (
                    <span key={i} className={i >= arr.length - 2 ? "block bg-gradient-to-r from-brand-light-blue to-white bg-clip-text text-transparent mt-2" : ""}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                <p
                  className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto transition-all duration-1000 delay-300"
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                  }}
                >
                  {heroData.subtext}
                </p>
              </div>

              {/* CTA Button - Mobile only */}
              <div
                className="md:hidden transition-all duration-1000 delay-500"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <Button
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-[#1953B4] hover:bg-[#1953B4]/90 text-white font-bold text-lg py-6 px-10 rounded-xl shadow-lg shadow-blue-900/30"
                >
                  Explore Projects
                </Button>
              </div>

              {/* Scroll indicator */}
              <div
                className="hidden md:block transition-all duration-1000 delay-700"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <div className="animate-bounce mt-8">
                  <svg className="w-6 h-6 mx-auto text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
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
