
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/lib/supabaseClient';
import { uploadToCloudinary } from '@/utils/cloudinaryService';
import { Loader2, Upload } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define form schema using Zod
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  city: z.string().min(1, "City is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Property type is required"),
  price: z.string().min(1, "Price is required"),
  bedrooms: z.coerce.number().nonnegative("Bedrooms must be a positive number"),
  bathrooms: z.coerce.number().nonnegative("Bathrooms must be a positive number"),
  carpet_area: z.string().min(1, "Carpet area is required"),
  property_img_url_1: z.string().optional().default(""),
  property_img_url_2: z.string().optional().default(""),
  property_vid_url: z.string().optional().default(""),
  rera_info: z.string().optional(),
  features_amenities: z.string().optional(),
  project_highlights: z.string().optional(),
  about: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddProperty = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState<{
    image1: boolean;
    image2: boolean;
    video: boolean;
  }>({
    image1: false,
    image2: false,
    video: false,
  });
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      city: "",
      location: "",
      type: "",
      price: "",
      bedrooms: 0,
      bathrooms: 0,
      carpet_area: "",
      property_img_url_1: "",
      property_img_url_2: "",
      property_vid_url: "",
      rera_info: "",
      features_amenities: "",
      project_highlights: "",
      about: "",
    },
  });

  const handleFileUpload = async (file: File, type: 'image1' | 'image2' | 'video') => {
    try {
      setUploading(prev => ({
        ...prev,
        [type]: true
      }));
      
      const resourceType = type === 'video' ? 'video' : 'image';
      const result = await uploadToCloudinary(file, resourceType);
      
      // Update form with the returned URL
      if (type === 'image1') {
        form.setValue('property_img_url_1', result.secure_url);
      } else if (type === 'image2') {
        form.setValue('property_img_url_2', result.secure_url);
      } else if (type === 'video') {
        form.setValue('property_vid_url', result.secure_url);
      }
      
      toast.success(`${type === 'video' ? 'Video' : 'Image'} uploaded successfully`);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast.error(`Failed to upload ${type === 'video' ? 'video' : 'image'}`);
    } finally {
      setUploading(prev => ({
        ...prev,
        [type]: false
      }));
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      // Convert string arrays to arrays if they're submitted as comma-separated strings
      const processedData = {
        ...data,
        features_amenities: data.features_amenities ? data.features_amenities.split(',').map(item => item.trim()) : [],
        project_highlights: data.project_highlights ? data.project_highlights.split(',').map(item => item.trim()) : [],
      };
      
      // Insert the property into Supabase
      const { error } = await supabase
        .from('properties')
        .insert([processedData]);
        
      if (error) throw error;
      
      toast.success('Property added successfully');
      navigate('/admin/properties');
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error('Failed to add property');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Property</h1>
        <p className="text-muted-foreground">
          Create a new property listing in the database
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title*</FormLabel>
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
                      <FormLabel>Property Type*</FormLabel>
                      <FormControl>
                        <Input placeholder="Apartment, Villa, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. ₹50,00,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Mumbai" {...field} />
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
                      <FormLabel>Location/Area*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Andheri West" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="carpet_area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carpet Area*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 1200 sq.ft." {...field} />
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
                        <Input type="number" placeholder="e.g. 2" {...field} />
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
                        <Input type="number" placeholder="e.g. 2" {...field} />
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
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detailed description of the property" 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="property_img_url_1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Image*</FormLabel>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileUpload(e.target.files[0], 'image1');
                              }
                            }}
                            className="flex-1"
                          />
                          {uploading.image1 && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )}
                        </div>
                        <FormControl>
                          <Input 
                            placeholder="Image URL (uploads automatically)" 
                            {...field} 
                            readOnly 
                          />
                        </FormControl>
                        {field.value && (
                          <div className="mt-2 border rounded overflow-hidden w-full max-h-40">
                            <img 
                              src={field.value} 
                              alt="Property preview" 
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <FormDescription>
                        Main image for the property (upload through Cloudinary)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="property_img_url_2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Image</FormLabel>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileUpload(e.target.files[0], 'image2');
                              }
                            }}
                            className="flex-1"
                          />
                          {uploading.image2 && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )}
                        </div>
                        <FormControl>
                          <Input 
                            placeholder="Image URL (uploads automatically)" 
                            {...field} 
                            readOnly 
                          />
                        </FormControl>
                        {field.value && (
                          <div className="mt-2 border rounded overflow-hidden w-full max-h-40">
                            <img 
                              src={field.value} 
                              alt="Property preview" 
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="property_vid_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Video</FormLabel>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept="video/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileUpload(e.target.files[0], 'video');
                              }
                            }}
                            className="flex-1"
                          />
                          {uploading.video && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )}
                        </div>
                        <FormControl>
                          <Input 
                            placeholder="Video URL (uploads automatically)" 
                            {...field} 
                            readOnly 
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rera_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RERA Information</FormLabel>
                      <FormControl>
                        <Input placeholder="RERA Registration Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="features_amenities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features & Amenities</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter comma-separated list: Swimming Pool, Gym, etc." 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enter features separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="project_highlights"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Highlights</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter comma-separated list: 24/7 Security, Close to Metro, etc." 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enter highlights separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Additional information about the project or property" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/properties')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    'Save Property'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProperty;
