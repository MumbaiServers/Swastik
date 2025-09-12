import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import aboutInterior from "@/assets/about-interior.jpg";
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";
import ValuesMissionVisionCards from "./ValuesMissionVisionCards";
const AboutUsSection = () => {
  const stats = [{
    value: "25+",
    label: "Years of Excellence"
  }, {
    value: "1.5",
    label: "Million Sq. Ft. Developed"
  }, {
    value: "1500+",
    label: "Happy Families"
  }, {
    value: "6.5",
    label: "Lakh Sq. Ft. Under Construction"
  }, {
    value: "22",
    label: "Successful Projects"
  }, {
    value: "7",
    label: "Prime Locations"
  }];
  return <section id="about" className="py-20 bg-gradient-light">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Who we are section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
                Who we are?
              </h2>
              <div className="w-20 h-1 bg-brand-blue rounded-full mb-6"></div>
            </div>
            
            <div className="space-y-4 text-lg text-brand-gray leading-relaxed">
              <p>
                At Swastik Group, we're dedicated to honesty, openness, and 
                quality work in each stage we do. We've successfully 
                completed various projects that blend contemporary design with 
                luxury. We're proud to build durable homes and buildings that 
                are built to last expectations and leave a positive mark in the 
                construction landscape.
              </p>
              
              <p>
                Our commitment to excellence and innovation drives us to create 
                spaces that not only meet but exceed expectations, establishing 
                lasting relationships built on trust and quality craftsmanship.
              </p>
            </div>
            
            <Link to="/about-us">
              <Button variant="brand" size="lg" className="mt-6">
                Know More
              </Button>
            </Link>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="relative overflow-hidden custom-image-radius shadow-2xl">
              <img src={aboutInterior} alt="Modern interior architecture" className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500 custom-image-radius" />
            </div>
          </div>
        </div>

        {/* Values, Vision, Mission section */}
        <div className="mb-16 animate-fade-in">
          <ValuesMissionVisionCards />
        </div>
      </div>
    </section>;
};
export default AboutUsSection;