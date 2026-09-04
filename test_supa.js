import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://dpuqhiodkspjmmmjbrmv.supabase.co',
  'sb_publishable_gVxiFJToih5IqVzZixxKtA_-F4WgTjV'
);

async function test() {
  const { data, error } = await supabase.from('aid_requests').insert([{
    victim_name: 'Test',
    contact_phone: '12345',
    district: 'Colombo',
    category: 'food',
    item_description: 'Test',
    quantity_needed: 10
  }]);
  
  if (error) {
    console.error('ERROR:', error.message);
  } else {
    console.log('SUCCESS!');
  }
}

test();
