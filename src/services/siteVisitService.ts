
import { supabase } from '@/lib/supabaseClient';

export interface SiteVisit {
  id: string;
  property_id: string;
  property_name: string;
  visitor_name: string;
  visitor_phone: string;
  visitor_email: string;
  visit_date: string;
  visit_time: string;
  message: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export async function fetchAllSiteVisits() {
  const { data, error } = await supabase
    .from('site_visits')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    throw error;
  }
  
  return data as SiteVisit[];
}

export async function updateSiteVisitStatus(id: string, status: SiteVisit['status']) {
  const { data, error } = await supabase
    .from('site_visits')
    .update({ status })
    .eq('id', id);
    
  if (error) {
    throw error;
  }
  
  return data;
}
