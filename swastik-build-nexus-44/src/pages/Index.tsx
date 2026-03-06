import Header from "@/components/Header";
import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import StackedCards from "@/components/StackedCards";
import PresencesSection from "@/components/PresencesSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import BlogsSection from "@/components/BlogsSection";
import EMICalculator from "@/components/EMICalculator";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/ContactFormModal";
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { sectionsApi, statisticsApi, vvmApi, getImageUrl } from "@/services/cmsApi";

const Index = () => {
  const [watchOurStory, setWatchOurStory] = useState({
    title: 'Watch Our Story',
    content: 'Discover our journey in creating exceptional real estate experiences',
    videoUrl: 'https://www.youtube.com/embed/WUq4bKwC-nM?si=sBQAjI_kCXg4-Qwb'
  });

  const [stats, setStats] = useState<any[]>([]);
  const [vvmItems, setVvmItems] = useState<any[]>([]);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  const { ref: vvmRef, isVisible: vvmVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: videoTitleRef, isVisible: videoTitleVisible } = useScrollAnimation();

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
    const fetchData = async () => {
      try {
        // Fetch Watch Our Story
        const storyRes = await sectionsApi.getByKey('watch_our_story');
        if (storyRes.section) {
          setWatchOurStory({
            title: storyRes.section.title,
            content: storyRes.section.content,
            videoUrl: storyRes.section.extraData || ''
          });
        }

        // Fetch Stats
        const statsRes = await statisticsApi.getAll();
        setStats(statsRes.statistics || []);

        // Fetch VVM
        const vvmRes = await vvmApi.getAll();
        setVvmItems(vvmRes.items || []);
      } catch (error) {
        console.error('Failed to fetch home page data:', error);
      }
    };
    fetchData();
  }, []);

  // Map VVM data to cardData format
  const cardData = vvmItems.map((item) => {
    let bgColor = 'hsl(var(--values-bg))';
    if (item.type === 'vision') {
      bgColor = 'hsl(var(--vision-bg))';
    } else if (item.type === 'mission') {
      bgColor = 'hsl(var(--mission-bg))';
    }

    return {
      id: item.type,
      colors: [bgColor, bgColor] as [string, string],
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
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center" style={{ backgroundColor: bgColor }}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
                    {item.title}
                  </h3>
                  <div className="w-16 h-1 bg-brand-blue rounded-full mb-6"></div>
                </div>
                <p className="text-brand-gray leading-relaxed text-lg whitespace-pre-wrap">
                  {item.content}
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative h-full min-h-[300px]">
                <img
                  src={item.image ? getImageUrl(item.image) : lifestyleInterior}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5"></div>
              </div>
            </div>
          </div>
          <div className="md:hidden flex h-full w-full" style={{ backgroundColor: bgColor }}>
            <div className="flex-[0.8] py-6 pl-8 pr-4 flex flex-col justify-center">
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-black border-l-4 border-[#4B9FFF] pl-2 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-black text-[10px] leading-snug font-bold whitespace-pre-wrap">
                  {item.content}
                </p>
              </div>
            </div>
            <div className="flex-[1.2] h-full border-l border-white/20">
              <img
                src={item.image ? getImageUrl(item.image) : lifestyleInterior}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )
    };
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic SEO Meta Tags for main landing page */}
      <SEO title="Home" description="Swastik Group brings you premium residential and commercial spaces." />
      <Header />
      <HeroSection />
      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Who We Are Section */}
      <AboutUsSection />

      {/* Values, Vision & Mission Section */}
      <section className="pt-4 pb-2 lg:pt-8 lg:pb-4 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-6 lg:mb-12" ref={vvmRef}>
            <h2
              className="text-2xl lg:text-4xl font-bold text-brand-navy mb-3 lg:mb-6 transition-all duration-700"
              style={{
                opacity: vvmVisible ? 1 : 0,
                transform: vvmVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              Our Values, Vision & Mission
            </h2>
            <div
              className="h-1 bg-brand-blue rounded-full mx-auto mb-4 lg:mb-6 transition-all duration-700 delay-200"
              style={{ width: vvmVisible ? '5rem' : '0' }}
            />
            <p
              className="text-sm lg:text-lg text-brand-gray max-w-4xl mx-auto leading-relaxed transition-all duration-700 delay-300"
              style={{
                opacity: vvmVisible ? 1 : 0,
                transform: vvmVisible ? 'translateY(0)' : 'translateY(15px)',
              }}
            >
              The core principles and aspirations that guide our journey in creating exceptional real estate experiences.
            </p>
          </div>
          {cardData.length > 0 && <StackedCards cards={cardData} />}
        </div>
      </section>

      {/* Stats section */}
      <section className="pt-4 pb-10 lg:pt-4 lg:pb-12 overflow-hidden" ref={statsRef}>
        <div className="container mx-auto px-4 lg:px-8">
          <div
            className="bg-gradient-brand p-8 lg:p-12 shadow-brand overflow-hidden transition-all duration-700 min-h-[140px] flex items-center"
            style={{
              borderRadius: '20px 60px 20px 60px',
              opacity: statsVisible ? 1 : 0,
              transform: statsVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            }}
          >
            {stats.length > 0 ? (
              <div
                className="flex items-center w-full overflow-hidden"
                style={{
                  '--duration': '25s',
                  '--gap': '1.5rem',
                  gap: 'var(--gap)'
                } as any}
              >
                <div className="flex w-max animate-marquee hover:pause shrink-0">
                  {stats.map((stat, index) => (
                    <div key={`first-${index}`} className="text-center text-white min-w-[120px] sm:min-w-[160px] lg:min-w-[200px] flex-shrink-0 mx-2 sm:mx-4 lg:mx-6">
                      <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="text-xs sm:text-sm lg:text-base opacity-90 whitespace-normal leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex w-max animate-marquee hover:pause shrink-0" aria-hidden="true">
                  {stats.map((stat, index) => (
                    <div key={`second-${index}`} className="text-center text-white min-w-[120px] sm:min-w-[160px] lg:min-w-[200px] flex-shrink-0 mx-2 sm:mx-4 lg:mx-6">
                      <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="text-xs sm:text-sm lg:text-base opacity-90 whitespace-normal leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full text-center text-white/50">Loading statistics...</div>
            )}
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
      <section className="py-10 lg:py-16 bg-white section-divider">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12" ref={videoTitleRef}>
            <h2
              className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6 transition-all duration-700"
              style={{
                opacity: videoTitleVisible ? 1 : 0,
                transform: videoTitleVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {watchOurStory.title}
            </h2>
            <div
              className="h-1 bg-brand-blue rounded-full mx-auto mb-6 transition-all duration-700 delay-200"
              style={{ width: videoTitleVisible ? '5rem' : '0' }}
            />
            <p
              className="text-lg text-brand-gray max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-300"
              style={{
                opacity: videoTitleVisible ? 1 : 0,
                transform: videoTitleVisible ? 'translateY(0)' : 'translateY(15px)',
              }}
            >
              {watchOurStory.content}
            </p>
          </div>

          <div
            className="max-w-5xl mx-auto transition-all duration-700 delay-200"
            ref={videoSectionRef}
            style={{
              opacity: videoTitleVisible ? 1 : 0,
              transform: videoTitleVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
            }}
          >
            <div className="aspect-video bg-black rounded-2xl border-2 border-gray-200 overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              {watchOurStory.videoUrl ? (
                <iframe
                  className="w-full h-full"
                  src={isVideoPlaying
                    ? `${watchOurStory.videoUrl}${watchOurStory.videoUrl.includes('?') ? '&' : '?'}autoplay=1&mute=1`
                    : watchOurStory.videoUrl
                  }
                  title="Company Overview Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  Video coming soon...
                </div>
              )}
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
