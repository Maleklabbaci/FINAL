-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  website text,
  category text,
  city text,
  skills text[],
  whatsapp text,
  role text default 'user',
  plan text default 'free',
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint username_length check (char_length(username) >= 3)
);

-- Create portfolios table
create table public.portfolios (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  slug text unique not null,
  theme text default 'modern',
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create projects table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  portfolio_id uuid references public.portfolios(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null, -- Added user_id for easier querying
  title text not null,
  description text,
  image_url text,
  project_url text,
  category text, -- Added category for projects
  tags text[], -- Added tags for projects
  cover_url text, -- Added cover_url for projects
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.portfolios enable row level security;
alter table public.projects enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- Portfolios policies
create policy "Published portfolios are viewable by everyone."
  on public.portfolios for select
  using ( is_published = true or auth.uid() = user_id );

create policy "Users can insert their own portfolios."
  on public.portfolios for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own portfolios."
  on public.portfolios for update
  using ( auth.uid() = user_id );

create policy "Users can delete own portfolios."
  on public.portfolios for delete
  using ( auth.uid() = user_id );

-- Projects policies
create policy "Projects are viewable by everyone."
  on public.projects for select
  using ( true );

create policy "Users can insert projects to own portfolios."
  on public.projects for insert
  with check ( 
    auth.uid() = user_id
  );

create policy "Users can update own projects."
  on public.projects for update
  using (
    auth.uid() = user_id
  );

create policy "Users can delete own projects."
  on public.projects for delete
  using (
    auth.uid() = user_id
  );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, username, category, city)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'category',
    new.raw_user_meta_data->>'city'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
