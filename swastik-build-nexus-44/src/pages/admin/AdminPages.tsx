import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Edit, Save, Loader2, FileText, ExternalLink } from 'lucide-react';
import { customPagesApi } from '@/services/cmsApi';
import { toast } from 'sonner';

interface CustomPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

const AdminPages = () => {
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('manage');

  // Form state
  const [form, setForm] = useState({
    id: null as number | null,
    title: '',
    content: '',
    isActive: true
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const data = await customPagesApi.getAll();
      setPages(data.pages || []);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch pages');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: CustomPage) => {
    setForm({
      id: page.id,
      title: page.title,
      content: page.content,
      isActive: page.isActive
    });
    setActiveTab('add');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    try {
      await customPagesApi.delete(id);
      toast.success('Page deleted successfully');
      fetchPages();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete page');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      setSaving(true);
      if (form.id) {
        await customPagesApi.update(form.id, form);
        toast.success('Page updated successfully');
      } else {
        await customPagesApi.create(form);
        toast.success('Page created successfully');
      }
      resetForm();
      fetchPages();
      setActiveTab('manage');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save page');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: '',
      content: '',
      isActive: true
    });
  };

  if (loading && pages.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900">Pages Management</h1>
          <p className="text-muted-foreground">Create and manage custom content pages</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="manage">Manage Pages</TabsTrigger>
          <TabsTrigger value="add">{form.id ? 'Edit Page' : 'Add Page'}</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-4">
          {pages.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">No custom pages found. Create your first one!</p>
                <Button variant="outline" className="mt-4" onClick={() => setActiveTab('add')}>
                  <Plus className="w-4 h-4 mr-2" /> Create Page
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pages.map((page) => (
                <Card key={page.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                          {page.title}
                          {!page.isActive && (
                            <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Draft</span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">URL: /{page.slug}</p>
                        <p className="text-xs text-muted-foreground italic">Created: {new Date(page.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => window.open(`/${page.slug}`, '_blank')}
                          title="View Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(page)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(page.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>{form.id ? 'Edit Page' : 'Create New Page'}</CardTitle>
              <CardDescription>Enter the details for your custom page</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Heading</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Terms & Conditions"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Page Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter the page content here..."
                    rows={15}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="font-sans"
                  />
                  <p className="text-xs text-muted-foreground">HTML or plain text is supported.</p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="isActive">Make this page active and visible in navigation</Label>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="ghost" onClick={() => { resetForm(); setActiveTab('manage'); }}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving} size="lg" className="min-w-[150px]">
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    {form.id ? 'Update Page' : 'Save Page'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPages;
