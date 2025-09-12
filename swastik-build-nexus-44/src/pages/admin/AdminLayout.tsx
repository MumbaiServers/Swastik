import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminDashboard from './AdminDashboard';
import AdminHomeBanner from './AdminHomeBanner';
import AdminHomePage from './AdminHomePage';
import AdminAboutUs from './AdminAboutUs';
import AdminWhoWeAre from './AdminWhoWeAre';
import AdminValuesVisionMission from './AdminValuesVisionMission';
import AdminOurBusiness from './AdminOurBusiness';
import AdminProjectsDescription from './AdminProjectsDescription';
import AdminPresence from './AdminPresence';
import AdminSocialMedia from './AdminSocialMedia';
import AdminStatistics from './AdminStatistics';
import AdminProjects from './AdminProjects';
import AdminBlogs from './AdminBlogs';
import AdminFAQs from './AdminFAQs';
import AdminSettings from './AdminSettings';

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
            
            <main className="flex-1 p-6 bg-muted/30">
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/home-banner" element={<AdminHomeBanner />} />
                <Route path="/home-page" element={<AdminHomePage />} />
                <Route path="/about-us" element={<AdminAboutUs />} />
                <Route path="/who-we-are" element={<AdminWhoWeAre />} />
                <Route path="/values-vision-mission" element={<AdminValuesVisionMission />} />
                <Route path="/our-business" element={<AdminOurBusiness />} />
                <Route path="/projects-description" element={<AdminProjectsDescription />} />
                <Route path="/presence" element={<AdminPresence />} />
                <Route path="/social-media" element={<AdminSocialMedia />} />
                <Route path="/statistics" element={<AdminStatistics />} />
                <Route path="/projects" element={<AdminProjects />} />
                <Route path="/blogs" element={<AdminBlogs />} />
                <Route path="/faqs" element={<AdminFAQs />} />
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