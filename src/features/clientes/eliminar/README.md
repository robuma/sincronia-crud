# SC-5 · Eliminar cliente

La pantalla permite filtrar el listado paginado por nombre, actualizarlo manualmente y eliminar clientes.
Un diálogo modal integrado permite confirmar o cancelar sin cambiar el registro. La lista se actualiza y
se anuncia el éxito solo después de confirmar la eliminación en Supabase.

Leer AGENTS.md y DESIGN.md en la raíz. Usar getSupabase() y los tipos compartidos. Exportar el componente de la operación desde esta carpeta e integrarlo en la vista común mediante el PR. Coordinar modificaciones a App.tsx para evitar colisiones; no crear otro cliente Supabase ni otra identidad visual.
