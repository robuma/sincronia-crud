# Instrucciones del proyecto Sincronía

## Antes de trabajar

Leer `README.md`, `PRODUCT.md`, `DESIGN.md`, `docs/ambientes.md` y la historia de Jira asignada. Revisar el estado real del repositorio y la rama antes de editar. Si la herramienta no carga este archivo automáticamente, indicarle expresamente que lo lea.

## Alcance por participante

| Historia | Responsable | Rama sugerida | Carpeta |
| --- | --- | --- | --- |
| SC-2 Crear cliente | Roberto Umaña | `feature/SC-2-crear-cliente` | `src/features/clientes/crear/` |
| SC-3 Listar clientes | José Rojas | `feature/SC-3-listar-clientes` | `src/features/clientes/consultar/` |
| SC-4 Editar cliente | Sebastián Vargas | `feature/SC-4-editar-cliente` | `src/features/clientes/editar/` |
| SC-5 Eliminar cliente | Darío Zamora | `feature/SC-5-eliminar-cliente` | `src/features/clientes/eliminar/` |

Implementar solo la historia asignada. No completar las historias de otras personas ni atribuirles commits hechos por el agente. Conservar Jira con una historia principal por participante, sin agregar subtareas. El equipo debe comprender y explicar los cambios.

## Reglas visuales

`DESIGN.md` define el diseño y `src/tokens.css` sus valores. Reutilizar estilos y componentes existentes. No inventar otra identidad, instalar un framework visual ni rediseñar la portada durante un feature. Añadir los nuevos patrones compartidos a DESIGN.md y mantener teclado, foco, estados y respuesta móvil.

## Arquitectura y datos

- React + Vite + TypeScript; Node 24 recomendado; instalar con `npm ci`.
- Acceso a datos mediante `getSupabase()` de `src/lib/supabase.ts`. No crear clientes dispersos ni URLs hardcodeadas en componentes.
- Usar `Cliente` y `DatosCliente` de `src/features/clientes/types.ts`. Los nombres de BD son `id`, `nombre`, `correo`, `telefono`.
- Nunca enviar `id` al crear o editar: lo genera la BD y las columnas de escritura están restringidas.
- La tabla exige valores no vacíos y correo único ignorando mayúsculas y espacios exteriores. Interpretar errores de Supabase y no mostrar éxito antes de que la operación finalice.
- Demo pública sin login, autorizada exclusivamente para datos ficticios. No introducir datos personales reales. No desactivar RLS.
- Cambios de estructura: SQL nuevo, inmutable, en `database/migrations/`, aplicado con el conector solo a los dos proyectos indicados en `docs/ambientes.md`. Registrar la migración aplicada y regenerar tipos. No ejecutar `supabase db push` contra estas bases sin reconciliar primero el historial del CLI con las versiones que registra el conector.
- No restaurar, pausar, modificar o borrar otros proyectos de Supabase o Vercel. No contratar recursos de pago.

## Ambientes y credenciales

Preview y desarrollo local usan `sincronia-dev`; Production usa `sincronia-prod`. Respetar la validación de `src/lib/config.ts`; no quitarla para resolver una configuración incorrecta. Las claves `sb_publishable_` están diseñadas para el navegador. Nunca exponer claves secretas, service_role, contraseñas de BD o tokens en variables `VITE_*`, código, commits, logs o respuestas.

## Git y calidad

- Actualizar desde main antes de crear la rama; no trabajar ni enviar cambios directamente a main o production.
- Incluir la clave SC correspondiente en rama, commits y título del PR.
- Abrir PR hacia main. Un compañero debe revisar y aprobar. No eludir protecciones, autoaprobar ni usar permisos de administrador para integrar.
- Ejecutar `npm run check`. Si se cambia el acceso a datos, comprobarlo con la BD de desarrollo usando solo datos ficticios.
- Antes de terminar una pantalla, verificar escritorio, móvil, teclado y estados vacíos/error.
- Evitar cambios de dependencias, configuración o archivos globales ajenos a la historia. Mantener package-lock.json actualizado cuando se cambien dependencias.
- El PR debe explicar qué cambió, qué se probó y cómo reproducirlo. Incluir evidencia visual si cambia la interfaz.

## Documentación vigente

Usar Context7 para documentación de bibliotecas y plataformas antes de escribir código que dependa de sus APIs. Resolver primero el identificador de la biblioteca y después consultar el concepto concreto. No inventar APIs ni confiar en ejemplos obsoletos.
