-- Create feedback table for bug reports and feature requests
create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  user_email text,
  type text default 'bug',
  description text not null,
  page_url text,
  status text default 'new',
  created_at timestamp with time zone default now()
);

-- Add RLS policies
alter table feedback enable row level security;

-- Users can submit their own feedback
create policy "Users can insert their own feedback"
  on feedback for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Users can view their own feedback
create policy "Users can view their own feedback"
  on feedback for select
  to authenticated
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists feedback_user_id_idx on feedback(user_id);
create index if not exists feedback_status_idx on feedback(status);
create index if not exists feedback_created_at_idx on feedback(created_at);
