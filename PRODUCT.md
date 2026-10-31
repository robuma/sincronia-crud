# Sincronía

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React, Vite y TypeScript. Supabase para PostgreSQL y API. Vercel para publicación. React, Supabase y Vercel fueron elegidos por el equipo; Vite y TypeScript son decisiones de la preparación técnica.

## Users

Equipo de cuatro estudiantes del curso PF-3872 Metodologías Ágiles de la Universidad de Costa Rica y personas que evalúen su demostración.

## Product Purpose

Demostrar un CRUD sencillo de clientes y un proceso de desarrollo colaborativo con ramas, revisiones y pases controlados.

## Capabilities and Constraints

El cliente tiene identificador, nombre, correo y teléfono. Roberto desarrolla crear (SC-2), José listar (SC-3), Sebastián editar (SC-4) y Darío eliminar (SC-5). Esta base solo implementa la portada y las integraciones; las operaciones pertenecen a las historias del equipo. La demo será pública, sin login y exclusivamente con datos ficticios, según decisión del equipo. Hay una BD nueva de desarrollo y una de producción. No modificar proyectos existentes de Vercel o Supabase.

## Brand Commitments

Nombre: Sincronía. Idioma: español. Se solicitó una portada moderna y sencilla; la prioridad es habilitar el trabajo del equipo.

## Operating Context

Repositorio público robuma/sincronia-crud. Historias SC-2 a SC-5 en codefive.atlassian.net. Pull Requests de features hacia main protegida; production se reserva para pases aprobados.

## Evidence on Hand

Existen cuatro historias asignadas. Todavía no hay clientes reales, estadísticas de uso ni operaciones CRUD implementadas. No inventar métricas, testimonios o integraciones comprobadas.

## Product Principles

- Mantener un alcance pequeño, comprensible por los cuatro integrantes.
- Cada historia implementa una operación completa y conserva la identidad visual compartida.
- Distinguir claramente una operación disponible de una que está en preparación.
- Usar exclusivamente datos ficticios en esta demostración pública.
