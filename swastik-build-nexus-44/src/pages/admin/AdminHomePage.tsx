import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminHomePage = () => {
  const [homePageData, setHomePageData] = useState({
    whoWeAre: {
      content: `At Swastik Group, we're dedicated to honesty, openness, and quality work in each stage we do. We've successfully completed various projects that blend contemporary design with luxury. We're proud to build durable homes and buildings that are built to last expectations and leave a positive mark in the construction landscape.

Our commitment to excellence and innovation drives us to create spaces that not only meet but exceed expectations, establishing lasting relationships built on trust and quality craftsmanship.`,
      image: null as File | null
    },
    valuesVisionMission: {
      values: "Integrity, transparency, and excellence form the foundation of everything we do.",
      vision: "To be Mumbai's most trusted real estate developer, creating sustainable communities.",
      mission: "Building quality homes that blend contemporary design with innovation and sustainability.",
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
    },
    ourPresence: {
      locations: ["Chembur", "Ghatkopar", "Vikhroli", "Mulund", "Powai", "Andheri"]
    }
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    setHomePageData(prev => ({
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
      setHomePageData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          image: file
        }
      }));
    }
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    setHomePageData(prev => ({
      ...prev,
      whyChooseUs: {
        ...prev.whyChooseUs,
        features: prev.whyChooseUs.features.map((feature, i) =>
          i === index ? { ...feature, [field]: value } : feature
        )
      }
    }));
  };

  const handleLocationChange = (index: number, value: string) => {
    setHomePageData(prev => ({
      ...prev,
      ourPresence: {
        locations: prev.ourPresence.locations.map((location, i) =>
          i === index ? value : location
        )
      }
    }));
  };

  const addLocation = () => {
    setHomePageData(prev => ({
      ...prev,
      ourPresence: {
        locations: [...prev.ourPresence.locations, "New Location"]
      }
    }));
  };

  const removeLocation = (index: number) => {
    setHomePageData(prev => ({
      ...prev,
      ourPresence: {
        locations: prev.ourPresence.locations.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSave = () => {
    toast.success('Home page content updated successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Home Page Management</h1>
        <p className="text-muted-foreground">
          Update all sections displayed on the home page
        </p>
      </div>

      <Tabs defaultValue="who-we-are" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="who-we-are">Who We Are</TabsTrigger>
          <TabsTrigger value="values-vision">Values & Vision</TabsTrigger>
          <TabsTrigger value="why-choose-us">Why Choose Us</TabsTrigger>
          <TabsTrigger value="our-presence">Our Presence</TabsTrigger>
        </TabsList>

        <TabsContent value="who-we-are" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Section Image</CardTitle>
                <CardDescription>
                  Upload the image for the "Who We Are" section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="who-we-are-image">Section Image</Label>
                  <Input
                    id="who-we-are-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload('whoWeAre', e)}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  Edit the text content for this section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="who-we-are-content">Section Content</Label>
                  <Textarea
                    id="who-we-are-content"
                    rows={10}
                    value={homePageData.whoWeAre.content}
                    onChange={(e) => handleInputChange('whoWeAre', 'content', e.target.value)}
                    placeholder="Enter the content about your company..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="values-vision" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Section Image</CardTitle>
                <CardDescription>
                  Upload the image for the Values, Vision & Mission section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="values-vision-image">Section Image</Label>
                  <Input
                    id="values-vision-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload('valuesVisionMission', e)}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  Edit the values, vision, and mission content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="values">Our Values</Label>
                  <Textarea
                    id="values"
                    rows={3}
                    value={homePageData.valuesVisionMission.values}
                    onChange={(e) => handleInputChange('valuesVisionMission', 'values', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="vision">Our Vision</Label>
                  <Textarea
                    id="vision"
                    rows={3}
                    value={homePageData.valuesVisionMission.vision}
                    onChange={(e) => handleInputChange('valuesVisionMission', 'vision', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="mission">Our Mission</Label>
                  <Textarea
                    id="mission"
                    rows={3}
                    value={homePageData.valuesVisionMission.mission}
                    onChange={(e) => handleInputChange('valuesVisionMission', 'mission', e.target.value)}
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
                  value={homePageData.whyChooseUs.description}
                  onChange={(e) => handleInputChange('whyChooseUs', 'description', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Feature Cards</h4>
                {homePageData.whyChooseUs.features.map((feature, index) => (
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

        <TabsContent value="our-presence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Presence Locations</CardTitle>
              <CardDescription>
                Manage the list of locations where your company has presence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {homePageData.ourPresence.locations.map((location, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={location}
                    onChange={(e) => handleLocationChange(index, e.target.value)}
                    placeholder="Location name"
                  />
                  <Button
                    variant="outline"
                    onClick={() => removeLocation(index)}
                    disabled={homePageData.ourPresence.locations.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addLocation}>
                Add Location
              </Button>
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

export default AdminHomePage;