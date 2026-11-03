# Base de datos

`public.clientes` existe en los dos proyectos nuevos indicados en `docs/ambientes.md` con la misma migración inicial. No se precargan registros.

| Columna | Tipo | Restricciones |
| --- | --- | --- |
| id | uuid | Primaria generada por BD; no enviar al crear o editar |
| nombre | text | Obligatorio, longitud recortada de 1 a 120 |
| correo | text | Obligatorio, máximo 254, control mínimo de @; único sin distinguir mayúsculas ni espacios exteriores |
| telefono | text | Obligatorio, longitud recortada de 1 a 40 |

Cada formulario debe validar también el formato y mostrar mensajes útiles. La restricción mínima de correo en BD no sustituye la validación de la interfaz. El teléfono es texto para conservar prefijos y ceros.

RLS está habilitado. Las políticas permiten leer, crear, editar y eliminar a `anon` y `authenticated` porque el equipo eligió una demo pública sin login. Solo nombre, correo y telefono son columnas de escritura; id no se puede modificar. Cualquier visitante con la clave pública puede cambiar registros; usar exclusivamente datos ficticios, también en producción.

## Cambiar el esquema

1. Coordinar cambios que afecten las otras historias.
2. Añadir SQL nuevo en `database/migrations/`; no editar SQL ya aplicado.
3. Aplicar con el conector primero a sincronia-dev y verificar restricciones y permisos.
4. Regenerar `src/types/database.ts` y adaptar tipos compartidos.
5. Aplicar a sincronia-prod con el pase revisado correspondiente.

`001_clientes.sql` se aplicó con el conector, que registra versiones propias. Esta carpeta conserva el SQL fuente; **no es un historial listo para `supabase db push`**. Antes de adoptar el CLI, reconciliar las versiones locales con `list_migrations` de cada proyecto. No ejecutar de nuevo la creación de tabla sobre una base inicializada.

Versiones verificadas de la migración inicial: desarrollo `20261031181554`; producción `20261031181600`, ambas con nombre `001_clientes`.

`npm run check:db` comprueba una lectura mínima de desarrollo con la clave publicable de `.env.local`, sin cambiar registros.
