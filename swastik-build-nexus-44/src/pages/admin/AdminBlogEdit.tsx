import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Save, ArrowLeft, Image as ImageIcon, Globe, FileText } from 'lucide-react';
import { blogsApi, getImageUrl } from '@/services/cmsApi';

const AdminBlogEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: 'Admin',
        status: 'draft',
        publishDate: '',
        image: ''
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (isEditing) {
            fetchBlog();
        }
    }, [id]);

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const data = await blogsApi.getAll();
            const blog = data.blogs.find((b: any) => b.id === parseInt(id!));

            if (blog) {
                setFormData({
                    title: blog.title || '',
                    slug: blog.slug || '',
                    excerpt: blog.excerpt || '',
                    content: blog.content || '',
                    author: blog.author || 'Admin',
                    status: blog.status || 'draft',
                    publishDate: blog.publishDate ? new Date(blog.publishDate).toISOString().split('T')[0] : '',
                    image: blog.image || ''
                });
                if (blog.image) {
                    setPreviewUrl(getImageUrl(blog.image));
                }
            } else {
                toast.error('Blog not found');
                navigate('/admin/blogs');
            }
        } catch (error) {
            console.error('Failed to fetch blog:', error);
            toast.error('Error loading blog data');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };
            // Auto-generate slug from title if it's a new post and slug is empty
            if (field === 'title' && !isEditing && !prev.slug) {
                updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            }
            return updated;
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async (forceStatus?: string) => {
        if (!formData.title || !formData.slug || !formData.content) {
            toast.error('Please fill in all required fields (Title, Slug, Content)');
            return;
        }

        try {
            setSaving(true);
            const data = new FormData();
            data.append('title', formData.title);
            data.append('slug', formData.slug);
            data.append('excerpt', formData.excerpt);
            data.append('content', formData.content);
            data.append('author', formData.author);
            data.append('status', forceStatus || formData.status);
            if (formData.publishDate) {
                data.append('publishDate', formData.publishDate);
            }
            if (selectedFile) {
                data.append('image', selectedFile);
            }

            if (isEditing) {
                await blogsApi.update(parseInt(id!), data);
                toast.success('Blog updated successfully');
            } else {
                await blogsApi.create(data);
                toast.success('Blog created successfully');
            }
            navigate('/admin/blogs');
        } catch (error: any) {
            console.error('Save error:', error);
            toast.error(error.message || 'Failed to save blog');
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
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => navigate('/admin/blogs')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">{isEditing ? 'Edit Blog Post' : 'Create New Blog'}</h1>
                        <p className="text-muted-foreground">
                            {isEditing ? 'Make changes to your existing post' : 'Draft a new insight for your readers'}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate('/admin/blogs')}>Cancel</Button>
                    {formData.status !== 'published' && (
                        <Button
                            variant="secondary"
                            onClick={() => handleSave('draft')}
                            disabled={saving}
                        >
                            <Save className="mr-2 h-4 w-4" /> Save as Draft
                        </Button>
                    )}
                    <Button onClick={() => handleSave('published')} disabled={saving}>
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Globe className="mr-2 h-4 w-4" />}
                        {isEditing && formData.status === 'published' ? 'Update Post' : 'Publish Blog'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Article Content</CardTitle>
                            <CardDescription>The core of your blog post</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Post Title *</Label>
                                <Input
                                    id="title"
                                    size={40}
                                    className="text-lg font-bold"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="The future of sustainable real estate..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Short Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    rows={3}
                                    value={formData.excerpt}
                                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                    placeholder="A brief summary shown on the blog list page..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Full Content (HTML Supported) *</Label>
                                <Textarea
                                    id="content"
                                    rows={20}
                                    className="font-serif text-lg leading-relaxed"
                                    value={formData.content}
                                    onChange={(e) => handleInputChange('content', e.target.value)}
                                    placeholder="Start writing your story here..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="slug">URL Slug *</Label>
                                <div className="flex gap-1 items-center bg-muted/50 rounded-md px-2 border">
                                    <Globe className="h-3 w-3 text-muted-foreground" />
                                    <Input
                                        id="slug"
                                        className="border-0 bg-transparent h-8 text-xs focus-visible:ring-0"
                                        value={formData.slug}
                                        onChange={(e) => handleInputChange('slug', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(v) => handleInputChange('status', v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="publishDate">Publish Date</Label>
                                <Input
                                    id="publishDate"
                                    type="date"
                                    value={formData.publishDate}
                                    onChange={(e) => handleInputChange('publishDate', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="author">Author</Label>
                                <Input
                                    id="author"
                                    value={formData.author}
                                    onChange={(e) => handleInputChange('author', e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Featured Image</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border-2 border-dashed flex items-center justify-center">
                                {previewUrl ? (
                                    <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                                )}
                            </div>
                            <Label htmlFor="blog-image" className="cursor-pointer">
                                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-center hover:opacity-90 transition-opacity">
                                    {isEditing || selectedFile ? 'Change Image' : 'Upload Featured Image'}
                                </div>
                                <Input
                                    id="blog-image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </Label>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminBlogEdit;
