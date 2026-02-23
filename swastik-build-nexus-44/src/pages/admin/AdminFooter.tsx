import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';
import { sectionsApi } from '@/services/cmsApi';

const AdminFooter = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [footerData, setFooterData] = useState({
        corporateName: 'SWASTIK BUILDERS AND DEVELOPERS LLP',
        addressLine1: '312, Swastik DSK Corporate Park 6A,',
        addressLine2: 'Mingra Opp. Shreeyes Cinema,',
        addressLine3: 'Ghatkopar West, Mumbai 400086, INDIA',
        phone: '+91-22-6589 0000',
        email: 'sales@swastikgroup.in',
        copyright: 'Copyright 2025 | All Rights Reserved By Swastik Group',
        developer: 'Developed by Signature Advertising',
        instagram: '',
        facebook: '',
        linkedin: '',
        youtube: ''
    });

    useEffect(() => {
        fetchFooterData();
    }, []);

    const fetchFooterData = async () => {
        try {
            setLoading(true);
            const response = await sectionsApi.getByKey('footer_info');
            if (response.section && response.section.extraData) {
                try {
                    const parsed = JSON.parse(response.section.extraData);
                    setFooterData(prev => ({ ...prev, ...parsed }));
                } catch (e) {
                    console.error('Failed to parse footer extraData', e);
                }
            }
        } catch (error) {
            console.error('Failed to fetch footer data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFooterData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const data = {
                title: 'Footer Information',
                content: footerData.addressLine1, // Fallback
                extraData: JSON.stringify(footerData)
            };

            // Try to update, if fails it might not exist, so create if needed
            // But sectionsApi.update uses PUT /sections/:key
            // Let's check sections.ts - it returns 404 if not found
            try {
                await sectionsApi.update('footer_info', data as any);
            } catch (err: any) {
                if (err.message && (err.message.includes('404') || err.message.toLowerCase().includes('not found'))) {
                    // Create if not exists
                    const createData = new FormData();
                    createData.append('sectionKey', 'footer_info');
                    createData.append('title', data.title);
                    createData.append('content', data.content);
                    createData.append('extraData', data.extraData);
                    await sectionsApi.create(createData);
                } else {
                    throw err;
                }
            }

            toast.success('Footer information updated successfully');
        } catch (error) {
            console.error('Save footer error:', error);
            toast.error('Failed to save footer changes');
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
                    <h1 className="text-3xl font-bold">Footer Management</h1>
                    <p className="text-muted-foreground">
                        Update contact details, address, and copyright information
                    </p>
                </div>
                <Button onClick={handleSave} size="lg" disabled={saving}>
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Details</CardTitle>
                        <CardDescription>Primary communication channels</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={footerData.phone || ''}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                value={footerData.email || ''}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Corporate Address</CardTitle>
                        <CardDescription>Office location details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="corporateName">Corporate Name</Label>
                            <Input
                                id="corporateName"
                                value={footerData.corporateName || ''}
                                onChange={(e) => handleInputChange('corporateName', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="addressLine1">Address Line 1</Label>
                            <Input
                                id="addressLine1"
                                value={footerData.addressLine1 || ''}
                                onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="addressLine2">Address Line 2</Label>
                            <Input
                                id="addressLine2"
                                value={footerData.addressLine2 || ''}
                                onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="addressLine3">Address Line 3</Label>
                            <Input
                                id="addressLine3"
                                value={footerData.addressLine3 || ''}
                                onChange={(e) => handleInputChange('addressLine3', e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Footer Bottom Bar</CardTitle>
                        <CardDescription>Copyright and credits</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="copyright">Copyright Text</Label>
                            <Input
                                id="copyright"
                                value={footerData.copyright || ''}
                                onChange={(e) => handleInputChange('copyright', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="developer">Developer Text</Label>
                            <Input
                                id="developer"
                                value={footerData.developer || ''}
                                onChange={(e) => handleInputChange('developer', e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Social Media Links</CardTitle>
                        <CardDescription>URLs for social media icons in the footer (leave empty to hide/disable link)</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram URL</Label>
                            <Input
                                id="instagram"
                                placeholder="https://instagram.com/..."
                                value={footerData.instagram || ''}
                                onChange={(e) => handleInputChange('instagram', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="facebook">Facebook URL</Label>
                            <Input
                                id="facebook"
                                placeholder="https://facebook.com/..."
                                value={footerData.facebook || ''}
                                onChange={(e) => handleInputChange('facebook', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn URL</Label>
                            <Input
                                id="linkedin"
                                placeholder="https://linkedin.com/..."
                                value={footerData.linkedin || ''}
                                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="youtube">YouTube URL</Label>
                            <Input
                                id="youtube"
                                placeholder="https://youtube.com/..."
                                value={footerData.youtube || ''}
                                onChange={(e) => handleInputChange('youtube', e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSave} size="lg" disabled={saving}>
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default AdminFooter;
