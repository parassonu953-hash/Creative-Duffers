import { createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function submitMobilePortraitEnquiry({ form, image }) {
  if (!supabase) {
    throw new Error('The enquiry service is not configured yet. Please try again later.');
  }

  let referenceImagePath = null;
  if (image?.uri) {
    if (!image.base64) throw new Error('The selected photo could not be read. Please choose it again.');
    const contentType = image.mimeType || 'image/jpeg';
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(contentType)) {
      throw new Error('Please choose a JPG, PNG or WEBP image.');
    }
    const fileBytes = decode(image.base64);
    if (fileBytes.byteLength > 10 * 1024 * 1024) throw new Error('Your reference image must be smaller than 10 MB.');

    const extension = contentType.split('/')[1].replace('jpeg', 'jpg');
    referenceImagePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from('portrait-references')
      .upload(referenceImagePath, fileBytes, { contentType, upsert: false });
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
    source: 'mobile'
  });
  if (error) throw error;
  return true;
}
