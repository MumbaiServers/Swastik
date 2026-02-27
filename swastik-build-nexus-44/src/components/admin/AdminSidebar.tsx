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
  Share2,
  Gift
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
  { title: 'Watch Our Story', url: '/admin/watch-our-story', icon: Info },
  { title: 'About Us', url: '/admin/about-us', icon: Users },
  { title: 'Values, Vision & Mission', url: '/admin/values-vision-mission', icon: Info },
  { title: 'Our Presence', url: '/admin/presence', icon: MapPin },
  { title: 'Social Media', url: '/admin/social-media', icon: Share2 },
  { title: 'Statistics', url: '/admin/statistics', icon: BarChart3 },
  { title: 'Projects', url: '/admin/projects', icon: Building2 },
  { title: 'Blogs', url: '/admin/blogs', icon: FileText },
  { title: 'FAQs', url: '/admin/faqs', icon: MessageSquare },
  { title: 'Footer', url: '/admin/footer', icon: FileText },
  { title: 'Leads', url: '/admin/leads', icon: Users },
  { title: 'Referrals', url: '/admin/loyalty', icon: Gift },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { logout, user } = useAuth();

  const checkActive = (url: string) => {
    if (url === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname.startsWith(url);
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
              {menuItems.map((item) => {
                const active = checkActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={active ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90" : ""}
                    >
                      <NavLink
                        to={item.url}
                        end={item.url === '/admin'}
                      >
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
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