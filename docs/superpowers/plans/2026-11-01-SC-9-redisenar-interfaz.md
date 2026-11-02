# SC-9 · Rediseño y búsqueda de clientes

Objetivo: implementar las maquetas aprobadas y los criterios de SC-9. Ejecución nativa en esta rama; revisión independiente antes del PR. La implementación fue solicitada explícitamente después de aprobar la dirección visual.

Arquitectura: conservar React, Manrope, getSupabase y el modelo Cliente. Separar portada y navegación del directorio. Cargar la colección de demostración en lotes ordenados para no truncar al límite de la API; filtrar localmente antes de paginar. Sin dependencias nuevas ni migraciones. Extraer la confirmación de SC-5 a un componente reutilizable; conservar crear y no implementar editar (SC-4).

- [x] Añadir pruebas del mínimo de 3 caracteres, nombre/correo/teléfono, limpieza y búsqueda previa a paginación; comprobar carga de varios lotes y error parcial.
- [x] Implementar lectura completa y filtro en consultar; estado de carga/error/colección vacía/sin coincidencias, recarga y paginación estable.
- [x] Implementar portada, shell con navegación por hash y submenú, tabla y confirmación reutilizada. Mantener Editar marcado como próximo. Conservar las validaciones de crear.
- [x] Aplicar diseño aprobado: tipografía 400, espacios amplios, dos columnas de funcionalidades, paleta existente, menú móvil y tabla adaptable.
- [x] Ejecutar npm run check y comprobar teclado, móvil, navegación, búsqueda, errores y crear/eliminar un registro ficticio propio en desarrollo. Eliminar el dato de prueba.
- [ ] Adjuntar evidencia, revisión independiente, actualizar DESIGN.md/PRODUCT.md/README.md, abrir PR SC-9 hacia main y dejar Jira En progreso hasta revisión y merge.

## Review Focus

Colección mayor que un lote de API; término en otra página; normalización de tildes/teléfonos y caracteres especiales; respuesta tardía tras desmontaje; eliminación sin fila confirmada/doble envío; restauración del foco y menús fuera de la tabla; móvil y texto largo; nunca presentar SC-4 como implementada.
