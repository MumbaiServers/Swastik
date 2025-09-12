import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AdminWhoWeAre = () => {
  const [whoWeAreData, setWhoWeAreData] = useState({
    content: `At Swastik Group, we're dedicated to honesty, openness, and quality work in each stage we do. We've successfully completed various projects that blend contemporary design with luxury. We're proud to build durable homes and buildings that are built to last expectations and leave a positive mark in the construction landscape.

Our commitment to excellence and innovation drives us to create spaces that not only meet but exceed expectations, establishing lasting relationships built on trust and quality craftsmanship.`,
    sectionImage: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setWhoWeAreData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setWhoWeAreData(prev => ({ ...prev, sectionImage: file }));
    }
  };

  const handleSave = () => {
    toast.success('Who We Are section updated successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About - Who We Are</h1>
        <p className="text-muted-foreground">
          Update the content and image for the "Who We Are" section
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Section Image</CardTitle>
            <CardDescription>
              Upload the rounded image for the "Who We Are" section
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="section-image">Section Image</Label>
              <Input
                id="section-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Recommended size: 600x400px or similar aspect ratio
              </p>
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
              <Label htmlFor="content">Section Content</Label>
              <Textarea
                id="content"
                rows={10}
                value={whoWeAreData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Enter the content about your company..."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              How the section will appear on the website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Who we are?</h2>
              <div className="text-gray-600 whitespace-pre-line">
                {whoWeAreData.content}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminWhoWeAre;