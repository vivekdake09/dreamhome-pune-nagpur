
import { supabase } from '@/lib/supabaseClient';
import { PropertyData } from './propertyService';

export async function fetchUserFavorites(userId: string): Promise<PropertyData[]> {
  try {
    // First get the favorite property IDs
    const { data: favoriteData, error: favoriteError } = await supabase
      .from('favorites')
      .select('property_id')
      .eq('user_id', userId);

    if (favoriteError) {
      console.error('Error fetching user favorites:', favoriteError);
      return [];
    }

    if (!favoriteData || favoriteData.length === 0) {
      return [];
    }

    // Extract property IDs from favorites data
    const propertyIds = favoriteData.map(fav => fav.property_id);

    // Fetch the actual properties
    const { data: properties, error: propertiesError } = await supabase
      .from('properties')
      .select('*')
      .in('id', propertyIds);

    if (propertiesError) {
      console.error('Error fetching favorite properties:', propertiesError);
      return [];
    }

    // Process the properties data using the same formatting as propertyService
    return properties.map(property => ({
      id: property.id,
      title: property.title || 'Untitled Property',
      description: property.description,
      city: property.city,
      location: property.location,
      type: property.type,
      price: property.price,
      status: property.status,
      media_urls: property.media_urls || [],
      rera_info: property.rera_info,
      builder_id: property.builder_id,
      created_at: property.created_at,
      about: property.about,
      features_amenities: property.features_amenities || [],
      project_highlights: property.project_highlights || [],
      bedrooms: property.bedrooms ? Number(property.bedrooms) : undefined,
      bathrooms: property.bathrooms ? Number(property.bathrooms) : undefined,
      carpet_area: property.carpet_area,
      property_img_url_1: property.property_img_url_1,
      property_img_url_2: property.property_img_url_2,
      property_vid_url: property.property_vid_url,
    }));
  } catch (error) {
    console.error('Failed to fetch user favorites:', error);
    return [];
  }
}

export async function toggleFavorite(userId: string, propertyId: string): Promise<boolean> {
  try {
    // Check if the property is already a favorite
    const { data, error: checkError } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking favorite status:', checkError);
      return false;
    }

    if (data) {
      // Remove from favorites
      const { error: removeError } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('property_id', propertyId);

      if (removeError) {
        console.error('Error removing favorite:', removeError);
        return false;
      }
      
      return false; // Return false to indicate it's not a favorite anymore
    } else {
      // Add to favorites
      const { error: addError } = await supabase
        .from('favorites')
        .insert([{ user_id: userId, property_id: propertyId }]);

      if (addError) {
        console.error('Error adding favorite:', addError);
        return false;
      }
      
      return true; // Return true to indicate it's now a favorite
    }
  } catch (error) {
    console.error('Failed to toggle favorite:', error);
    return false;
  }
}
