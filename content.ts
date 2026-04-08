// --- Estructura Y.Doc ---
export const CODE_YDOC_STRUCTURE = `Y.Doc {
  // Jerarquía del documento
  pages: Y.Array<Y.Map> [
    {
      id: 'page-uuid-1',
      title: Y.Text('Introducción'),
      boxes: Y.Array<Y.Map> [ ... ]
    }
  ],
  
  // Metadatos de assets (NO el blob)
  assets: Y.Map {
    'asset-uuid-1': {
      filename: 'photo.jpg',
      mimeType: 'image/jpeg',
      size: 145234,
      hash: 'sha256:abc123...'
    }
  }
}`;

// --- Modos de ejecución ---
export const RUNTIME_MODES = [
  {
    name: 'Server (Online)',
    color: 'blue',
    features: [
      'API REST + WebSocket colaborativo',
      'Multi-usuario con autenticación',
      'Base de datos (SQLite / PG / MySQL)',
      'Assets coordinados entre pares',
    ],
    deploy: 'docker run exelearning/exelearning',
    icon: 'server',
    description: 'Instalación multiusuario con colaboración en tiempo real, persistencia en servidor y gestión centralizada.',
  },
  {
    name: 'Static (Offline)',
    color: 'green',
    features: [
      'Sin servidor ni base de datos',
      'Persistencia local con IndexedDB',
      'Catálogo de iDevices y estilos integrado',
      'Exportar/importar ficheros .elp / .elpx',
    ],
    deploy: 'make build-static',
    icon: 'harddrive',
    description: 'Editor completamente funcional sin backend. Ideal para uso individual o empaquetado de escritorio.',
  },
  {
    name: 'Embebido (iframe)',
    color: 'purple',
    features: [
      'Integrable en cualquier plataforma web',
      'postMessage API (OPEN / SAVE)',
      'Compatible con modo Online y Static',
      'WordPress, Moodle, Omeka S y más',
    ],
    deploy: '<iframe src="…/exelearning/" />',
    icon: 'layers',
    description: 'Se incrusta en CMS/LMS externos. La plataforma anfitriona gestiona la persistencia del documento.',
  },
  {
    name: 'Escritorio (Electron)',
    color: 'cyan',
    features: [
      'Instaladores para Windows, macOS y Linux',
      'Modo static integrado (sin servidor)',
      'Actualizaciones automáticas',
      'Firma y notarización de binarios',
    ],
    deploy: 'npm run electron:pack',
    icon: 'monitor',
    description: 'Aplicación de escritorio con acceso local a archivos y experiencia nativa.',
  },
];

// --- Flujo de sincronización ---
export const FLOW_SYNC_STEPS = [
  {
    title: "Edición Local",
    description: "El usuario edita contenido en el editor (TinyMCE, etc).",
    details: [
      "Y.Doc se actualiza en memoria (RAM del navegador)",
      "Cambios persistidos en IndexedDB automáticamente",
      "Undo/Redo local inmediato",
    ],
    actor: "Client" as const,
  },
  {
    title: "Propagación vía WebSocket",
    description: "En modo online, el cliente envía deltas binarios Yjs al servidor.",
    details: [
      "WebSocketProvider emite actualizaciones binarias",
      "Optimización por lotes (batch de updates)",
    ],
    actor: "Client" as const,
  },
  {
    title: "Relay sin estado",
    description: "El servidor reenvía el mensaje binario a otros clientes de la misma sala sin decodificarlo.",
    details: [
      "Servidor NO interpreta ni almacena el Y.Doc en memoria",
      "Broadcasting a sala 'project-{uuid}'",
      "Redis opcional para coordinación multi-instancia",
    ],
    actor: "Server" as const,
  },
  {
    title: "Merge automático (CRDT)",
    description: "Los demás clientes reciben el delta y lo aplican. Yjs garantiza convergencia sin conflictos.",
    details: [
      "Y.applyUpdate(update) resuelve conflictos automáticamente",
      "Cada cliente converge al mismo estado final",
      "La UI se actualiza instantáneamente",
    ],
    actor: "Client" as const,
  },
];

// --- Flujo de assets ---
export const FLOW_ASSET_STEPS = [
  {
    title: "Referencia en el documento",
    description: "El documento Yjs solo almacena metadatos del asset (hash SHA-256, nombre, tipo MIME, tamaño).",
    details: [
      "Los binarios nunca viajan por el canal de sincronización Yjs",
      "Content-addressable: mismo contenido = mismo ID global",
    ],
    actor: "Client" as const,
  },
  {
    title: "Coordinación P2P",
    description: "El servidor coordina qué cliente posee cada asset y enruta solicitudes entre pares.",
    details: [
      "Protocolo de awareness para presencia de assets",
      "Sistema de prioridades: CRITICAL > HIGH > MEDIUM > LOW",
      "Batching inteligente según prioridad",
    ],
    actor: "Server" as const,
  },
  {
    title: "Transferencia bajo demanda",
    description: "Los assets se descargan solo cuando se necesitan, via REST API o desde el paquete local.",
    details: [
      "Online: POST /api/assets/upload — GET /api/assets/:id",
      "Static: resuelto desde el paquete .elpx local",
      "Respuestas HTTP cacheables",
    ],
    actor: "Server" as const,
  },
  {
    title: "Cache local persistente",
    description: "El asset se almacena en IndexedDB para reutilización offline.",
    details: [
      "IndexedDB: store exelearning-assets-v2",
      "Reutilización en sesiones posteriores sin conexión",
      "Renderizado directo via Blob/Object URL",
    ],
    actor: "Client" as const,
  },
];

