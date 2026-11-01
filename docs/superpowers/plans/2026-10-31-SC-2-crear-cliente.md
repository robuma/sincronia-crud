# SC-2 Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Crear clientes desde una pantalla coherente con Sincronía, cumpliendo SC-2.
**Architecture:** Componente React dentro de crear, validación pura y persistencia con el cliente Supabase compartido. Integración mínima en App.
**Tech Stack:** React, TypeScript, Vite, Supabase JS; sin dependencias nuevas.
**Spec:** `docs/superpowers/specs/2026-10-31-SC-2-crear-cliente-design.md`

## Global Constraints

- Solo SC-2; respetar AGENTS.md, DESIGN.md y datos ficticios.
- No enviar id, cambiar RLS ni usar producción en pruebas.
- PR hacia main, revisión humana antes de integrar.

## Review Focus

- Correo duplicado con mayúsculas/espacios: error junto al correo, sin sobrescribir.
- Respuesta lenta: un solo envío y ningún éxito anticipado.
- Error de red: conservar valores, permitir recuperación y no reintentar automáticamente.
- Respuesta sin fila: no anunciar éxito.
- Teclado y móvil: foco útil, errores asociados y sin desbordamiento.

### Task 1: Formulario completo y verificación

**Files:** crear/validarCliente.ts, crear/CrearCliente.tsx, crear/crear-cliente.css, crear/README.md, tests/crear-cliente.test.ts, src/App.tsx.
**Interfaces:** `prepararCliente(DatosCliente)` devuelve datos normalizados y errores por campo. `errorAlCrearCliente(unknown)` devuelve mensaje seguro y campo opcional. `CrearCliente({ onVerClientes })` presenta el formulario y confirma la inserción.

- [x] Escribir pruebas de entradas vacías, formato de correo, límites, normalización, exclusión de id y clasificación de errores. Ejecutar y observar fallos antes de implementar.
- [x] Implementar los helpers y ejecutar las pruebas.
- [x] Añadir formulario accesible y entrada desde App, usando insert/select/single y bloqueo del envío. Documentar la historia.
- [x] Verificar en navegador errores, éxito, duplicado, listado, teclado, móvil y red lenta/fallida; limpiar solo los datos ficticios de esta prueba.
- [x] Ejecutar npm run check y revisar el diff con un revisor independiente.
- [x] Registrar evidencia, commit SC-2, push de la rama y [PR #5 hacia main](https://github.com/robuma/sincronia-crud/pull/5). Jira permanece En progreso hasta la revisión e integración.
