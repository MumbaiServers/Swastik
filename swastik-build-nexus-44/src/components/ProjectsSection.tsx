import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { projectsApi, getImageUrl } from "@/services/cmsApi";
import { Loader2 } from "lucide-react";

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("completed");
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  const projects = useMemo(() => {
    return {
      completed: allProjects.filter(p => p.status.toLowerCase() === 'completed'),
      ongoing: allProjects.filter(p => p.status.toLowerCase() === 'ongoing' || p.status.toLowerCase() === 'planning')
    };
  }, [allProjects]);

  const currentProjects = projects[activeTab as keyof typeof projects];
  const { ref: cardsRef, isVisible: cardsVisible, getItemStyle } = useStaggerAnimation(currentProjects.length > 0 ? currentProjects.length : 3, { staggerDelay: 200 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getAll();
        setAllProjects(data.projects || []);
      } catch (err: any) {
        console.error("Failed to fetch projects for section:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleViewDetails = (projectSlug: string) => {
    navigate(`/project/${projectSlug}`);
  };

  return (
    <section id="projects" className="py-12 lg:py-16 bg-white section-divider">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12" ref={titleRef}>
          <h2
            className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6 transition-all duration-700"
            style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Our Projects
          </h2>
          <div
            className="h-1 bg-brand-blue rounded-full mx-auto mb-8 transition-all duration-700 delay-200"
            style={{ width: titleVisible ? '5rem' : '0' }}
          />
        </div>

        <div
          className="text-center mb-12 transition-all duration-500 delay-300"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(15px)',
          }}
        >
          {/* Tab Navigation */}
          <div className="flex justify-center space-x-2 bg-brand-light-gray rounded-xl p-1.5 inline-flex">
            <Button
              variant={activeTab === "completed" ? "default" : "ghost"}
              size="lg"
              onClick={() => setActiveTab("completed")}
              className={`px-8 rounded-lg transition-all duration-300 ${activeTab === "completed" ? "bg-[#1953B4] hover:bg-[#1953B4]/90 text-white shadow-lg shadow-blue-900/20" : "hover:bg-gray-100"}`}
            >
              Completed
            </Button>
            <Button
              variant={activeTab === "ongoing" ? "default" : "ghost"}
              size="lg"
              onClick={() => setActiveTab("ongoing")}
              className={`px-8 rounded-lg transition-all duration-300 ${activeTab === "ongoing" ? "bg-[#1953B4] text-white shadow-lg shadow-blue-900/20" : "hover:bg-gray-100"}`}
            >
              Ongoing
            </Button>
          </div>
        </div>

        {/* Projects Grid/Scroll Wrapper - Stable Ref */}
        <div ref={cardsRef} className="min-h-[400px]">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : currentProjects.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-xl text-gray-500">No {activeTab} projects found.</p>
            </div>
          ) : (
            <div
              className={
                isMobile
                  ? "flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory projects-scroll mobile-full-bleed px-4"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              }
            >
              {currentProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group relative flex-shrink-0 cursor-pointer ${isMobile ? 'snap-center' : ''}`}
                  style={{
                    width: isMobile ? '387px' : 'auto',
                    height: '435px',
                    maxWidth: '100%',
                    marginBottom: '40px',
                    ...getItemStyle(index),
                  }}
                  onClick={() => handleViewDetails(project.slug)}
                >
                  <div
                    className="w-full h-full relative bg-blue-50/50 flex items-center justify-center"
                    style={{
                      borderTopLeftRadius: '100px',
                      borderBottomRightRadius: '100px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
                    }}
                  >
                    <img
                      src={getImageUrl(project.image) || ""}
                      alt={project.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Blue Label - Popped out */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 bg-[#1953B4] text-white text-center py-3 px-6 shadow-xl z-20 group-hover:scale-105 transition-transform duration-500"
                    style={{
                      bottom: '-25px',
                      width: '70%',
                      maxWidth: '280px',
                      borderRadius: '8px'
                    }}
                  >
                    <h3 className="text-lg font-bold leading-tight truncate px-2">{project.name}</h3>
                    <p className="text-sm opacity-90 truncate px-2">{project.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;