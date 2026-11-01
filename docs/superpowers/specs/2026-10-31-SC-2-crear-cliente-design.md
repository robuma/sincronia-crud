# SC-2 · Crear cliente

Alcance autorizado: implementar la historia de Roberto en `feature/SC-2-crear-cliente`, siguiendo `DESIGN.md` y los tres criterios de aceptación de Jira.

## Enfoque

Una pantalla propia, accesible desde Crear en la portada, sigue la navegación existente de Consultar y Eliminar. Un formulario integrado en la portada o un modal añadirían un patrón diferente sin necesidad. Se reutilizan los tokens, botones, campos y paneles existentes, con estilos adicionales limitados al formulario.

Nombre, correo electrónico y teléfono son obligatorios. Se recortan espacios exteriores; el correo se guarda en minúsculas. Se validan formato de correo y límites de la tabla (120, 254 y 40 caracteres). Los errores se asocian al campo y el foco va al primero inválido. Se conservan los valores cuando hay un error.

El guardado usa `getSupabase()` y envía exclusivamente `nombre`, `correo`, `telefono`. La BD genera el ID y decide la unicidad del correo. Se espera la fila confirmada antes de anunciar éxito. Durante la petición, los campos y el envío quedan bloqueados. No se reintentan escrituras automáticamente. Un fallo de conexión conserva los valores y explica que conviene revisar el listado antes de reintentar.

Después de guardar se muestra la confirmación, se limpia el formulario y se ofrece Ver clientes, reutilizando el listado de José. El formulario permite crear otro registro. Una pantalla en blanco o con errores no comunica éxito.

## Límites y comprobación

Solo SC-2. Sin nuevas dependencias, migraciones, login ni cambios de identidad. Supabase de desarrollo y datos ficticios para las pruebas; conservar los registros ajenos. Probar validación, correo duplicado, error de red, envío pendiente/doble envío, persistencia en el listado, teclado y vistas de 390 y 1440 px. Abrir PR hacia main; la revisión de un compañero sigue siendo necesaria.
