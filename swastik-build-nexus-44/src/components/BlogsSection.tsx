import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const BlogsSection = () => {
  const blogs = [
    {
      id: 1,
      title: "Current Real Estate Market Trends",
      excerpt: "Discover the latest trends shaping Mumbai's real estate landscape and investment opportunities.",
      date: "November 15, 2024",
      author: "Real Estate Team",
      category: "Market Analysis",
      image: "/api/placeholder/400/250",
    },
    {
      id: 2,
      title: "Green Real Estate: Sustainable Practices and Benefits",
      excerpt: "Learn about eco-friendly building practices and how sustainable development benefits homeowners.",
      date: "November 10, 2024",
      author: "Sustainability Team",
      category: "Green Building",
      image: "/api/placeholder/400/250",
    },
    {
      id: 3,
      title: "How Interest Rates Affect Real Estate Prices",
      excerpt: "Understanding the relationship between interest rates and property values in today's market.",
      date: "November 5, 2024",
      author: "Financial Analyst",
      category: "Finance",
      image: "/api/placeholder/400/250",
    },
    {
      id: 4,
      title: "How to Assess Real Estate Market Conditions",
      excerpt: "A comprehensive guide to evaluating market conditions before making property investments.",
      date: "October 28, 2024",
      author: "Market Research",
      category: "Investment Guide",
      image: "/api/placeholder/400/250",
    },
  ];

  return (
    <section id="blogs" className="py-20 bg-gradient-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
            Blogs
          </h2>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            Stay informed with our latest insights, market analysis, and expert advice on real estate trends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {blogs.map((blog, index) => (
            <Card 
              key={blog.id}
              className="group overflow-hidden shadow-card hover:shadow-brand transition-all duration-500 hover:-translate-y-2 bg-white animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-brand-light-blue to-brand-blue flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-8 h-8" />
                    </div>
                    <p className="text-sm opacity-90">{blog.category}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-xs font-medium text-brand-navy">{blog.category}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-sm text-brand-gray leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-brand-gray pt-2 border-t border-border">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{blog.date}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 text-brand-blue hover:text-brand-blue hover:bg-brand-light-blue/20"
                  >
                    Read More →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blogs">
            <Button variant="brand" size="lg">
              View All Blogs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;