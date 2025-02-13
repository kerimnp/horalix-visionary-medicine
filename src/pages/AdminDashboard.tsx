import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactSubmissions } from "@/components/admin/ContactSubmissions";
import { SubscribersList } from "@/components/admin/SubscribersList";
import { EmailCampaigns } from "@/components/admin/EmailCampaigns";
import { WebsiteAnalytics } from "@/components/admin/WebsiteAnalytics";
import { UserManagement } from "@/components/admin/UserManagement";
import { ActivityLog } from "@/components/admin/ActivityLog";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profile?.role !== 'admin') {
        navigate('/');
      }
    };

    checkAdminAccess();
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-medical-deep mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="submissions">Contact Submissions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="campaigns">Email Campaigns</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="submissions">
          <ContactSubmissions />
        </TabsContent>

        <TabsContent value="analytics">
          <WebsiteAnalytics />
        </TabsContent>

        <TabsContent value="subscribers">
          <SubscribersList />
        </TabsContent>

        <TabsContent value="campaigns">
          <EmailCampaigns />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityLog />
        </TabsContent>
      </Tabs>
    </div>
  );
}