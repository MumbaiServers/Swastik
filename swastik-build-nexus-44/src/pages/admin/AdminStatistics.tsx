import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Save } from 'lucide-react';
import { statisticsApi } from '@/services/cmsApi';

const AdminStatistics = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await statisticsApi.getAll();
      setStats(response.statistics || []);
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  const addStat = () => {
    setStats([...stats, { label: '', value: '', suffix: '', sortOrder: stats.length }]);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await statisticsApi.update(stats);
      toast.success('Company statistics updated successfully');
      fetchData();
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('Failed to save statistics');
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Company Statistics</h1>
          <p className="text-muted-foreground">Manage key performance indicators shown across the site</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={addStat}>
            <Plus className="w-4 h-4 mr-2" /> Add Stat
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative group">
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeStat(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Statistic #{index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Label</Label>
                <Input value={stat.label} onChange={(e) => handleStatChange(index, 'label', e.target.value)} placeholder="Years of Excellence" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input value={stat.value} onChange={(e) => handleStatChange(index, 'value', e.target.value)} placeholder="25" />
                </div>
                <div className="space-y-2">
                  <Label>Suffix</Label>
                  <Input value={stat.suffix} onChange={(e) => handleStatChange(index, 'suffix', e.target.value)} placeholder="+" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Marquee Preview</CardTitle>
          <CardDescription>Live preview of the scrolling statistics bar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-brand-blue rounded-xl p-8 overflow-hidden">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {stats.map((stat, i) => (
                <div key={i} className="text-center text-white min-w-[150px]">
                  <div className="text-3xl font-bold">{stat.value}{stat.suffix}</div>
                  <div className="text-sm opacity-80 uppercase tracking-tight">{stat.label}</div>
                </div>
              ))}
              {/* Duplicate for Marquee */}
              {stats.map((stat, i) => (
                <div key={`dup-${i}`} className="text-center text-white min-w-[150px]">
                  <div className="text-3xl font-bold">{stat.value}{stat.suffix}</div>
                  <div className="text-sm opacity-80 uppercase tracking-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatistics;