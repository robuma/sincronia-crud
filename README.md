# Sincronía · Gestión de clientes

Sistema académico de gestión de clientes para el curso PF-3872 de la Universidad de Costa Rica. Permite crear, consultar, editar y eliminar clientes. Está desarrollado con React, TypeScript y Supabase.

## Acceso al sistema

- **Ambiente de pruebas:** [https://sincronia-crud-test.vercel.app](https://sincronia-crud-test.vercel.app)
- **Ambiente de producción:** [https://sincronia-crud.vercel.app](https://sincronia-crud.vercel.app)

El ambiente de pruebas muestra los cambios integrados en `main`. Producción muestra la versión publicada desde `production`.

**La aplicación es una demostración pública sin inicio de sesión. Utilizar únicamente datos ficticios.**

## Ejecutar el proyecto

Se requiere Git y Node.js 24. Ejecutar los siguientes comandos en una terminal:

```bash
git clone https://github.com/robuma/sincronia-crud.git
cd sincronia-crud
npm ci
cp .env.example .env.local
npm run dev
```

Abrir en el navegador la dirección que indique la terminal. El archivo `.env.example` contiene la configuración publicable de la base de datos de desarrollo. En Windows, se puede copiar y renombrar manualmente como `.env.local` si la terminal no admite `cp`.

Para ejecutar las comprobaciones del proyecto:

```bash
npm run check
```

## Equipo, historias y tareas

| Participante | Historias y tareas |
| --- | --- |
| Roberto Umaña Jiménez | [SC-2: Crear cliente](https://codefive.atlassian.net/browse/SC-2); [SC-8: Preparar la base técnica e integraciones](https://codefive.atlassian.net/browse/SC-8); [SC-9: Rediseñar la interfaz e incorporar búsqueda](https://codefive.atlassian.net/browse/SC-9) |
| José Rojas | [SC-3: Listar clientes](https://codefive.atlassian.net/browse/SC-3) |
| Sebastián Vargas | [SC-4: Editar datos de cliente](https://codefive.atlassian.net/browse/SC-4) |
| Darío Zamora | [SC-5: Eliminar cliente](https://codefive.atlassian.net/browse/SC-5) |
