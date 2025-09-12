import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AdminProjectsDescription = () => {
  const [projectsData, setProjectsData] = useState({
    description: `Over the years, In Swastik Group we completed more than 1 million square feet of high-quality homes and offices in Mumbai MMR, Nashik, Talegaon, and Shirdi. Our projects include tall buildings, modern office and shopping areas, and comfortable homes. Each project is carefully planned and built to show our dedication to quality, creativity, and customer satisfaction.`
  });

  const handleInputChange = (field: string, value: string) => {
    setProjectsData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success('Our Projects Description section updated successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Us - Our Projects Description</h1>
        <p className="text-muted-foreground">
          Update the description text for the "Our Projects" section
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Projects Description</CardTitle>
            <CardDescription>
              Edit the description text for the Our Projects section
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description">Projects Description</Label>
              <Textarea
                id="description"
                rows={8}
                value={projectsData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter the projects description..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              How the section will appear on the website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Projects</h2>
              <div className="text-gray-600 whitespace-pre-line">
                {projectsData.description}
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

export default AdminProjectsDescription;