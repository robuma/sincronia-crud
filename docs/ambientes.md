# Ambientes y publicaciones

El proyecto nuevo de Vercel **sincronia-crud** pertenece a `robumas-projects` y se conecta únicamente al repositorio público `robuma/sincronia-crud`.

| Uso | Rama / entorno Vercel | Supabase | Referencia |
| --- | --- | --- | --- |
| Local | Development | sincronia-dev | `wkhbkcggdfmemtgqmjpx` |
| Features e integración | Features y main / Preview | sincronia-dev | `wkhbkcggdfmemtgqmjpx` |
| Demo publicada | production / Production | sincronia-prod | `qcbxeirbogtwoaunzbsf` |

Los dos proyectos Supabase están en la organización robuma, región us-east-1, plan Free. Tienen igual estructura; los datos no se copian automáticamente. Son demos públicas sin login y solo deben contener datos ficticios.

Vercel utiliza Preview y Production incluidos en Hobby; no se crean ambientes personalizados de pago. Los integrantes colaboran por GitHub y no necesitan acceso administrativo a Vercel.

## Variables al compilar

| Variable | Development / Preview | Production |
| --- | --- | --- |
| VITE_APP_ENV | development | production |
| VITE_SUPABASE_URL | https://wkhbkcggdfmemtgqmjpx.supabase.co | https://qcbxeirbogtwoaunzbsf.supabase.co |
| VITE_SUPABASE_PUBLISHABLE_KEY | Clave publicable de sincronia-dev | Clave publicable de sincronia-prod |

Cambiar variables en Vercel requiere un despliegue nuevo. La configuración se valida antes de compilar y al crear el cliente: se rechaza el proyecto equivocado o una clave que no sea publicable antes de incorporarla al navegador. Sin ninguna variable se permite compilar la portada informativa; si se proporciona una, deben estar las tres. No usar service_role, claves secretas ni contraseñas en el frontend.

Localmente copiar `.env.example` a `.env.local`. El administrador puede preparar `.env.production.local` para comprobar una compilación de producción; nunca subirlo. La portada no inicializa Supabase hasta que una operación llame a `getSupabase()`.

## Flujo del equipo

1. Crear una rama desde main actualizado; desarrollar únicamente la historia asignada.
2. Abrir PR hacia main, revisar su Preview y adjuntar pruebas.
3. Otro integrante aprueba; integrar con comprobaciones en verde y conversaciones resueltas.
4. Probar la integración en el Preview de main con datos ficticios.
5. Abrir PR de **main hacia production** con versión, pruebas y plan de reversión; otro integrante aprueba el pase.
6. Al integrarlo, verificar el despliegue Production y registrar versión / commit.

Main y production requieren una aprobación de otro integrante, comprobación **Calidad y compilación** aprobada, rama actualizada y conversaciones resueltas. No admiten force push ni borrado, y las reglas también se aplican al administrador. No eludirlas para integrar un PR propio.

La primera publicación contiene solo la portada de preparación; no significa que los CRUD estén terminados. El PR de esta base también requiere revisión de otro integrante antes de integrarse. Este documento describe el flujo; comprobar el estado real de PR y despliegues antes de afirmar que un pase está listo.

## Preparación inicial verificada

- [Portada inicial](https://sincronia-crud.vercel.app).
- [PR de la base hacia main](https://github.com/robuma/sincronia-crud/pull/2), pendiente de revisión humana.
- Vercel asignó su primer despliegue a Production automáticamente desde `setup/base-proyecto` (commit `1054d12`), como publicación inicial de la portada. Los despliegues posteriores siguen la configuración de ramas de la tabla anterior; la rama production sigue en el punto de partida hasta el primer pase revisado.
- Ambas BD respondieron HTTP 200 a una lectura con clave publicable; esquema, cuatro políticas RLS e índice único comprobados, sin datos precargados.

## Reversión

Antes del pase registrar el identificador y URL del despliegue estable. Si falla la versión nueva, usar **Instant Rollback** del proyecto sincronia-crud en Vercel. Después abrir un PR que revierta el cambio de código de production para que el siguiente despliegue no repita el fallo. No usar force push.

El rollback de frontend no revierte migraciones ni datos. Mantener migraciones compatibles y planificar cualquier restauración de BD por separado. Nunca borrar o restaurar bases para revertir una interfaz.

## Alcance y costo

Solo usar los proyectos nuevos de este trabajo. No modificar proyectos anteriores de Vercel o Supabase. Recursos Free/Hobby sin contratar ampliaciones; cuotas y pausas por inactividad siguen aplicando. Si una BD se pausa, reanudar únicamente la del trabajo antes de probar.

Referencias: [entornos de Vercel](https://vercel.com/docs/deployments/environments), [ramas en Vercel](https://vercel.com/docs/git), [claves Supabase](https://supabase.com/docs/guides/api/api-keys).
