-- Admin tables + RLS extraction
-- Run this in Supabase SQL Editor first.

create table if not exists public.admin_breeds (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  mbti_type text not null,
  energy_level text,
  care_notes text,
  image text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_quiz_questions (
  id uuid primary key default gen_random_uuid(),
  question_text text not null,
  trait_pair text not null,
  option_a text not null,
  trait_a text not null,
  option_b text not null,
  trait_b text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.adoption_inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  contact_info text not null,
  breed_name text not null,
  status text not null default 'Pending' check (status in ('Pending', 'Contacted', 'Resolved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_admin_breeds_name on public.admin_breeds(name);
create index if not exists idx_admin_quiz_questions_created_at on public.admin_quiz_questions(created_at desc);
create index if not exists idx_adoption_inquiries_status on public.adoption_inquiries(status);

alter table public.admin_breeds enable row level security;
alter table public.admin_quiz_questions enable row level security;
alter table public.adoption_inquiries enable row level security;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Admins can manage breeds" on public.admin_breeds;
drop policy if exists "Admins can manage quiz questions" on public.admin_quiz_questions;
drop policy if exists "Admins can manage inquiries" on public.adoption_inquiries;
drop policy if exists "Users can create own inquiry" on public.adoption_inquiries;
drop policy if exists "Users can view own inquiries" on public.adoption_inquiries;

create policy "Admins can view all profiles"
on public.profiles
for select
using (public.is_admin_user());

create policy "Admins can manage breeds"
on public.admin_breeds
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Admins can manage quiz questions"
on public.admin_quiz_questions
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Admins can manage inquiries"
on public.adoption_inquiries
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "Users can create own inquiry"
on public.adoption_inquiries
for insert
with check (auth.uid() = user_id);

create policy "Users can view own inquiries"
on public.adoption_inquiries
for select
using (auth.uid() = user_id);

-- Optional: set one account as admin (replace with your auth user id)
-- update public.profiles
-- set role = 'admin'
-- where id = '00000000-0000-0000-0000-000000000000';

-- Optional: set account as admin by email
-- update public.profiles p
-- set role = 'admin'
-- from auth.users u
-- where p.id = u.id
--   and lower(u.email) = lower('you@example.com');
