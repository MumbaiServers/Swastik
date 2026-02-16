import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import projectTower1 from "@/assets/project-tower-1.jpg";
import projectTower2 from "@/assets/project-tower-2.jpg";
import projectTower3 from "@/assets/project-tower-3.jpg";

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("completed");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const projects = {
    completed: [
      {
        id: 1,
        slug: "swastik-elite",
        name: "Swastik Elite",
        location: "Ghatkopar West",
        image: projectTower1,
        description: "Luxury residential complex with modern amenities",
      },
      {
        id: 2,
        slug: "swastik-heights",
        name: "Swastik Heights",
        location: "Vikhroli East",
        image: projectTower2,
        description: "Premium high-rise apartments with scenic views",
      },
      {
        id: 3,
        slug: "swastik-grandeur",
        name: "Swastik Grandeur",
        location: "Mulund West",
        image: projectTower3,
        description: "Contemporary living spaces with world-class facilities",
      },
    ],
    ongoing: [
      {
        id: 4,
        slug: "swastik-crown",
        name: "Swastik Crown",
        location: "Chembur East",
        image: projectTower1,
        description: "Ultra-modern residential tower under construction",
      },
      {
        id: 5,
        slug: "swastik-palace",
        name: "Swastik Palace",
        location: "Ghatkopar East",
        image: projectTower2,
        description: "Luxurious apartments with premium amenities",
      },
    ],
  };

  const handleViewDetails = (projectSlug: string) => {
    navigate(`/project/${projectSlug}`);
  };

  return (
    <section id="projects" className="py-12 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
            Our Projects
          </h2>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-8"></div>
        </div>

        <div className="text-center mb-12 animate-fade-in">

          {/* Tab Navigation */}
          <div className="flex justify-center space-x-2 bg-brand-light-gray rounded-lg p-2 inline-flex">
            <Button
              variant={activeTab === "completed" ? "default" : "ghost"}
              size="lg"
              onClick={() => setActiveTab("completed")}
              className={`px-8 ${activeTab === "completed" ? "bg-[#1953B4] hover:bg-[#1953B4]/90 text-white" : ""}`}
            >
              Completed
            </Button>
            <Button
              variant={activeTab === "ongoing" ? "brand" : "ghost"}
              size="lg"
              onClick={() => setActiveTab("ongoing")}
              className="px-8"
            >
              Ongoing
            </Button>
          </div>
        </div>

        {/* Projects Grid/Scroll */}
        <div
          className={
            isMobile
              ? "flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory projects-scroll animate-slide-up"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up"
          }
        >
          {projects[activeTab as keyof typeof projects].map((project, index) => (
            <div
              key={project.id}
              className={`group relative flex-shrink-0 transition-all duration-500 hover:-translate-y-2 ${isMobile ? 'snap-center' : ''
                }`}
              style={{
                width: '387px',
                height: '435px',
                // Responsive adjustments if needed, but user asked for specific px.
                // We'll let max-width handle shrinking on very small devices if container restricts it.
                maxWidth: '100%',
                // Removed overflow: hidden so the label can pop out
                marginBottom: '40px', // Add margin to account for the pop-out label
                animationDelay: `${index * 100}ms`
              }}
              onClick={() => handleViewDetails(project.slug)}
            >
              <div
                className="w-full h-full relative"
                style={{
                  borderTopLeftRadius: '100px',
                  borderBottomRightRadius: '100px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
                }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Blue Label Label - Popped out */}
              <div
                className="absolute left-1/2 -translate-x-1/2 bg-[#1953B4] text-white text-center py-3 px-6 shadow-xl z-20"
                style={{
                  bottom: '-25px', // Pushed out of the box
                  width: '70%',
                  maxWidth: '280px',
                  borderRadius: '8px' // Standard rounded corners for a "separate box" look
                }}
              >
                <h3 className="text-lg font-bold leading-tight">{project.name}</h3>
                <p className="text-sm opacity-90">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;