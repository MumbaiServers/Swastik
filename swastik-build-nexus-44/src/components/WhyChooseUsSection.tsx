import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Trophy, DollarSign } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "We're proud to finish projects on time within the delivery date."
    },
    {
      icon: Users,
      title: "Professional Team",
      description: "Our experienced team always aims for excellence, from planning projects to helping customers."
    },
    {
      icon: Trophy,
      title: "Market Leadership",
      description: "We're leaders in redevelopment, known for quality work, on-time delivery, and being open with customers and partners."
    },
    {
      icon: DollarSign,
      title: "Minimal Bureaucracy",
      description: "Our simple processes and 24/7 help make things easy for clients, creating a friendly and supportive atmosphere."
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-gradient-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
                Why Choose Us?
              </h2>
              <div className="w-20 h-1 bg-brand-blue rounded-full mb-6"></div>
            </div>
            
            <p className="text-lg text-brand-gray leading-relaxed">
              Our projects are known for their top-notch craftsmanship, smart design, 
              and solid construction, giving customers great value.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white shadow-card hover:shadow-brand transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-brand-gray text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;