// --- Ecosistema de integraciones ---
export const INTEGRATIONS = [
  {
    name: 'WordPress',
    plugin: 'wp-exelearning',
    color: 'blue',
    logoColor: '#21759B',
    type: 'Autocontenido',
    description: 'Plugin que permite subir, gestionar y editar contenidos eXeLearning directamente desde WordPress.',
    features: [
      'ELPX como tipo de media nativo',
      'Bloque Gutenberg + shortcode',
      'Editor embebido opcional (sin servidor externo)',
      'Extracción automática de paquetes ZIP',
    ],
    useCase: 'Sitios educativos, blogs docentes, instituciones pequeñas',
  },
  {
    name: 'Omeka S',
    plugin: 'omeka-s-exelearning',
    color: 'red',
    logoColor: '#B5271F',
    type: 'Autocontenido + API REST',
    description: 'Módulo que integra contenidos eXeLearning como objetos digitales catalogables en Omeka S.',
    features: [
      'ELPX como media item con metadatos Dublin Core',
      'API REST para carga/edición/guardado',
      'Proxy seguro con CSP + sandbox en iframe',
      'Editor instalable desde panel de administración',
    ],
    useCase: 'Museos, bibliotecas, archivos digitales, humanidades',
  },
  {
    name: 'Moodle (exeweb)',
    plugin: 'mod_exeweb',
    color: 'orange',
    logoColor: '#F98012',
    type: 'Editor remoto (iframe + JWT)',
    description: 'Módulo de actividad Moodle que conecta con una instancia de eXeLearning Online para crear paquetes web.',
    features: [
      'Edición en iframe con callbacks JWT (HMAC SHA-256)',
      'get_ode.php / set_ode.php para carga/guardado',
      'Validación de paquetes (ficheros obligatorios/prohibidos)',
      'Plantillas predefinidas para nuevas actividades',
    ],
    useCase: 'Instituciones educativas con Moodle y eXeLearning Online',
  },
  {
    name: 'Moodle (exescorm)',
    plugin: 'mod_exescorm',
    color: 'orange',
    logoColor: '#F98012',
    type: 'Editor remoto (iframe + JWT)',
    description: 'Igual que exeweb pero genera paquetes SCORM 1.2/2004, portables a cualquier LMS compatible.',
    features: [
      'Mismo flujo JWT que exeweb',
      'Salida en formato SCORM estándar',
      'Tracking de progreso del alumno integrado en Moodle',
      'Contenido exportable a Canvas, Blackboard y otros LMS',
    ],
    useCase: 'Interoperabilidad entre plataformas, estándares e-learning',
  },
];

// --- Formatos de exportación ---
export const EXPORT_FORMATS = [
  { name: 'HTML5', desc: 'Sitio web autónomo navegable', icon: '🌐' },
  { name: 'SCORM 1.2', desc: 'Estándar e-learning (legacy)', icon: '📦' },
  { name: 'SCORM 2004', desc: 'Estándar e-learning avanzado', icon: '📦' },
  { name: 'IMS CP', desc: 'IMS Content Package', icon: '📋' },
  { name: 'ePub3', desc: 'Libro electrónico para e-readers', icon: '📚' },
  { name: 'XLIFF', desc: 'Formato de traducción', icon: '🌍' },
  { name: 'ELPX', desc: 'Proyecto nativo eXeLearning 4.0', icon: '💾' },
];

// --- Métodos de autenticación ---
export const AUTH_METHODS = [
  { name: 'Contraseña local', desc: 'Email + password con bcrypt' },
  { name: 'CAS', desc: 'SSO institucional (universidades)' },
  { name: 'OpenID Connect', desc: 'Proveedor OIDC genérico' },
  { name: 'Invitado', desc: 'Acceso temporal sin registro' },
  { name: 'Sin autenticación', desc: 'Modo offline / static' },
];

// --- Mejoras clave de 4.0 ---
export const KEY_IMPROVEMENTS = [
  {
    title: 'Arquitectura browser-first',
    before: 'Servidor Python como fuente de verdad',
    after: 'El navegador es la autoridad primaria; el servidor es coordinador',
    why: 'Funciona offline, reduce latencia, escala horizontalmente',
  },
  {
    title: 'Colaboración en tiempo real',
    before: 'Edición individual sin colaboración',
    after: 'CRDTs (Yjs) con relay WebSocket sin estado',
    why: 'Múltiples usuarios editando simultáneamente sin conflictos',
  },
  {
    title: 'Assets content-addressable',
    before: 'Binarios incrustados en el documento',
    after: 'Separación documento/binarios con hash SHA-256',
    why: 'Documentos ligeros, deduplicación, transferencia bajo demanda',
  },
  {
    title: 'Múltiples modos de despliegue',
    before: 'Aplicación monolítica de escritorio (Python + Qt)',
    after: 'Server / Static / Embebido / Escritorio desde el mismo código',
    why: 'Se adapta a cada contexto: nube, offline, LMS, escritorio',
  },
  {
    title: 'Ecosistema de integraciones',
    before: 'Herramienta aislada, exportación manual',
    after: 'Plugins nativos para WordPress, Omeka S y Moodle',
    why: 'El contenido se crea, edita y publica donde ya trabaja el usuario',
  },
  {
    title: 'Stack moderno TypeScript/Bun',
    before: 'Python 2→3, Twisted, Firefox embebido',
    after: 'Bun + Elysia + Kysely + TypeScript end-to-end',
    why: 'Rendimiento, type-safety, ecosistema npm, testing moderno',
  },
];
