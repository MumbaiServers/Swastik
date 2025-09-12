import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, X } from 'lucide-react';

const AdminSocialMedia = () => {
  const [socialMediaData, setSocialMediaData] = useState({
    images: [
      { id: 1, file: null as File | null, alt: 'Modern living room interior' },
      { id: 2, file: null as File | null, alt: 'Luxury swimming pool' },
      { id: 3, file: null as File | null, alt: 'Modern residential tower' },
      { id: 4, file: null as File | null, alt: 'State-of-the-art gym' },
      { id: 5, file: null as File | null, alt: 'Contemporary building exterior' }
    ]
  });

  const handleImageUpload = (id: number, file: File) => {
    setSocialMediaData(prev => ({
      ...prev,
      images: prev.images.map(img => 
        img.id === id ? { ...img, file } : img
      )
    }));
  };

  const handleAltTextChange = (id: number, alt: string) => {
    setSocialMediaData(prev => ({
      ...prev,
      images: prev.images.map(img => 
        img.id === id ? { ...img, alt } : img
      )
    }));
  };

  const removeImage = (id: number) => {
    setSocialMediaData(prev => ({
      ...prev,
      images: prev.images.map(img => 
        img.id === id ? { ...img, file: null } : img
      )
    }));
  };

  const handleSave = () => {
    toast.success('Social media post images updated successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Social Media Post Images</h1>
        <p className="text-muted-foreground">
          Upload and manage images for the social media section
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {socialMediaData.images.map((image, index) => (
          <Card key={image.id}>
            <CardHeader>
              <CardTitle className="text-lg">Image {index + 1}</CardTitle>
              <CardDescription>
                {index === 0 ? 'Main featured image (larger display)' : 
                 index === 3 ? 'Wide image (spans 2 columns)' : 
                 'Standard image'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`image-${image.id}`}>Upload Image</Label>
                <div className="relative">
                  <Input
                    id={`image-${image.id}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(image.id, file);
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor={`image-${image.id}`}
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    {image.file ? (
                      <div className="relative w-full h-full">
                        <img
                          src={URL.createObjectURL(image.file)}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 w-6 h-6"
                          onClick={(e) => {
                            e.preventDefault();
                            removeImage(image.id);
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Click to upload</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              
              <div>
                <Label htmlFor={`alt-${image.id}`}>Image Description</Label>
                <Input
                  id={`alt-${image.id}`}
                  value={image.alt}
                  onChange={(e) => handleAltTextChange(image.id, e.target.value)}
                  placeholder="Describe the image..."
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            How the images will be displayed in the social media section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Social Media Post</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {socialMediaData.images.map((image, index) => (
                <div
                  key={image.id}
                  className={`bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 ${
                    index === 0 ? 'md:col-span-2 md:row-span-2 h-40' : 'h-20'
                  } ${index === 3 ? 'md:col-span-2' : ''}`}
                >
                  {image.file ? (
                    <img
                      src={URL.createObjectURL(image.file)}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-sm">Image {index + 1}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminSocialMedia;