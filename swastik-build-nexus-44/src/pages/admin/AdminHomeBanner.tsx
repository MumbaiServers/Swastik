import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Save, Image as ImageIcon } from 'lucide-react';
import { heroBannerApi, getImageUrl } from '@/services/cmsApi';

const AdminHomeBanner = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bannerData, setBannerData] = useState({
    heading: '',
    subtext: '',
  });

  const [images, setImages] = useState({
    image2560: '',
    image1920: '',
    image1536: '',
    imageMobile: '',
  });

  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    image2560: null,
    image1920: null,
    image1536: null,
    imageMobile: null,
  });

  const [previews, setPreviews] = useState<{ [key: string]: string | null }>({
    image2560: null,
    image1920: null,
    image1536: null,
    imageMobile: null,
  });

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      setLoading(true);
      const response = await heroBannerApi.get();
      if (response.banner) {
        setBannerData({
          heading: response.banner.heading || '',
          subtext: response.banner.subtext || '',
        });

        const imgPaths = {
          image2560: response.banner.image2560 || response.banner.backgroundImage || '',
          image1920: response.banner.image1920 || response.banner.backgroundImage || '',
          image1536: response.banner.image1536 || response.banner.backgroundImage || '',
          imageMobile: response.banner.imageMobile || response.banner.backgroundImage || '',
        };

        setImages(imgPaths);

        setPreviews({
          image2560: imgPaths.image2560 ? getImageUrl(imgPaths.image2560) : null,
          image1920: imgPaths.image1920 ? getImageUrl(imgPaths.image1920) : null,
          image1536: imgPaths.image1536 ? getImageUrl(imgPaths.image1536) : null,
          imageMobile: imgPaths.imageMobile ? getImageUrl(imgPaths.imageMobile) : null,
        });
      }
    } catch (error) {
      console.error('Failed to fetch hero data:', error);
      toast.error('Failed to load banner data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setBannerData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file (PNG, JPG, WEBP)');
        return;
      }
      setFiles(prev => ({ ...prev, [field]: file }));
      setPreviews(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('heading', bannerData.heading);
      formData.append('subtext', bannerData.subtext);

      if (files.image2560) formData.append('image2560', files.image2560);
      if (files.image1920) formData.append('image1920', files.image1920);
      if (files.image1536) formData.append('image1536', files.image1536);
      if (files.imageMobile) formData.append('imageMobile', files.imageMobile);

      // We handle fallback. For backwards compatibility let's just use image1920 as backgroundImage
      if (files.image1920) formData.append('backgroundImage', files.image1920);

      await heroBannerApi.update(formData);
      toast.success('Home banner updated successfully');
      await fetchHeroData();
      setFiles({ image2560: null, image1920: null, image1536: null, imageMobile: null });
    } catch (error) {
      console.error('Save hero error:', error);
      toast.error('Failed to save banner changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const ImageUploadBlock = ({ label, field, desc }: { label: string, field: string, desc: string }) => (
    <div className="border border-dashed p-4 rounded-lg flex flex-col items-center justify-center bg-muted/20">
      <Label className="font-bold mb-2">{label}</Label>
      <p className="text-xs text-muted-foreground mb-4 text-center">{desc}</p>
      {previews[field] ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-black">
          <img src={previews[field]!} alt="Preview" className="w-full h-full object-cover opacity-80" />
        </div>
      ) : (
        <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
      )}
      <Label htmlFor={`upload-${field}`} className="cursor-pointer">
        <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm hover:opacity-90">
          {files[field] || images[field as keyof typeof images] ? 'Change' : 'Upload'}
        </div>
        <Input
          id={`upload-${field}`}
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={(e) => handleImageUpload(field, e)}
          className="hidden"
        />
      </Label>
    </div>
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Main Welcome Picture & Tagline</h1>
          <p className="text-muted-foreground">
            Update the main hero section of your homepage
          </p>
        </div>
        <Button onClick={handleSave} size="lg" disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Responsive Background Images</CardTitle>
            <CardDescription>
              Upload 4 different image sizes ensuring perfect viewing on all devices.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <ImageUploadBlock field="image2560" label="Ultra Wide (2K)" desc="2560 x 1080px (for very large screens)" />
            <ImageUploadBlock field="image1920" label="Desktop (HD)" desc="1920 x 900px (standard laptops/desktops)" />
            <ImageUploadBlock field="image1536" label="Laptop / Tablet Landscape" desc="1536 x 1024px (macbooks & tablets)" />
            <ImageUploadBlock field="imageMobile" label="Mobile Devices" desc="1080 x 1440px or 412x915px (smartphones)" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Text Content</CardTitle>
            <CardDescription>
              Edit the main heading and subtext for the banner
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heading">Main Heading</Label>
              <Input
                id="heading"
                value={bannerData.heading}
                onChange={(e) => handleInputChange('heading', e.target.value)}
                placeholder="Find Your Dream Home Today"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtext">Subtext</Label>
              <Textarea
                id="subtext"
                rows={5}
                value={bannerData.subtext}
                onChange={(e) => handleInputChange('subtext', e.target.value)}
                placeholder="Discover premium residential properties..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Final Preview (Live Context)</CardTitle>
            <CardDescription>
              Showing Desktop (1920) overlay preview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-[21/9] w-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
              {previews.image1920 && (
                <img src={previews.image1920} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Preview" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center text-center p-8">
                <div className="max-w-2xl space-y-4">
                  <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                    {bannerData.heading || 'Your Heading Here'}
                  </h1>
                  <p className="text-lg text-white/90 drop-shadow-md">
                    {bannerData.subtext || 'Discover your perfect future with us.'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default AdminHomeBanner;