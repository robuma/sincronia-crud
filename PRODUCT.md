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

El cliente tiene identificador, nombre, correo y teléfono. Roberto desarrolla crear (SC-2), José listar (SC-3), Sebastián editar (SC-4) y Darío eliminar (SC-5). Crear, consultar y eliminar están integrados; editar sigue pendiente de SC-4. SC-9, asignada a Roberto, rediseña la portada y reúne las operaciones existentes en un directorio con búsqueda por nombre, correo o teléfono desde tres caracteres. La demo es pública, sin login y exclusivamente con datos ficticios, según decisión del equipo. Hay una BD de desarrollo y una de producción. No modificar otros proyectos de Vercel o Supabase.

## Brand Commitments

Nombre: Sincronía. Idioma: español, con voseo consistente. La identidad conserva la paleta verde y Manrope autoalojada. Para SC-9 el usuario aprobó una portada sencilla, centrada en gestión de clientes, y un sistema de estilo SaaS con tipografía ligera y más espacio. Ingresar conduce desde la portada al directorio; Nuevo cliente aparece como opción hija de Clientes. Las maquetas aprobadas y su dirección se describen en docs/evidencias/SC-9/diseno.md.

## Operating Context

Repositorio público robuma/sincronia-crud. Historias SC-2 a SC-5 en codefive.atlassian.net. Pull Requests de features hacia main protegida; production se reserva para pases aprobados.

## Evidence on Hand

Existen cuatro historias CRUD asignadas y SC-9 para rediseño y búsqueda. Crear, consultar y eliminar tienen implementación; editar se presenta como próximo. La portada incluye tres registros ilustrativos rotulados como ficticios, separados de los datos de Supabase. El recuento del directorio proviene de sus registros. No hay evidencia de clientes reales, estadísticas de adopción ni testimonios; no inventarlos.

## Product Principles

- Mantener un alcance pequeño, comprensible por los cuatro integrantes.
- Cada historia implementa una operación completa y conserva la identidad visual compartida.
- Distinguir claramente una operación disponible de una que está en preparación.
- Usar exclusivamente datos ficticios en esta demostración pública.
