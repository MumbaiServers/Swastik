import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save, Upload } from 'lucide-react';
import { sectionsApi, featureCardsApi, getImageUrl } from '@/services/cmsApi';

const AdminAboutUs = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [ourBusiness, setOurBusiness] = useState({
    title: 'Our Business',
    content: '',
    image: null as string | null,
    imageFile: null as File | null,
    previewUrl: null as string | null
  });

  const [aboutUsMain, setAboutUsMain] = useState({
    title: 'About Us',
    content: '',
    image: null as string | null,
    imageFile: null as File | null,
    previewUrl: null as string | null
  });

  const [features, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch sections one by one to handle missing ones gracefully
      try {
        const bizRes = await sectionsApi.getByKey('our_business');
        if (bizRes.section) {
          setOurBusiness({
            title: bizRes.section.title,
            content: bizRes.section.content,
            image: bizRes.section.image,
            imageFile: null,
            previewUrl: bizRes.section.image ? getImageUrl(bizRes.section.image) : null
          });
        }
      } catch (e: any) {
        console.warn('our_business section not found');
      }

      try {
        const aboutRes = await sectionsApi.getByKey('about_us_main');
        if (aboutRes.section) {
          setAboutUsMain({
            title: aboutRes.section.title,
            content: aboutRes.section.content,
            image: aboutRes.section.image,
            imageFile: null,
            previewUrl: aboutRes.section.image ? getImageUrl(aboutRes.section.image) : null
          });
        }
      } catch (e: any) {
        console.warn('about_us_main section not found');
      }

      try {
        const featuresRes = await featureCardsApi.getAll('home');
        setFeatures(featuresRes.cards || []);
      } catch (e: any) {
        console.warn('features not found');
      }
    } catch (error) {
      console.error('Unexpected error fetching About Us data:', error);
      toast.error('Failed to load page content');
    } finally {
      setLoading(false);
    }
  };

  const handleOurBusinessChange = (field: string, value: any) => {
    setOurBusiness(prev => ({ ...prev, [field]: value }));
  };

  const handleAboutUsChange = (field: string, value: any) => {
    setAboutUsMain(prev => ({ ...prev, [field]: value }));
  };

  const handleOurBusinessImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOurBusiness(prev => ({
        ...prev,
        imageFile: file,
        previewUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleAboutUsImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAboutUsMain(prev => ({
        ...prev,
        imageFile: file,
        previewUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: value };
    setFeatures(updated);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Save Our Business
      const bizData = new FormData();
      bizData.append('sectionKey', 'our_business');
      bizData.append('title', ourBusiness.title);
      bizData.append('content', ourBusiness.content);
      if (ourBusiness.imageFile) bizData.append('image', ourBusiness.imageFile);

      try {
        await sectionsApi.update('our_business', bizData);
      } catch {
        await sectionsApi.create(bizData);
      }

      // Save About Us Main
      const aboutData = new FormData();
      aboutData.append('sectionKey', 'about_us_main');
      aboutData.append('title', aboutUsMain.title);
      aboutData.append('content', aboutUsMain.content);
      if (aboutUsMain.imageFile) aboutData.append('image', aboutUsMain.imageFile);

      try {
        await sectionsApi.update('about_us_main', aboutData);
      } catch {
        await sectionsApi.create(aboutData);
      }

      // Save Features (Home page cards)
      await featureCardsApi.update('home', features);

      toast.success('About Us content saved successfully');
      fetchData();
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('Failed to save changes');
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">About Us Page Management</h1>
          <p className="text-muted-foreground">Update all sections displayed on the About Us page</p>
        </div>
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save All Changes
        </Button>
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
                <CardDescription>Featured image for "Our Business" section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ourBusiness.previewUrl && (
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <img src={ourBusiness.previewUrl} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                )}
                <div>
                  <Label htmlFor="business-image" className="cursor-pointer">
                    <div className="flex items-center justify-center w-full h-12 border-2 border-dashed rounded-lg hover:bg-muted/50 transition-colors">
                      <Upload className="w-4 h-4 mr-2" />
                      {ourBusiness.previewUrl ? 'Change Image' : 'Upload Image'}
                    </div>
                  </Label>
                  <Input id="business-image" type="file" accept="image/*" className="hidden" onChange={handleOurBusinessImage} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>Edit section title and content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="biz-title">Title</Label>
                  <Input id="biz-title" value={ourBusiness.title} onChange={(e) => handleOurBusinessChange('title', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biz-content">Content</Label>
                  <Textarea id="biz-content" rows={8} value={ourBusiness.content} onChange={(e) => handleOurBusinessChange('content', e.target.value)} />
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
                <CardDescription>Featured image for the main "About Us" section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aboutUsMain.previewUrl && (
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <img src={aboutUsMain.previewUrl} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                )}
                <div>
                  <Label htmlFor="about-image" className="cursor-pointer">
                    <div className="flex items-center justify-center w-full h-12 border-2 border-dashed rounded-lg hover:bg-muted/50 transition-colors">
                      <Upload className="w-4 h-4 mr-2" />
                      {aboutUsMain.previewUrl ? 'Change Image' : 'Upload Image'}
                    </div>
                  </Label>
                  <Input id="about-image" type="file" accept="image/*" className="hidden" onChange={handleAboutUsImage} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About Us Details</CardTitle>
                <CardDescription>Edit section title and content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about-title">Title</Label>
                  <Input id="about-title" value={aboutUsMain.title} onChange={(e) => handleAboutUsChange('title', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-content">Content</Label>
                  <Textarea id="about-content" rows={8} value={aboutUsMain.content} onChange={(e) => handleAboutUsChange('content', e.target.value)} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="why-choose-us" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why Choose Us Features</CardTitle>
              <CardDescription>These features appear on both Home and About Us pages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-xl bg-muted/20">
                    <div className="space-y-1">
                      <Label className="text-xs uppercase font-bold text-muted-foreground">Title</Label>
                      <Input value={feature.title} onChange={(e) => handleFeatureChange(index, 'title', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs uppercase font-bold text-muted-foreground">Description</Label>
                      <Textarea rows={3} value={feature.description} onChange={(e) => handleFeatureChange(index, 'description', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAboutUs;