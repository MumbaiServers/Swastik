import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Building2,
  MapPin,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Info,
  BarChart3,
  Share2
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  { title: 'Dashboard', url: '/admin', icon: Home },
  { title: 'Home Banner', url: '/admin/home-banner', icon: Info },
  { title: 'Home Page', url: '/admin/home-page', icon: Home },
  { title: 'About Us', url: '/admin/about-us', icon: Users },
  { title: 'Who We Are', url: '/admin/who-we-are', icon: Users },
  { title: 'Values, Vision & Mission', url: '/admin/values-vision-mission', icon: Info },
  { title: 'Our Business', url: '/admin/our-business', icon: Building2 },
  { title: 'Projects Description', url: '/admin/projects-description', icon: FileText },
  { title: 'Our Presence', url: '/admin/presence', icon: MapPin },
  { title: 'Social Media', url: '/admin/social-media', icon: Share2 },
  { title: 'Statistics', url: '/admin/statistics', icon: BarChart3 },
  { title: 'Projects', url: '/admin/projects', icon: Building2 },
  { title: 'Blogs', url: '/admin/blogs', icon: FileText },
  { title: 'FAQs', url: '/admin/faqs', icon: MessageSquare },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { logout, user } = useAuth();
  
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-60"} collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="p-4">
          {state !== "collapsed" && (
            <h2 className="text-lg font-semibold text-primary">
              Swastik Admin
            </h2>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/admin'}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="p-4">
          {state !== "collapsed" && (
            <div className="mb-3">
              <p className="text-sm text-muted-foreground">Logged in as:</p>
              <p className="text-sm font-medium">{user?.email}</p>
            </div>
          )}
          <Button
            variant="outline"
            size={state === "collapsed" ? "icon" : "sm"}
            onClick={logout}
            className="w-full"
          >
            <LogOut className="h-4 w-4" />
            {state !== "collapsed" && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}