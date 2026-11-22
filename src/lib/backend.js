import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function submitPortraitEnquiry({ form, file, source = 'website' }) {
  if (!supabase) {
    throw new Error('The enquiry service is not configured yet. Please try again later.');
  }

  let referenceImagePath = null;
  if (file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) throw new Error('Please choose a JPG, PNG or WEBP image.');
    if (file.size > 10 * 1024 * 1024) throw new Error('Your reference image must be smaller than 10 MB.');

    const extension = file.type.split('/')[1].replace('jpeg', 'jpg');
    referenceImagePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from('portrait-references')
      .upload(referenceImagePath, file, { contentType: file.type, upsert: false });
    if (uploadError) throw uploadError;
  }

  const { error } = await supabase.from('portrait_enquiries').insert({
    customer_name: form.name.trim(),
    customer_email: form.email.trim(),
    preferred_style: form.style,
    artwork_size: form.size,
    people_count: form.people,
    details: form.details.trim(),
    reference_image_path: referenceImagePath,
    source
  });
  if (error) throw error;
  return true;
}
