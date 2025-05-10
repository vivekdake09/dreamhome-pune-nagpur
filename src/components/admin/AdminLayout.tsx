
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Building, LogOut, Plus, Key, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";

const AdminLayout = () => {
  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-100">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-2">
              <Key className="h-6 w-6" />
              <span className="font-bold text-lg">Admin Panel</span>
            </div>
            <SidebarTrigger />
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate('/admin/dashboard')} tooltip="Dashboard">
                  <User />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate('/admin/properties')} tooltip="Properties">
                  <Building />
                  <span>Properties</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate('/admin/properties/add')} tooltip="Add Property">
                  <Plus />
                  <span>Add Property</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-4">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
