import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import projectTower1 from '@/assets/project-tower-1.jpg';
import projectTower2 from '@/assets/project-tower-2.jpg';
import projectTower3 from '@/assets/project-tower-3.jpg';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('completed');
  const navigate = useNavigate();

  const projects = {
    completed: [
      {
        id: 1,
        slug: 'swastik-pearl',
        name: 'Swastik Pearl',
        subtitle: 'Residential',
        location: 'Ghatkopar West',
        price: 'Starting at ₹70 Lakhs*',
        image: projectTower1,
        configuration: '1,2,3 BHK',
        description: 'Experience luxury living with modern amenities and premium finishes.',
        tag: 'Enquiry Now'
      },
      {
        id: 2,
        slug: 'swastik-elegance',
        name: 'Swastik Elegance',
        subtitle: 'Residential',
        location: 'Vikhroli East',
        price: 'Starting at ₹90 Lakhs*',
        image: projectTower2,
        configuration: '2,3,4 BHK',
        description: 'Premium high-rise apartments with scenic views and world-class facilities.',
        tag: 'Enquiry Now'
      },
      {
        id: 3,
        slug: 'swastik-onyx',
        name: 'Swastik Onyx',
        subtitle: 'Residential',
        location: 'Mulund West',
        price: 'Starting at ₹85 Lakhs*',
        image: projectTower3,
        configuration: '1,2,3 BHK',
        description: 'Contemporary living spaces with sustainable design and smart features.',
        tag: 'Enquiry Now'
      },
      {
        id: 4,
        slug: 'swastik-pearl-2',
        name: 'Swastik Pearl',
        subtitle: 'Residential',
        location: 'Ghatkopar West',
        price: 'Starting at ₹70 Lakhs*',
        image: projectTower1,
        configuration: '1,2,3 BHK',
        description: 'Experience luxury living with modern amenities and premium finishes.',
        tag: 'Enquiry Now'
      },
      {
        id: 5,
        slug: 'swastik-elegance-2',
        name: 'Swastik Elegance',
        subtitle: 'Residential',
        location: 'Vikhroli East',
        price: 'Starting at ₹90 Lakhs*',
        image: projectTower2,
        configuration: '2,3,4 BHK',
        description: 'Premium high-rise apartments with scenic views and world-class facilities.',
        tag: 'Enquiry Now'
      },
      {
        id: 6,
        slug: 'swastik-onyx-2',
        name: 'Swastik Onyx',
        subtitle: 'Residential',
        location: 'Mulund West',
        price: 'Starting at ₹85 Lakhs*',
        image: projectTower3,
        configuration: '1,2,3 BHK',
        description: 'Contemporary living spaces with sustainable design and smart features.',
        tag: 'Enquiry Now'
      },
      {
        id: 7,
        slug: 'swastik-onyx-3',
        name: 'Swastik Onyx',
        subtitle: 'Residential',
        location: 'Mulund West',
        price: 'Starting at ₹85 Lakhs*',
        image: projectTower3,
        configuration: '1,2,3 BHK',
        description: 'Contemporary living spaces with sustainable design and smart features.',
        tag: 'Enquiry Now'
      }
    ],
    ongoing: [
      {
        id: 8,
        slug: 'swastik-crown',
        name: 'Swastik Crown',
        subtitle: 'Residential',
        location: 'Chembur East',
        price: 'Starting at ₹95 Lakhs*',
        image: projectTower1,
        configuration: '2,3,4 BHK',
        description: 'Ultra-modern residential tower under construction with premium amenities.',
        tag: 'Enquiry Now'
      },
      {
        id: 9,
        slug: 'swastik-palace',
        name: 'Swastik Palace',
        subtitle: 'Residential',
        location: 'Ghatkopar East',
        price: 'Starting at ₹80 Lakhs*',
        image: projectTower2,
        configuration: '1,2,3 BHK',
        description: 'Luxurious apartments with premium amenities and modern design.',
        tag: 'Enquiry Now'
      }
    ]
  };

  const faqs = [
    "What makes Swastik Group's value-based real estate a brilliant?",
    "What type of residential projects does Swastik Group offer in Mumbai?",
    "Why did we most choose Shoonya property companies in Mumbai?",
    "How does Swastik Group ensure quality and sustainability in its real estate projects?",
    "How can I learn more development opportunities and projects in Swastik Group in Mumbai?"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Blue Gradient Filter Banner */}
      <section className="py-6 bg-[#1953B4]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 text-white">
            <button className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <span className="text-sm md:text-base font-medium">Location</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <span className="text-sm md:text-base font-medium">Property Type</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <span className="text-sm md:text-base font-medium">Configuration</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="flex items-center justify-center hover:text-white/80 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section removed for Projects page */}

      <main className="container mx-auto px-4 py-10 lg:py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-brand-navy mb-6">
            Our Projects
          </h1>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-6"></div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={activeTab === 'completed' ? 'default' : 'ghost'}
                size="lg"
                onClick={() => setActiveTab('completed')}
                className={`px-8 rounded-md transition-all duration-200 ${activeTab === 'completed'
                  ? 'bg-[#1953B4] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }`}
              >
                Completed
              </Button>
              <Button
                variant={activeTab === 'ongoing' ? 'default' : 'ghost'}
                size="lg"
                onClick={() => setActiveTab('ongoing')}
                className={`px-8 rounded-md transition-all duration-200 ${activeTab === 'ongoing'
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }`}
              >
                Ongoing
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {projects[activeTab as keyof typeof projects].map((project) => (
            <Card key={project.id} className="overflow-hidden shadow-brand hover:shadow-brand/80 transition-shadow duration-300 relative group border-0 bg-white/80 backdrop-blur-sm">
              {/* Project Image with custom border radius */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{
                    borderTopLeftRadius: '2rem',
                    borderTopRightRadius: '0',
                    borderBottomLeftRadius: '0',
                    borderBottomRightRadius: '0'
                  }}
                />
                <div className="absolute top-4 left-4 bg-gradient-brand text-white px-3 py-1 rounded-full text-xs font-medium">
                  {project.tag}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center text-white text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                </div>
              </div>

              <CardContent className="p-0">
                <div className="bg-[#EEF8FF] p-5">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-brand-navy">{project.name}</h3>
                      <p className="text-sm text-brand-gray">{project.subtitle}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-brand-gray">Configuration:</span>
                        <span className="font-medium text-brand-navy">{project.configuration}</span>
                      </div>
                      <div className="text-brand-blue font-bold text-lg">
                        {project.price}
                      </div>
                    </div>
                    <p className="text-brand-gray text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/project/${project.slug}`)}
                      className="w-full mt-4 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-muted/50 rounded-2xl p-8 lg:p-12 mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-center text-brand-navy mb-8">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-8"></div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 lg:p-6 shadow-sm border border-border/50">
                <div className="flex justify-between items-center">
                  <p className="text-brand-navy font-medium text-sm lg:text-base">{faq}</p>
                  <Button variant="ghost" size="sm" className="text-brand-blue">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultants Strap */}
        <div className="bg-[#DAEFFF] rounded-xl shadow-card overflow-hidden">
          <div className="flex items-center w-full overflow-hidden [--duration:35s] [--gap:2rem] py-5">
            {/* Track 1 */}
            <div className="flex w-max items-center animate-marquee">
              {[
                { role: 'MEP Consultant', name: 'Mr. Rupesh Gujrathi' },
                { role: 'PMC', name: 'Epsilon Project Management' },
                { role: 'Vastu Consultant', name: 'Kamlesh Vastu Engineer' },
                { role: 'Legal Consultant', name: 'Lexicon Law Partners' },
                { role: 'Design Architect', name: 'Karch Architects' },
                { role: 'Liasoning Architect', name: 'Sai Sampada DBS' },
                { role: 'Landscaping &\nInterior Design', name: 'Madame Design Workshop' },
                { role: 'RCC Consultant', name: 'System Structural Consultant Pvt Ltd' },
              ].map((item, idx) => (
                <div key={`strap-a-${idx}`} className="flex items-center">
                  {idx !== 0 && <div className="h-10 w-px bg-[#1953B4] mx-6" />}
                  <div className="text-center min-w-[240px]">
                    <div className="text-xs text-[#1953B4] font-medium whitespace-pre-line">{item.role}</div>
                    <div className="text-sm text-black font-semibold mt-1 whitespace-nowrap">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Track 2 (duplicate) */}
            <div className="flex w-max items-center animate-marquee" aria-hidden="true">
              {[
                { role: 'MEP Consultant', name: 'Mr. Rupesh Gujrathi' },
                { role: 'PMC', name: 'Epsilon Project Management' },
                { role: 'Vastu Consultant', name: 'Kamlesh Vastu Engineer' },
                { role: 'Legal Consultant', name: 'Lexicon Law Partners' },
                { role: 'Design Architect', name: 'Karch Architects' },
                { role: 'Liasoning Architect', name: 'Sai Sampada DBS' },
                { role: 'Landscaping &\nInterior Design', name: 'Madame Design Workshop' },
                { role: 'RCC Consultant', name: 'System Structural Consultant Pvt Ltd' },
              ].map((item, idx) => (
                <div key={`strap-b-${idx}`} className="flex items-center">
                  {idx !== 0 && <div className="h-10 w-px bg-[#1953B4] mx-6" />}
                  <div className="text-center min-w-[240px]">
                    <div className="text-xs text-[#1953B4] font-medium whitespace-pre-line">{item.role}</div>
                    <div className="text-sm text-black font-semibold mt-1 whitespace-nowrap">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;