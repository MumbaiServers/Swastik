
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Trophy, DollarSign, Loader2 } from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { featureCardsApi } from "@/services/cmsApi";

const iconMap: Record<string, any> = {
  'Timely Delivery': Clock,
  'Professional Team': Users,
  'Market Leadership': Trophy,
  'Minimal Bureaucracy': DollarSign,
};

const gradientMap = [
  "from-blue-500 to-blue-600",
  "from-indigo-500 to-blue-500",
  "from-blue-600 to-cyan-500",
  "from-cyan-500 to-blue-500",
];

const WhyChooseUsSection = () => {
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible, getItemStyle } = useStaggerAnimation(features.length || 4, { staggerDelay: 150 });

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        const response = await featureCardsApi.getAll('home');
        setFeatures(response.cards || []);
      } catch (error) {
        console.error('Failed to fetch feature cards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  return (
    <section id="why-choose-us" className="py-12 lg:py-16 bg-gradient-light section-divider">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6" ref={titleRef}>
            <div>
              <h2
                className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4 transition-all duration-700"
                style={{
                  opacity: titleVisible ? 1 : 0,
                  transform: titleVisible ? 'translateX(0)' : 'translateX(-30px)',
                }}
              >
                Why Choose Us?
              </h2>
              <div
                className="h-1 bg-brand-blue rounded-full mb-6 transition-all duration-700 delay-200"
                style={{ width: titleVisible ? '5rem' : '0' }}
              />
            </div>

            <p
              className="text-lg text-brand-gray leading-relaxed transition-all duration-700 delay-300"
              style={{
                opacity: titleVisible ? 1 : 0,
                transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              Our projects are known for their top-notch craftsmanship, smart design,
              and solid construction, giving customers great value.
            </p>
          </div>

          <div
            ref={cardsRef}
            className="flex overflow-x-auto md:grid md:grid-cols-2 gap-4 md:gap-6 projects-scroll snap-x snap-mandatory pb-4"
          >
            {loading ? (
              <div className="col-span-2 flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              features.map((feature, index) => {
                const Icon = iconMap[feature.title] || Trophy;
                const gradient = gradientMap[index % gradientMap.length];

                return (
                  <Card
                    key={feature.id}
                    className="bg-white shadow-card hover:shadow-brand transition-all duration-500 hover:-translate-y-2 min-w-[260px] md:min-w-0 snap-center group cursor-pointer"
                    style={getItemStyle(index)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-brand-navy mb-3 group-hover:text-brand-blue transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-brand-gray text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;