import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { vvmApi, getImageUrl } from '@/services/cmsApi';

interface VVMItem {
  id?: number;
  type: string;
  title: string;
  content: string;
  image?: string | null;
  sortOrder: number;
}

const CARD_CONFIG = [
  { type: 'values', label: 'Our Values', icon: '💎', color: 'border-blue-500', bgColor: 'bg-blue-50' },
  { type: 'vision', label: 'Our Vision', icon: '🔭', color: 'border-green-500', bgColor: 'bg-green-50' },
  { type: 'mission', label: 'Our Mission', icon: '🎯', color: 'border-purple-500', bgColor: 'bg-purple-50' },
];

const AdminValuesVisionMission = () => {
  const [items, setItems] = useState<VVMItem[]>([
    { type: 'values', title: 'Our Values', content: '', sortOrder: 1 },
    { type: 'vision', title: 'Our Vision', content: '', sortOrder: 2 },
    { type: 'mission', title: 'Our Mission', content: '', sortOrder: 3 },
  ]);
  const [imageFiles, setImageFiles] = useState<{ [key: string]: File | null }>({
    values: null,
    vision: null,
    mission: null,
  });
  const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string | null }>({
    values: null,
    vision: null,
    mission: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await vvmApi.getAll();
      const fetchedItems = data.items || [];

      if (fetchedItems.length > 0) {
        // Merge fetched data with defaults
        const merged = CARD_CONFIG.map((config) => {
          const found = fetchedItems.find((item: VVMItem) => item.type === config.type);
          return found || { type: config.type, title: config.label, content: '', sortOrder: CARD_CONFIG.indexOf(config) + 1 };
        });
        setItems(merged);

        // Set existing image previews
        const previews: { [key: string]: string | null } = {};
        fetchedItems.forEach((item: VVMItem) => {
          if (item.image) {
            previews[item.type] = getImageUrl(item.image);
          }
        });
        setImagePreviews((prev) => ({ ...prev, ...previews }));
      }
    } catch (err: any) {
      console.error('Failed to fetch VVM data:', err);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (type: string, field: 'title' | 'content', value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.type === type ? { ...item, [field]: value } : item))
    );
  };

  const handleImageSelect = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFiles((prev) => ({ ...prev, [type]: file }));
      // Create local preview
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreviews((prev) => ({ ...prev, [type]: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (type: string) => {
    setImageFiles((prev) => ({ ...prev, [type]: null }));
    setImagePreviews((prev) => ({ ...prev, [type]: null }));
    // Reset the file input
    const input = document.getElementById(`${type}-image-input`) as HTMLInputElement;
    if (input) input.value = '';
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const formData = new FormData();
      formData.append('items', JSON.stringify(items));

      // Attach image files
      if (imageFiles.values) formData.append('values_image', imageFiles.values);
      if (imageFiles.vision) formData.append('vision_image', imageFiles.vision);
      if (imageFiles.mission) formData.append('mission_image', imageFiles.mission);

      await vvmApi.update(formData);
      toast.success('Values, Vision & Mission updated successfully!');

      // Clear file selections after save
      setImageFiles({ values: null, vision: null, mission: null });

      // Refresh data to get server-generated image URLs
      await fetchData();
    } catch (err: any) {
      console.error('Save failed:', err);
      toast.error(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About - Values, Vision & Mission</h1>
        <p className="text-muted-foreground">
          Update the content and images for each of the 3 cards
        </p>
      </div>

      {/* Individual card editors */}
      <div className="space-y-6">
        {CARD_CONFIG.map((config) => {
          const item = items.find((i) => i.type === config.type);
          const preview = imagePreviews[config.type];

          return (
            <Card key={config.type} className={`border-l-4 ${config.color}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{config.icon}</span>
                  {config.label}
                </CardTitle>
                <CardDescription>
                  Edit the text content and upload an image for the {config.label} card
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Text Content */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`${config.type}-title`}>Title</Label>
                      <Input
                        id={`${config.type}-title`}
                        value={item?.title || ''}
                        onChange={(e) => handleContentChange(config.type, 'title', e.target.value)}
                        placeholder={`Enter ${config.label} title...`}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${config.type}-content`}>Content</Label>
                      <Textarea
                        id={`${config.type}-content`}
                        rows={4}
                        value={item?.content || ''}
                        onChange={(e) => handleContentChange(config.type, 'content', e.target.value)}
                        placeholder={`Enter ${config.label} description...`}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-3">
                    <Label>{config.label} Image</Label>
                    {preview ? (
                      <div className="relative group">
                        <div className="w-full h-48 rounded-lg overflow-hidden border bg-muted">
                          <img
                            src={preview}
                            alt={`${config.label} preview`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(config.type)}
                          className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <p className="text-xs text-muted-foreground mt-1">
                          {imageFiles[config.type]
                            ? `New: ${imageFiles[config.type]!.name}`
                            : 'Current image from server'}
                        </p>
                      </div>
                    ) : (
                      <label
                        htmlFor={`${config.type}-image-input`}
                        className={`flex flex-col items-center justify-center w-full h-48 rounded-lg border-2 border-dashed cursor-pointer hover:bg-muted/50 transition-colors ${config.bgColor}`}
                      >
                        <div className="flex flex-col items-center gap-2 py-6">
                          <div className="p-3 rounded-full bg-background shadow-sm">
                            <Upload className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">Click to upload</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, WebP (max 10MB)</p>
                          </div>
                        </div>
                      </label>
                    )}
                    <input
                      id={`${config.type}-image-input`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageSelect(config.type, e)}
                      className="hidden"
                    />
                    {!preview && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById(`${config.type}-image-input`)?.click()}
                        className="w-full"
                      >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Choose Image
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            How the 3 cards will appear on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CARD_CONFIG.map((config) => {
              const item = items.find((i) => i.type === config.type);
              const preview = imagePreviews[config.type];

              return (
                <div key={config.type} className="bg-muted/30 rounded-lg overflow-hidden border">
                  {preview ? (
                    <div className="h-32 overflow-hidden">
                      <img
                        src={preview}
                        alt={config.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`h-32 ${config.bgColor} flex items-center justify-center`}>
                      <span className="text-4xl">{config.icon}</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1">{item?.title || config.label}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {item?.content || 'No content yet...'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminValuesVisionMission;