
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Building, Save } from 'lucide-react';
import { AvatarUpload } from '@/components/profile/AvatarUpload';
import { getProperty, updateProperty } from '@/services/propertyService';
import PropertyFAQsManager from '@/components/admin/PropertyFAQsManager';

// Define the property form schema
const propertyFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.string().min(1, { message: "Price is required." }),
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
  bedrooms: z.string().min(1, { message: "Number of bedrooms is required." }),
  bathrooms: z.string().min(1, { message: "Number of bathrooms is required." }),
  area: z.string().min(1, { message: "Area is required." }),
  type: z.string().min(1, { message: "Property type is required." }),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [property, setProperty] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>("details");
  
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      type: '',
    }
  });

  useEffect(() => {
    const loadProperty = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const propertyData = await getProperty(id);
        
        if (!propertyData) {
          toast.error("Property not found");
          navigate('/admin/properties');
          return;
        }

        setProperty(propertyData);
        setImageUrl(propertyData.image || '');
        
        // Set form values
        form.reset({
          title: propertyData.title || '',
          description: propertyData.description || '',
          price: propertyData.price ? String(propertyData.price) : '',
          location: propertyData.location || '',
          bedrooms: propertyData.bedrooms ? String(propertyData.bedrooms) : '',
          bathrooms: propertyData.bathrooms ? String(propertyData.bathrooms) : '',
          area: propertyData.area ? String(propertyData.area) : '',
          type: propertyData.type || '',
        });
      } catch (error) {
        console.error("Error loading property:", error);
        toast.error("Failed to load property");
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id, navigate, form]);

  const onSubmit = async (data: PropertyFormValues) => {
    if (!id) return;
    
    try {
      setSaving(true);
      
      const updatedProperty = {
        ...data,
        image: imageUrl,
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseInt(data.bathrooms),
      };
      
      await updateProperty(id, updatedProperty);
      toast.success("Property updated successfully");
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Failed to update property");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p>Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p>Property not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Property</h1>
        <Button onClick={() => navigate('/admin/properties')}>Back to Properties</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="details">Property Details</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>Update the property details below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter property title" {...field} />
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
                          <FormLabel>Price (in Lakhs)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Price in lakhs" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Property location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area (sq.ft.)</FormLabel>
                          <FormControl>
                            <Input placeholder="Property area in sq.ft." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Apartment">Apartment</SelectItem>
                            <SelectItem value="Villa">Villa</SelectItem>
                            <SelectItem value="House">House</SelectItem>
                            <SelectItem value="Cottage">Cottage</SelectItem>
                            <SelectItem value="Penthouse">Penthouse</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter property description" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Property Image</FormLabel>
                    <AvatarUpload 
                      currentImage={imageUrl} 
                      onImageUploaded={handleImageUpload} 
                      type="property"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" disabled={saving} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>Property FAQs</CardTitle>
              <CardDescription>Manage frequently asked questions for this property.</CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyFAQsManager propertyId={id || ''} propertyName={property.title} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditProperty;
