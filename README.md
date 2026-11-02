# Sincronía · Gestión de clientes

Proyecto académico PF-3872 de la Universidad de Costa Rica. Incluye una portada informativa y un directorio de clientes con React + Vite + TypeScript, Supabase y comprobaciones automáticas. Están integrados crear, consultar y eliminar; editar corresponde a SC-4 y se identifica como próximo.

[Producción](https://sincronia-crud.vercel.app) · [Pruebas de main](https://sincronia-crud-test.vercel.app) · [Tarea de rediseño](https://codefive.atlassian.net/browse/SC-9)

El sitio de pruebas general muestra lo integrado en main. Cada PR tiene su propio Preview; los cambios de una rama todavía en revisión se ven allí. Producción recibe únicamente los pases aprobados hacia production.

**Demo pública sin login: usar exclusivamente datos ficticios.** Cualquier visitante puede consultar y modificar los registros.

## Empezar

Instalar Node 24 (ver `.nvmrc`) y Git:

```bash
git clone https://github.com/robuma/sincronia-crud.git
cd sincronia-crud
npm ci
cp .env.example .env.local
npm run dev
```

Abrir la dirección que indique Vite. `.env.example` contiene la URL y la clave **publicable** de desarrollo; no hace falta compartir contraseñas de Supabase. La portada funciona sin variables; las operaciones del directorio necesitan esta configuración.

La portada está en `/`; **Ingresar** abre `/#clientes` y **Nuevo cliente**, `/#clientes/nuevo`. Se pueden abrir y recargar estos enlaces directamente.

## Equipo e historias

| Participante | Historia | Rama sugerida | Carpeta |
| --- | --- | --- | --- |
| Roberto Umaña | [SC-2 Crear cliente](https://codefive.atlassian.net/browse/SC-2) | `feature/SC-2-crear-cliente` | `src/features/clientes/crear/` |
| José Rojas | [SC-3 Listar clientes](https://codefive.atlassian.net/browse/SC-3) | `feature/SC-3-listar-clientes` | `src/features/clientes/consultar/` |
| Sebastián Vargas | [SC-4 Editar cliente](https://codefive.atlassian.net/browse/SC-4) | `feature/SC-4-editar-cliente` | `src/features/clientes/editar/` |
| Darío Zamora | [SC-5 Eliminar cliente](https://codefive.atlassian.net/browse/SC-5) | `feature/SC-5-eliminar-cliente` | `src/features/clientes/eliminar/` |

Cada persona implementa su historia, prueba y abre un PR hacia main para revisión de otro integrante. Jira conserva una historia principal por persona, sin subtareas. Incluir la clave SC en rama, commits y PR para vincular el desarrollo.

[SC-9](https://codefive.atlassian.net/browse/SC-9), asignada a Roberto, integra el rediseño de portada y directorio y la búsqueda por nombre, correo o teléfono. Su rama es `feature/SC-9-redisenar-interfaz`; conserva las operaciones de las historias anteriores.

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/SC-2-crear-cliente
# Hacer el trabajo y comprobarlo
npm run check
git add <archivos-de-tu-historia>
git commit -m "SC-2: crear cliente con validaciones"
git push -u origin feature/SC-2-crear-cliente
```

Cambiar SC-2 según la asignación. El agente ayuda a su integrante; no desarrolla las cuatro historias ni atribuye commits a otra persona.

## Documentos para personas y agentes

- [AGENTS.md](AGENTS.md): alcance, arquitectura, datos y reglas de colaboración.
- [DESIGN.md](DESIGN.md): paleta, tipografía, componentes, accesibilidad y móvil.
- [PRODUCT.md](PRODUCT.md): propósito y decisiones del producto.
- [Ambientes](docs/ambientes.md): desarrollo, producción, pase y reversión.
- [Base de datos](database/README.md): esquema, permisos y migraciones.

Al iniciar con otro agente: **«Leé AGENTS.md, README.md, PRODUCT.md y DESIGN.md; trabajemos únicamente mi historia SC-X»**. Algunas herramientas cargan AGENTS.md automáticamente; en otras hay que solicitar su lectura.

## Estructura

```text
src/
  components/             Componentes reutilizables
  features/clientes/      Tipos y una carpeta por operación
  lib/config.ts           Validación de ambiente y proyecto Supabase
  lib/supabase.ts         getSupabase(): cliente único y tipado
  types/database.ts       Tipos generados desde el esquema
  tokens.css              Variables de diseño
  styles.css              Patrones y estilos compartidos
tests/                    Configuración, validación, búsqueda y paginación
database/migrations/      SQL fuente versionado
.github/workflows/ci.yml   Calidad, compilación y pruebas
```

Usar `getSupabase()` y los tipos `Cliente` / `DatosCliente`. La tabla `clientes` tiene `id`, `nombre`, `correo` y `telefono`; la BD genera el identificador.

La búsqueda empieza con tres caracteres, ignora mayúsculas y tildes, admite teléfonos sin separadores y se aplica antes de paginar. El directorio obtiene todos los registros de la demo en lotes de hasta 500 para no truncarlos al límite de la API. Esta estrategia mantiene sencilla la demostración; para volúmenes grandes se debe trasladar búsqueda y paginación al servidor.

`ListarClientes` integra consulta y acciones; `ConfirmarEliminarCliente` conserva la operación de SC-5. `EliminarClientes` mantiene una exportación compatible. La portada muestra tres ejemplos ficticios identificados; el directorio usa los datos de Supabase. [Evidencia y pruebas de SC-9](docs/evidencias/SC-9/README.md).

## Comprobaciones

| Comando | Función |
| --- | --- |
| `npm run dev` | Servidor local |
| `npm run check` | Revisión estática, tipos, compilación y pruebas |
| `npm run check:db` | Lectura mínima de desarrollo, sin cambiar registros |
| `npm run build` | Compilar a dist/ |
| `npm run preview` | Revisar la compilación localmente |

GitHub Actions ejecuta `npm run check` en los PR. Cada historia añade sus comprobaciones funcionales y evidencia visual. El enunciado también exige demostrar revisión, conflicto resuelto, publicación, versión y reversión; la base no sustituye esas evidencias del equipo.

No subir `.env.local`, claves secretas, contraseñas ni tokens. Las variables `VITE_*` son visibles en el navegador. Usar los recursos Free/Hobby existentes para este proyecto sin contratar ampliaciones.
