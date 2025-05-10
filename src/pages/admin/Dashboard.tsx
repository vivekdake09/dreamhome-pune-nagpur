
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Plus, User } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const AdminDashboard = () => {
  const [propertiesCount, setPropertiesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true);
        // Count total properties
        const { count, error } = await supabase
          .from('properties')
          .select('*', { count: 'exact', head: true });
        
        if (error) throw error;
        
        setPropertiesCount(count || 0);
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your property management dashboard.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="text-center">Loading dashboard data...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center py-8">
          <div className="text-center text-red-500">Error loading dashboard data: {error}</div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Properties
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{propertiesCount}</div>
              <p className="text-xs text-muted-foreground">
                Properties in database
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Quick Actions
              </CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mt-2">
                Use the sidebar to navigate and manage properties
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
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
    </div>
  );
};

export default AdminDashboard;
