
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { uploadToCloudinary } from '@/utils/cloudinaryService';
import { ChevronLeft, Loader2 } from 'lucide-react';

// Define schema for property form
const propertyFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.string().refine((val) => !isNaN(Number(val)), { message: 'Price must be a number.' }),
  bedrooms: z.string().refine((val) => !isNaN(Number(val)), { message: 'Bedrooms must be a number.' }),
  bathrooms: z.string().refine((val) => !isNaN(Number(val)), { message: 'Bathrooms must be a number.' }),
  size: z.string().refine((val) => !isNaN(Number(val)), { message: 'Size must be a number.' }),
  location: z.string().min(3, { message: 'Location is required.' }),
  type: z.string().min(1, { message: 'Property type is required.' }),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [videoPreview, setVideoPreview] = useState<string>('');

  // Define form with zod resolver
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      size: '',
      location: '',
      type: '',
    },
  });

  // Fetch the property data
  const { isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      if (!id) throw new Error('Property ID is required');
      
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (!data) throw new Error('Property not found');
      
      // Set form values
      form.reset({
        title: data.title || '',
        description: data.description || '',
        price: data.price ? String(data.price) : '',
        bedrooms: data.bedrooms ? String(data.bedrooms) : '',
        bathrooms: data.bathrooms ? String(data.bathrooms) : '',
        size: data.size ? String(data.size) : '',
        location: data.location || '',
        type: data.type || '',
      });

      // Set previews if available
      if (data.image_url) {
        setImagePreview(data.image_url);
      }
      if (data.video_url) {
        setVideoPreview(data.video_url);
      }
      
      return data;
    },
    enabled: !!id,
  });

  // Update property mutation
  const updatePropertyMutation = useMutation({
    mutationFn: async (values: PropertyFormValues & { image_url?: string, video_url?: string }) => {
      if (!id) throw new Error('Property ID is required');

      const propertyData = {
        ...values,
        price: Number(values.price),
        bedrooms: Number(values.bedrooms),
        bathrooms: Number(values.bathrooms),
        size: Number(values.size),
        image_url: values.image_url,
        video_url: values.video_url,
        updated_at: new Date(),
      };

      const { error } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', id);
      
      if (error) throw error;
      
      return id;
    },
    onSuccess: () => {
      toast.success('Property updated successfully');
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', id] });
      navigate('/admin/properties');
    },
    onError: (error: any) => {
      console.error('Error updating property:', error);
      toast.error(`Failed to update property: ${error.message}`);
    },
  });

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle video file selection
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const onSubmit = async (values: PropertyFormValues) => {
    try {
      setIsUploading(true);
      let imageUrl = imagePreview;
      let videoUrl = videoPreview;

      // Upload new image if selected
      if (imageFile) {
        const imageResult = await uploadToCloudinary(imageFile);
        imageUrl = imageResult.secure_url;
      }

      // Upload new video if selected
      if (videoFile) {
        const videoResult = await uploadToCloudinary(videoFile, 'video');
        videoUrl = videoResult.secure_url;
      }

      // Update property with form values and media URLs
      await updatePropertyMutation.mutateAsync({
        ...values,
        image_url: imageUrl,
        video_url: videoUrl,
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2" 
          onClick={() => navigate('/admin/properties')}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Property</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">
              Error loading property: {(error as Error).message}
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Property title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Apartment">Apartment</SelectItem>
                            <SelectItem value="House">House</SelectItem>
                            <SelectItem value="Condo">Condo</SelectItem>
                            <SelectItem value="Villa">Villa</SelectItem>
                            <SelectItem value="Townhouse">Townhouse</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Number of bedrooms" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Number of bathrooms" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size (sq ft)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Size in square feet" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Property description" 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="image">Property Image</Label>
                    <div className="mt-2">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <FormDescription>
                        Select a new image or keep the existing one.
                      </FormDescription>
                    </div>
                    {imagePreview && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Image Preview:</p>
                        <img 
                          src={imagePreview} 
                          alt="Property preview" 
                          className="max-h-40 rounded-md object-cover" 
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="video">Property Video</Label>
                    <div className="mt-2">
                      <Input
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                      />
                      <FormDescription>
                        Select a new video or keep the existing one.
                      </FormDescription>
                    </div>
                    {videoPreview && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Video Preview:</p>
                        <video 
                          src={videoPreview} 
                          controls 
                          className="max-h-40 w-full rounded-md" 
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isUploading || updatePropertyMutation.isPending}
                  >
                    {(isUploading || updatePropertyMutation.isPending) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Update Property
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProperty;
