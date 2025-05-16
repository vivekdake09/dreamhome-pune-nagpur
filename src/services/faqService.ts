
import { supabase } from '@/lib/supabaseClient';

export interface FAQ {
  id: string;
  property_id: string;
  question: string;
  answer: string;
  order: number;
  created_at: string;
}

/**
 * Fetch FAQs for a specific property
 */
export async function fetchFAQsByPropertyId(propertyId: string): Promise<FAQ[]> {
  try {
    const { data, error } = await supabase
      .from('property_faqs')
      .select('*')
      .eq('property_id', propertyId)
      .order('order', { ascending: true });
      
    if (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
    
    return data as FAQ[];
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    return [];
  }
}
