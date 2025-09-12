import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { MapPin, Plus, Trash2 } from 'lucide-react';

const AdminPresence = () => {
  const [locationsData, setLocationsData] = useState({
    locations: [
      { id: 1, name: 'Chembur' },
      { id: 2, name: 'Ghatkopar' },
      { id: 3, name: 'Vikhroli' },
      { id: 4, name: 'Mulund' }
    ]
  });

  const handleLocationChange = (id: number, value: string) => {
    setLocationsData(prev => ({
      ...prev,
      locations: prev.locations.map(loc => 
        loc.id === id ? { ...loc, name: value } : loc
      )
    }));
  };

  const addLocation = () => {
    const newId = Math.max(...locationsData.locations.map(l => l.id)) + 1;
    setLocationsData(prev => ({
      ...prev,
      locations: [...prev.locations, { id: newId, name: '' }]
    }));
  };

  const removeLocation = (id: number) => {
    setLocationsData(prev => ({
      ...prev,
      locations: prev.locations.filter(loc => loc.id !== id)
    }));
  };

  const handleSave = () => {
    toast.success('Project locations updated successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Project Locations (Presence Map)</h1>
        <p className="text-muted-foreground">
          Update the list of locations where your projects are present
        </p>
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
            {locationsData.locations.map((location) => (
              <div key={location.id} className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <Input
                  value={location.name}
                  onChange={(e) => handleLocationChange(location.id, e.target.value)}
                  placeholder="Enter location name"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeLocation(location.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
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
                <strong>Note:</strong> The map visual will remain fixed as designed. 
                Only the location names in the list will be updated according to your changes here.
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
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Presences</h2>
              <div className="space-y-3">
                {locationsData.locations.map((location) => (
                  <div key={location.id} className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{location.name || 'Location Name'}</h3>
                      <p className="text-sm text-gray-600">Premium residential developments</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminPresence;