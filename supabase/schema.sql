create extension if not exists "pgcrypto";

create table if not exists public.vaults (
  id uuid primary key default gen_random_uuid(),
  creator_wallet text not null,
  title text not null check (char_length(title) <= 100),
  description text check (description is null or char_length(description) <= 500),
  gate_type text not null check (gate_type in ('spl_token', 'nft_collection')),
  token_mint text not null,
  protected_link text not null,
  is_active boolean not null default true,
  access_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.access_logs (
  id uuid primary key default gen_random_uuid(),
  vault_id uuid not null references public.vaults(id) on delete cascade,
  wallet_address text not null,
  granted boolean not null,
  checked_at timestamptz not null default now(),
  gate_type text not null,
  token_mint text not null,
  balance_found numeric not null default 0
);

alter table public.vaults enable row level security;
alter table public.access_logs enable row level security;

create policy "Public can read active vault metadata"
on public.vaults
for select
using (is_active = true);

create policy "Service role can manage vaults"
on public.vaults
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "Service role can manage access logs"
on public.access_logs
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
