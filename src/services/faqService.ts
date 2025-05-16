
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

/**
 * Create a new FAQ for a property
 */
export async function createFAQ(faq: Omit<FAQ, 'id' | 'created_at'>): Promise<FAQ | null> {
  try {
    const { data, error } = await supabase
      .from('property_faqs')
      .insert(faq)
      .select()
      .single();

    if (error) {
      console.error('Error creating FAQ:', error);
      throw error;
    }

    return data as FAQ;
  } catch (error) {
    console.error('Failed to create FAQ:', error);
    return null;
  }
}

/**
 * Update an existing FAQ
 */
export async function updateFAQ(id: string, faq: Partial<Omit<FAQ, 'id' | 'created_at'>>): Promise<FAQ | null> {
  try {
    const { data, error } = await supabase
      .from('property_faqs')
      .update(faq)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating FAQ:', error);
      throw error;
    }

    return data as FAQ;
  } catch (error) {
    console.error('Failed to update FAQ:', error);
    return null;
  }
}

/**
 * Delete an FAQ
 */
export async function deleteFAQ(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('property_faqs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting FAQ:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Failed to delete FAQ:', error);
    return false;
  }
}

/**
 * Reorder FAQs
 */
export async function updateFAQOrder(faqs: Pick<FAQ, 'id' | 'order'>[]): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('property_faqs')
      .upsert(
        faqs.map(({ id, order }) => ({ id, order })),
        { onConflict: 'id' }
      );

    if (error) {
      console.error('Error updating FAQ order:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Failed to update FAQ order:', error);
    return false;
  }
}
