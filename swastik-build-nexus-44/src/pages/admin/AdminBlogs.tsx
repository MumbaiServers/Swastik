import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Calendar, Loader2 } from 'lucide-react';
import { blogsApi, getImageUrl } from '@/services/cmsApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  author: string;
  status: string;
  views: number;
  publishDate?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogsApi.getAll();
      setBlogs(data.blogs || []);
    } catch (err: any) {
      console.error('Failed to fetch blogs:', err);
      setError(err.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await blogsApi.delete(id);
      toast.success(`"${title}" deleted successfully`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete blog');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-green-500';
      case 'draft':
        return 'bg-yellow-500';
      case 'archived':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'No date';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const publishedCount = blogs.filter((b) => b.status.toLowerCase() === 'published').length;
  const draftCount = blogs.filter((b) => b.status.toLowerCase() === 'draft').length;
  const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading blogs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">⚠️ {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">
            Create and manage blog posts ({blogs.length} total)
          </p>
        </div>
        <Button onClick={() => navigate('/admin/blogs/new')}>
          <Plus className="mr-2 h-4 w-4" />
          New Blog Post
        </Button>
      </div>

      {blogs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No blog posts found. Create your first post!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1 flex gap-4">
                    {blog.image && (
                      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                        <img
                          src={getImageUrl(blog.image) || ''}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg">{blog.title}</CardTitle>
                      <CardDescription className="mt-1 line-clamp-1">{blog.excerpt}</CardDescription>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(blog.publishDate || blog.createdAt)}
                        </span>
                        <span>By {blog.author}</span>
                        <span>{blog.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(blog.status)} text-white`}>
                      {blog.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/blogs/${blog.slug}`, '_blank')}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/admin/blogs/${blog.id}`)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(blog.id, blog.title)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Blog Statistics</CardTitle>
          <CardDescription>
            Content performance overview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{publishedCount}</div>
              <div className="text-sm text-muted-foreground">Published</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{draftCount}</div>
              <div className="text-sm text-muted-foreground">Drafts</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalViews.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{blogs.length}</div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogs;