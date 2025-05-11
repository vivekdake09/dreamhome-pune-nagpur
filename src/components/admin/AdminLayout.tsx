
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Building, LogOut, Plus, Key, User, Users, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import { useTheme } from '@/components/ThemeProvider';
import { useIsMobile } from "@/hooks/use-mobile";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [adminVerified, setAdminVerified] = useState(false);
  const isMobile = useIsMobile();

  // Check if admin is logged in with Supabase
  useEffect(() => {
    async function verifyAdmin() {
      try {
        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !sessionData.session) {
          throw new Error('Not authenticated');
        }

        // Check if the user has admin role
        const { data: userData, error: userError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', sessionData.session.user.id)
          .single();
        
        if (userError || userData?.role !== 'admin') {
          throw new Error('Not authorized as admin');
        }

        // Admin verified
        setAdminVerified(true);
      } catch (error) {
        console.error('Admin verification error:', error);
        // Redirect to login
        navigate('/admin/login');
        // Clear any stale admin login flags
        localStorage.removeItem('isAdminLoggedIn');
      } finally {
        setIsLoading(false);
      }
    }

    verifyAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('isAdminLoggedIn');
      toast.success("Logged out successfully");
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen text-foreground">Loading admin panel...</div>;
  }

  if (!adminVerified) {
    return null; // Will redirect via the useEffect
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50 dark:bg-gray-900">
        <Sidebar variant={isMobile ? "floating" : "sidebar"} collapsible={isMobile ? "offcanvas" : "icon"}>
          <SidebarHeader className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-2">
              <Key className="h-6 w-6 text-foreground" />
              <span className="font-bold text-lg text-foreground">BMDH Dashboard</span>
            </div>
            {/* SidebarTrigger removed as requested */}
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate('/admin/dashboard')} tooltip="Dashboard">
                  <User className="text-foreground" />
                  <span className="text-foreground">Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate('/admin/properties')} tooltip="Properties">
                  <Building className="text-foreground" />
                  <span className="text-foreground">Properties</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate('/admin/properties/add')} tooltip="Add Property">
                  <Plus className="text-foreground" />
                  <span className="text-foreground">Add Property</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate('/admin/users')} tooltip="Users">
                  <Users className="text-foreground" />
                  <span className="text-foreground">Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-4 space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start text-foreground" 
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark Mode
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-foreground" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-6">
            <Outlet />
          </div>
          <footer className="py-4 px-6 border-t text-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
            © 2025 by BookMyDreamHome Pvt Ltd. All rights reserved.
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
