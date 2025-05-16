
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, User, CalendarCheck } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { SiteVisit, fetchAllSiteVisits } from '@/services/siteVisitService';
import SiteVisitsList from '@/components/admin/SiteVisitsList';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [propertiesCount, setPropertiesCount] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [siteVisitsCount, setSiteVisitsCount] = useState<number>(0);
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingVisits, setIsLoadingVisits] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true);
        // Count total properties
        const { count: propertiesCount, error: propertiesError } = await supabase
          .from('properties')
          .select('*', { count: 'exact', head: true });
        
        if (propertiesError) throw propertiesError;
        
        // Get user count
        const { count: userCount, error: userCountError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (userCountError) throw userCountError;
        
        // Get site visits count
        const { count: visitsCount, error: visitsCountError } = await supabase
          .from('site_visits')
          .select('*', { count: 'exact', head: true });
          
        if (visitsCountError) throw visitsCountError;
        
        setPropertiesCount(propertiesCount || 0);
        setUsersCount(userCount || 0);
        setSiteVisitsCount(visitsCount || 0);
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
    fetchSiteVisits();
  }, []);

  const fetchSiteVisits = async () => {
    try {
      setIsLoadingVisits(true);
      const visits = await fetchAllSiteVisits();
      setSiteVisits(visits);
    } catch (error: any) {
      console.error('Error fetching site visits:', error);
      toast.error('Failed to load site visits', {
        description: error.message
      });
    } finally {
      setIsLoadingVisits(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">BMDH Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your property management dashboard.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="text-center text-foreground">Loading dashboard data...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center py-8">
          <div className="text-center text-red-500">Error loading dashboard data: {error}</div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-foreground">
                Total Properties
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{propertiesCount}</div>
              <p className="text-xs text-muted-foreground">
                Properties in database
              </p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-foreground">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{usersCount}</div>
              <p className="text-xs text-muted-foreground">
                Registered users
              </p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-foreground">
                Site Visits
              </CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{siteVisitsCount}</div>
              <p className="text-xs text-muted-foreground">
                Scheduled visits
              </p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-foreground">
                Database Status
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-green-500">Connected</div>
              <p className="text-xs text-muted-foreground">
                Supabase integration active
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-bold tracking-tight mb-4">Recent Site Visit Requests</h2>
        <SiteVisitsList 
          visits={siteVisits} 
          onStatusChange={fetchSiteVisits} 
          isLoading={isLoadingVisits}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
