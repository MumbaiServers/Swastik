import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, X, Plus, Save, Loader2, Globe, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { socialMediaApi, getImageUrl } from '@/services/cmsApi';

const platformIcons: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
};

const AdminSocialMedia = () => {
  const [loading, setLoading] = useState(true);
  const [savingLinks, setSavingLinks] = useState(false);
  const [savingPosts, setSavingPosts] = useState(false);

  // Social Links state
  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  // Social Posts state
  const [socialPosts, setSocialPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [linksRes, postsRes] = await Promise.all([
        socialMediaApi.getAll(),
        socialMediaApi.getAllPosts()
      ]);
      setSocialLinks(linksRes.links || []);
      setSocialPosts(postsRes.posts || []);
    } catch (error) {
      console.error('Failed to fetch social media data:', error);
      toast.error('Failed to load social media data');
    } finally {
      setLoading(false);
    }
  };

  // --- Links Handlers ---
  const handleLinkChange = (index: number, field: string, value: string) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  };

  const addLink = () => {
    setSocialLinks([...socialLinks, { platform: 'instagram', url: '', icon: '' }]);
  };

  const removeLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const saveLinks = async () => {
    try {
      setSavingLinks(true);
      await socialMediaApi.update(socialLinks);
      toast.success('Social media links updated');
    } catch (error) {
      toast.error('Failed to save social links');
    } finally {
      setSavingLinks(false);
    }
  };

  // --- Posts Handlers ---
  const handleCreatePost = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSavingPosts(true);
      const formData = new FormData();
      formData.append('image', file);
      formData.append('alt', 'Social media post');
      formData.append('platform', 'instagram');
      formData.append('sortOrder', socialPosts.length.toString());

      await socialMediaApi.createPost(formData);
      toast.success('Image uploaded successfully');
      fetchData(); // Refresh list
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setSavingPosts(false);
    }
  };

  const deletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post image?')) return;
    try {
      setSavingPosts(true);
      await socialMediaApi.deletePost(id);
      toast.success('Post image deleted');
      setSocialPosts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      toast.error('Failed to delete image');
    } finally {
      setSavingPosts(false);
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
    <div className="space-y-10">
      {/* 1. SOCIAL MEDIA LINKS SECTION */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold">Social Media Profiles</h1>
            <p className="text-muted-foreground">Manage your brand's presence across platforms</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={addLink}><Plus className="w-4 h-4 mr-2" /> Add Link</Button>
            <Button onClick={saveLinks} disabled={savingLinks}>
              {savingLinks ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Links
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Platform Links</CardTitle>
            <CardDescription>Configure which icons appear in the footer and social section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {socialLinks.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No social links added yet.</p>
            ) : (
              socialLinks.map((link, index) => {
                const Icon = platformIcons[link.platform.toLowerCase()] || Globe;
                return (
                  <div key={index} className="flex gap-4 items-center bg-muted/30 p-3 rounded-lg border">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border shadow-sm">
                      <Icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">Platform</Label>
                        <select
                          className="w-full bg-background border rounded px-2 h-9 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                          value={link.platform.toLowerCase()}
                          onChange={(e) => handleLinkChange(index, 'platform', e.target.value)}
                        >
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="youtube">YouTube</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">URL</Label>
                        <Input
                          placeholder="https://..."
                          value={link.url}
                          onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                          className="h-9"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 mt-4"
                      onClick={() => removeLink(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </section>

      {/* 2. SOCIAL MEDIA POST IMAGES GRID */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold">Social Media Post Images</h1>
            <p className="text-muted-foreground">Manage the visual grid on your homepage</p>
          </div>
          <div className="flex gap-2">
            <Label htmlFor="post-upload" className="cursor-pointer">
              <div className="flex items-center px-4 h-10 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
                {savingPosts ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                Upload Image
              </div>
              <Input
                id="post-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCreatePost}
                disabled={savingPosts}
              />
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {socialPosts.map((post) => (
            <Card key={post.id} className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 shadow-sm">
              <div className="aspect-square relative flex items-center justify-center bg-muted">
                <img
                  src={getImageUrl(post.image)!}
                  alt={post.alt || 'Social post'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full shadow-lg h-9 w-9"
                    onClick={() => deletePost(post.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-brand-navy shadow-sm uppercase">
                    {post.platform}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white">
                <Label className="text-[10px] font-bold text-muted-foreground uppercase">Alt Text</Label>
                <Input
                  value={post.alt || ''}
                  onChange={async (e) => {
                    const updated = [...socialPosts];
                    const idx = updated.findIndex(p => p.id === post.id);
                    updated[idx].alt = e.target.value;
                    setSocialPosts(updated);
                  }}
                  onBlur={async () => {
                    const updatedPost = socialPosts.find(p => p.id === post.id);
                    const formData = new FormData();
                    formData.append('alt', updatedPost.alt || '');
                    await socialMediaApi.updatePost(post.id, formData);
                  }}
                  className="h-8 text-xs border-none bg-muted/50 focus-visible:ring-0"
                  placeholder="Image description..."
                />
              </div>
            </Card>
          ))}

          {socialPosts.length === 0 && !savingPosts && (
            <div className="col-span-full py-12 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground grayscale">
              <Instagram className="w-12 h-12 mb-4 opacity-20" />
              <p>No images uploaded for the social grid.</p>
              <p className="text-xs">Click 'Upload Image' to add your first post.</p>
            </div>
          )}

          {savingPosts && (
            <div className="aspect-square border-2 border-dashed rounded-xl flex items-center justify-center bg-muted/30">
              <Loader2 className="w-8 h-8 animate-spin text-primary opacity-30" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminSocialMedia;