---
name: Sincronía
description: Un directorio de clientes claro, tranquilo y conectado.
colors:
  surface: "#f8faf8"
  surface-raised: "#ffffff"
  ink: "#193b38"
  muted: "#536c65"
  accent: "#286b52"
  accent-soft: "#e0edc9"
  accent-line: "#adc7b5"
  line: "#d6dfd8"
  danger: "#b32d31"
typography:
  display: {"fontFamily": "'Manrope Variable', 'Manrope', sans-serif", "fontSize": "clamp(48px, 6.2vw, 80px)", "fontWeight": 400, "lineHeight": 1.08, "letterSpacing": "-.04em"}
  headline: {"fontFamily": "'Manrope Variable', 'Manrope', sans-serif", "fontSize": "52px", "fontWeight": 400, "lineHeight": 1.2, "letterSpacing": "-.03em"}
  section: {"fontFamily": "'Manrope Variable', 'Manrope', sans-serif", "fontSize": "28px", "fontWeight": 400, "lineHeight": 1.2, "letterSpacing": "-.03em"}
  title: {"fontFamily": "'Manrope Variable', 'Manrope', sans-serif", "fontSize": "24px", "fontWeight": 400, "lineHeight": 1.2, "letterSpacing": "-.03em"}
  body: {"fontFamily": "'Manrope Variable', 'Manrope', sans-serif", "fontSize": "16px", "fontWeight": 400, "lineHeight": 1.6}
  data: {"fontFamily": "'Manrope Variable', 'Manrope', sans-serif", "fontSize": "15px", "fontWeight": 400, "lineHeight": 1.6}
  label: {"fontFamily": "'Manrope Variable', 'Manrope', sans-serif", "fontSize": "14px", "fontWeight": 500, "lineHeight": 1.6}
  helper: {"fontFamily": "'Manrope Variable', 'Manrope', sans-serif", "fontSize": "13px", "fontWeight": 400, "lineHeight": 1.6}
  button: {"fontFamily": "'Manrope Variable', 'Manrope', sans-serif", "fontSize": "15px", "fontWeight": 500, "lineHeight": 1.5}
rounded:
  control: "8px"
  panel: "14px"
spacing:
  space-1: ".25rem"
  space-2: ".5rem"
  space-3: ".75rem"
  space-4: "1rem"
  space-6: "1.5rem"
  space-8: "2rem"
components:
  button-primary: {"backgroundColor": "{colors.accent}", "textColor": "{colors.surface-raised}", "typography": "{typography.button}", "rounded": "{rounded.control}", "padding": "11px 22px"}
  button-secondary: {"backgroundColor": "transparent", "textColor": "{colors.ink}", "typography": "{typography.button}", "rounded": "{rounded.control}", "padding": "11px 22px"}
  button-danger: {"backgroundColor": "{colors.danger}", "textColor": "{colors.surface-raised}", "typography": "{typography.button}", "rounded": "{rounded.control}", "padding": "11px 22px"}
  button-primary-hover: {"backgroundColor": "{colors.ink}"}
  button-secondary-hover: {"backgroundColor": "{colors.surface-raised}"}
  field: {"backgroundColor": "{colors.surface-raised}", "textColor": "{colors.ink}", "typography": "{typography.body}", "rounded": "{rounded.control}", "padding": "12px 16px"}
  search: {"backgroundColor": "{colors.surface-raised}", "textColor": "{colors.ink}", "typography": "{typography.body}", "rounded": "{rounded.control}", "padding": "11px 16px 11px 50px", "height": "48px"}
  nav-parent: {"backgroundColor": "{colors.accent-soft}", "textColor": "{colors.ink}", "rounded": "{rounded.control}"}
  data-panel: {"backgroundColor": "{colors.surface-raised}", "textColor": "{colors.ink}", "rounded": "{rounded.panel}", "padding": "32px"}
  row-popover: {"backgroundColor": "{colors.surface-raised}", "rounded": "{rounded.control}", "padding": "6px"}
  confirm-dialog: {"backgroundColor": "{colors.surface-raised}", "textColor": "{colors.ink}", "rounded": "{rounded.panel}", "padding": "32px", "width": "min(520px, calc(100% - 32px))"}
  data-table: {"backgroundColor": "{colors.surface-raised}", "textColor": "{colors.ink}", "typography": "{typography.data}", "width": "100%"}
---
# Design System: Sincronía

## Overview

**Creative North Star: "El directorio conectado"**

Sincronía presenta la gestión de clientes con una identidad tranquila: superficies casi blancas, tinta verde petróleo, un acento verde y Manrope autoalojada. El símbolo enlaza dos recorridos. Los títulos ligeros y el espacio entre grupos distinguen navegación, datos y acciones sin añadir decoración.

Las pantallas operativas comparten un directorio y su estructura de navegación. La interfaz usa español con voseo y mantiene visible que se trata de una demostración pública con datos ficticios.

**Key Characteristics:**

- Una paleta y una familia tipográfica para portada, directorio y formularios.
- Jerarquía por tamaño, espacio y superficies; títulos y datos ligeros.
- Controles con bordes suaves, iconos lineales y foco visible.
- Un directorio compartido que reorganiza sus filas en móvil.

Esta guía actualiza la base inicial con SC-9. La fuente ejecutable es `src/tokens.css`; las aplicaciones están en `src/styles.css` y `src/features/clientes/crear/crear-cliente.css`. El frontmatter refleja esos valores. El sidecar `.impeccable/design.json` añade ejemplos y metadatos; sus rampas OKLCH son muestras para el panel, no nuevos colores de la aplicación. La composición aprobada consta en [SC-9](docs/evidencias/SC-9/diseno.md). Leer también [PRODUCT.md](PRODUCT.md) y [AGENTS.md](AGENTS.md).

## Colors

Los nombres del frontmatter corresponden a las variables `--color-*`.

- **Primary:** `accent` es el verde de acciones, marca, foco y cursor; `accent-soft`, el fondo suave de navegación seleccionada, página actual y selección de texto; `accent-line`, el borde reforzado de acciones secundarias.
- **Neutral:** `surface` es el fondo general y de encabezados de tabla; `surface-raised`, el blanco de filas, campos, paneles y diálogo; `ink`, la tinta de títulos, nombres y texto principal; `muted`, el texto secundario; `line`, los bordes y divisores.
- **Semantic:** `danger` distingue eliminación, errores y campos inválidos. Texto y semántica acompañan al color.

**The Paleta compartida Rule.** Reutilizar las variables de src/tokens.css; un feature no introduce otra paleta ni cambia un token global para resolver un caso local.

## Typography

**Display Font / Body Font:** Manrope Variable, con Manrope y sans-serif como respaldo; usar la importación autoalojada existente. La amplitud y los títulos ligeros dan carácter; etiquetas y acciones usan peso medio.

- **Display:** titular de portada; la escala de escritorio del frontmatter pasa a (56 px) hasta (960 px) y a `clamp(36px, 9.4vw, 52px)` hasta (680 px), con interlineado (1.16) y espaciado (`-.035em`).
- **Headline:** título operativo; pasa a (44 px) hasta (1200 px) y a (38 px) hasta (680 px). **Section / Title:** títulos de ejemplo, vacíos y diálogo; el panel de formulario usa `title`. Los vacíos bajan a (24 px) en móvil.
- **Body / Data:** prosa y campos en el tamaño de cuerpo; tabla en el rol `data`, con (14 px) en móvil y cifras `tabular-nums`. Los encabezados de tabla usan (14 px), peso (450). Las descripciones operativas usan (18 px), reducidos a (16 px) desde el ancho medio.
- **Label / Button / Helper:** etiquetas y acciones distinguidas del texto auxiliar. El formulario conserva sus botones en (14 px); el CTA central usa (16 px). No heredar tamaños auxiliares para campos o datos.
- **Marca:** nombre en (25 px), peso (650), espaciado (`-.04em`), con variantes menores en móvil, muestra y pie.

**The Jerarquía ligera Rule.** Mantener un h1 por pantalla y h2/h3 por sección. Los encabezados base tienen peso (400); los nombres de funcionalidades de la portada son la excepción existente de peso (500).

## Layout

La escala declarada de espaciado corresponde a `--space-*`. Las distancias de cada composición no son reglas generales para todos los componentes.

- **Portada:** contenedor `min(1280px, 88%)`; a (680 px), márgenes de (24 px). La muestra divide navegación y directorio en (20 %) y el resto; oculta su navegación a (960 px). Las funcionalidades pasan de dos columnas a una a (680 px).
- **Área operativa:** barra lateral fija de (264 px), reducida a (230 px) a (1200 px). El contenido reserva ese mismo ancho; su relleno lateral es (46 px) a la izquierda y (36 px) a la derecha, y (32 px) por lado desde (1200 px).
- **Navegación móvil:** hasta (960 px), barra superior en el flujo, altura mínima (88 px), menú desplegable y contenido sin margen reservado. Hasta (680 px), relleno lateral de (24 px), cabecera apilada y búsqueda de ancho completo antes del recuento.
- **Tabla:** columnas de nombre, correo, teléfono y acciones en (24 %, 31 %, 25 %, 20 %); búsqueda de ancho `min(42%, 460px)`. Celdas con `overflow-wrap: anywhere` y filas de altura base (72 px) que crecen según contenido.
- **Filas móviles:** a (680 px), nombre destacado y campos verticales con etiquetas de (105 px). Se conserva la tabla semántica, caption y encabezados accesibles; no se crea otro listado.
- **Formulario / diálogo:** creación con máximo (42 rem); relleno de (32 px), reducido a (24 px) en móvil. En móvil se apilan las acciones del diálogo y Guardar cliente ocupa el ancho disponible.

La página declara un mínimo de (320 px). Verificar (390 px), (1440 px), puntos de cambio y texto largo sin desplazamiento horizontal.

## Elevation & Depth

No se usan sombras. Superficies blancas, divisores y capas nativas de popover y diálogo comunican profundidad. El fondo modal usa `rgb(25 59 56 / 48%)`.

**The Profundidad por superficie Rule.** Usar un borde o una división para agrupar información. Reservar el diálogo para una decisión que interrumpe la tarea; no añadir tarjetas decorativas ni sombras para aumentar jerarquía.

Los botones transicionan fondo y borde durante (160 ms) con `ease`. Las anclas permiten desplazamiento suave. `prefers-reduced-motion: reduce` desactiva animaciones, transiciones y desplazamiento suave.

## Shapes

Controles con radio `control`; paneles y diálogo con `panel`. Bordes de (1 px) en `line`; filas con divisiones horizontales, sin tarjetas individuales. `Icon` y `Arrow` usan SVG lineal, remates redondos y `currentColor`; `Icon` tiene viewBox (24 × 24), trazo (1.5) y tamaño base (22 px). La marca conserva sus dos recorridos enlazados. No reemplazar los SVG por emojis o glifos.

## Components

- **Botones:** reutilizar principal, secundario y destructivo. Base con mínimo (48 px) de altura y separación de (12 px). El principal pasa de `accent` a `ink`; el secundario refuerza fondo y borde. Deshabilitado: semántica nativa y opacidad (.55). Botones de icono (44 × 44 px); actualizar listado (36 × 36 px); paginación con mínimo (42 px). El CTA central de portada usa mínimo (242 × 54 px) y relleno horizontal (26 px), exclusivamente en esa superficie.
- **Foco:** contorno visible de (2 px) en `accent`, separado (4 px). Mantener Saltar al contenido y el foco al título al cambiar de vista.
- **Marca y navegación:** `Brand` enlaza al inicio; su variante compacta omite el descriptor. `App` comparte estructura, ruta y aviso de demo. Clientes enlaza al directorio; un botón separado expande Nuevo cliente. Usar `aria-current`, `aria-expanded` y `aria-controls`. Escape cierra la navegación móvil y devuelve el foco al botón.
- **Campos:** blancos, con etiqueta visible, mínimo (48 px) y foco compartido. El placeholder complementa la etiqueta. Errores asociados mediante `aria-describedby` y `aria-invalid`; foco al primer campo inválido. Guardar bloquea el doble envío, deshabilita el grupo mientras espera y confirma éxito solo después de la operación.
- **Búsqueda:** al escribir desde tres caracteres por nombre, correo o teléfono; aplica a la colección cargada antes de paginar en grupos de diez. La ayuda muestra el umbral. Cambiar consulta vuelve a la primera página; limpiar devuelve el foco al buscador.
- **Directorio:** `ListarClientes` integra recuento real con singular/plural, actualización, búsqueda, tabla, paginación y acciones. Mantener carga estática, error con Reintentar, vacío con Nuevo cliente y búsqueda vacía con Limpiar búsqueda. Usar `role="status"`, `role="alert"` y `aria-busy` según el estado.
- **Acciones de fila:** `AccionesCliente` abre un popover nativo para eliminar, con etiqueta que identifica al registro. Enfoca la acción y ajusta posición a la ventana. **Editar está deshabilitado y marcado como próximo: SC-4 no está implementada.** Al integrarla, reutilizar este componente y el directorio.
- **Confirmación:** `ConfirmarEliminarCliente` usa `dialog` modal con nombre y correo, Cancelar con foco inicial y Sí, eliminar visible. Durante la petición bloquea acciones y Escape; el error queda en el diálogo. Cancelar devuelve el foco al disparador; eliminar lo lleva al buscador y anuncia el resultado. Permitir textos largos.
- **Portada:** Ingresar abre `#clientes`; Nuevo cliente, `#clientes/nuevo`. La muestra contiene tres ejemplos fijos rotulados como ficticios y separados de los datos del directorio. Crear, consultar y eliminar están integrados; actualizar se presenta como próximo.

## Do's and Don'ts

### Do:

- Do reutilizar paleta, Manrope autoalojada, Brand, Icon, directorio y navegación compartida.
- Do mantener etiquetas, semántica HTML, foco de teclado y mensajes vinculados al resultado real.
- Do verificar escritorio, móvil, teclado, texto largo y estados de carga, vacío, búsqueda sin resultados y error.
- Do conservar voseo y la advertencia de usar datos ficticios; documentar patrones nuevos y justificar cambios de tokens en el PR.

### Don't:

- Don't introducir otra identidad, framework visual, fuente externa, listado o navegación paralela para una historia.
- Don't presentar funciones pendientes como disponibles, inventar estadísticas o confundir la muestra de portada con la base de datos.
- Don't depender solo del color, placeholder o animación, ni truncar contactos por comodidad visual.
