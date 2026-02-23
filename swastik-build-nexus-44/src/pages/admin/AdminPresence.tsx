import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { MapPin, Plus, Trash2, Loader2, Save } from 'lucide-react';
import { locationsApi } from '@/services/cmsApi';

interface Location {
  id?: number;
  name: string;
  address?: string;
}

const AdminPresence = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await locationsApi.getAll();
      setLocations(response.locations || []);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
      toast.error('Failed to load locations');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (index: number, value: string) => {
    const updated = [...locations];
    updated[index].name = value;
    setLocations(updated);
  };

  const addLocation = () => {
    setLocations([...locations, { name: '' }]);
  };

  const removeLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Clean up empty names
      const validLocations = locations.filter(loc => loc.name.trim() !== '');

      await locationsApi.update(validLocations);
      toast.success('Project locations updated successfully');
      // Refetch to get updated IDs if any were new
      await fetchLocations();
    } catch (error) {
      console.error('Save locations error:', error);
      toast.error('Failed to save locations');
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
          <h1 className="text-3xl font-bold">Project Locations (Presence Map)</h1>
          <p className="text-muted-foreground">
            Update the list of locations where your projects are present
          </p>
        </div>
        <Button onClick={handleSave} size="lg" disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Location List</CardTitle>
            <CardDescription>
              Add, edit, or remove project locations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {locations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                No locations added.
              </div>
            ) : (
              locations.map((location, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <Input
                    value={location.name}
                    onChange={(e) => handleLocationChange(index, e.target.value)}
                    placeholder="Enter location name"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeLocation(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
            <Button
              variant="outline"
              onClick={addLocation}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Location
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Note</CardTitle>
            <CardDescription>
              Important information about the map display
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> The map visual on the home page is a fixed illustration.
                Updating the names here will change the list items shown next to the map.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              How the locations will appear on the website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6 max-w-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Presences</h2>
              <div className="space-y-3">
                {locations.filter(l => l.name).map((location, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{location.name}</h3>
                      <p className="text-xs text-gray-600">Premium residential developments</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
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

export default AdminPresence;