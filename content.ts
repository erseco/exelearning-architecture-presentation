// Pin evidence to the source revisions reviewed for this presentation.
const core =
  "https://github.com/exelearning/exelearning/blob/102d7d1cb3ae278a6025f1bf6c865713e622a37b/";
export const SOURCES = {
  stack: { label: "Tecnologías y compilación", url: core + "package.json" },
  ui: {
    label: "Interfaz del editor",
    url: core + "views/workarea/workarea.njk",
  },
  document: {
    label: "Modelo Yjs",
    url: core + "public/app/yjs/YjsDocumentManager.js",
  },
  assets: {
    label: "Almacenamiento de archivos",
    url: core + "public/app/yjs/AssetManager.js",
  },
  relay: {
    label: "Relé WebSocket",
    url: core + "src/websocket/yjs-websocket.ts",
  },
  persistence: {
    label: "Persistencia del servidor",
    url: core + "src/websocket/yjs-persistence.ts",
  },
  autosave: {
    label: "Autoguardado colaborativo",
    url: core + "public/app/yjs/CollaborativeAutosaveManager.js",
  },
  embedding: {
    label: "Protocolo de integración",
    url: core + "doc/development/embedding.md",
  },
  desktop: { label: "Aplicación de escritorio", url: core + "app/main.js" },
  database: {
    label: "Acceso a bases de datos",
    url: core + "src/db/dialect.ts",
  },
};
export const MOODLE = [
  {
    name: "mod_exeweb",
    title: "Publicación web",
    description:
      "Crear y editar recursos con la navegación web de eXeLearning.",
    grading: "Sin calificación de ejercicios",
    editor: "Online remoto o integrado",
    url: "https://github.com/exelearning/mod_exeweb/tree/2c386fb8685f502c44ce22d127f70e7143e4359c",
  },
  {
    name: "mod_exescorm",
    title: "Actividad SCORM",
    description:
      "Crear y editar paquetes con reproducción y seguimiento SCORM.",
    grading: "Calificación agregada",
    editor: "Online remoto o integrado",
    url: "https://github.com/exelearning/mod_exescorm/tree/8ef47fa4b75a533585b08ca8d7d463031f70e7a3",
  },
  {
    name: "mod_exelearning",
    title: "Evaluación por iDevice",
    description:
      "Conservar la navegación nativa del ELPX e integrar su evaluación.",
    grading: "Global o por iDevice evaluable",
    editor: "Editor integrado",
    url: "https://github.com/exelearning/moodle-mod_exelearning/tree/3b6a7cd45ca9b762189d5e7ebc8f953c4d939023",
  },
];
export const PLATFORMS = [
  {
    name: "WordPress",
    code: "wp-exelearning",
    purpose: "Publicar en la web",
    stack: "PHP · JavaScript · REST API · Gutenberg",
    detail:
      "Biblioteca multimedia, editor embebido y publicación mediante bloque o shortcode.",
    storage: "El servidor extrae y gestiona el contenido.",
    url: "https://github.com/exelearning/wp-exelearning/tree/a770a75a22cbb7096b4a9e64f7864c1e9bdb5a25",
  },
  {
    name: "Omeka S",
    code: "omeka-s-exelearning",
    purpose: "Catalogar recursos",
    stack: "PHP · Laminas · JavaScript",
    detail:
      "Contenido asociado a ítems y medios, edición embebida y entrega mediante proxy.",
    storage: "El servidor extrae y gestiona el contenido.",
    url: "https://github.com/exelearning/omeka-s-exelearning/tree/8361c3a3876e57095fbaea321386c62af9a3c8c8",
  },
  {
    name: "Nextcloud",
    code: "nextcloud-exelearning",
    purpose: "Trabajar desde Files",
    stack: "PHP · TypeScript · Vue 3 · fflate",
    detail:
      "Visor y editor integrados en Files. Un Service Worker sirve los recursos del visor.",
    storage: "El visor descomprime el ZIP en el navegador.",
    url: "https://github.com/exelearning/nextcloud-exelearning/tree/99ed39c64b709e15f9e806ba6388359de4352270",
  },
];
export const TECHNOLOGIES = [
  [
    "Interfaz",
    "JavaScript · TinyMCE · Bootstrap · jQuery",
    "Edición de texto, actividades e interfaz",
  ],
  ["Documento", "Yjs · y-websocket", "Estado compartido y sincronización"],
  [
    "Almacenamiento local",
    "IndexedDB · Cache API",
    "Documento y archivos del navegador",
  ],
  [
    "Servicios online",
    "TypeScript · Bun · Elysia",
    "API HTTP, autenticación y WebSocket",
  ],
  [
    "Persistencia",
    "Kysely · SQLite / PostgreSQL / MySQL",
    "Consultas SQL tipadas y datos del proyecto",
  ],
  [
    "Plantillas y escritorio",
    "Nunjucks · Electron",
    "Páginas de la aplicación y empaquetado nativo",
  ],
];
