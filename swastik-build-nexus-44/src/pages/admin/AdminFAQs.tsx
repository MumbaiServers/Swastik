import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp, Loader2, Save } from 'lucide-react';
import { faqsApi } from '@/services/cmsApi';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminFAQs = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<Partial<FAQ>>({
    question: '',
    answer: '',
    category: 'General',
    isActive: true,
    sortOrder: 0
  });

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const data = await faqsApi.getAll();
      setFaqs(data.faqs || []);
    } catch (err: any) {
      console.error('Failed to fetch FAQs:', err);
      setError(err.message || 'Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await faqsApi.delete(id);
      toast.success('FAQ deleted successfully');
      setFaqs((prev) => prev.filter((f) => f.id !== id));
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete FAQ');
    }
  };

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleOpenAdd = () => {
    setCurrentFaq({
      question: '',
      answer: '',
      category: 'General',
      isActive: true,
      sortOrder: faqs.length
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (faq: FAQ) => {
    setCurrentFaq(faq);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!currentFaq.question || !currentFaq.answer) {
      toast.error('Question and Answer are required');
      return;
    }

    try {
      setSaving(true);
      if (currentFaq.id) {
        await faqsApi.update(currentFaq.id, currentFaq);
        toast.success('FAQ updated successfully');
      } else {
        await faqsApi.create(currentFaq);
        toast.success('FAQ created successfully');
      }
      setIsDialogOpen(false);
      fetchFaqs();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save FAQ');
    } finally {
      setSaving(false);
    }
  };

  // Derive unique categories from data
  const allCategories = Array.from(new Set(faqs.map((f) => f.category || 'General').filter(Boolean)));
  const categories = ['All', ...allCategories];

  const filteredFaqs =
    activeCategory === 'All'
      ? faqs
      : faqs.filter((f) => (f.category || 'General') === activeCategory);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading FAQs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">FAQs Management</h1>
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
          <h1 className="text-3xl font-bold">FAQs Management</h1>
          <p className="text-muted-foreground">
            Manage frequently asked questions ({faqs.length} total)
          </p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add New FAQ
        </Button>
      </div>

      {allCategories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              Filter FAQs by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredFaqs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {faqs.length === 0
                ? 'No FAQs found. Add your first FAQ!'
                : 'No FAQs in this category.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <Card key={faq.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFaq(faq.id)}
                        className="p-0 h-auto"
                      >
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                        {faq.category || 'General'}
                      </span>
                      <span>Last updated: {formatDate(faq.updatedAt)}</span>
                      {!faq.isActive && (
                        <span className="text-destructive text-xs font-medium">Inactive</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={() => handleOpenEdit(faq)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(faq.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {expandedFaq === faq.id && (
                <CardContent>
                  <div className="p-4 bg-muted/30 rounded-md">
                    <p className="text-sm whitespace-pre-wrap">{faq.answer}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>FAQ Statistics</CardTitle>
          <CardDescription>
            Content overview and analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{faqs.length}</div>
              <div className="text-sm text-muted-foreground">Total FAQs</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{allCategories.length || 0}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {faqs.filter((f) => f.isActive).length}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentFaq.id ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
            <DialogDescription>
              Fill in the details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                value={currentFaq.question}
                onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })}
                placeholder="How do I...?"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                rows={5}
                value={currentFaq.answer}
                onChange={(e) => setCurrentFaq({ ...currentFaq, answer: e.target.value })}
                placeholder="Provide a detailed answer..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={currentFaq.category}
                  onChange={(e) => setCurrentFaq({ ...currentFaq, category: e.target.value })}
                  placeholder="General"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={currentFaq.sortOrder}
                  onChange={(e) => setCurrentFaq({ ...currentFaq, sortOrder: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Switch
                id="isActive"
                checked={currentFaq.isActive}
                onCheckedChange={(checked) => setCurrentFaq({ ...currentFaq, isActive: checked })}
              />
              <Label htmlFor="isActive">Active (shown on website)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {currentFaq.id ? 'Update FAQ' : 'Create FAQ'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFAQs;