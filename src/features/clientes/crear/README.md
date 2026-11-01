# SC-2 · Crear cliente

Implementado por Roberto Umaña en `feature/SC-2-crear-cliente`.

`CrearCliente` se abre desde Crear en la portada. Valida nombre, correo y teléfono obligatorios, el formato del correo y los límites de la tabla. Recorta espacios exteriores y normaliza el correo a minúsculas. El teléfono admite prefijos internacionales y separadores; no se impone un formato nacional.

Usa `getSupabase()` y `DatosCliente`. Envía solo nombre, correo y teléfono mediante INSERT; nunca hace upsert ni envía id. La BD confirma la fila y detecta duplicados incluso con diferencias de mayúsculas o espacios. Los errores conservan los valores; el éxito limpia el formulario y ofrece ir al listado de SC-3.

`validarCliente.ts` contiene la validación y los mensajes seguros. `crear-cliente.css` reutiliza los tokens y limita los ajustes visuales a esta pantalla. No necesita migraciones ni dependencias nuevas.

Pruebas: `npm run check`. Evidencia y pasos manuales en [docs/evidencias/SC-2/README.md](../../../../docs/evidencias/SC-2/README.md). Usar exclusivamente datos ficticios y Supabase de desarrollo.
