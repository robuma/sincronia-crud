# Base de Sincronía Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Dejar una portada y una base compartida de React integrada con Supabase, GitHub, Jira y un proyecto nuevo de Vercel.

**Architecture:** SPA de React con Vite y TypeScript. Cliente Supabase compartido y validado por ambiente; cada feature tiene su propia carpeta. Preview usa desarrollo y Production usa la BD de producción.

**Tech Stack:** React, TypeScript, Vite, Supabase JS, Node 24, GitHub Actions, Vercel Hobby.

**Spec:** docs/superpowers/specs/2026-10-31-base-proyecto-design.md

## Global Constraints

- No implementar las historias CRUD.
- No modificar proyectos existentes de Vercel o Supabase.
- Usar exclusivamente recursos nuevos de costo $0 y clientes ficticios.
- Respetar PR y revisión de otro integrante para integrar en main.

## Review Focus

- Una configuración de desarrollo nunca debe aceptar la BD de producción.
- Una clave administrativa nunca debe llegar al cliente del navegador.
- La portada debe funcionar antes de configurar variables locales.
- Las acciones de la portada deben tener destino real o indicar su indisponibilidad.
- La publicación no debe modificar recursos de otros proyectos.

### Task 1: Portada y base local

**Files:** src/App.tsx, src/styles.css, src/components/*, src/lib/*, src/features/clientes/*, package.json, config de Vite y TypeScript.

**Interfaces:** getSupabase() devuelve el cliente tipado; readSupabaseConfig() valida ambiente, host y clave pública. Cliente tiene id, nombre, correo y telefono.

- [x] Escribir y ejecutar pruebas de configuración que fallen antes de implementar el validador (tests/config.test.ts).
- [x] Implementar validación, portada y estilos compartidos.
- [x] Ejecutar npm run check y verificar escritorio, móvil, anclas y teclado.

### Task 2: Datos e integraciones

**Files:** database/migrations/001_clientes.sql, src/types/database.ts, .env.example, docs/ambientes.md.

**Interfaces:** public.clientes en los dos proyectos nuevos; mismos nombres, restricciones y permisos de demo.

- [x] Verificar que los nuevos proyectos estén vacíos y aplicar el mismo SQL.
- [x] Generar tipos y configurar claves publicables por ambiente sin imprimirlas.
- [x] Verificar conectividad de las dos BD y documentar sus identificadores.

### Task 3: Entrega colaborativa

**Files:** README.md, AGENTS.md, DESIGN.md, .github/workflows/ci.yml y .github/pull_request_template.md.

**Interfaces:** main recibe PR de features; production recibe pases; CI produce un check requerido de compilación y calidad.

- [x] Documentar arranque, diseño, historias y revisión cruzada.
- [x] Crear y configurar solo el nuevo proyecto Vercel sin tocar los anteriores.
- [x] Publicar rama, crear PR y comprobar CI y despliegues.
- [x] Solicitar revisión independiente de la base y corregir hallazgos relevantes.

## Entrega

PR #2 pendiente de aprobación de otro integrante. Portada inicial publicada en sincronia-crud.vercel.app y Preview de la rama de preparación verificado. CI en Node 24 y 10 pruebas aprobadas. Se corrigió el hallazgo de validación previa al build y la revisión independiente no dejó hallazgos pendientes. No se integró el PR ni se eludieron protecciones; las ramas de features deben partir del main una vez aprobada esta preparación.
