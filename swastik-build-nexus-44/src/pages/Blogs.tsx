import React, { useState } from 'react';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null);

  const blogs = [
    {
      id: 1,
      title: "Current Real Estate Market Trends",
      excerpt: "Discover the latest trends shaping Mumbai's real estate landscape and investment opportunities.",
      content: "Real estate investing is one of the most popular ways to build wealth. However, it comes with its own set of challenges. Understanding real estate mistakes and avoiding investment errors can help you achieve long-term success. Here are the top 10 common mistakes to avoid when investing in real estate and how to protect your investment goals. Understanding these pitfalls can help investors make more informed decisions and maximize returns.",
      date: "November 17, 2024",
      author: "Real Estate Team",
      category: "Market Analysis",
      image: "/api/placeholder/800/400",
    },
    {
      id: 2,
      title: "Green Real Estate: Sustainable Practices and Benefits",
      excerpt: "Learn about eco-friendly building practices and how sustainable development benefits homeowners.",
      content: "Sustainable building practices are becoming increasingly important in today's real estate market. Green buildings offer numerous benefits including reduced energy costs, improved indoor air quality, and enhanced property values. Understanding the principles of sustainable development can help both developers and homeowners make better choices for the environment and their finances.",
      date: "November 15, 2024",
      author: "Sustainability Team",
      category: "Green Building",
      image: "/api/placeholder/800/400",
    },
    {
      id: 3,
      title: "How Interest Rates Affect Real Estate Prices",
      excerpt: "Understanding the relationship between interest rates and property values in today's market.",
      content: "Interest rates play a crucial role in determining real estate prices and market dynamics. When rates are low, borrowing becomes more affordable, increasing demand for properties. Conversely, higher rates can cool the market by making mortgages more expensive. This comprehensive guide explores how rate changes impact different market segments and what investors should consider.",
      date: "November 10, 2024",
      author: "Financial Analyst",
      category: "Finance",
      image: "/api/placeholder/800/400",
    },
    {
      id: 4,
      title: "How to Assess Real Estate Market Conditions",
      excerpt: "A comprehensive guide to evaluating market conditions before making property investments.",
      content: "Assessing real estate market conditions is essential for making informed investment decisions. Key indicators include price trends, inventory levels, days on market, and economic factors. Understanding these metrics helps investors identify opportunities and avoid potential pitfalls in their real estate ventures.",
      date: "November 5, 2024",
      author: "Market Research",
      category: "Investment Guide",
      image: "/api/placeholder/800/400",
    },
    {
      id: 5,
      title: "Emerging Real Estate Markets to Watch",
      excerpt: "Explore upcoming real estate markets with high growth potential and investment opportunities.",
      content: "Several emerging real estate markets are showing promising signs of growth and development. These markets offer unique opportunities for investors looking to diversify their portfolios and capitalize on early-stage growth. Factors driving these markets include infrastructure development, population growth, and economic expansion.",
      date: "October 28, 2024",
      author: "Market Research",
      category: "Investment Guide",
      image: "/api/placeholder/800/400",
    },
    {
      id: 6,
      title: "Common Mistakes in Real Estate Investing",
      excerpt: "Learn about the most common pitfalls in real estate investment and how to avoid them.",
      content: "Real estate investing can be highly rewarding, but it comes with challenges. By understanding common mistakes and proactively avoiding them, you can protect your investment and significantly increase your chances of success. This guide covers the top mistakes investors make and provides practical solutions.",
      date: "October 25, 2024",
      author: "Investment Team",
      category: "Investment Guide",
      image: "/api/placeholder/800/400",
    },
  ];

  const selectedBlogData = selectedBlog ? blogs.find(blog => blog.id === selectedBlog) : null;
  const otherBlogs = selectedBlog ? blogs.filter(blog => blog.id !== selectedBlog) : blogs;

  return (
    <div className="min-h-screen bg-gradient-light">
      <Header />
      
      <div>
        {/* Header Section */}
        <section className="py-12 bg-gradient-to-r from-brand-light-blue to-brand-blue">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center text-white">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Blogs and Articles</h1>
              <div className="w-20 h-1 bg-white rounded-full mx-auto mb-6"></div>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Stay informed with our latest insights, market analysis, and expert advice on real estate trends
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            {!selectedBlog ? (
              /* Grid View - All Blogs */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <Card 
                    key={blog.id}
                    className="group cursor-pointer overflow-hidden shadow-card hover:shadow-brand transition-all duration-500 hover:-translate-y-2 bg-white animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedBlog(blog.id)}
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* Detailed View - Selected Blog */
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Blog Content */}
                <div className="lg:w-2/3">
                  <div className="bg-white rounded-lg shadow-card overflow-hidden animate-scale-in">
                    {/* Featured Image */}
                    <div className="w-full h-64 lg:h-96 bg-gradient-to-br from-brand-light-blue to-brand-blue flex items-center justify-center">
                      <div className="text-white text-center p-8">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Calendar className="w-10 h-10" />
                        </div>
                        <p className="text-lg opacity-90">{selectedBlogData?.category}</p>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-8">
                      <div className="mb-6">
                        <div className="flex items-center justify-between text-sm text-brand-gray mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{selectedBlogData?.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{selectedBlogData?.date}</span>
                            </div>
                          </div>
                          <span className="bg-brand-light-blue/20 text-brand-blue px-3 py-1 rounded-full text-xs font-medium">
                            {selectedBlogData?.category}
                          </span>
                        </div>
                        
                        <h1 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
                          {selectedBlogData?.title}
                        </h1>
                      </div>

                      <div className="prose prose-lg max-w-none">
                        <p className="text-brand-gray leading-relaxed text-lg">
                          {selectedBlogData?.content}
                        </p>
                      </div>

                      <div className="mt-8 pt-8 border-t border-border">
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedBlog(null)}
                          className="flex items-center space-x-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to All Blogs</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Blogs Sidebar */}
                <div className="lg:w-1/3">
                  <div className="sticky top-24">
                    <h3 className="text-xl font-bold text-brand-navy mb-6">Related Articles</h3>
                    <div className="space-y-4">
                      {otherBlogs.map((blog) => (
                        <Card 
                          key={blog.id}
                          className="cursor-pointer hover:shadow-md transition-all duration-300 bg-white"
                          onClick={() => setSelectedBlog(blog.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex space-x-3">
                              <div className="w-16 h-16 bg-gradient-to-br from-brand-light-blue to-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-brand-navy line-clamp-2 mb-1">
                                  {blog.title}
                                </h4>
                                <p className="text-xs text-brand-gray line-clamp-2 mb-2">
                                  {blog.excerpt}
                                </p>
                                <div className="text-xs text-brand-gray">
                                  {blog.date}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;