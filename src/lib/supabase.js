import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dpuqhiodkspjmmmjbrmv.supabase.co';
const supabaseAnonKey = 'sb_publishable_gVxiFJToih5IqVzZixxKtA_-F4WgTjV';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Aid Requests ────────────────────────────────────────────

export async function createAidRequest(requestData) {
  const { data, error } = await supabase
    .from('aid_requests')
    .insert([requestData])
    .select();
  if (error) throw error;
  return data[0];
}

export async function getAidRequests(filters = {}) {
  let query = supabase.from('aid_requests').select('*').order('created_at', { ascending: false });

  if (filters.district) query = query.eq('district', filters.district);
  if (filters.category) query = query.eq('category', filters.category);
  if (filters.priority) query = query.eq('priority', filters.priority);
  if (filters.status) query = query.eq('status', filters.status);
  if (filters.search) query = query.ilike('item_description', `%${filters.search}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getAidRequestById(id) {
  const { data, error } = await supabase
    .from('aid_requests')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function updateAidRequest(id, updates) {
  const { data, error } = await supabase
    .from('aid_requests')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

// ─── Donations ───────────────────────────────────────────────

export async function createDonation(donationData) {
  const { data, error } = await supabase
    .from('donations')
    .insert([donationData])
    .select();
  if (error) throw error;
  return data[0];
}

export async function getDonationsByRequest(requestId) {
  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .eq('request_id', requestId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

// ─── Volunteers ──────────────────────────────────────────────

export async function createVolunteer(volunteerData) {
  const { data, error } = await supabase
    .from('volunteers')
    .insert([volunteerData])
    .select();
  if (error) throw error;
  return data[0];
}

export async function getVolunteers(filters = {}) {
  let query = supabase.from('volunteers').select('*').order('created_at', { ascending: false });

  if (filters.district) query = query.eq('district', filters.district);
  if (filters.availability) query = query.eq('availability', filters.availability);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getVolunteerById(id) {
  const { data, error } = await supabase
    .from('volunteers')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}
