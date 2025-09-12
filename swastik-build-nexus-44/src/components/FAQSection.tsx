import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const FAQSection = () => {
  const faqs = [{
    id: "faq-1",
    question: "What makes Swastik Group a trusted name in real estate in Vikhroli?",
    answer: "Swastik Group has been serving the Mumbai real estate market for over 25 years with a commitment to quality, transparency, and customer satisfaction. Our track record of delivering premium residential projects on time, combined with our focus on modern amenities and sustainable building practices, has established us as a trusted developer in Vikhroli and surrounding areas."
  }, {
    id: "faq-2",
    question: "What types of residential projects does Swastik Group offer in Vikhroli?",
    answer: "We offer a diverse range of residential properties including luxury apartments, premium 1BHK to 4BHK configurations, penthouses, and integrated township projects. Each project is designed with modern architecture, world-class amenities, and strategic locations to provide the perfect blend of comfort and convenience."
  }, {
    id: "faq-3",
    question: "Why should I invest in Swastik Group's new projects in Vikhroli?",
    answer: "Vikhroli offers excellent connectivity to major business districts, upcoming infrastructure developments, and a rapidly appreciating real estate market. Our projects in Vikhroli feature premium locations, modern amenities, and are built with quality materials. Additionally, our flexible payment plans and competitive pricing make it an attractive investment opportunity."
  }, {
    id: "faq-4",
    question: "How does Swastik Group ensure quality and sustainability in its real estate projects?",
    answer: "We follow stringent quality control measures at every stage of construction, use premium materials, and work with certified contractors. Our projects incorporate eco-friendly features like rainwater harvesting, solar panels, energy-efficient lighting, and green spaces. We also ensure all necessary approvals and certifications are in place before project commencement."
  }, {
    id: "faq-5",
    question: "How can I learn more about upcoming residential projects by Swastik Group in Vikhroli?",
    answer: "You can visit our website, contact our sales team at +91-22-6589 0000, or visit our corporate office. We also regularly update our social media channels with project launches, progress updates, and special offers. You can schedule a site visit or request a callback through our website for personalized assistance."
  }];
  return <section id="faq" className="py-20 bg-gradient-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            Find answers to common questions about our projects, services, and processes
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4 animate-slide-up">
            {faqs.map((faq, index) => <AccordionItem key={faq.id} value={faq.id} className="bg-white rounded-xl shadow-card hover:shadow-brand transition-all duration-300 border-0" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                  <span className="text-brand-navy font-medium pr-4 leading-relaxed">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-brand-gray leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>

        {/* Consultant Information */}
        
      </div>
    </section>;
};
export default FAQSection;