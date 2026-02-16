import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectsSection from '@/components/ProjectsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import BlogsSection from '@/components/BlogsSection';
import FAQSection from '@/components/FAQSection';
import ValuesMissionVisionCards from '@/components/ValuesMissionVisionCards';
import StackedCards from '@/components/StackedCards';
import aboutInterior from '@/assets/about-interior.jpg';
import lifestyleInterior from '@/assets/lifestyle-interior.jpg';
const AboutUs = () => {
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

  return <div className="min-h-screen bg-background">
    <Header />

    {/* Our Business Section */}
    <section className="py-6 lg:py-8 relative bg-[#EEF8FF]">
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#EEF8FF]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
                  Our Business
                </h2>
                <div className="w-16 h-1 bg-brand-blue mb-6"></div>
              </div>

              <div className="text-brand-gray leading-relaxed space-y-4">
                <p>
                  Swastik Group is a prime real estate company. We are known for our honesty, transparency, and the best. Premium quality work. As we've been working around for more than 25 years and creating amazing homes and business spaces that redefine luxury living. We focus on doing things correctly, and meeting deadlines. This approach has made us leaders in the real estate industry, respected for our commitment to ensuring our customers are satisfied with our work.
                </p>
              </div>
            </div>

            <div className="order-first lg:order-last animate-slide-up">
              <div className="relative overflow-hidden custom-image-radius shadow-2xl">
                <img src={aboutInterior} alt="Business Overview" className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500 custom-image-radius" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Statistics Section */}
    <section className="py-6 lg:py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-gradient-brand p-8 lg:p-12 shadow-brand overflow-hidden" style={{ borderRadius: '20px 60px 20px 60px' }}>
          {/* Unified Marquee Layout for All Screen Sizes */}
          <div className="flex animate-marquee hover:pause">
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
            {/* Duplicate set for seamless loop */}
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
    </section>

    {/* About Us Section */}
    <section className="py-6 lg:py-8 relative bg-[#EEF8FF]">
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#EEF8FF]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative animate-slide-up">
              <div className="relative overflow-hidden custom-image-radius shadow-2xl">
                <img src={lifestyleInterior} alt="About Us" className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500 custom-image-radius" />
              </div>
            </div>

            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
                  About Us
                </h2>
                <div className="w-16 h-1 bg-brand-blue mb-6"></div>
              </div>

              <div className="text-brand-gray leading-relaxed space-y-4">
                <p>
                  At Swastik Group, we're dedicated to honesty, openness, and quality work in each single thing we do. We've successfully completed various projects that blend contemporary design with luxury. We're proud to build durable homes and buildings that reflects comfortable living. With a committed and talented team, we aim to top expectations and leave a positive mark in the communities we serve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Values, Vision & Mission Section */}
    <section className="py-6 lg:py-8">
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
        <StackedCards cards={cardData} />
      </div>
    </section>

    {/* Projects Cards Section */}
    <ProjectsSection />

    {/* Why Choose Us Section */}
    <WhyChooseUsSection />

    {/* Blogs Section */}
    <BlogsSection />

    {/* FAQs Section */}
    <FAQSection />

    <Footer />
  </div>;
};
export default AboutUs;