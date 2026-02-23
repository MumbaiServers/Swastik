import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, User, Mail, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { loyaltyApi } from "@/services/cmsApi";
import { toast } from "sonner";
import familyImage from "/lovable-uploads/a3d318e5-2a94-4a3f-8113-f658b8992966.png";
import SEO from "@/components/SEO";

/**
 * LoyaltyProgramme Page
 * 
 * Displays the Swastik One Family Referral Program details,
 * rewards for different apartment types, and a submission form
 * for new referrals.
 */
const LoyaltyProgramme = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    refereeName: "",
    refereeContact: "",
    preferredUnit: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await loyaltyApi.submit(formData);
      toast.success("Referral submitted successfully! Our team will contact you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        contactNumber: "",
        email: "",
        refereeName: "",
        refereeContact: "",
        preferredUnit: ""
      });
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit referral. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* SEO configuration for the Loyalty Programme page */}
      <SEO title="Loyalty Programme" description="Swastik One Family Referral Program. Refer your friends and family to earn big rewards!" />
      <Header />

      {/* Hero Section */}
      <section className="pt-6 lg:pt-20 pb-12 lg:pb-24 overflow-hidden bg-white lg:bg-transparent">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Mobile Layout (as per image) */}
          <div className="block lg:hidden space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-[#1A1A1A] leading-tight tracking-tight">
                Swastik One Family<br />
                Referral Program
              </h1>
              <div className="w-32 h-1.5 bg-[#3B82F6] rounded-full"></div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-extrabold text-[#1A1A1A]">
                Refer and Earn Big Rewards!
              </h2>
              <p className="text-sm text-[#4A4A4A] leading-relaxed font-medium">
                We value our community and believe in growing together.
                Be a part of the Swastik One Family by referring your
                friends or family and earn exciting rewards.
              </p>
            </div>

            <Button
              className="bg-[#1953B4] hover:bg-[#1953B4]/90 text-white text-base font-bold py-4 h-auto rounded-xl flex items-center justify-center gap-3 w-full shadow-lg transition-all active:scale-[0.98]"
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>022-50646565 / 9833108888</span>
            </Button>

            <div className="relative mt-12 pb-12">
              {/* Family Image with symmetrical arch top */}
              <div className="overflow-hidden shadow-xl" style={{ borderTopLeftRadius: '180px', borderTopRightRadius: '180px' }}>
                <img
                  src={familyImage}
                  alt="Happy Family"
                  className="w-full h-auto object-cover scale-105"
                />
              </div>

              {/* Bonus Cards Stacked on Mobile */}
              <div className="space-y-4 mt-0 bg-white">
                <div className="bg-[#E1F1FF] p-6 py-8 rounded-b-[40px] shadow-sm text-center">
                  <h3 className="text-sm font-extrabold text-black uppercase tracking-wide">
                    Apartment Type: 1 BHK  Referral Bonus:
                  </h3>
                  <p className="text-2xl font-black text-black mt-2">₹50,000</p>
                </div>

                <div className="bg-[#1953B4] p-6 py-8 rounded-[30px] shadow-md text-center text-white">
                  <h3 className="text-sm font-extrabold uppercase tracking-wide">
                    Apartment Type: 3 BHK Referral Bonus:
                  </h3>
                  <p className="text-2xl font-black mt-2">₹1,00,000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout (Existing) */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
            {/* Left Content */}
            <div className="z-10 pt-8 flex flex-col h-full justify-between min-h-[600px]">
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl lg:text-5xl font-bold text-black mb-4 tracking-tight leading-tight">
                    Swastik One Family<br />
                    Referral Program
                  </h1>
                  <div className="w-24 h-1.5 bg-[#60A5FA] rounded-full mb-8"></div>
                </div>

                <div className="space-y-4 max-w-lg">
                  <h2 className="text-xl font-bold text-black">
                    Refer and Earn Big Rewards!
                  </h2>
                  <p className="text-base text-gray-600 leading-relaxed">
                    We value our community and believe in growing together.
                    Be a part of the Swastik One Family by referring your
                    friends or family and earn exciting rewards.
                  </p>
                </div>

                <Button
                  className="bg-[#1953B4] hover:bg-[#1953B4]/90 text-white text-lg font-medium px-8 py-6 h-auto rounded-md flex items-center gap-3 w-fit shadow-lg mt-8"
                >
                  <Phone className="w-5 h-5 -scale-x-100" />
                  <span>022-50646565 / 9833108888</span>
                </Button>
              </div>

              {/* 1 BHK & 2 BHK Bonus Cards - Positioned in the left column */}
              <div className="flex flex-wrap gap-5 mt-12 w-full relative z-20 pb-0 lg:translate-y-16">
                {/* 1 BHK Card */}
                <div className="bg-[#DAEFFF] p-6 lg:p-8 min-w-[240px] flex-1 rounded-[30px] rounded-br-[0] shadow-sm">
                  <h3 className="text-lg font-bold text-black mb-1">Apartment Type: 1 BHK</h3>
                  <p className="text-xl font-bold text-black">Referral Bonus: ₹50,000</p>
                </div>

                {/* 2 BHK Card */}
                <div className="bg-[#DAEFFF] p-6 lg:p-8 min-w-[240px] flex-1 rounded-[30px] rounded-br-[0] shadow-sm">
                  <h3 className="text-lg font-bold text-black mb-1">Apartment Type: 2 BHK</h3>
                  <p className="text-xl font-bold text-black">Referral Bonus: ₹75,000</p>
                </div>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="relative mt-8 lg:mt-0 flex justify-center lg:justify-start lg:pl-10">
              <div
                className="absolute bg-[#F3F4F6] -z-10"
                style={{
                  width: '120%',
                  height: '110%',
                  top: '-10%',
                  right: '-10%',
                  borderTopLeftRadius: '200px',
                  borderBottomLeftRadius: '100px'
                }}
              />

              <div className="relative">
                <img
                  src={familyImage}
                  alt="Happy Family"
                  className="object-cover shadow-2xl z-0"
                  style={{
                    width: '552px',
                    height: '608px',
                    borderTopLeftRadius: '200px',
                    borderBottomRightRadius: '200px',
                    opacity: 1,
                  }}
                />

                <div className="bg-[#1953B4] p-6 lg:p-8 rounded-[30px] rounded-tr-[0] rounded-bl-[30px] shadow-lg text-white absolute bottom-0 left-0 transform -translate-x-[25%] translate-y-[55%] z-20"
                  style={{
                    minWidth: '280px',
                    borderTopRightRadius: '30px',
                    borderBottomLeftRadius: '30px',
                    borderTopLeftRadius: '0',
                    borderBottomRightRadius: '0'
                  }}
                >
                  <h3 className="text-lg font-bold mb-1">Apartment Type: 3 BHK</h3>
                  <p className="text-2xl font-bold">Referral Bonus: ₹1,00,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Form */}
      <section className="py-10 lg:py-20 relative bg-[#90D4FF80]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto flex justify-center">
            <div
              className="bg-white/90 backdrop-blur-sm p-8 lg:p-12 shadow-lg border border-border/20 w-full"
              style={{
                maxWidth: '1051px',
                minHeight: 'auto',
                borderTopRightRadius: '100px',
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '100px',
                borderBottomRightRadius: '0'
              }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
                  Program Form
                </h2>
                <p className="text-brand-gray">
                  Please fill your details below
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="flex items-center gap-2 text-brand-navy">
                      <User className="w-4 h-4" />
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="bg-white/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="flex items-center gap-2 text-brand-navy">
                      <User className="w-4 h-4" />
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="bg-white/50"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber" className="flex items-center gap-2 text-brand-navy">
                      <Phone className="w-4 h-4" />
                      Contact Number
                    </Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm">
                        🇮🇳 +91
                      </span>
                      <Input
                        id="contactNumber"
                        value={formData.contactNumber}
                        onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                        className="bg-white/50 rounded-l-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-brand-navy">
                      <Mail className="w-4 h-4" />
                      Email ID
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refereeName" className="text-brand-navy">
                    Referee's Name
                  </Label>
                  <Input
                    id="refereeName"
                    value={formData.refereeName}
                    onChange={(e) => handleInputChange('refereeName', e.target.value)}
                    className="bg-white/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refereeContact" className="flex items-center gap-2 text-brand-navy">
                    <Phone className="w-4 h-4" />
                    Referee's Contact Number
                  </Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm">
                      🇮🇳 +91
                    </span>
                    <Input
                      id="refereeContact"
                      value={formData.refereeContact}
                      onChange={(e) => handleInputChange('refereeContact', e.target.value)}
                      className="bg-white/50 rounded-l-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredUnit" className="text-brand-navy">
                    Preferred Unit
                  </Label>
                  <Select value={formData.preferredUnit} onValueChange={(value) => handleInputChange('preferredUnit', value)}>
                    <SelectTrigger className="bg-white/50">
                      <SelectValue placeholder="Select preferred unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1bhk">1 BHK</SelectItem>
                      <SelectItem value="2bhk">2 BHK</SelectItem>
                      <SelectItem value="3bhk">3 BHK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-center pt-6">
                  <Button type="submit" variant="brand" size="lg" className="px-12" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Enquire Now'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section >

      <Footer />
    </div >
  );
};

export default LoyaltyProgramme;