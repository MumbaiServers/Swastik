import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, FileText, MessageSquare, MapPin, Users, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Projects',
      value: '12',
      description: 'Active development projects',
      icon: Building2,
      color: 'text-blue-600',
    },
    {
      title: 'Blog Posts',
      value: '24',
      description: 'Published articles',
      icon: FileText,
      color: 'text-green-600',
    },
    {
      title: 'FAQs',
      value: '18',
      description: 'Frequently asked questions',
      icon: MessageSquare,
      color: 'text-purple-600',
    },
    {
      title: 'Locations',
      value: '8',
      description: 'Business locations',
      icon: MapPin,
      color: 'text-orange-600',
    },
    {
      title: 'Site Visitors',
      value: '2,451',
      description: 'This month',
      icon: Eye,
      color: 'text-indigo-600',
    },
    {
      title: 'Inquiries',
      value: '89',
      description: 'New this week',
      icon: Users,
      color: 'text-pink-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Swastik Group admin panel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest changes and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New project added</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Blog post published</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">FAQ updated</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-md border hover:bg-muted transition-colors">
                <div className="font-medium">Add New Project</div>
                <div className="text-sm text-muted-foreground">Create a new development project</div>
              </button>
              <button className="w-full text-left p-3 rounded-md border hover:bg-muted transition-colors">
                <div className="font-medium">Write Blog Post</div>
                <div className="text-sm text-muted-foreground">Publish new content</div>
              </button>
              <button className="w-full text-left p-3 rounded-md border hover:bg-muted transition-colors">
                <div className="font-medium">Update Site Settings</div>
                <div className="text-sm text-muted-foreground">Modify site configuration</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;