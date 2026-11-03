# Base de Sincronía

El equipo necesita clonar una base común de React para desarrollar cuatro historias, con una portada moderna, contratos de datos, configuración de Supabase y despliegues separados en Vercel. La portada presenta el nombre y el alcance del sistema; no implementa las operaciones CRUD ni muestra clientes inventados.

## Enfoques

Se consideraron un proyecto Vercel con Preview y Production, y dos proyectos Vercel separados. El equipo mantuvo Vercel después de comparar GitHub Pages; la base adopta un proyecto nuevo con dos ambientes para reducir configuración duplicada. main sirve a integración y Preview; production sirve a pases aprobados. Ambos proyectos Supabase son nuevos y gratuitos en la organización robuma. El usuario confirmó una demo pública sin login y con datos ficticios.

## Alcance

React con Vite y TypeScript; portada responsive accesible; tokens y guías de diseño; cliente Supabase con comprobación de ambiente y claves públicas; tabla clientes de cuatro campos; GitHub Actions para análisis, pruebas de configuración y compilación; README y AGENTS.md; PR de preparación sometido a la protección existente. El administrador no elude las revisiones de main. La integración final en main necesita aprobación de otro estudiante.

## Límites

No implementar historias SC-2 a SC-5. No alterar proyectos anteriores. No contratar servicios de pago. No subir claves administrativas, contraseñas ni tokens. No convertir el seguimiento de Jira en subtareas. No afirmar que main está lista para clonar hasta que la base esté integrada.

## Diseño

Portada de una pantalla principal y una sección breve de módulos. Tipografía Manrope autoalojada, superficies claras, tinta azul petróleo y acento verde. El nombre y la descripción del producto dominan la composición. Los módulos futuros se muestran como contenido informativo, no como botones que aparentan funcionar. Las decisiones compartidas se documentan en DESIGN.md y se implementan con tokens CSS.
