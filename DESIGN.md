# Diseño compartido de Sincronía

Esta guía es la autoridad visual de la aplicación. Los cuatro features amplían el mismo sistema; cada historia no introduce una identidad nueva. Leer también PRODUCT.md y AGENTS.md.

## Dirección

Interfaz clara, tranquila y moderna para gestión de clientes. Superficie casi blanca, tinta verde petróleo, un acento verde y amplios espacios. Tipografía Manrope autoalojada. La portada presenta Sincronía y marca los módulos como próximos; no muestra datos ni acciones ficticias. La geometría de la marca enlaza dos recorridos y representa información conectada.

## Tokens y autoridad en código

La fuente ejecutable es `src/tokens.css`; las reglas compartidas están en `src/styles.css`. Reutilizar variables existentes antes de agregar otras. Cualquier cambio de un token afecta todos los módulos y debe justificarse en el PR.

| Uso | Variable | Valor inicial |
| --- | --- | --- |
| Fondo general | `--color-surface` | `#f8faf8` |
| Superficie elevada | `--color-surface-raised` | `#ffffff` |
| Texto principal | `--color-ink` | `#193b38` |
| Texto secundario | `--color-muted` | `#536c65` |
| Acción / acento | `--color-accent` | `#286b52` |
| Acento suave | `--color-accent-soft` | `#e0edc9` |
| Bordes | `--color-line` | `#d6dfd8` |
| Error / acción destructiva | `--color-danger` | `#b32d31` |

## Tipografía y composición

- Usar `--font-sans` en toda la aplicación; no añadir fuentes externas.
- Una sola jerarquía de encabezados: h1 por pantalla y h2/h3 por sección.
- Texto de formularios y tablas legible; tamaño mínimo recomendado de 14 px en pantallas operativas.
- Usar la escala de espaciado de tokens y alinear etiquetas, campos y acciones.
- Radio de controles de 8 px; paneles de 14 px. Evitar sombras y tarjetas adicionales si una división simple basta.
- La portada informativa puede usar texto auxiliar pequeño; no heredar esos tamaños para datos y campos del CRUD.

## Componentes y estados

- `Brand` conserva el nombre, símbolo y vínculo al inicio. `Arrow` usa la misma geometría de trazo.
- Reutilizar `.button`, `.button--primary`, `.button--secondary` y `.button--danger`.
- Reutilizar `.form-field`, `.field-error` y `.data-table`. Si hace falta un componente compartido, crearlo en `src/components/` y documentarlo aquí.
- Cada operación real debe contemplar carga, error, vacío, éxito y doble envío. No implementar estados de éxito sin confirmación de Supabase.
- Eliminar siempre solicita confirmación y permite cancelar.
- Un botón de operación disponible actúa; un módulo en preparación se presenta como contenido informativo.

## Idioma y accesibilidad

- Interfaz y mensajes en español. Reutilizar los términos Cliente, Nombre, Correo electrónico y Teléfono.
- Etiquetas visibles para los campos; errores asociados al campo y mensajes anunciados cuando corresponda.
- Navegación con teclado, foco visible, controles semánticos y contraste WCAG AA.
- Comprobar a 390 px y a 1440 px; no producir desplazamiento horizontal.
- Respetar `prefers-reduced-motion`; la información no depende de animación o color.
- Usar SVG coherente para iconos. No usar emojis como iconos de interfaz.

## Límites

No agregar otro framework visual, otra paleta, estilos inline repetidos o un rediseño por feature. No modificar la portada o tokens globales salvo que la historia lo necesite y el PR lo explique. La única información de ambiente en la interfaz debe ayudar a la persona usuaria; las instrucciones técnicas pertenecen a la documentación.
