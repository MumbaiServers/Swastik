import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft, Loader2, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { blogsApi, getImageUrl } from '@/services/cmsApi';

const Blogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogsApi.getPublished();
        setBlogs(response.blogs || []);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-light">
      {/* Dynamic SEO Meta Tags for Blogs index page */}
      <SEO title="Blogs & Insights" description="Stay updated with the latest trends, market shifts, and expert guidance in the real estate world." />
      <Header />

      <div className="pt-20"> {/* Fixed header offset */}
        {/* Header Section */}
        <section className="py-20 bg-brand-navy relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-light-blue rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <Link to="/" className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Insights & <span className="text-brand-blue">Perspectives</span>
              </h1>
              <p className="text-xl text-white/70 leading-relaxed">
                Stay updated with the latest trends, market shifts, and expert guidance in the real estate world.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
                <Loader2 className="w-12 h-12 animate-spin text-brand-blue mb-4" />
                <p className="text-brand-navy font-medium">Fetching latest insights...</p>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-20">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="text-2xl font-bold text-brand-navy mb-2">No Articles Found</h3>
                <p className="text-brand-gray mb-8">We haven't published any blogs yet. Stay tuned!</p>
                <Link to="/">
                  <Button variant="outline">Return Home</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {blogs.map((blog, index) => (
                  <Card
                    key={blog.id}
                    className="group border-none overflow-hidden shadow-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white flex flex-col h-full"
                    style={{ animationDelay: `${index * 100} ms` }}
                  >
                    <Link to={`/blogs/${blog.slug}`} className="relative h-64 overflow-hidden block">
                      {blog.image ? (
                        <img
                          src={getImageUrl(blog.image) || ''}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-navy to-brand-blue flex items-center justify-center">
                          <FileText className="w-12 h-12 text-white/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>

                    <CardContent className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full">
                          {blog.category || 'Opinion'}
                        </span>
                        <div className="flex items-center text-xs text-brand-gray">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(blog.publishDate || blog.createdAt)}
                        </div>
                      </div>

                      <Link to={`/blogs/${blog.slug}`}>
                        <h3 className="text-2xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors mb-4 line-clamp-2 leading-tight">
                          {blog.title}
                        </h3>
                      </Link>

                      <p className="text-brand-gray leading-relaxed mb-6 line-clamp-3 text-sm">
                        {blog.excerpt || blog.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...'}
                      </p>

                      <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                        <Link to={`/blogs/${blog.slug}`} className="text-brand-blue font-bold text-sm flex items-center group/btn">
                          READ ARTICLE
                          <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                        <div className="flex items-center text-xs text-brand-gray italic">
                          By {blog.author}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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