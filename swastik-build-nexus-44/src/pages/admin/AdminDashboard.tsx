import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, FileText, MessageSquare, MapPin, Users, Image, Loader2, Gift, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dashboardApi } from '@/services/cmsApi';
import { toast } from 'sonner';

interface DashboardStats {
  totalProjects: number;
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalFaqs: number;
  totalLocations: number;
  totalInquiries: number;
  newInquiries: number;
  totalMedia: number;
  totalReferrals: number;
}

interface ActivityItem {
  id: number;
  type: string;
  label: string;
  time: string;
}

/**
 * AdminDashboard Page
 * 
 * Provides an overview of the CMS statistics, recent activities,
 * and quick access to common administrative tasks.
 */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await dashboardApi.getStats();
      setStats(data.stats);
      setRecentActivity(data.recentActivity || []);
    } catch (err: any) {
      console.error('Failed to fetch dashboard stats:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDeleteActivity = async (id: number) => {
    try {
      if (!window.confirm('Are you sure you want to remove this activity from the dashboard?')) {
        return;
      }

      await dashboardApi.deleteActivity(id);
      toast.success('Activity removed');
      // Update local state to remove the item
      setRecentActivity(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      console.error('Failed to delete activity:', err);
      toast.error('Failed to remove activity');
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-blue-600';
      case 'blog': return 'bg-green-600';
      case 'inquiry': return 'bg-pink-600';
      case 'faq': return 'bg-purple-600';
      case 'loyalty': return 'bg-orange-600';
      case 'location': return 'bg-indigo-600';
      default: return 'bg-gray-600';
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const statCards = stats
    ? [
      {
        title: 'Total Projects',
        value: stats.totalProjects.toString(),
        description: 'Active development projects',
        icon: Building2,
        color: 'text-blue-600',
        route: '/admin/projects',
      },
      {
        title: 'Blog Posts',
        value: stats.totalBlogs.toString(),
        description: `${stats.publishedBlogs} published, ${stats.draftBlogs} drafts`,
        icon: FileText,
        color: 'text-green-600',
        route: '/admin/blogs',
      },
      {
        title: 'FAQs',
        value: stats.totalFaqs.toString(),
        description: 'Frequently asked questions',
        icon: MessageSquare,
        color: 'text-purple-600',
        route: '/admin/faqs',
      },
      {
        title: 'Inquiries',
        value: stats.totalInquiries.toString(),
        description: `${stats.newInquiries} new this week`,
        icon: Users,
        color: 'text-pink-600',
        route: '/admin/leads',
      },
      {
        title: 'Referrals',
        value: stats.totalReferrals.toString(),
        description: 'Loyalty program leads',
        icon: Gift,
        color: 'text-orange-600',
        route: '/admin/loyalty',
      },
      {
        title: 'Locations',
        value: stats.totalLocations.toString(),
        description: 'Business locations',
        icon: MapPin,
        color: 'text-blue-600',
        route: '/admin/presence',
      },
      {
        title: 'Media Files',
        value: stats.totalMedia.toString(),
        description: 'Uploaded images & files',
        icon: Image,
        color: 'text-indigo-600',
        route: '/admin/projects',
      },
    ]
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Swastik Group admin panel</p>
        </div>
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">⚠️ {error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Make sure the backend server is running on the correct port.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Swastik Group admin panel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card
            key={stat.title}
            className={stat.route ? 'cursor-pointer hover:bg-muted/50 transition-colors' : ''}
            onClick={() => stat.route && navigate(stat.route)}
          >
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
            {recentActivity.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No recent activity yet. Start by adding projects, blogs, or FAQs.
              </p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 group overflow-hidden">
                    <div className={`w-2 h-2 ${getActivityColor(activity.type)} rounded-full shrink-0 mt-1.5`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2 break-words">{activity.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{formatTimeAgo(activity.time)}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteActivity(activity.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      title="Delete activity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
              <button
                className="w-full text-left p-3 rounded-md border hover:bg-muted transition-colors"
                onClick={() => navigate('/admin/projects')}
              >
                <div className="font-medium">Manage Projects</div>
                <div className="text-sm text-muted-foreground">Create and manage development projects</div>
              </button>
              <button
                className="w-full text-left p-3 rounded-md border hover:bg-muted transition-colors"
                onClick={() => navigate('/admin/loyalty')}
              >
                <div className="font-medium">Manage Referrals</div>
                <div className="text-sm text-muted-foreground">View loyalty program submissions</div>
              </button>
              <button
                className="w-full text-left p-3 rounded-md border hover:bg-muted transition-colors"
                onClick={() => navigate('/admin/leads')}
              >
                <div className="font-medium">Manage Leads</div>
                <div className="text-sm text-muted-foreground">View and manage business inquiries</div>
              </button>
              <button
                className="w-full text-left p-3 rounded-md border hover:bg-muted transition-colors"
                onClick={() => navigate('/admin/blogs')}
              >
                <div className="font-medium">Manage Blogs</div>
                <div className="text-sm text-muted-foreground">Write and publish blog posts</div>
              </button>
              <button
                className="w-full text-left p-3 rounded-md border hover:bg-muted transition-colors"
                onClick={() => navigate('/admin/settings')}
              >
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