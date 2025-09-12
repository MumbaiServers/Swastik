import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AdminValuesVisionMission = () => {
  const [vvmData, setVvmData] = useState({
    values: 'Integrity, transparency, and excellence form the foundation of everything we do.',
    vision: 'To be Mumbai\'s most trusted real estate developer, creating sustainable communities.',
    mission: 'Building quality homes that blend contemporary design with innovation and sustainability.',
    sectionImage: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setVvmData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVvmData(prev => ({ ...prev, sectionImage: file }));
    }
  };

  const handleSave = () => {
    toast.success('Values, Vision & Mission section updated successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About - Values, Vision & Mission</h1>
        <p className="text-muted-foreground">
          Update the content and image for the Values, Vision & Mission section
        </p>
      </div>

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
            <CardTitle>Content Blocks</CardTitle>
            <CardDescription>
              Edit the text content for each section
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="values">Our Values</Label>
              <Textarea
                id="values"
                rows={3}
                value={vvmData.values}
                onChange={(e) => handleInputChange('values', e.target.value)}
                placeholder="Enter your company values..."
              />
            </div>
            <div>
              <Label htmlFor="vision">Our Vision</Label>
              <Textarea
                id="vision"
                rows={3}
                value={vvmData.vision}
                onChange={(e) => handleInputChange('vision', e.target.value)}
                placeholder="Enter your company vision..."
              />
            </div>
            <div>
              <Label htmlFor="mission">Our Mission</Label>
              <Textarea
                id="mission"
                rows={3}
                value={vvmData.mission}
                onChange={(e) => handleInputChange('mission', e.target.value)}
                placeholder="Enter your company mission..."
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
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Our Values</h3>
                <p className="text-gray-600">{vvmData.values}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Our Vision</h3>
                <p className="text-gray-600">{vvmData.vision}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Our Mission</h3>
                <p className="text-gray-600">{vvmData.mission}</p>
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

export default AdminValuesVisionMission;