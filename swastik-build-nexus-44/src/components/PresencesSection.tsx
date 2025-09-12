import { MapPin } from "lucide-react";

const PresencesSection = () => {
  const locations = [
    { name: "Chembur", active: true },
    { name: "Ghatkopar", active: true },
    { name: "Vikhroli", active: true },
    { name: "Mulund", active: true },
  ];

  return (
    <section id="presences" className="py-20 bg-gradient-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Map Illustration */}
          <div className="relative animate-fade-in">
            <img 
              src="/lovable-uploads/0a2b7a81-1bc6-4992-95ae-764f073f35f7.png" 
              alt="Mumbai Map showing Swastik Group's presence in Chembur, Ghatkopar, Vikhroli, and Mulund"
              className="w-3/5 mx-auto"
              style={{
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '32px', 
                borderBottomLeftRadius: '32px',
                borderBottomRightRadius: '4px'
              }}
            />
          </div>

          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
                Our Presences
              </h2>
              <div className="w-20 h-1 bg-brand-blue rounded-full mb-6"></div>
              
              <p className="text-lg text-brand-gray leading-relaxed mb-8">
                This interactive map highlights Swastik Group's strategic development in 
                Mumbai's eastern suburbs—specifically from <strong>Chembur to Mulund</strong>. 
                Each marked location shows the company's footprint and offices 
                across these vibrant, growing communities.
              </p>
            </div>

            <div className="space-y-4">
              {locations.map((location, index) => (
                <div 
                  key={location.name}
                  className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-card hover:shadow-brand transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center shadow-brand">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-brand-navy">
                      {location.name}
                    </h3>
                    <p className="text-sm text-brand-gray">
                      Premium residential developments
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresencesSection;