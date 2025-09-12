import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminAboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState({
    ourBusiness: {
      description: `Swastik Group is a prime real estate company. We are known for our honesty, transparency, and the best. Premium quality work. As we've been working around for more than 25 years and creating amazing homes and business spaces that redefine luxury living. We focus on doing things correctly, and meeting deadlines. This approach has made us leaders in the real estate industry, respected for our commitment to ensuring our customers are satisfied with our work.`,
      image: null as File | null
    },
    aboutUs: {
      content: `At Swastik Group, we're dedicated to honesty, openness, and quality work in each single thing we do. We've successfully completed various projects that blend contemporary design with luxury. We're proud to build durable homes and buildings that reflects comfortable living. With a committed and talented team, we aim to top expectations and leave a positive mark in the communities we serve.`,
      image: null as File | null
    },
    whyChooseUs: {
      description: "Our projects are known for their top-notch craftsmanship, smart design, and solid construction, giving customers great value.",
      features: [
        {
          title: "Timely Delivery",
          description: "We're proud to finish projects on time within the delivery date."
        },
        {
          title: "Professional Team",
          description: "Our experienced team always aims for excellence, from planning projects to helping customers."
        },
        {
          title: "Market Leadership",
          description: "We're leaders in redevelopment, known for quality work, on-time delivery, and being open with customers and partners."
        },
        {
          title: "Minimal Bureaucracy",
          description: "Our simple processes and 24/7 help make things easy for clients, creating a friendly and supportive atmosphere."
        }
      ]
    }
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    setAboutUsData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleImageUpload = (section: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAboutUsData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          image: file
        }
      }));
    }
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    setAboutUsData(prev => ({
      ...prev,
      whyChooseUs: {
        ...prev.whyChooseUs,
        features: prev.whyChooseUs.features.map((feature, i) =>
          i === index ? { ...feature, [field]: value } : feature
        )
      }
    }));
  };

  const handleSave = () => {
    toast.success('About Us page content updated successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Us Page Management</h1>
        <p className="text-muted-foreground">
          Update all sections displayed on the About Us page
        </p>
      </div>

      <Tabs defaultValue="our-business" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="our-business">Our Business</TabsTrigger>
          <TabsTrigger value="about-us">About Us</TabsTrigger>
          <TabsTrigger value="why-choose-us">Why Choose Us</TabsTrigger>
        </TabsList>

        <TabsContent value="our-business" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Image</CardTitle>
                <CardDescription>
                  Upload the image for the "Our Business" section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="business-image">Business Image</Label>
                  <Input
                    id="business-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload('ourBusiness', e)}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended size: 600x400px or similar aspect ratio (Max: 5MB)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Description</CardTitle>
                <CardDescription>
                  Edit the description text for the business section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="business-description">Business Description</Label>
                  <Textarea
                    id="business-description"
                    rows={10}
                    value={aboutUsData.ourBusiness.description}
                    onChange={(e) => handleInputChange('ourBusiness', 'description', e.target.value)}
                    placeholder="Enter the business description..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="about-us" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>About Us Image</CardTitle>
                <CardDescription>
                  Upload the image for the "About Us" section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="about-us-image">About Us Image</Label>
                  <Input
                    id="about-us-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload('aboutUs', e)}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended size: 600x400px or similar aspect ratio (Max: 5MB)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About Us Content</CardTitle>
                <CardDescription>
                  Edit the text content for the about us section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="about-us-content">About Us Content</Label>
                  <Textarea
                    id="about-us-content"
                    rows={10}
                    value={aboutUsData.aboutUs.content}
                    onChange={(e) => handleInputChange('aboutUs', 'content', e.target.value)}
                    placeholder="Enter the about us content..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="why-choose-us" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why Choose Us Content</CardTitle>
              <CardDescription>
                Edit the main description and feature cards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="why-choose-description">Main Description</Label>
                <Textarea
                  id="why-choose-description"
                  rows={3}
                  value={aboutUsData.whyChooseUs.description}
                  onChange={(e) => handleInputChange('whyChooseUs', 'description', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Feature Cards</h4>
                {aboutUsData.whyChooseUs.features.map((feature, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label htmlFor={`feature-title-${index}`}>Feature Title</Label>
                      <Input
                        id={`feature-title-${index}`}
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`feature-description-${index}`}>Feature Description</Label>
                      <Textarea
                        id={`feature-description-${index}`}
                        rows={3}
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save All Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminAboutUs;