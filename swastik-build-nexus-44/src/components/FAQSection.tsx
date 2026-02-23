
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { faqsApi } from "@/services/cmsApi";
import { Loader2 } from "lucide-react";

const FAQSection = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: listRef, isVisible: listVisible, getItemStyle } = useStaggerAnimation(faqs.length || 5, { staggerDelay: 100 });

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const response = await faqsApi.getActive();
        setFaqs(response.faqs || []);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <section id="faq" className="py-12 lg:py-16 bg-gradient-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12" ref={titleRef}>
          <h2
            className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4 transition-all duration-700"
            style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Frequently Asked Questions
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
            Find answers to common questions about our projects, services, and processes
          </p>
        </div>

        <div className="max-w-4xl mx-auto" ref={listRef}>
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={String(faq.id)}
                  className="bg-white rounded-xl shadow-card hover:shadow-brand transition-all duration-300 border-0"
                  style={getItemStyle(index)}
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="text-brand-navy font-medium pr-4 leading-relaxed">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-brand-gray leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;