-- Fuente compartida para los dos proyectos NUEVOS de Sincronía.
-- Demo pública autorizada por el equipo: usar exclusivamente datos ficticios.
create table public.clientes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null check (char_length(btrim(nombre)) between 1 and 120),
  correo text not null check (char_length(btrim(correo)) between 3 and 254 and position('@' in correo) > 1),
  telefono text not null check (char_length(btrim(telefono)) between 1 and 40)
);

create unique index clientes_correo_unique on public.clientes (lower(btrim(correo)));
alter table public.clientes enable row level security;

revoke all on table public.clientes from anon, authenticated;
grant select, delete on table public.clientes to anon, authenticated;
grant insert (nombre, correo, telefono) on table public.clientes to anon, authenticated;
grant update (nombre, correo, telefono) on table public.clientes to anon, authenticated;

create policy clientes_demo_select on public.clientes for select to anon, authenticated using (true);
create policy clientes_demo_insert on public.clientes for insert to anon, authenticated with check (true);
create policy clientes_demo_update on public.clientes for update to anon, authenticated using (true) with check (true);
create policy clientes_demo_delete on public.clientes for delete to anon, authenticated using (true);

comment on table public.clientes is 'Sincronía: demostración académica pública, sin login, exclusivamente con clientes ficticios. No almacenar datos personales reales.';
