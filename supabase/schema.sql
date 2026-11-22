-- Creative Duffers shared backend
-- Run this file in Supabase SQL Editor after creating a project.

create extension if not exists pgcrypto;

create table if not exists public.portrait_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null check (char_length(customer_name) between 1 and 120),
  customer_email text not null check (char_length(customer_email) between 3 and 254),
  preferred_style text not null,
  artwork_size text not null,
  people_count text,
  details text,
  reference_image_path text,
  source text not null default 'website' check (source in ('website', 'mobile'))
);

create index if not exists portrait_enquiries_created_at_idx
  on public.portrait_enquiries (created_at desc);

alter table public.portrait_enquiries enable row level security;

-- Visitors can submit enquiries, but cannot read customer records.
drop policy if exists "Anyone can submit portrait enquiries" on public.portrait_enquiries;
create policy "Anyone can submit portrait enquiries"
  on public.portrait_enquiries
  for insert
  to anon, authenticated
  with check (true);

-- Private reference-photo bucket. Only uploads are allowed from the public client.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portrait-references',
  'portrait-references',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = false,
    file_size_limit = 10485760,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

drop policy if exists "Visitors can upload portrait references" on storage.objects;
create policy "Visitors can upload portrait references"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'portrait-references');

-- No public SELECT, UPDATE, or DELETE policies are created.
-- Review enquiries and access private images from the Supabase dashboard.
