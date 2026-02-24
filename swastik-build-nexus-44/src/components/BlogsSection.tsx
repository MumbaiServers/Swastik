
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { blogsApi, getImageUrl } from "@/services/cmsApi";

const gradientMap = [
  "from-blue-500 via-blue-600 to-indigo-600",
  "from-emerald-500 via-teal-600 to-cyan-600",
  "from-violet-500 via-purple-600 to-blue-600",
  "from-orange-500 via-amber-600 to-yellow-600",
];

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible, getItemStyle } = useStaggerAnimation(blogs.length || 4, { staggerDelay: 120 });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogsApi.getPublished();
        // Take top 4 for the home page
        setBlogs(response.blogs?.slice(0, 4) || []);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section id="blogs" className="py-12 lg:py-16 bg-gradient-light section-divider">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12" ref={titleRef}>
          <h2
            className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4 transition-all duration-700"
            style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Blogs
          </h2>
          <div
            className="h-1 bg-brand-blue rounded-full mx-auto mb-6 transition-all duration-700 delay-200"
            style={{ width: titleVisible ? '5rem' : '0' }}
          />
          <p
            className="text-lg text-brand-gray max-w-2xl mx-auto transition-all duration-700 delay-300"
            style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? 'translateY(0)' : 'translateY(15px)',
            }}
          >
            Stay informed with our latest insights, market analysis, and expert advice on real estate trends
          </p>
        </div>

        <div
          ref={cardsRef}
          className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 projects-scroll snap-x snap-mandatory pb-4 mobile-full-bleed px-4"
        >
          {loading ? (
            <div className="col-span-4 flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            blogs.map((blog, index) => {
              const gradient = gradientMap[index % gradientMap.length];
              const date = new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <Card
                  key={blog.id}
                  className="group min-w-[280px] md:min-w-0 overflow-hidden shadow-card hover:shadow-brand transition-all duration-500 hover:-translate-y-2 bg-white snap-center cursor-pointer"
                  style={getItemStyle(index)}
                >
                  <Link to={`/blogs/${blog.slug}`}>
                    <div className="relative overflow-hidden">
                      {blog.image ? (
                        <img
                          src={getImageUrl(blog.image) || ''}
                          alt={blog.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className={`w-full h-48 bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-700`}>
                          <div className="text-white text-center p-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                              <Calendar className="w-8 h-8" />
                            </div>
                            <p className="text-sm opacity-90 font-medium">{blog.category || 'General'}</p>
                          </div>
                        </div>
                      )}
                      {blog.category && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-xs font-medium text-brand-navy">{blog.category}</span>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2">
                          {blog.title}
                        </h3>

                        <p className="text-sm text-brand-gray leading-relaxed line-clamp-3">
                          {blog.excerpt || blog.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...'}
                        </p>

                        <div className="flex items-center justify-between text-xs text-brand-gray pt-2 border-t border-border">
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>Admin</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{date}</span>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full mt-4 text-brand-blue hover:text-brand-blue hover:bg-brand-light-blue/20 group-hover:gap-3 transition-all duration-300"
                        >
                          Read More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              );
            })
          )}
        </div>

        {!loading && blogs.length > 0 && (
          <div
            className="text-center transition-all duration-700 delay-500"
            style={{
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? 'translateY(0)' : 'translateY(15px)',
            }}
          >
            <Link to="/blogs">
              <Button variant="brand" size="lg" className="hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-0.5 transition-all duration-300">
                View All Blogs
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsSection;