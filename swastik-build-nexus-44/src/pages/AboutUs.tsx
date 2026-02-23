import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ProjectsSection from '@/components/ProjectsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import BlogsSection from '@/components/BlogsSection';
import FAQSection from '@/components/FAQSection';
import StackedCards from '@/components/StackedCards';
import aboutInterior from '@/assets/about-interior.jpg';
import lifestyleInterior from '@/assets/lifestyle-interior.jpg';
import { sectionsApi, statisticsApi, vvmApi, getImageUrl } from '@/services/cmsApi';
import { Loader2 } from 'lucide-react';

const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const [ourBusiness, setOurBusiness] = useState({
    title: 'Our Business',
    content: 'Swastik Group is a prime real estate company...',
    image: null as string | null
  });
  const [aboutUsSection, setAboutUsSection] = useState({
    title: 'About Us',
    content: 'At Swastik Group, we\'re dedicated to honesty...',
    image: null as string | null
  });
  const [stats, setStats] = useState<any[]>([]);
  const [vvmItems, setVvmItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bizRes, aboutRes, statsRes, vvmRes] = await Promise.all([
          sectionsApi.getByKey('our_business'),
          sectionsApi.getByKey('about_us_main'),
          statisticsApi.getAll(),
          vvmApi.getAll()
        ]);

        if (bizRes.section) {
          setOurBusiness({
            title: bizRes.section.title,
            content: bizRes.section.content,
            image: bizRes.section.image ? getImageUrl(bizRes.section.image) : null
          });
        }

        if (aboutRes.section) {
          setAboutUsSection({
            title: aboutRes.section.title,
            content: aboutRes.section.content,
            image: aboutRes.section.image ? getImageUrl(aboutRes.section.image) : null
          });
        }

        setStats(statsRes.statistics || []);
        setVvmItems(vvmRes.vvmItems || []);
      } catch (error) {
        console.error('Failed to fetch About Us data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cardData = vvmItems.map((item) => {
    let bgColor = 'hsl(var(--values-bg))';
    if (item.type === 'vision') bgColor = 'hsl(var(--vision-bg))';
    else if (item.type === 'mission') bgColor = 'hsl(var(--mission-bg))';

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
                <p className="text-brand-gray leading-relaxed text-lg">
                  {item.content}
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative h-full min-h-[300px]">
                <img
                  src={item.image ? getImageUrl(item.image)! : ""}
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
                <p className="text-black text-[10px] leading-snug font-bold">
                  {item.content}
                </p>
              </div>
            </div>
            <div className="flex-[1.2] h-full border-l border-white/20">
              <img
                src={item.image ? getImageUrl(item.image)! : ""}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )
    };
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Fallback SEO for loading state */}
        <SEO title="About Us" description="Learn more about Swastik Group and our legacy of building premium homes." />
        <Header />
        <div className="flex flex-col items-center justify-center h-screen">
          <Loader2 className="w-12 h-12 animate-spin text-brand-blue mb-4" />
          <p className="text-brand-navy font-bold">Loading Our Story...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* SEO configuration for the About Us page */}
      <SEO title="About Us" description="Learn more about Swastik Group and our legacy of building premium homes." />
      <Header />

      {/* Our Business Section */}
      <section className="py-6 lg:py-12 relative bg-[#EEF8FF]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
                  {ourBusiness.title}
                </h2>
                <div className="w-16 h-1 bg-brand-blue mb-6"></div>
              </div>
              <div className="text-brand-gray leading-relaxed text-lg whitespace-pre-wrap">
                {ourBusiness.content}
              </div>
            </div>
            <div className="order-first lg:order-last animate-slide-up">
              <div className="relative overflow-hidden custom-image-radius shadow-2xl">
                <img
                  src={ourBusiness.image || ""}
                  alt={ourBusiness.title}
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-500 custom-image-radius"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-brand p-8 lg:p-12 shadow-brand overflow-hidden transition-all duration-700 min-h-[140px] flex items-center" style={{ borderRadius: '20px 60px 20px 60px' }}>
            {stats.length > 0 && (
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
            )}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-6 lg:py-12 relative bg-[#EEF8FF]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative animate-slide-up">
              <div className="relative overflow-hidden custom-image-radius shadow-2xl">
                <img
                  src={aboutUsSection.image || ""}
                  alt={aboutUsSection.title}
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-500 custom-image-radius"
                />
              </div>
            </div>
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
                  {aboutUsSection.title}
                </h2>
                <div className="w-16 h-1 bg-brand-blue mb-6"></div>
              </div>
              <div className="text-brand-gray leading-relaxed text-lg whitespace-pre-wrap">
                {aboutUsSection.content}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values, Vision & Mission Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
              Our Values, Vision & Mission
            </h2>
            <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-brand-gray max-w-4xl mx-auto leading-relaxed">
              The core principles and aspirations that guide our journey in creating exceptional real estate experiences.
            </p>
          </div>
          {cardData.length > 0 && <StackedCards cards={cardData} />}
        </div>
      </section>

      <ProjectsSection />
      <WhyChooseUsSection />
      <BlogsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default AboutUs;