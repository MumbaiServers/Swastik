import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Upload, User, Building, Briefcase, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO settings for Careers page */}
      <SEO title="Careers" description="Build Your Career with Swastik Group. Explore growth opportunities and flexible work environments." />
      <Header />

      {/* Hero Section */}
      <section className="py-10 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold text-brand-navy mb-6">
                  Build Your Career
                  <span className="block">
                    with Swastik Group
                  </span>
                </h1>
                <div className="w-20 h-1 bg-brand-blue rounded-full mb-6"></div>
              </div>
              <p className="text-lg text-brand-gray leading-relaxed">
                At Swastik Group, we're not just shaping skylines—we're shaping futures. With over 25 years of legacy, we offer a workplace where integrity, excellence, and innovation come together to let our talented team build something truly impactful.
              </p>
            </div>

            <div className="grid gap-6">
              <Card className="bg-gradient-brand text-white border-0 shadow-brand">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start space-x-4">
                    <Building className="w-8 h-8 text-white mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold mb-2">Outstanding Properties</h3>
                      <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                        Immerse in best-in-class infrastructure that push boundaries and unlock new real estate trends that match your expectations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-gradient-brand text-white border-0 shadow-brand">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-start space-x-3">
                      <Briefcase className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm lg:text-base font-bold mb-2">Growth Opportunities</h3>
                        <p className="text-white/90 text-xs lg:text-sm leading-relaxed">
                          We offer progressive career advancement through innovative role design.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-brand text-white border-0 shadow-brand">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-start space-x-3">
                      <Users className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm lg:text-base font-bold mb-2">Flexible Work Environment</h3>
                        <p className="text-white/90 text-xs lg:text-sm leading-relaxed">
                          Discover balance between work environment to offer your best work.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band below Hero */}
      <section className="pt-4 pb-8 lg:pt-4 lg:pb-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-brand p-6 lg:p-10 shadow-brand overflow-hidden" style={{ borderRadius: '20px 60px 20px 60px' }}>
            <div
              className="flex items-center w-full overflow-hidden [--duration:30s] [--gap:1.5rem]"
              data-gap="1.5rem"
            >
              <div className="flex w-max animate-marquee hover:pause">
                {[
                  { value: "1500+", label: "Happy Families" },
                  { value: "6.5", label: "Lakh Sq. Ft. Under Construction" },
                  { value: "22", label: "Successful Projects" },
                  { value: "7", label: "Prime Locations" },
                  { value: "25+", label: "Years of Excellence" }
                ].map((stat, index) => (
                  <div key={`career-first-${index}`} className="text-center text-white min-w-[120px] sm:min-w-[160px] lg:min-w-[200px] flex-shrink-0 mx-2 sm:mx-4 lg:mx-6">
                    <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base opacity-90 whitespace-normal leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex w-max animate-marquee hover:pause" aria-hidden="true">
                {[
                  { value: "1500+", label: "Happy Families" },
                  { value: "6.5", label: "Lakh Sq. Ft. Under Construction" },
                  { value: "22", label: "Successful Projects" },
                  { value: "7", label: "Prime Locations" },
                  { value: "25+", label: "Years of Excellence" }
                ].map((stat, index) => (
                  <div key={`career-second-${index}`} className="text-center text-white min-w-[120px] sm:min-w-[160px] lg:min-w-[200px] flex-shrink-0 mx-2 sm:mx-4 lg:mx-6">
                    <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base opacity-90 whitespace-normal leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Detail Form Section */}
      <section className="py-10 lg:py-12 relative bg-[#EEF8FF]">
        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#EEF8FF]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div
                className="bg-white/90 backdrop-blur-sm p-8 lg:p-12 shadow-lg border border-border/20"
                style={{
                  borderTopRightRadius: '3rem',
                  borderTopLeftRadius: '0',
                  borderBottomLeftRadius: '3rem',
                  borderBottomRightRadius: '0'
                }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
                    Career Detail Form
                  </h2>
                  <p className="text-brand-gray">
                    Please fill your details below
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                        <User className="w-5 h-5 text-brand-gray" />
                      </div>
                      <Input
                        type="text"
                        className="h-12 pl-12 pr-4 bg-white/50"
                        placeholder="First Name"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                        <User className="w-5 h-5 text-brand-gray" />
                      </div>
                      <Input
                        type="text"
                        className="h-12 pl-12 pr-4 bg-white/50"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                        <Phone className="w-5 h-5 text-brand-gray" />
                      </div>
                      <Input
                        type="tel"
                        className="h-12 pl-12 pr-4 bg-white/50"
                        placeholder="Contact Number"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                        <Mail className="w-5 h-5 text-brand-gray" />
                      </div>
                      <Input
                        type="email"
                        className="h-12 pl-12 pr-4 bg-white/50"
                        placeholder="Email ID"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <Briefcase className="w-5 h-5 text-brand-gray" />
                    </div>
                    <Input
                      type="text"
                      className="h-12 pl-12 pr-4 bg-white/50"
                      placeholder="Message"
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full h-12 mb-6"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Document
                    </Button>

                    <Button
                      type="submit"
                      variant="brand"
                      size="lg"
                      className="w-full md:w-auto px-12"
                    >
                      Enquiry Now
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Careers;