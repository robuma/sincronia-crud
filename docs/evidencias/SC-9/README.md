# SC-9 · Rediseño y búsqueda

[Tarea en Jira](https://codefive.atlassian.net/browse/SC-9). Responsable: Roberto Umaña. Rama: `feature/SC-9-redisenar-interfaz`. Las operaciones de SC-2, SC-3 y SC-5 se integran en el nuevo espacio; SC-4 permanece pendiente.

## Validación

- `npm run check`: revisión estática, TypeScript, compilación y **31 pruebas aprobadas**, incluidas siete nuevas de búsqueda y lectura por lotes. Ejecución local con Node 26.13.0; CI usa Node 24.
- Navegador Chromium: portada, directorio y creación a 1440 px y 390 px. Portada comparada además a 1051 × 1496 con la maqueta aprobada. Sin desplazamiento horizontal, incluso con nombres y correos largos.
- Búsqueda comprobada sin Enter: nombre, correo y teléfono sin separadores; mínimo de tres caracteres; normalización de tildes y mayúsculas; limpiar; sin coincidencias; resultado fuera de la página visible; retorno a la primera página al filtrar.
- Paginación comprobada con 12 clientes ficticios simulados en el navegador. La prueba de lotes verifica que una respuesta limitada por la API no trunque la colección ni oculte un error parcial.
- Creación y eliminación reales en **sincronia-dev**, utilizando únicamente `SC9 Cliente ficticio` / `sc9.qa.20261101@example.com`. Se confirmó la creación, se buscó el registro, se canceló la eliminación con Escape y luego se eliminó. El registro de prueba quedó retirado y el listado volvió a los cuatro registros previos.
- Teclado: navegación, submenú, apertura de acciones con Enter, foco inicial en Cancelar, Escape devuelve el foco al botón de acciones y la eliminación confirmada lo devuelve al buscador. El menú móvil cierra con Escape y devuelve el foco a su control.
- Respuestas simuladas de listado vacío, error 503 al leer y error 500 al eliminar. Los errores ofrecen recuperación y no muestran éxito falso. La simulación se limitó al navegador de pruebas; no se cambió la BD.
- Detector de Impeccable sobre los archivos de interfaz modificados: sin hallazgos deterministas; no se añadieron exclusiones.

## Cómo revisarlo

1. Abrir el Preview del PR o iniciar localmente con `npm ci`, copiar `.env.example` a `.env.local` y ejecutar `npm run dev`.
2. Revisar la portada y pulsar **Ingresar**. Comprobar **Clientes → Nuevo cliente** y volver al listado.
3. Registrar un cliente con nombre y correo ficticios propios, buscarlo por nombre/correo/teléfono y limpiar la búsqueda. Con uno o dos caracteres debe mostrarse el directorio sin filtro.
4. Abrir **Más acciones → Eliminar cliente**, cancelar primero y confirmar después. Eliminar solamente el registro de prueba propio.
5. Repetir a 390 px y usando Tab, Enter y Escape. Revisar que **Editar** se indique como próximo, hasta integrar SC-4.

## Evidencia visual

Las capturas de escritorio del directorio usan ocho registros ficticios simulados exclusivamente para revisar el diseño; no son datos precargados de Supabase. Las capturas móviles de búsqueda y confirmación corresponden al registro ficticio temporal indicado arriba. La portada muestra siempre su ejemplo rotulado.

| Vista | Escritorio | Móvil |
| --- | --- | --- |
| Portada | [Portada](portada-escritorio.png) | [Portada móvil](portada-movil.png) |
| Directorio | [Clientes](clientes-escritorio.png) | [Búsqueda móvil](clientes-movil.png) |
| Crear | [Formulario](crear-escritorio.png) | [Formulario móvil](crear-movil.png) |
| Navegación | Visible en el directorio | [Menú expandido](navegacion-movil.png) |
| Eliminar | Diálogo compartido | [Confirmación](eliminar-movil.png) |
| Sin registros | [Vacío](vacio-escritorio.png) | Mismo contenido adaptable |
| Error de lectura | [Error](error-escritorio.png) | Mismo contenido adaptable |
| Sin coincidencias | [Búsqueda vacía](sin-resultados-escritorio.png) | Mismo contenido adaptable |
| Texto largo | Ajuste de columnas | [Sin desbordamiento](contenido-largo-movil.png) |

## Decisiones y límites

La búsqueda carga la colección de demostración en lotes de hasta 500 y filtra antes de paginar de diez en diez. Evita truncar resultados al límite de la API, pero no está pensada para grandes volúmenes: en ese caso correspondería búsqueda y paginación en el servidor. No hay migraciones, cambios de permisos ni dependencias nuevas. Se conservan los tokens de color y la fuente Manrope.

El PR se revisa hacia main. La implementación en una rama no actualiza el sitio general de pruebas hasta su integración; producción requiere un pase separado.
