import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminDashboard from './AdminDashboard';
import AdminHomeBanner from './AdminHomeBanner';
import AdminHomePage from './AdminHomePage';
import AdminAboutUs from './AdminAboutUs';
import AdminValuesVisionMission from './AdminValuesVisionMission';
import AdminPresence from './AdminPresence';
import AdminSocialMedia from './AdminSocialMedia';
import AdminStatistics from './AdminStatistics';
import AdminProjects from './AdminProjects';
import AdminProjectEdit from './AdminProjectEdit';
import AdminBlogs from './AdminBlogs';
import AdminFAQs from './AdminFAQs';
import AdminSettings from './AdminSettings';
import AdminLeads from './AdminLeads';
import AdminWatchOurStory from './AdminWatchOurStory';
import AdminFooter from './AdminFooter';
import AdminBlogEdit from './AdminBlogEdit';
import AdminLoyalty from './AdminLoyalty';

const AdminLayout = () => {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminSidebar />

          <div className="flex-1 flex flex-col">
            <header className="h-14 flex items-center border-b bg-background px-4">
              <SidebarTrigger />
              <h1 className="ml-4 text-lg font-medium">Admin Panel</h1>
            </header>

            <main className="flex-1 p-4 md:p-6 bg-muted/30">
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/home-banner" element={<AdminHomeBanner />} />
                <Route path="/home-page" element={<AdminHomePage />} />
                <Route path="/watch-our-story" element={<AdminWatchOurStory />} />
                <Route path="/about-us" element={<AdminAboutUs />} />
                <Route path="/values-vision-mission" element={<AdminValuesVisionMission />} />
                <Route path="/presence" element={<AdminPresence />} />
                <Route path="/social-media" element={<AdminSocialMedia />} />
                <Route path="/statistics" element={<AdminStatistics />} />
                <Route path="/projects" element={<AdminProjects />} />
                <Route path="/projects/new" element={<AdminProjectEdit />} />
                <Route path="/projects/:id" element={<AdminProjectEdit />} />
                <Route path="/blogs" element={<AdminBlogs />} />
                <Route path="/blogs/new" element={<AdminBlogEdit />} />
                <Route path="/blogs/:id" element={<AdminBlogEdit />} />
                <Route path="/faqs" element={<AdminFAQs />} />
                <Route path="/footer" element={<AdminFooter />} />
                <Route path="/leads" element={<AdminLeads />} />
                <Route path="/loyalty" element={<AdminLoyalty />} />
                <Route path="/settings" element={<AdminSettings />} />
              </Routes>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default AdminLayout;