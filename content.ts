// --- Estructura Y.Doc ---
export const CODE_YDOC_STRUCTURE = `Y.Doc {
  // Jerarquía del documento
  navigation: Y.Array<Y.Map> [
    {
      id: 'page-uuid-1',
      title: 'Introducción',
      blocks: Y.Array<Y.Map> [ /* components: iDevices */ ]
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
    name: 'Cloud (colaborativa)',
    color: 'blue',
    features: [
      'API REST + WebSocket colaborativo',
      'Multi-usuario con autenticación',
      'Base de datos (SQLite / PostgreSQL / MySQL)',
      'Archivos coordinados por el servidor',
    ],
    deploy: 'docker run exelearning/exelearning',
    icon: 'server',
    description: 'Instalación multiusuario con colaboración en tiempo real y persistencia centralizada.',
  },
  {
    name: 'Online (navegador)',
    color: 'green',
    features: [
      'Sin backend de eXeLearning',
      'Catálogo de iDevices y estilos integrado',
      'Exportar/importar ficheros .elp / .elpx',
    ],
    deploy: 'make build-static',
    icon: 'harddrive',
    description: 'Versión Online: edición en el navegador, sin backend de eXeLearning, con almacenamiento local y guardado en archivos.',
  },
  {
    name: 'Embebida (plugins)',
    color: 'purple',
    features: [
      'Integrable en cualquier plataforma web',
      'postMessage: OPEN_FILE / REQUEST_SAVE',
      'Versión embebida integrada en la plataforma',
      'WordPress, Moodle, Omeka S y más',
    ],
    deploy: '<iframe src="…/exelearning/" />',
    icon: 'layers',
    description: 'Los plugins integran la versión embebida. La plataforma anfitriona gestiona el guardado y los permisos.',
  },
  {
    name: 'Escritorio (embebida)',
    color: 'cyan',
    features: [
      'Instaladores para Windows, macOS y Linux',
      'Versión embebida integrada (sin backend)',
      'Actualizaciones automáticas',
      'Firma y notarización de binarios',
    ],
    deploy: 'npm run electron:pack',
    icon: 'monitor',
    description: 'La aplicación de escritorio integra la versión embebida mediante Electron, con acceso a archivos locales.',
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
    description: "En Cloud, el cliente envía actualizaciones binarias Yjs al servidor.",
    details: [
      "WebSocketProvider emite actualizaciones binarias",
      "Optimización por lotes (batch de updates)",
    ],
    actor: "Client" as const,
  },
  {
    title: "Relé WebSocket",
    description: "El servidor reenvía el mensaje binario a otros clientes de la misma sala sin decodificarlo.",
    details: [
      "El relé no mantiene un Y.Doc por sala",
      "Broadcasting a sala 'project-{uuid}'",
      "Redis opcional para coordinación multi-instancia",
    ],
    actor: "Server" as const,
  },
  {
    title: "Combinación de cambios (CRDT)",
    description: "Los demás clientes reciben el delta y lo aplican. Yjs combina los cambios para obtener un estado común.",
    details: [
      "Y.applyUpdate aplica la actualización al documento local",
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
      "El contenido determina el identificador del archivo",
    ],
    actor: "Client" as const,
  },
  {
    title: "Coordinación de archivos",
    description: "El servidor coordina qué cliente posee cada asset y enruta solicitudes entre pares.",
    details: [
      "Mensajes de disponibilidad de archivos",
      "Sistema de prioridades: CRITICAL > HIGH > MEDIUM > LOW",
      "Solicitudes agrupadas según prioridad",
    ],
    actor: "Server" as const,
  },
  {
    title: "Transferencia bajo demanda",
    description: "Los archivos se descargan solo cuando se necesitan, via REST API o desde el paquete local.",
    details: [
      "Cloud: /api/projects/:projectId/assets",
      "Online y embebida: desde el paquete .elpx local",
      "Respuestas HTTP cacheables",
    ],
    actor: "Server" as const,
  },
  {
    title: "Cache local persistente",
    description: "El archivo se almacena en Cache API, con IndexedDB como alternativa.",
    details: [
      "Cache API por proyecto; IndexedDB si es necesario",
      "Reutilización mientras se conserve la copia local",
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
    type: 'Edición y publicación web',
    description: 'Módulo de Moodle para crear, editar y mostrar contenido web, con editor Cloud o la versión embebida.',
    features: [
      'Visualización directa del contenido en Moodle',
      'Validación de paquetes (ficheros obligatorios/prohibidos)',
      'Plantillas predefinidas para nuevas actividades',
    ],
    useCase: 'Publicación web en Moodle sin calificar ejercicios',
  },
  {
    name: 'Moodle (exescorm)',
    plugin: 'mod_exescorm',
    color: 'orange',
    logoColor: '#F98012',
    type: 'SCORM evaluable',
    description: 'Módulo de Moodle para crear y editar actividades SCORM con seguimiento y calificación agregada.',
    features: [
      'Salida en formato SCORM estándar',
      'Seguimiento del progreso del alumnado',
      'Calificación agregada de la actividad',
    ],
    useCase: 'Interoperabilidad entre plataformas, estándares e-learning',
  },
];

// --- Formatos de exportación ---
export const EXPORT_FORMATS = [
  { name: 'ELPX', desc: 'Proyecto nativo eXeLearning 4.0', icon: '💾' },
  { name: 'HTML5', desc: 'Sitio web autónomo navegable', icon: '🌐' },
  { name: 'SCORM 1.2', desc: 'Paquete de aprendizaje para LMS', icon: '📦' },
  { name: 'SCORM 2004', desc: 'Paquete con secuenciación SCORM', icon: '📦' },
  { name: 'IMS CP', desc: 'Paquete de contenidos', icon: '📋' },
  { name: 'ePub3', desc: 'Libro electrónico', icon: '📚' },
];

// --- Métodos de autenticación ---
export const AUTH_METHODS = [
  { name: 'Contraseña local', desc: 'Correo y contraseña; hash con bcrypt' },
  { name: 'CAS', desc: 'Inicio de sesión institucional' },
  { name: 'OpenID Connect', desc: 'Proveedor OIDC genérico' },
  { name: 'Invitado', desc: 'Acceso temporal sin registro' },
  { name: 'Sin autenticación', desc: 'Versión Online o embebida; la plataforma puede exigir acceso' },
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
    title: 'Biblioteca de medios',
    desc: 'Biblioteca de medios integrada para reutilizar archivos y ver metadatos dentro del editor.',
  },
  {
    title: 'Validador de enlaces',
    desc: 'Detecta enlaces rotos y ayuda a publicar contenido más limpio y consistente.',
  },
  {
    title: 'Optimizador de imágenes',
    desc: 'Permite optimizar imágenes antes de publicar el contenido.',
  },
  {
    title: 'Rendimiento',
    desc: 'Edición local y transferencia separada de archivos para reducir las operaciones durante la escritura.',
  },
];
