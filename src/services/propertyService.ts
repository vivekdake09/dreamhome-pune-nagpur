
import { supabase } from '@/lib/supabaseClient';

export interface PropertyData {
  id: string;
  title: string;
  description?: string;
  city?: string;
  location?: string;
  type?: string;
  price?: string;
  status?: string;
  media_urls?: string[];
  rera_info?: string;
  builder_id?: string;
  created_at?: string;
  about?: string;
  features_amenities?: string[] | string;
  project_highlights?: string[] | string;
  bedrooms?: number;
  bathrooms?: number;
  carpet_area?: string;
  property_img_url_1?: string;
  property_img_url_2?: string;
}

export async function fetchAllProperties(): Promise<PropertyData[]> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*');

    if (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }

    return preparePropertiesData(data || []);
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    return [];
  }
}

export async function fetchPropertyById(id: string): Promise<PropertyData | null> {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching property with id ${id}:`, error);
      throw error;
    }

    return data ? prepareSinglePropertyData(data) : null;
  } catch (error) {
    console.error(`Failed to fetch property with id ${id}:`, error);
    return null;
  }
}

// Helper function to prepare properties data for frontend
function preparePropertiesData(properties: any[]): PropertyData[] {
  return properties.map(property => prepareSinglePropertyData(property));
}

// Helper function to prepare a single property data for frontend
function prepareSinglePropertyData(property: any): PropertyData {
  // Parse string arrays if they're stored as JSON strings
  const features = typeof property.features_amenities === 'string' 
    ? tryParseJsonArray(property.features_amenities, [])
    : property.features_amenities;

  const highlights = typeof property.project_highlights === 'string'
    ? tryParseJsonArray(property.project_highlights, [])
    : property.project_highlights;

  const media = typeof property.media_urls === 'string'
    ? tryParseJsonArray(property.media_urls, [])
    : property.media_urls;

  // Format the property object with parsed data
  return {
    id: property.id,
    title: property.title || 'Untitled Property',
    description: property.description,
    city: property.city,
    location: property.location,
    type: property.type,
    price: property.price,
    status: property.status,
    media_urls: media || [],
    rera_info: property.rera_info,
    builder_id: property.builder_id,
    created_at: property.created_at,
    about: property.about,
    features_amenities: features || [],
    project_highlights: highlights || [],
    bedrooms: property.bedrooms ? Number(property.bedrooms) : undefined,
    bathrooms: property.bathrooms ? Number(property.bathrooms) : undefined,
    carpet_area: property.carpet_area,
    property_img_url_1: property.property_img_url_1,
    property_img_url_2: property.property_img_url_2,
  };
}

// Helper function to safely parse JSON strings
function tryParseJsonArray(jsonString: string, defaultValue: any[]): any[] {
  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}
