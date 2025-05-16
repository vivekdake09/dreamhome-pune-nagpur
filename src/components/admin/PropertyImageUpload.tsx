
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload } from 'lucide-react';
import { uploadToCloudinary } from '@/utils/cloudinaryService';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface PropertyImageUploadProps {
  imageUrl: string;
  onUpload: (url: string) => void;
}

export default function PropertyImageUpload({ imageUrl, onUpload }: PropertyImageUploadProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    setIsUploading(true);

    try {
      // Upload the file to Cloudinary
      const result = await uploadToCloudinary(file);
      onUpload(result.secure_url);
      
      toast({
        title: "Image uploaded successfully",
        description: "The property image has been updated."
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error uploading image",
        description: "There was a problem uploading your image.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {imageUrl ? (
        <AspectRatio ratio={16 / 10} className="bg-muted overflow-hidden rounded-md">
          <img
            src={imageUrl}
            alt="Property"
            className="h-full w-full object-cover"
          />
        </AspectRatio>
      ) : (
        <AspectRatio ratio={16 / 10} className="bg-muted flex items-center justify-center rounded-md">
          <p className="text-muted-foreground text-sm">No image uploaded</p>
        </AspectRatio>
      )}
      
      <div className="relative">
        <input
          type="file"
          id="property-image-upload"
          onChange={handleFileChange}
          accept="image/*"
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          disabled={isUploading}
        />
        <Button 
          type="button" 
          variant="outline" 
          disabled={isUploading}
          className="flex items-center gap-2 w-full"
        >
          <Upload size={16} />
          {isUploading ? "Uploading..." : imageUrl ? "Change Image" : "Upload Image"}
        </Button>
      </div>
    </div>
  );
}
