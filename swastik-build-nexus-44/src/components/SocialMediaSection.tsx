import { useEffect, useState } from "react";
import { Instagram, Facebook, Linkedin, Youtube, Loader2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { socialMediaApi, getImageUrl } from "@/services/cmsApi";

const iconMap: Record<string, any> = {
  'facebook': Facebook,
  'instagram': Instagram,
  'linkedin': Linkedin,
  'youtube': Youtube,
};

const colorMap: Record<string, string> = {
  'facebook': "hover:bg-[#1877F2]",
  'instagram': "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500",
  'linkedin': "hover:bg-[#0A66C2]",
  'youtube': "hover:bg-[#FF0000]",
};

const SocialMediaSection = () => {
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [socialPosts, setSocialPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible, getItemStyle } = useStaggerAnimation(socialPosts.length || 6, { staggerDelay: 100 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [linksRes, postsRes] = await Promise.all([
          socialMediaApi.getAll(),
          socialMediaApi.getPosts()
        ]);
        setSocialLinks(linksRes.links || []);
        setSocialPosts(postsRes.posts || []);
      } catch (error) {
        console.error('Failed to fetch social media data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="social-media" className="py-12 lg:py-16 bg-white section-divider">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12" ref={titleRef}>
          <h2
            className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4 transition-all duration-700"
            style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Social Media Post
          </h2>
          <div
            className="h-1 bg-brand-blue rounded-full mx-auto mb-8 transition-all duration-700 delay-200"
            style={{ width: titleVisible ? '5rem' : '0' }}
          />

          {/* Social Icons */}
          <div className="flex justify-center space-x-4 md:space-x-6">
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : (
              socialLinks.map((social, index) => {
                const Icon = iconMap[social.platform.toLowerCase()] || Globe;
                const colorClass = colorMap[social.platform.toLowerCase()] || 'hover:bg-brand-blue';

                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className={`w-12 h-12 rounded-full bg-brand-light-blue/20 flex items-center justify-center ${colorClass} hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    style={{
                      opacity: titleVisible ? 1 : 0,
                      transform: titleVisible ? 'translateY(0) scale(1)' : 'translateY(15px) scale(0.8)',
                      transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${300 + index * 100}ms`,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })
            )}
          </div>
        </div>

        {/* Image Grid */}
        <div
          ref={gridRef}
          className="flex flex-row overflow-x-auto gap-4 max-w-6xl mx-auto snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-x-visible md:flex-none projects-scroll"
        >
          {socialPosts.map((post, index) => {
            const isLastVisibleMobile = index === 2 && socialPosts.length > 3;
            const remaining = socialPosts.length - 3;
            return (
              <a
                key={post.id}
                href={post.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden custom-image-radius group cursor-pointer transition-all duration-500 hover:shadow-brand flex-shrink-0 w-72 snap-center md:w-auto"
                style={getItemStyle(index)}
              >
                <img
                  src={getImageUrl(post.image)!}
                  alt={post.alt || "Social post"}
                  className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-700 custom-image-radius"
                />
                {/* Overlay for '+N more' on mobile */}
                {isLastVisibleMobile && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center md:hidden backdrop-blur-sm">
                    <span className="text-white text-2xl font-bold">+{remaining} more</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
                  <p className="text-sm font-medium">{post.alt}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors duration-200">
                    <Instagram className="w-4 h-4 text-white" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div
          className="text-center mt-10"
          style={{
            opacity: gridVisible ? 1 : 0,
            transform: gridVisible ? 'translateY(0)' : 'translateY(15px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
          }}
        >
          <p className="text-brand-gray mb-4">
            Follow us on social media for the latest updates and behind-the-scenes content
          </p>
          <Button variant="brand" size="lg" className="hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-0.5 transition-all duration-300">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;