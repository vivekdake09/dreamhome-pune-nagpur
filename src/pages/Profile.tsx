
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UserDetailsForm from '@/components/profile/UserDetailsForm';
import PasswordUpdateForm from '@/components/profile/PasswordUpdateForm';
import AvatarUpload from '@/components/profile/AvatarUpload';
import FavoriteProperties from '@/components/profile/FavoriteProperties';
import { fetchUserFavorites } from '@/services/favoriteService';
import { PropertyData } from '@/services/propertyService';
import { useToast } from '@/hooks/use-toast';
import { User, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [favoriteProperties, setFavoriteProperties] = useState<PropertyData[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!user) return;

    const loadFavorites = async () => {
      setLoading(true);
      try {
        const favorites = await fetchUserFavorites(user.id);
        setFavoriteProperties(favorites);
      } catch (error) {
        console.error('Error loading favorite properties:', error);
        toast({
          title: "Could not load favorites",
          description: "There was an error loading your favorite properties.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user, refreshTrigger, toast]);

  if (!user) {
    return (
      <div className="container mx-auto p-8 text-center">
        <Card>
          <CardContent className="py-12">
            <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
            <Button onClick={() => navigate('/login')}>Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const refreshUserData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <User size={32} className="text-gray-500" />
          </div>
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut size={16} />
          Sign Out
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile Details</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent>
                  <AvatarUpload user={user} onUpdate={refreshUserData} />
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <UserDetailsForm user={user} onUpdate={refreshUserData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <PasswordUpdateForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <FavoriteProperties 
                  properties={favoriteProperties} 
                  isLoading={loading} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Profile;
