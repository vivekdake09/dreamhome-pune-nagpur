
import React from 'react';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="container mx-auto p-4">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback>
              {user.email?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="font-semibold text-lg mb-2">Account Details</h2>
            <div className="space-y-2">
              <div>
                <span className="text-gray-500">User ID:</span>
                <span className="ml-2">{user.id}</span>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>
                <span className="ml-2">{user.email}</span>
              </div>
              <div>
                <span className="text-gray-500">Last Sign In:</span>
                <span className="ml-2">
                  {new Date(user.last_sign_in_at || '').toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
