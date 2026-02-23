import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Eye, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FAQSection from '@/components/FAQSection';
import { projectsApi, getImageUrl } from '@/services/cmsApi';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('completed');
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getAll();
        setAllProjects(data.projects || []);
      } catch (err: any) {
        console.error("Failed to fetch projects:", err);
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const projects = useMemo(() => {
    return {
      completed: allProjects.filter(p => p.status.toLowerCase() === 'completed'),
      ongoing: allProjects.filter(p => p.status.toLowerCase() === 'ongoing' || p.status.toLowerCase() === 'planning')
    };
  }, [allProjects]);



  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        {/* Basic SEO while projects load */}
        <SEO title="Loading..." description="Loading projects" />
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  const consultants = [
    { role: "MEP Consultant", name: "Mr. Rupesh Gujrathi" },
    { role: "PMC", name: "Epsilon Project Management" },
    { role: "Vastu Consultant", name: "Kamlesh Vastu Engineer" },
    { role: "Legal Consultant", name: "Lexicon Law Partners" },
    { role: "Design Architect", name: "Karch Architects" },
    { role: "Liasoning Architect", name: "Sai Sampada DBS" },
    { role: "Landscaping & Interior Design", name: "Madane Design Workshop" },
    { role: "RCC Consultant", name: "System Structural Consultant Pvt Ltd" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* SEO configuration for the main Projects portfolio page */}
      <SEO title="Our Projects" description="Explore our portfolio of completed and ongoing residential and commercial projects in Mumbai." />
      <Header />

      {/* Blue Gradient Filter Banner */}
      <section className="py-6 bg-[#1953B4]">
        <div className="container mx-auto px-4 overflow-x-auto projects-scroll">
          <div className="flex items-center justify-start lg:justify-center gap-6 md:gap-8 text-white min-w-max">
            <button className="flex items-center gap-2 hover:text-white/80 transition-colors whitespace-nowrap">
              <span className="text-sm md:text-base font-medium">Location</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="flex items-center gap-2 hover:text-white/80 transition-colors whitespace-nowrap">
              <span className="text-sm md:text-base font-medium">Project Type</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="flex items-center gap-2 hover:text-white/80 transition-colors whitespace-nowrap">
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
                  ? 'bg-[#1953B4] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }`}
              >
                Ongoing
              </Button>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects[activeTab as keyof typeof projects].map((project) => (
            <Card
              key={project.id}
              className="group border-none shadow-brand overflow-hidden flex flex-col h-full hover:translate-y-[-8px] transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={getImageUrl(project.image) || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1953B4] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {project.tag || project.subtitle || "Residential"}
                  </span>
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <div className="flex items-center gap-1 text-brand-blue mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{project.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors">
                    {project.name}
                  </h3>
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                  {project.configuration && (
                    <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Configuration</span>
                      <span className="font-semibold text-gray-800">{project.configuration}</span>
                    </div>
                  )}
                  {project.price && (
                    <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Price</span>
                      <span className="font-semibold text-brand-blue">{project.price}</span>
                    </div>
                  )}
                  <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                    {project.description}
                  </p>
                </div>

                <Button
                  onClick={() => navigate(`/project/${project.slug}`)}
                  className="w-full bg-[#1953B4] hover:bg-brand-navy text-white group/btn"
                >
                  <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects[activeTab as keyof typeof projects].length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <p className="text-xl text-gray-500">No {activeTab} projects found.</p>
          </div>
        )}

        {/* Dynamic FAQ Section */}
        <div className="mt-16 lg:mt-24">
          <FAQSection />
        </div>
      </main>

      {/* Consultant Marquee */}
      <section className="overflow-hidden py-8 relative bg-[#E1F1FF] w-full">
        <div
          className="flex items-center w-full overflow-hidden [--duration:40s] [--gap:0px]"
        >
          <div className="flex w-max animate-marquee">
            {[...consultants, ...consultants].map((consultant, index) => (
              <div key={index} className="inline-flex items-center text-center h-full flex-shrink-0">
                <div className="flex flex-col items-center justify-center px-8 lg:px-14">
                  <span className="text-[10px] lg:text-sm font-medium text-brand-navy mb-1">{consultant.role}</span>
                  <span className="text-xs lg:text-base font-bold text-brand-navy">{consultant.name}</span>
                </div>
                {/* Vertical Divider */}
                <div className="h-12 w-[2px] bg-[#1953B4]" />
              </div>
            ))}
          </div>
          <div className="flex w-max animate-marquee" aria-hidden="true">
            {[...consultants, ...consultants].map((consultant, index) => (
              <div key={`dup-${index}`} className="inline-flex items-center text-center h-full flex-shrink-0">
                <div className="flex flex-col items-center justify-center px-8 lg:px-14">
                  <span className="text-[10px] lg:text-sm font-medium text-brand-navy mb-1">{consultant.role}</span>
                  <span className="text-xs lg:text-base font-bold text-brand-navy">{consultant.name}</span>
                </div>
                {/* Vertical Divider */}
                <div className="h-12 w-[2px] bg-[#1953B4]" />
              </div>
            ))}
          </div>
        </div>
      </section >

      <Footer />
    </div >
  );
};

export default Projects;