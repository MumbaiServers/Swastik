import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Loader2, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { blogsApi, getImageUrl } from '@/services/cmsApi';

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchBlogData = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const [blogRes, allRes] = await Promise.all([
                    blogsApi.getBySlug(slug),
                    blogsApi.getPublished()
                ]);

                if (blogRes.blog) {
                    setBlog(blogRes.blog);
                    // Set related blogs (excluding current)
                    setRelatedBlogs(allRes.blogs?.filter((b: any) => b.slug !== slug).slice(0, 3) || []);
                } else {
                    navigate('/blogs');
                }
            } catch (error) {
                console.error('Failed to fetch blog details:', error);
                navigate('/blogs');
            } finally {
                setLoading(false);
            }
        };
        fetchBlogData();
        window.scrollTo(0, 0);
    }, [slug, navigate]);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                {/* Fallback SEO while fetching blog details */}
                <SEO title="Loading..." description="Loading blog post" />
                <Header />
                <div className="flex flex-col items-center justify-center h-screen">
                    <Loader2 className="w-12 h-12 animate-spin text-brand-blue mb-4" />
                    <p className="text-brand-navy font-bold tracking-widest uppercase text-sm">Loading Story...</p>
                </div>
            </div>
        );
    }

    if (!blog) return null;

    return (
        <div className="min-h-screen bg-white">
            {/* Dynamic SEO injecting blog title, author, and featured image */}
            <SEO title={blog.title} description={`${blog.title} - ${blog.author}`} imageUrl={blog.image ? getImageUrl(blog.image) : undefined} />
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
                    {blog.image ? (
                        <img
                            src={getImageUrl(blog.image) || ''}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-brand-navy" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    <div className="absolute inset-0 flex items-end pb-12">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="max-w-4xl">
                                <Link to="/blogs" className="inline-flex items-center text-white/80 hover:text-white mb-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full transition-all hover:bg-white/20">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Insights
                                </Link>
                                <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
                                    <span className="bg-brand-blue text-white px-3 py-1 rounded-sm uppercase tracking-wider font-bold text-[10px]">
                                        {blog.category || 'Article'}
                                    </span>
                                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> 5 min read</span>
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                                    {blog.title}
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Article Body */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                            {/* Author Sidebar */}
                            <div className="lg:col-span-3">
                                <div className="sticky top-32 space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-xl">
                                            {blog.author[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-brand-navy">{blog.author}</p>
                                            <p className="text-xs text-brand-gray">Lead Researcher</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray">Published On</p>
                                        <p className="text-sm font-medium text-brand-navy">{formatDate(blog.publishDate || blog.createdAt)}</p>
                                    </div>

                                    <div className="space-y-4 pt-8 border-t border-gray-100">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray">Share This Story</p>
                                        <div className="flex gap-4">
                                            <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300">
                                                <Facebook className="w-4 h-4" />
                                            </button>
                                            <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300">
                                                <Twitter className="w-4 h-4" />
                                            </button>
                                            <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300">
                                                <Linkedin className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-6">
                                <div
                                    className="prose prose-lg max-w-none text-brand-gray leading-[1.8] first-letter:text-5xl first-letter:font-bold first-letter:text-brand-navy first-letter:mr-3 first-letter:float-left"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />
                            </div>

                            {/* Sidebar / AD / Related */}
                            <div className="lg:col-span-3 space-y-12">
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-navy mb-8 pb-2 border-b-2 border-brand-blue w-fit">
                                        Related Stories
                                    </h3>
                                    <div className="space-y-8">
                                        {relatedBlogs.map((related) => (
                                            <Link key={related.id} to={`/blogs/${related.slug}`} className="group block">
                                                <div className="aspect-[4/3] rounded-sm overflow-hidden mb-4 bg-muted">
                                                    {related.image ? (
                                                        <img src={getImageUrl(related.image)!} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={related.title} />
                                                    ) : (
                                                        <div className="w-full h-full bg-brand-light-blue/20" />
                                                    )}
                                                </div>
                                                <h4 className="font-bold text-brand-navy group-hover:text-brand-blue transition-colors leading-tight">
                                                    {related.title}
                                                </h4>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-brand-navy p-8 text-white rounded-sm relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold mb-4">Looking for a new home?</h3>
                                        <p className="text-sm text-white/60 mb-6">Explore our latest premium residential projects in Mumbai.</p>
                                        <Link to="/projects">
                                            <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 font-bold transition-all group-hover:tracking-widest">
                                                VIEW PROJECTS
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 -rotate-45 translate-x-12 -translate-y-12 transition-transform group-hover:scale-150" />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default BlogDetail;
