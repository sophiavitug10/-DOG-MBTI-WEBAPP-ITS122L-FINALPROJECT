-- Run this in Supabase SQL Editor
-- 1) Keep Supabase Auth enabled
-- 2) Then execute this script to create app tables + RLS policies

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mbti_type text not null,
  compatible_breed text not null,
  trait_scores jsonb not null default '{}'::jsonb,
  answers jsonb not null default '[]'::jsonb,
  completed_at timestamptz not null default now()
);

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

create index if not exists idx_quiz_results_user_id on public.quiz_results(user_id);
create index if not exists idx_quiz_results_completed_at on public.quiz_results(completed_at desc);
create index if not exists idx_admin_breeds_name on public.admin_breeds(name);
create index if not exists idx_admin_quiz_questions_created_at on public.admin_quiz_questions(created_at desc);
create index if not exists idx_adoption_inquiries_status on public.adoption_inquiries(status);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.quiz_results enable row level security;
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

-- profiles policies
create policy "Users can view own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Admins can view all profiles"
on public.profiles
for select
using (public.is_admin_user());

-- quiz_results policies
create policy "Users can view own quiz results"
on public.quiz_results
for select
using (auth.uid() = user_id);

create policy "Users can insert own quiz results"
on public.quiz_results
for insert
with check (auth.uid() = user_id);

create policy "Users can update own quiz results"
on public.quiz_results
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own quiz results"
on public.quiz_results
for delete
using (auth.uid() = user_id);

-- admin_breeds policies
create policy "Admins can manage breeds"
on public.admin_breeds
for all
using (public.is_admin_user())
with check (public.is_admin_user());

-- admin_quiz_questions policies
create policy "Admins can manage quiz questions"
on public.admin_quiz_questions
for all
using (public.is_admin_user())
with check (public.is_admin_user());

-- adoption_inquiries policies
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

-- Email visibility support
alter table public.profiles
add column if not exists email text;

create unique index if not exists idx_profiles_email_unique
on public.profiles(email)
where email is not null;

update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id
  and p.email is distinct from u.email;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email
  )
  on conflict (id) do update
  set full_name = excluded.full_name,
      email = excluded.email,
      updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_auth_user_updated()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set email = new.email,
      full_name = coalesce(
        new.raw_user_meta_data ->> 'full_name',
        new.raw_user_meta_data ->> 'name',
        full_name
      ),
      updated_at = now()
  where id = new.id;
  return new;
end;
$$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
after update of email, raw_user_meta_data on auth.users
for each row execute procedure public.handle_auth_user_updated();
