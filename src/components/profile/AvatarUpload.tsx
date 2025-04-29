
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabaseClient';
import { Upload } from 'lucide-react';

interface AvatarUploadProps {
  user: any;
  onUpdate: () => void;
}

export default function AvatarUpload({ user, onUpdate }: AvatarUploadProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const avatarUrl = user?.user_metadata?.avatar_url;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    setIsUploading(true);

    try {
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL for the uploaded file
      const { data: publicURLData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update the user's metadata with the new avatar URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicURLData.publicUrl },
      });

      if (updateError) throw updateError;

      toast({
        title: "Avatar updated successfully",
        description: "Your profile picture has been updated."
      });
      
      onUpdate(); // Refresh user data
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Error updating avatar",
        description: "There was a problem uploading your profile picture.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-32 w-32 border-2 border-primary">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback className="text-4xl">
          {user?.email?.charAt(0).toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
      
      <div className="relative">
        <input
          type="file"
          id="avatar-upload"
          onChange={handleFileChange}
          accept="image/*"
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          disabled={isUploading}
        />
        <Button 
          type="button" 
          variant="outline" 
          disabled={isUploading}
          className="flex items-center gap-2"
        >
          <Upload size={16} />
          {isUploading ? "Uploading..." : "Change Picture"}
        </Button>
      </div>
    </div>
  );
}
