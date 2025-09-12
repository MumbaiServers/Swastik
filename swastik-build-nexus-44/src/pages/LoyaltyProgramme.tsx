import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, User, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import familyImage from "/lovable-uploads/a3d318e5-2a94-4a3f-8113-f658b8992966.png";

const LoyaltyProgramme = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-10 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold text-brand-navy mb-6">
                  Swastik One Family Referral Program
                </h1>
                <div className="w-20 h-1 bg-brand-blue rounded-full mb-6"></div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl lg:text-2xl font-semibold text-brand-navy">
                  Refer and Earn Big Rewards!
                </h2>
                <p className="text-lg text-brand-gray leading-relaxed">
                  We value our community and believe in growing together. 
                  Be a part of the Swastik One Family by referring your 
                  friends or family and earn exciting rewards.
                </p>
              </div>
              
              <Button variant="brand" size="lg" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                022-50646565 / 9833108888
              </Button>
            </div>
            
            <div className="relative flex justify-center lg:justify-end">
              <img 
                src={familyImage} 
                alt="Happy Family" 
                className="w-full h-auto max-w-md md:max-w-lg"
                style={{
                  borderTopLeftRadius: '3rem',
                  borderTopRightRadius: '0',
                  borderBottomRightRadius: '3rem',
                  borderBottomLeftRadius: '0'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Referral Bonus Cards */}
      <section className="py-10 lg:py-12 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-border/50">
              <h3 className="text-lg font-semibold text-brand-navy mb-2">Apartment Type: 1BHK</h3>
              <p className="text-2xl font-bold text-brand-blue">Referral Bonus: ₹50,000</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-border/50">
              <h3 className="text-lg font-semibold text-brand-navy mb-2">Apartment Type: 2BHK</h3>
              <p className="text-2xl font-bold text-brand-blue">Referral Bonus: ₹75,000</p>
            </div>
            <div className="bg-gradient-brand p-6 rounded-2xl shadow-brand text-white">
              <h3 className="text-lg font-semibold mb-2">Apartment Type: 3BHK</h3>
              <p className="text-2xl font-bold">Referral Bonus: ₹1,00,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Form */}
      <section className="py-10 lg:py-12 relative bg-[#90D4FF80]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div 
              className="bg-white/90 backdrop-blur-sm p-8 lg:p-12 shadow-lg border border-border/20"
              style={{ 
                borderTopRightRadius: '2rem',
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '2rem',
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
                  <Button type="submit" variant="brand" size="lg" className="px-12">
                    Enquire Now
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LoyaltyProgramme;