import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import socialInterior1 from "@/assets/social-interior-1.jpg";
import amenityPool from "@/assets/amenity-pool.jpg";
import amenityGym from "@/assets/amenity-gym.jpg";
import projectTower1 from "@/assets/project-tower-1.jpg";
import projectTower2 from "@/assets/project-tower-2.jpg";
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";

const SocialMediaSection = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const socialImages = [
    { src: socialInterior1, alt: "Modern living room interior" },
    { src: amenityPool, alt: "Luxury swimming pool" },
    { src: projectTower1, alt: "Modern residential tower" },
    { src: amenityGym, alt: "State-of-the-art gym" },
    { src: projectTower2, alt: "Contemporary building exterior" },
    { src: lifestyleInterior, alt: "Elegant home interior" },
  ];

  return (
    <section id="social-media" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
            Social Media Post
          </h2>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-8"></div>
          
          {/* Social Icons */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-brand-light-blue/20 hover:bg-brand-blue hover:text-white transition-all duration-300 hover:scale-110"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <social.icon className="w-6 h-6" />
              </Button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex flex-row overflow-x-auto gap-4 animate-slide-up max-w-6xl mx-auto snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-x-visible md:flex-none">
          {socialImages.map((image, index) => {
            // Show '+N more' overlay on the last visible image on mobile if there are more images
            const isLastVisibleMobile = index === 2 && socialImages.length > 3;
            const remaining = socialImages.length - 3;
            return (
              <div key={index} className="relative overflow-hidden custom-image-radius group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-brand flex-shrink-0 w-72 snap-center md:w-auto">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500 custom-image-radius"
                />
                {/* Overlay for '+N more' on mobile */}
                {isLastVisibleMobile && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center md:hidden">
                    <span className="text-white text-2xl font-bold">+{remaining} more</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
                  <p className="text-sm font-medium">{image.alt}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Instagram className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-brand-gray mb-4">
            Follow us on social media for the latest updates and behind-the-scenes content
          </p>
          <Button variant="brand" size="lg">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;