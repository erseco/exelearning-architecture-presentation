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
    description: 'Instalación multiusuario con colaboración en tiempo real y persistencia centralizada.',
  },
  {
    name: 'Static (Offline)',
    color: 'green',
    features: [
      'Sin servidor ni base de datos',
      'Catálogo de iDevices y estilos integrado',
      'Exportar/importar ficheros .elp / .elpx',
    ],
    deploy: 'make build-static',
    icon: 'harddrive',
    description: 'Editor funcional sin backend ni persistencia local. Ideal para uso individual o empaquetado.',
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
    description: 'Se incrusta en CMS/LMS externos. La plataforma anfitriona gestiona la persistencia.',
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
    type: 'Subida + edición embebida',
    description: 'Plugin para subir proyectos .elpx, gestionarlos desde WordPress y abrirlos en el editor embebido.',
    features: [
      'ELPX como contenido gestionable en WordPress',
      'Bloque Gutenberg + shortcode',
      'Editor embebido para abrir y editar el proyecto',
      'Extracción automática de paquetes ZIP',
    ],
    useCase: 'Sitios educativos, blogs docentes, instituciones pequeñas',
  },
  {
    name: 'Omeka S',
    plugin: 'omeka-s-exelearning',
    color: 'red',
    logoColor: '#B5271F',
    type: 'Subida + catálogo',
    description: 'Módulo para subir proyectos .elpx, catalogarlos como objetos digitales y abrirlos con el editor embebido.',
    features: [
      'ELPX como media item con metadatos Dublin Core',
      'API REST para carga, edición y guardado',
      'Proxy seguro con CSP + sandbox en iframe',
      'Editor accesible desde el panel de administración',
    ],
    useCase: 'Museos, bibliotecas, archivos digitales, humanidades',
  },
  {
    name: 'Moodle (exeweb)',
    plugin: 'mod_exeweb',
    color: 'orange',
    logoColor: '#F98012',
    type: 'Visualización web',
    description: 'Módulo de actividad Moodle para abrir contenidos .elpx en modo web.',
    features: [
      'Visualización directa del contenido en Moodle',
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
    type: 'SCORM evaluable',
    description: 'Módulo de actividad Moodle que genera SCORM 1.2/2004 para seguimiento y calificación dentro de Moodle.',
    features: [
      'Salida en formato SCORM estándar',
      'Tracking de progreso del alumno integrado en Moodle',
      'Seguimiento y calificación dentro de Moodle',
    ],
    useCase: 'Interoperabilidad entre plataformas, estándares e-learning',
  },
];

// --- Formatos de exportación ---
export const EXPORT_FORMATS = [
  { name: 'ELPX', desc: 'Proyecto nativo eXeLearning 4.0', icon: '💾' },
  { name: 'HTML5', desc: 'Sitio web autónomo navegable', icon: '🌐' },
  { name: 'SCORM 1.2', desc: 'Estándar e-learning (legacy)', icon: '📦' },
  { name: 'SCORM 2004', desc: 'Estándar e-learning avanzado', icon: '📦' },
  { name: 'IMS CP', desc: 'IMS Content Package', icon: '📋' },
  { name: 'ePub3', desc: 'Libro electrónico para e-readers', icon: '📚' },
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
    title: 'Permisos por documento',
    desc: 'Control de acceso más fino por proyecto, documento y contenido, con roles claros.',
  },
  {
    title: 'Multidocumento simultáneo',
    desc: 'Varios documentos abiertos a la vez, con edición paralela sin bloquear el trabajo.',
  },
  {
    title: 'Media Library',
    desc: 'Biblioteca de medios integrada para reutilizar assets y ver metadatos dentro del editor.',
  },
  {
    title: 'Validador de enlaces',
    desc: 'Detecta enlaces rotos y ayuda a publicar contenido más limpio y consistente.',
  },
  {
    title: 'Optimizador de imágenes',
    desc: 'Reduce fricción al subir y publicar assets visuales, con mejor tratamiento de archivos.',
  },
  {
    title: 'Rendimiento',
    desc: 'Arranque más ágil, edición más fluida y respuesta general mejorada.',
  },
];
