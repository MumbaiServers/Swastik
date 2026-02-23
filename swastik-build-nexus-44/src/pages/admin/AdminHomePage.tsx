import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save, MapPin, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { sectionsApi, vvmApi, featureCardsApi, locationsApi, getImageUrl } from '@/services/cmsApi';

const AdminHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [whoWeAre, setWhoWeAre] = useState({ title: '', content: '', image: '' });
  const [whoWeAreFile, setWhoWeAreFile] = useState<File | null>(null);
  const [whoWeArePreview, setWhoWeArePreview] = useState<string | null>(null);

  const [vvmItems, setVvmItems] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [whoRes, vvmRes, featureRes, locRes] = await Promise.all([
        sectionsApi.getByKey('who_we_are'),
        vvmApi.getAll(),
        featureCardsApi.getAll('home'),
        locationsApi.getAll()
      ]);

      if (whoRes.section) {
        setWhoWeAre({
          title: whoRes.section.title,
          content: whoRes.section.content,
          image: whoRes.section.image
        });
        if (whoRes.section.image) {
          setWhoWeArePreview(getImageUrl(whoRes.section.image));
        }
      }
      setVvmItems(vvmRes.vvmItems || []);
      setFeatures(featureRes.cards || []);
      setLocations(locRes.locations || []);
    } catch (error) {
      console.error('Failed to fetch home page data:', error);
      toast.error('Failed to load page content');
    } finally {
      setLoading(false);
    }
  };

  const handleWhoWeAreImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setWhoWeAreFile(file);
      setWhoWeArePreview(URL.createObjectURL(file));
    }
  };

  const handleWhoWeAreSave = async () => {
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('title', whoWeAre.title);
      formData.append('content', whoWeAre.content);
      if (whoWeAreFile) {
        formData.append('image', whoWeAreFile);
      }

      await sectionsApi.update('who_we_are', formData);
      toast.success('Who We Are section updated');
      setWhoWeAreFile(null);
    } catch (error) {
      toast.error('Failed to save Who We Are section');
    } finally {
      setSaving(false);
    }
  };

  const handleLocationChange = (index: number, value: string) => {
    const updated = [...locations];
    updated[index].name = value;
    setLocations(updated);
  };

  const addLocation = () => {
    setLocations([...locations, { name: '' }]);
  };

  const removeLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleLocationsSave = async () => {
    try {
      setSaving(true);
      const validLocations = locations.filter(l => l.name.trim() !== '');
      await locationsApi.update(validLocations);
      toast.success('Presence locations updated successfully');
      await fetchData();
    } catch (error) {
      toast.error('Failed to save locations');
    } finally {
      setSaving(false);
    }
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: value };
    setFeatures(updated);
  };

  const handleFeaturesSave = async () => {
    try {
      setSaving(true);
      await featureCardsApi.update('home', features);
      toast.success('Why Choose Us features updated successfully');
      await fetchData();
    } catch (error) {
      toast.error('Failed to save Why Choose Us features');
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
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Home Page Management</h1>
          <p className="text-muted-foreground">
            Update all sections displayed on the home page
          </p>
        </div>
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
                <CardTitle>Content</CardTitle>
                <CardDescription>Edit text for the "Who We Are" section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input
                    value={whoWeAre.title}
                    onChange={(e) => setWhoWeAre({ ...whoWeAre, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content Text</Label>
                  <Textarea
                    rows={8}
                    value={whoWeAre.content}
                    onChange={(e) => setWhoWeAre({ ...whoWeAre, content: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Section Image</CardTitle>
                <CardDescription>Update the featured image for this section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center border-2 border-dashed">
                  {whoWeArePreview ? (
                    <img src={whoWeArePreview} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
                <Label htmlFor="who-we-are-image" className="cursor-pointer inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md">
                  {whoWeAreFile || whoWeAre.image ? 'Change Image' : 'Upload Image'}
                  <Input id="who-we-are-image" type="file" className="hidden" onChange={handleWhoWeAreImageChange} />
                </Label>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleWhoWeAreSave} disabled={saving} size="lg">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Who We Are Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="values-vision" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Values, Vision & Mission</CardTitle>
                <CardDescription>Manage core principles and long-term vision</CardDescription>
              </div>
              <Button onClick={() => window.location.href = '/admin/values-vision-mission'}>
                Go to Dedicated Page
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vvmItems.map((item: any) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <h4 className="font-bold capitalize mb-2">{item.type}</h4>
                    <p className="text-xs line-clamp-3">{item.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="why-choose-us" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why Choose Us Cards</CardTitle>
              <CardDescription>Key benefits shown on home page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((card: any, index: number) => (
                  <div key={card.id || index} className="p-4 border rounded-lg space-y-3">
                    <div className="space-y-1">
                      <Label>Title</Label>
                      <Input
                        value={card.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                        placeholder="Feature Title"
                        className="font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Description</Label>
                      <Textarea
                        value={card.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        placeholder="Feature Description"
                        rows={3}
                        className="text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button onClick={handleFeaturesSave} disabled={saving} size="lg">
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Why Choose Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="our-presence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Presence Locations</CardTitle>
              <CardDescription>
                Manage list of locations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                  <Input
                    value={location.name}
                    onChange={(e) => handleLocationChange(index, e.target.value)}
                    placeholder="Location name"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeLocation(index)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-4">
                <Button variant="outline" onClick={addLocation} className="w-full">
                  <Plus className="w-4 h-4 mr-2" /> Add Location
                </Button>
                <Button onClick={handleLocationsSave} disabled={saving} className="w-full">
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Presence List
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminHomePage;