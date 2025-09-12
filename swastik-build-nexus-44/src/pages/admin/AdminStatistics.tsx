import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AdminStatistics = () => {
  const [statsData, setStatsData] = useState({
    yearsOfExcellence: '25+',
    millionSqFtDeveloped: '1.5',
    happyFamilies: '1500+',
    lakhSqFtUnderConstruction: '6.5',
    successfulProjects: '22',
    primeLocations: '7'
  });

  const handleInputChange = (field: string, value: string) => {
    setStatsData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success('Company statistics updated successfully');
  };

  const statsConfig = [
    { key: 'yearsOfExcellence', label: 'Years of Excellence', placeholder: '25+' },
    { key: 'millionSqFtDeveloped', label: 'Million Sq. Ft. Developed', placeholder: '1.5' },
    { key: 'happyFamilies', label: 'Happy Families', placeholder: '1500+' },
    { key: 'lakhSqFtUnderConstruction', label: 'Lakh Sq. Ft. Under Construction', placeholder: '6.5' },
    { key: 'successfulProjects', label: 'Successful Projects', placeholder: '22' },
    { key: 'primeLocations', label: 'Prime Locations', placeholder: '7' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Statistics</h1>
        <p className="text-muted-foreground">
          Update the key statistics displayed on your website
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {statsConfig.map((stat) => (
          <Card key={stat.key}>
            <CardHeader>
              <CardTitle className="text-lg">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor={stat.key}>Value</Label>
                <Input
                  id={stat.key}
                  value={statsData[stat.key as keyof typeof statsData]}
                  onChange={(e) => handleInputChange(stat.key, e.target.value)}
                  placeholder={stat.placeholder}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            How the statistics will appear on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {statsConfig.map((stat) => (
                <div key={stat.key} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold mb-2">
                    {statsData[stat.key as keyof typeof statsData] || stat.placeholder}
                  </div>
                  <div className="text-sm lg:text-base opacity-90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminStatistics;