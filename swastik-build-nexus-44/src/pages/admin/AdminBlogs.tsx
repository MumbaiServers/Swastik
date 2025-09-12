import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';

const AdminBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: 'Real Estate Market Trends 2024',
      excerpt: 'Analyzing the current market conditions and future prospects...',
      status: 'Published',
      author: 'Admin',
      publishDate: '2024-01-15',
      views: 1250
    },
    {
      id: 2,
      title: 'Guide to Property Investment',
      excerpt: 'Everything you need to know about investing in real estate...',
      status: 'Draft',
      author: 'Admin',
      publishDate: '2024-01-10',
      views: 0
    },
    {
      id: 3,
      title: 'Sustainable Building Practices',
      excerpt: 'How we incorporate eco-friendly solutions in our projects...',
      status: 'Published',
      author: 'Admin',
      publishDate: '2024-01-08',
      views: 890
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-500';
      case 'Draft':
        return 'bg-yellow-500';
      case 'Archived':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">
            Create and manage blog posts
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Blog Post
        </Button>
      </div>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{blog.title}</CardTitle>
                  <CardDescription className="mt-1">{blog.excerpt}</CardDescription>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {blog.publishDate}
                    </span>
                    <span>By {blog.author}</span>
                    <span>{blog.views} views</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(blog.status)} text-white`}>
                    {blog.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

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
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-muted-foreground">Published</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-muted-foreground">Drafts</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">2,140</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogs;