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
    <section id="projects" className="py-20 bg-white">
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
              variant={activeTab === "completed" ? "brand" : "ghost"}
              size="lg"
              onClick={() => setActiveTab("completed")}
              className="px-8"
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
            <Card 
              key={project.id} 
              className={`group overflow-hidden shadow-card hover:shadow-brand transition-all duration-500 hover:-translate-y-2 ${
                isMobile ? 'flex-shrink-0 w-80 snap-center' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{
                    borderTopLeftRadius: '2rem',
                    borderTopRightRadius: '0',
                    borderBottomRightRadius: '2rem',
                    borderBottomLeftRadius: '0'
                  }}
                />
                {/* NEW RELEASE popup for first project */}
                {index === 0 && (
                  <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-95 group-hover:scale-100">
                    NEW RELEASE
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-sm opacity-90">{project.location}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-brand-gray text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium text-brand-blue">
                      📍 {project.location}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-brand-blue hover:text-brand-blue"
                      onClick={() => handleViewDetails(project.slug)}
                    >
                      View Details →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;