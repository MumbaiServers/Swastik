import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customPagesApi } from "@/services/cmsApi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

const CustomPageContent = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await customPagesApi.getBySlug(slug);
        setPage(data.page);
        setError(false);
      } catch (err) {
        console.error("Failed to fetch page:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl text-muted-foreground">Page Not Found</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-white">
        {/* Banner */}
        <div className="bg-brand-blue text-white py-16 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center">{page.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-lg prose-blue">
            <div 
              className="text-gray-800 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br />') }} 
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomPageContent;
