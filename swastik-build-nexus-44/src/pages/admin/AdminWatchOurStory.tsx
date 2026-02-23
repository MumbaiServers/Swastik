import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { sectionsApi } from '@/services/cmsApi';
import { Loader2 } from 'lucide-react';

const AdminWatchOurStory = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState({
        title: 'Watch Our Story',
        content: 'Discover our journey in creating exceptional real estate experiences',
        videoUrl: 'https://www.youtube.com/embed/WUq4bKwC-nM?si=sBQAjI_kCXg4-Qwb'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await sectionsApi.getByKey('watch_our_story');
            if (response.section) {
                setData({
                    title: response.section.title,
                    content: response.section.content,
                    videoUrl: response.section.extraData || ''
                });
            }
        } catch (error) {
            console.error('Failed to fetch section:', error);
            toast.error('Failed to load "Watch Our Story" content');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await sectionsApi.update('watch_our_story', {
                title: data.title,
                content: data.content,
                extraData: data.videoUrl
            } as any);
            toast.success('"Watch Our Story" updated successfully');
        } catch (error) {
            console.error('Failed to update section:', error);
            toast.error('Failed to update section');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Watch Our Story</h1>
                <p className="text-muted-foreground">
                    Update the title, description and YouTube video link for the "Watch Our Story" section
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Content & Video</CardTitle>
                        <CardDescription>
                            Edit the text and embed URL
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="Watch Our Story"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="content">Description</Label>
                            <Textarea
                                id="content"
                                rows={3}
                                value={data.content}
                                onChange={(e) => handleInputChange('content', e.target.value)}
                                placeholder="Enter description..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="videoUrl">YouTube Embed URL</Label>
                            <Input
                                id="videoUrl"
                                value={data.videoUrl}
                                onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                                placeholder="https://www.youtube.com/embed/..."
                            />
                            <p className="text-sm text-muted-foreground">
                                Make sure it is an <strong>embed</strong> URL (e.g., https://www.youtube.com/embed/...)
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Preview</CardTitle>
                        <CardDescription>
                            How it looks on the website
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center max-w-3xl mx-auto border p-8 rounded-xl bg-white shadow-sm">
                            <h2 className="text-2xl font-bold text-brand-navy mb-4">{data.title}</h2>
                            <div className="h-1 bg-brand-blue rounded-full mx-auto mb-6 w-20" />
                            <p className="text-brand-gray mb-8">{data.content}</p>

                            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                                {data.videoUrl ? (
                                    <iframe
                                        className="w-full h-full"
                                        src={data.videoUrl}
                                        title="Video Preview"
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-white">
                                        No video URL provided
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSave} size="lg" disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default AdminWatchOurStory;
