import { useEffect, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { locationsApi } from "@/services/cmsApi";

const PresencesSection = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { ref: listRef, isVisible: listVisible, getItemStyle } = useStaggerAnimation(locations.length || 4, { staggerDelay: 150 });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await locationsApi.getAll();
        setLocations(response.locations || []);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  return (
    <section id="presences" className="py-12 lg:py-16 bg-gradient-light section-divider">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Map Illustration */}
          <div className="relative" ref={mapRef}>
            <div
              className="transition-all duration-700"
              style={{
                opacity: mapVisible ? 1 : 0,
                transform: mapVisible ? 'translateX(0) scale(1)' : 'translateX(-40px) scale(0.95)',
              }}
            >
              <img
                src="/lovable-uploads/0a2b7a81-1bc6-4992-95ae-764f073f35f7.png"
                alt="Mumbai Map showing Swastik Group's presence"
                className="w-3/5 mx-auto hover:scale-105 transition-transform duration-700"
                style={{
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '32px',
                  borderBottomLeftRadius: '32px',
                  borderBottomRightRadius: '4px'
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div ref={contentRef}>
              <h2
                className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4 transition-all duration-700"
                style={{
                  opacity: contentVisible ? 1 : 0,
                  transform: contentVisible ? 'translateX(0)' : 'translateX(30px)',
                }}
              >
                Our Presences
              </h2>
              <div
                className="h-1 bg-brand-blue rounded-full mb-6 transition-all duration-700 delay-200"
                style={{ width: contentVisible ? '5rem' : '0' }}
              />

              <p
                className="text-lg text-brand-gray leading-relaxed mb-8 transition-all duration-700 delay-300"
                style={{
                  opacity: contentVisible ? 1 : 0,
                  transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                This interactive map highlights Swastik Group's strategic development in
                Mumbai's eastern suburbs—specifically from <strong>Chembur to Mulund</strong>.
                Each marked location shows the company's footprint and offices
                across these vibrant, growing communities.
              </p>
            </div>

            <div ref={listRef} className="min-h-[100px]">
              {loading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-4">
                  {locations.length > 0 ? (
                    locations.map((location, index) => (
                      <div
                        key={location.id}
                        className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-card hover:shadow-brand transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                        style={getItemStyle(index)}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center shadow-brand group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                            {location.name}
                          </h3>
                          <p className="text-sm text-brand-gray">
                            {location.address || 'Premium residential developments'}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-brand-gray italic">No presence locations found.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresencesSection;