import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Swastik Group',
    siteDescription: 'Leading real estate development company',
    contactEmail: 'contact@swastikgroup.com',
    contactPhone: '+91 1234567890',
    address: '123 Business District, Mumbai, Maharashtra',
    socialMedia: {
      facebook: 'https://facebook.com/swastikgroup',
      twitter: 'https://twitter.com/swastikgroup',
      instagram: 'https://instagram.com/swastikgroup',
      linkedin: 'https://linkedin.com/company/swastikgroup'
    },
    features: {
      blogEnabled: true,
      faqEnabled: true,
      emiCalculator: true,
      newsletterSignup: true
    },
    seo: {
      metaTitle: 'Swastik Group - Real Estate Development',
      metaDescription: 'Leading real estate development company with 20+ years of experience',
      keywords: 'real estate, property, development, residential, commercial'
    }
  });

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as any),
        [field]: value
      }
    }));
  };

  const handleDirectChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage site configuration and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Basic site information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleDirectChange('siteName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                rows={3}
                value={settings.siteDescription}
                onChange={(e) => handleDirectChange('siteDescription', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Primary contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleDirectChange('contactEmail', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Phone</Label>
              <Input
                id="contactPhone"
                value={settings.contactPhone}
                onChange={(e) => handleDirectChange('contactPhone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                rows={3}
                value={settings.address}
                onChange={(e) => handleDirectChange('address', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>
              Social media profile links
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={settings.socialMedia.facebook}
                onChange={(e) => handleInputChange('socialMedia', 'facebook', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={settings.socialMedia.twitter}
                onChange={(e) => handleInputChange('socialMedia', 'twitter', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={settings.socialMedia.instagram}
                onChange={(e) => handleInputChange('socialMedia', 'instagram', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={settings.socialMedia.linkedin}
                onChange={(e) => handleInputChange('socialMedia', 'linkedin', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Toggles</CardTitle>
            <CardDescription>
              Enable or disable site features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="blogEnabled">Blog Section</Label>
              <Switch
                id="blogEnabled"
                checked={settings.features.blogEnabled}
                onCheckedChange={(checked) => handleInputChange('features', 'blogEnabled', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="faqEnabled">FAQ Section</Label>
              <Switch
                id="faqEnabled"
                checked={settings.features.faqEnabled}
                onCheckedChange={(checked) => handleInputChange('features', 'faqEnabled', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emiCalculator">EMI Calculator</Label>
              <Switch
                id="emiCalculator"
                checked={settings.features.emiCalculator}
                onCheckedChange={(checked) => handleInputChange('features', 'emiCalculator', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="newsletterSignup">Newsletter Signup</Label>
              <Switch
                id="newsletterSignup"
                checked={settings.features.newsletterSignup}
                onCheckedChange={(checked) => handleInputChange('features', 'newsletterSignup', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>
              Search engine optimization settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={settings.seo.metaTitle}
                onChange={(e) => handleInputChange('seo', 'metaTitle', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                rows={3}
                value={settings.seo.metaDescription}
                onChange={(e) => handleInputChange('seo', 'metaDescription', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                value={settings.seo.keywords}
                onChange={(e) => handleInputChange('seo', 'keywords', e.target.value)}
                placeholder="Separate keywords with commas"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;