import { useParams } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EMICalculator from "@/components/EMICalculator";
import BlogsSection from "@/components/BlogsSection";
import FAQSection from "@/components/FAQSection";
import ProjectsSection from "@/components/ProjectsSection";
import { projectsApi, statisticsApi, getImageUrl } from "@/services/cmsApi";
import { Loader2, MapPin, ChevronUp, X, ArrowRight, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";
import ContactFormModal from "@/components/ContactFormModal";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const ProjectDetails = () => {
  const { projectId: slug } = useParams();
  const [activeAmenityTab, setActiveAmenityTab] = useState("podium");
  const [activeFloorPlanTab, setActiveFloorPlanTab] = useState("");
  const [currentFloorPlanIndex, setCurrentFloorPlanIndex] = useState(0);
  const [project, setProject] = useState<any>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);

  useEffect(() => {
    const submitted = localStorage.getItem('contactFormSubmitted') === 'true';
    if (submitted) {
      setHasSubmittedForm(true);
    }
  }, []);

  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!slug) return;
        setLoading(true);
        const [projectData, statsData] = await Promise.all([
          projectsApi.getBySlug(slug),
          statisticsApi.getAll()
        ]);
        setProject(projectData.project);
        setStats(statsData.statistics || []);
      } catch (err: any) {
        console.error("Failed to fetch project:", err);
        setError(err.message || "Project not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  const amenities = useMemo(() => {
    if (!project) return { podium: [], rooftop: [] };
    return {
      podium: project.amenities?.filter((a: any) => a.category === 'podium').map((a: any) => a.name) || [],
      rooftop: project.amenities?.filter((a: any) => a.category === 'rooftop').map((a: any) => a.name) || []
    };
  }, [project]);

  const floorPlanImages = useMemo(() => {
    if (!project) return [];

    // If it's multiple wings and a wing is selected, try to find the specific image for that wing
    if (project.towerType === 'multiple' && activeFloorPlanTab) {
      try {
        const wingDetails = JSON.parse(project.wingDetails || '[]');
        const wingInfo = wingDetails.find((w: any) => w.name === activeFloorPlanTab || (activeFloorPlanTab === 'Main' && (!w.name || w.name === 'Default')));
        if (wingInfo && wingInfo.image) {
          return [getImageUrl(wingInfo.image)];
        }
      } catch (e) {
        console.error("Failed to parse wingDetails", e);
      }
    }

    if (!project.floorPlanImage) return [];
    try {
      const parsed = JSON.parse(project.floorPlanImage);
      if (Array.isArray(parsed)) return parsed.map((p: string) => getImageUrl(p));
    } catch {
      // Legacy single string
    }
    return [getImageUrl(project.floorPlanImage)];
  }, [project, activeFloorPlanTab]);

  const galleryImages = useMemo(() => {
    if (!project || !project.gallery || project.gallery.length === 0) return [];
    return project.gallery.map((img: any) => getImageUrl(img.imageUrl));
  }, [project]);

  const marqueeImages = useMemo(() => {
    if (galleryImages.length === 0) return [];
    return [...galleryImages, ...galleryImages];
  }, [galleryImages]);

  const galleryRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const wings = useMemo(() => {
    if (!project || project.towerType !== 'multiple' || !project.configurations) return [];
    const uniqueWings = Array.from(new Set(project.configurations.map((c: any) => c.wingName || 'Main'))) as string[];
    return uniqueWings;
  }, [project]);

  useEffect(() => {
    if (project?.towerType === 'multiple' && wings.length > 0) {
      if (!activeFloorPlanTab || !wings.includes(activeFloorPlanTab)) {
        setActiveFloorPlanTab(wings[0]);
      }
    }
  }, [wings, project, activeFloorPlanTab]);

  const filteredConfigurations = useMemo(() => {
    if (!project || !project.configurations) return [];
    if (project.towerType !== 'multiple') return project.configurations;
    const targetWing = activeFloorPlanTab === 'Main' ? '' : activeFloorPlanTab;
    return project.configurations.filter((c: any) => (c.wingName || 'Main') === activeFloorPlanTab);
  }, [project, activeFloorPlanTab]);

  // Ensure page opens at the top when navigated here
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (isPaused || marqueeImages.length === 0) return;
    const container = galleryRef.current;
    if (!container) return;
    const speedPxPerTick = 1; // adjust for speed
    const tickMs = 16; // ~60fps
    const intervalId = setInterval(() => {
      if (!container) return;
      container.scrollLeft += speedPxPerTick;
      const halfWidth = container.scrollWidth / 2;
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft = 0; // seamless loop via duplicated images
      }
    }, tickMs);
    return () => clearInterval(intervalId);
  }, [isPaused, marqueeImages]);

  // Helper to get one item scroll step based on the first card width + gap
  const getScrollStep = (): number => {
    const container = galleryRef.current;
    if (!container) return 360;
    const track = container.querySelector('div.flex');
    const firstChild = track?.firstElementChild as HTMLElement | null;
    if (!firstChild) return 360;
    const itemWidth = firstChild.getBoundingClientRect().width;
    const GAP_PX = 24; // gap-6
    return Math.round(itemWidth + GAP_PX);
  };

  const handleNext = () => {
    const container = galleryRef.current;
    if (!container) return;
    const step = getScrollStep();
    const half = container.scrollWidth / 2;
    // If advancing would cross the midpoint, wrap to start first for seamlessness
    if (container.scrollLeft + step >= half) {
      container.scrollLeft = 0;
    }
    container.scrollBy({ left: step, behavior: 'smooth' });
  };

  const handlePrev = () => {
    const container = galleryRef.current;
    if (!container) return;
    const step = getScrollStep();
    const half = container.scrollWidth / 2;
    // If at or near start, jump to midpoint first then move back by one step
    if (container.scrollLeft <= 0) {
      container.scrollLeft = half;
    }
    container.scrollBy({ left: -step, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        {/* Basic SEO snippet while data is loading */}
        <SEO title="Loading..." />
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground animate-pulse">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <h1 className="text-4xl font-bold text-destructive mb-4">Error</h1>
        <p className="text-muted-foreground text-center mb-8">{error || "Project not found"}</p>
        <Button onClick={() => window.location.href = '/projects'} variant="outline">
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* 
        This is Ultra-Dynamic SEO: It automatically pulls the specific Project Name, Project Image 
        and Description exactly from the database so that search engines and social media platforms 
        can index each property correctly. 
      */}
      <SEO
        title={project.name}
        description={project.description || `Discover ${project.name}, a premium project by Swastik Group.`}
        imageUrl={project.image ? getImageUrl(project.image) : undefined}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[100svh] md:h-screen overflow-hidden">
        <img
          src={getImageUrl(project.image) || ""}
          alt={project.name}
          className="w-full h-full object-cover"
        />

        {/* Section Navigation Ribbon - Desktop Only */}
        <div className="hidden md:block absolute left-0 right-0 bottom-0 z-20 w-full bg-[#1953B4]">
          <div className="container mx-auto px-3 md:px-6">
            <div className="flex gap-4 md:gap-8 items-center justify-center overflow-x-auto md:overflow-x-hidden py-3 md:py-4 text-white projects-scroll">
              <button onClick={() => scrollTo('overview')} className="whitespace-nowrap px-3 py-1.5 rounded-md hover:bg-white/10 text-sm md:text-base font-medium">Overview</button>
              <button onClick={() => scrollTo('connectivities')} className="whitespace-nowrap px-3 py-1.5 rounded-md hover:bg-white/10 text-sm md:text-base font-medium">Connectivities</button>
              <button onClick={() => scrollTo('amenities')} className="whitespace-nowrap px-3 py-1.5 rounded-md hover:bg-white/10 text-sm md:text-base font-medium">Amenities</button>
              <button onClick={() => scrollTo('floor-plans')} className="whitespace-nowrap px-3 py-1.5 rounded-md hover:bg-white/10 text-sm md:text-base font-medium">Floor Plans</button>
              <button onClick={() => scrollTo('developer')} className="whitespace-nowrap px-3 py-1.5 rounded-md hover:bg-white/10 text-sm md:text-base font-medium">Developer</button>
              <button onClick={() => scrollTo('other-projects')} className="whitespace-nowrap px-3 py-1.5 rounded-md hover:bg-white/10 text-sm md:text-base font-medium">Other Projects</button>
              <button onClick={() => scrollTo('contact')} className="whitespace-nowrap px-3 py-1.5 rounded-md hover:bg-white/10 text-sm md:text-base font-medium">Contact</button>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Enquiry Button */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 w-full flex flex-col items-center z-30">
          <div
            className="w-16 h-8 bg-[#2055B8] flex items-center justify-center rounded-t-[100px] cursor-pointer translate-y-[2px]"
            onClick={() => scrollTo('contact')}
          >
            <ChevronUp className="w-5 h-5 text-white animate-bounce" />
          </div>
          <div
            className="w-full bg-[#2055B8] py-4 text-center text-white font-bold text-base cursor-pointer shadow-[0_-4px_10px_rgba(0,0,0,0.15)]"
            onClick={() => scrollTo('contact')}
          >
            Enquiry Now
          </div>
        </div>
      </section>

      <div className="space-y-0">
        {/* Project Overview */}
        <section className="relative bg-[#EEF8FF]" id="overview">
          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#EEF8FF]">
            <div className="container mx-auto px-4 py-10 md:py-12">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative md:overflow-hidden overflow-visible shadow-brand">
                  <img
                    src={project.overviewImage ? getImageUrl(project.overviewImage) : lifestyleInterior}
                    alt="Project Overview"
                    className="w-full h-72 md:h-96 object-cover mobile-full-bleed"
                    style={{
                      borderTopLeftRadius: '2rem',
                      borderTopRightRadius: '0',
                      borderBottomRightRadius: '2rem',
                      borderBottomLeftRadius: '0'
                    }}
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
                  <div className="w-16 h-1 bg-primary mb-4" />
                  <p className="text-base md:text-lg font-medium mb-3">{project.description}</p>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {project.fullDescription || project.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* ─── Connectivities ────────────────────────────────── */}
        <section className="relative bg-[#EEF8FF]" id="connectivities">
          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#EEF8FF]">
            <div className="container mx-auto px-4 py-10 md:py-12">
              <h2 className="text-3xl font-bold text-center mb-4">Nearby Connectivities</h2>
              <div className="w-16 h-1 bg-primary mx-auto mb-8" />
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  {project.connectivitiesDescription ? (
                    <p className="text-base md:text-lg mb-6 whitespace-pre-line text-muted-foreground leading-relaxed">
                      {project.connectivitiesDescription}
                    </p>
                  ) : (
                    <>
                      <p className="text-base md:text-lg mb-6">
                        Work, play, entertainment, shopping, schooling, health care, metro, brisk
                        connectivity and all other amenities which make our lives scattered are
                        now available near {project.name}.
                      </p>
                      <p className="text-base md:text-lg font-medium mb-6">
                        True to our times, true to commitments, nestled in nature, steeped in
                        convenience, completely secure - {project.name} your dream
                        residence in more than just one way.
                      </p>
                    </>
                  )}
                  <h3 className="text-xl font-bold mb-4 mt-8">Key destinations on your doorstep</h3>
                  <ul className="space-y-3">
                    {project.connectivities?.map((connectivity: any, index: number) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>{connectivity.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className="w-full h-72 md:h-80 md:overflow-hidden overflow-visible rounded-2xl border border-[#1953B4]/10 shadow-brand">
                    {project.connectivitiesImage ? (
                      <img
                        src={getImageUrl(project.connectivitiesImage) || ""}
                        alt="Project Location Map"
                        className="w-full h-full object-cover mobile-full-bleed"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#DAEFFF] to-[#EEF8FF] flex items-center justify-center">
                        <div className="text-center text-[#1953B4]">
                          <div className="text-2xl font-bold mb-2">Location Map</div>
                          <div className="text-lg">Map image coming soon</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {marqueeImages.length > 0 && (
          <section className="container mx-auto px-4 py-12 md:py-20">
            <h2 className="text-3xl font-bold text-center mb-4">Gallery</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-8" />

            <div className="relative max-w-6xl mx-auto">
              {/* Controls */}
              <button
                aria-label="Previous"
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary shadow rounded-full w-9 h-9 flex items-center justify-center"
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary shadow rounded-full w-9 h-9 flex items-center justify-center"
              >
                ›
              </button>

              {/* Track */}
              <div
                ref={galleryRef}
                className="overflow-x-auto projects-scroll px-10"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
              >
                <div className="flex gap-6 w-max">
                  {marqueeImages.map((image, index) => (
                    <div key={index} className="flex-shrink-0">
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-[340px] h-[220px] md:w-[400px] md:h-[250px] lg:w-[440px] lg:h-[280px] object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Amenities */}
        {(amenities.podium.length > 0 || amenities.rooftop.length > 0) && (
          <section className="relative" id="amenities">
            <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#EEF8FF]">
              <div className="container mx-auto px-4 py-10 md:py-12">
                <h2 className="text-3xl font-bold text-center mb-4">Amenities</h2>
                <div className="w-16 h-1 bg-primary mx-auto mb-6" />
                <p className="text-center text-muted-foreground mb-8">
                  Resident's refined recreational and executive facilities
                </p>

                {/* Amenity Tabs */}
                {amenities.podium.length > 0 && amenities.rooftop.length > 0 && (
                  <div className="flex justify-center mb-8">
                    <div className="bg-white/70 rounded-lg p-1 inline-flex">
                      <Button
                        variant={activeAmenityTab === "podium" ? "default" : "ghost"}
                        onClick={() => setActiveAmenityTab("podium")}
                        className="px-8"
                      >
                        Podium
                      </Button>
                      <Button
                        variant={activeAmenityTab === "rooftop" ? "default" : "ghost"}
                        onClick={() => setActiveAmenityTab("rooftop")}
                        className="px-8"
                      >
                        Rooftop
                      </Button>
                    </div>
                  </div>
                )}

                <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-20 items-center">
                  <div className="relative">
                    <img
                      src={getImageUrl(project.amenitiesImage || project.image) || ""}
                      alt="Amenities"
                      className="w-full object-cover"
                      style={{
                        borderTopLeftRadius: '200px',
                        borderTopRightRadius: '0',
                        borderBottomRightRadius: '200px',
                        borderBottomLeftRadius: '0',
                        height: '431px'
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:pr-40">
                    {amenities[activeAmenityTab as keyof typeof amenities].map((amenity: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-white hover:bg-white hover:shadow-md transition-all group">
                        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-xs group-hover:bg-brand-blue group-hover:text-white transition-colors">
                          {index + 1}
                        </div>
                        <span className="text-foreground font-medium text-sm md:text-base">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Floor Plans ───────────────────────────────────── */}
        {project.configurations?.length > 0 && (
          <section id="floor-plans" className="container mx-auto px-4 py-12 md:py-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Floor Plans and Configurations</h2>
            <div className="w-24 md:w-44 h-1 md:h-2 bg-[#1953B4] mx-auto mb-8 rounded-full" />

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="hidden lg:block relative group">
                {floorPlanImages.length > 0 ? (
                  <div className="relative overflow-hidden">
                    <img
                      src={floorPlanImages[currentFloorPlanIndex] || lifestyleInterior}
                      alt={`Floor Plan ${currentFloorPlanIndex + 1}`}
                      className="w-full h-[450px] object-contain transition-all duration-300"
                    />

                    {floorPlanImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentFloorPlanIndex(prev => (prev === 0 ? floorPlanImages.length - 1 : prev - 1))}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary shadow-lg rounded-full w-10 h-10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => setCurrentFloorPlanIndex(prev => (prev === floorPlanImages.length - 1 ? 0 : prev + 1))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary shadow-lg rounded-full w-10 h-10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                        >
                          ›
                        </button>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                          {currentFloorPlanIndex + 1} / {floorPlanImages.length}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="">
                    <img
                      src={lifestyleInterior}
                      alt="Floor Plan placeholder"
                      className="w-full h-[450px] object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                {project.towerType === 'multiple' && wings.length > 0 && (
                  <div className="border-b border-gray-300 mb-6 flex gap-4 md:gap-8 justify-between md:justify-start overflow-x-auto">
                    {wings.map(wing => (
                      <button
                        key={wing}
                        onClick={() => setActiveFloorPlanTab(wing)}
                        className={`pb-3 -mb-px text-sm md:text-lg transition-colors flex-1 md:flex-none text-center whitespace-nowrap ${activeFloorPlanTab === wing
                          ? 'text-gray-900 border-b-[3px] border-gray-600 font-medium'
                          : 'text-gray-400 hover:text-gray-600'
                          }`}
                      >
                        {wing} Wing
                      </button>
                    ))}
                  </div>
                )}

                <div className="space-y-4">
                  {filteredConfigurations.map((config: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center rounded-xl border border-gray-400 bg-white px-4 py-3 shadow-none hover:shadow-md transition"
                    >
                      <div className="text-sm md:text-base text-gray-800">{config.type}</div>
                      <div className="text-sm md:text-base text-gray-800">{config.area}</div>
                      <div
                        className="text-sm md:text-base text-brand-blue font-semibold underline underline-offset-2 cursor-pointer hover:text-brand-navy transition-colors"
                        onClick={() => {
                          if (hasSubmittedForm) return;
                          setIsContactModalOpen(true);
                        }}
                      >
                        {hasSubmittedForm ? config.price : "Check Price"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile/Tablet Buttons */}
                <div className="mt-8 flex justify-center gap-4 lg:hidden">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="px-6 py-5 rounded-lg text-[#1953B4] bg-[#DEF0FF] hover:bg-[#DEF0FF]/80 flex-1 font-medium shadow-none">
                        View Floor Plan
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-1 bg-white border-0 overflow-y-auto max-h-[85vh] projects-scroll">
                      {floorPlanImages.length > 0 ? (
                        <div className="flex flex-col gap-6 p-4">
                          {floorPlanImages.map((src, idx) => (
                            <img
                              key={idx}
                              src={src || lifestyleInterior}
                              alt={`Floor Plan ${idx + 1}`}
                              className="w-full h-auto object-contain rounded-lg"
                            />
                          ))}
                        </div>
                      ) : (
                        <img
                          src={lifestyleInterior}
                          alt="Floor Plan"
                          className="w-full h-auto object-contain rounded-lg max-h-[80vh]"
                        />
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button className="px-6 py-5 rounded-lg text-white bg-[#1953B4] hover:bg-brand-navy flex-1 font-medium shadow-none">
                    Download Floor Plan
                  </Button>
                </div>

                {/* Desktop Download Button */}
                <div className="mt-8 hidden lg:flex justify-center">
                  <Button className="px-8 py-6 rounded-full text-white bg-brand-blue shadow-brand hover:bg-brand-blue/90" size="lg">
                    Download Floor Plan
                  </Button>
                </div>
              </div>
            </div>

            {/* MAHARERA Details */}
            {project.maharera && (
              <div
                className="mt-10 md:mt-12 bg-primary text-white px-6 md:px-8 py-4 md:py-5"
                style={{
                  borderTopLeftRadius: '6rem',
                  borderTopRightRadius: '0',
                  borderBottomRightRadius: '6rem',
                  borderBottomLeftRadius: '0',
                }}
              >
                <div className="grid md:grid-cols-[auto,1fr] gap-4 md:gap-6">
                  <div className="flex flex-col items-center md:items-start shrink-0">
                    <div className="mt-4 md:mt-6 w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl flex items-center justify-center mb-2 relative overflow-hidden p-2 shadow-inner">
                      {project.mahareraQr ? (
                        <img
                          src={getImageUrl(project.mahareraQr) || ""}
                          alt="MahaRERA QR code"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-300 text-[10px] text-center px-1">MahaRERA QR Pending</div>
                      )}
                    </div>
                    <p className="text-[10px] md:text-xs opacity-90 mt-1">MahaRERA QR code</p>
                  </div>
                  <div className="space-y-4 flex flex-col justify-center text-center md:text-left overflow-hidden">
                    <div className="space-y-1">
                      <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider">MAHARERA DETAILS</h3>
                      <p className="text-sm md:text-lg font-bold break-all md:break-normal">
                        <a
                          href={project.mahareraUrl || "https://maharera.mahaonline.gov.in"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4 hover:opacity-80 transition-opacity"
                        >
                          {project.mahareraUrl || "https://maharera.mahaonline.gov.in"}
                        </a>
                      </p>
                      <p className="text-sm md:text-lg font-bold">MahaRERA No.: {project.maharera}</p>
                      <p className="text-sm md:text-lg font-bold">Project Finance by: {project.financeBy || "Bajaj Housing Finance Limited"}</p>
                    </div>

                    <div className="pt-2 border-t border-white/20">
                      <p className="text-[10px] md:text-sm opacity-90 leading-relaxed text-center md:text-left">
                        <strong>Disclaimer:</strong> {project.disclaimer || "This is not a legal document and is for representation purpose only. All the images and information are for reference purpose only and subject to change without prior notice. The Promoter/Developer reserves the right to make any alterations, additions, or amendments as may be required. T&C apply."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* EMI Calculator */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">EMI Calculator</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-8 md:mb-12" />
          <EMICalculator hideHeading />
        </section>
      </div>

      {/* About Developer + Stats + Projects */}
      <section className="py-12 lg:py-20 bg-[#DDF4FF]" id="developer">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-0">
            <div className="bg-[#D0EBFD] p-8 lg:p-12 rounded-[30px] relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">About Developer</h2>
              <div className="w-24 h-2 bg-[#5CA1F1] mb-6"></div>
              <p className="text-gray-700 leading-relaxed text-base lg:text-lg whitespace-pre-line">
                {project.aboutDeveloperText || `At Swastik Group, we're dedicated to honesty, openness, and quality work
                in each single thing we do. We've successfully completed various projects
                that blend contemporary design with luxury. We're proud to build durable
                homes and buildings that reflects comfortable living. With a committed
                and talented team, we aim to top expectations and leave a positive
                mark in the communities we serve.`}
              </p>
            </div>

            <div className="relative h-auto lg:h-full flex justify-center lg:justify-end">
              <img
                src={project.aboutDeveloperImage ? getImageUrl(project.aboutDeveloperImage) : lifestyleInterior}
                alt="Developer Visual"
                className="w-full aspect-square md:aspect-auto h-auto md:h-[400px] lg:h-[597px] object-cover shadow-lg"
                style={{
                  width: '100%',
                  maxWidth: '597px',
                  borderTopLeftRadius: '200px',
                  borderTopRightRadius: '0',
                  borderBottomRightRadius: '40px',
                  borderBottomLeftRadius: '0'
                }}
              />
            </div>
          </div>

          {/* Stats Bar - Animated Marquee ditto to Index.tsx */}
          <div className="relative z-20 -mt-16 lg:-mt-24 mx-4 lg:mx-0 overflow-hidden mb-16 lg:mb-24" ref={statsRef}>
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

          {/* Other Projects */}
          <div className="mt-0" id="other-projects">
            <ProjectsSection />
          </div>

          {/* Blogs section */}
          <div className="mt-0">
            <BlogsSection />
          </div>

          {/* FAQ section */}
          <div className="mt-0">
            <FAQSection />
          </div>
        </div>
      </section>

      {/* Contact anchor maps to footer for now */}
      <div id="contact" />

      <Footer />

      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false);
          // Check if it was submitted during this modal session
          if (localStorage.getItem('contactFormSubmitted') === 'true') {
            setHasSubmittedForm(true);
          }
        }}
      />
    </div>
  );
};

export default ProjectDetails;