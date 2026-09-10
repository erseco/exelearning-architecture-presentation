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
    description: 'Instalación multiusuario con colaboración en tiempo real y guardado en el servidor.',
  },
  {
    name: 'Online (navegador)',
    color: 'green',
    features: [
      'Sin servidor de eXeLearning',
      'Catálogo de iDevices y estilos integrado',
      'Exportar/importar ficheros .elp / .elpx',
    ],
    deploy: 'make build-static',
    icon: 'harddrive',
    description: 'Versión Online: edición en el navegador, sin servidor de eXeLearning, con almacenamiento local y guardado en archivos.',
  },
  {
    name: 'Embebida (plugins)',
    color: 'purple',
    features: [
      'Integrable en cualquier plataforma web',
      'postMessage: OPEN_FILE / REQUEST_SAVE',
      'Versión embebida integrada en la plataforma',
      'WordPress, Moodle, Omeka S y Nextcloud',
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
      'Versión embebida integrada (sin servidor de eXeLearning)',
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
      "Cambios guardados en IndexedDB automáticamente",
      "Undo/Redo local inmediato",
    ],
    actor: "Client" as const,
  },
  {
    title: "Propagación vía WebSocket",
    description: "En Cloud, el cliente envía actualizaciones binarias Yjs al servidor.",
    details: [
      "WebSocketProvider emite actualizaciones binarias",
      "Agrupación de cambios para enviarlos juntos",
    ],
    actor: "Client" as const,
  },
  {
    title: "Transmisión de cambios",
    description: "El servidor reenvía el mensaje binario a otros clientes de la misma sala sin decodificarlo.",
    details: [
      "El servidor transmite los cambios entre usuarios",
      "Broadcasting a sala 'project-{uuid}'",
      "Redis opcional para coordinación multi-instancia",
    ],
    actor: "Server" as const,
  },
  {
    title: "Combinación de cambios",
    description: "Los demás participantes reciben el cambio. Yjs combina las aportaciones para que todos vean el mismo contenido.",
    details: [
      "Y.applyUpdate aplica la actualización al documento local",
      "Todos los participantes ven el mismo contenido",
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
    title: "Copia guardada en el navegador",
    description: "El archivo se almacena en Cache API, con IndexedDB como alternativa.",
    details: [
      "Cache API por proyecto; IndexedDB si es necesario",
      "Reutilización mientras se conserve la copia local",
      "Visualización desde la copia local del archivo",
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
      'Contenido aislado con restricciones de seguridad',
      'Editor accesible desde el panel de administración',
    ],
    useCase: 'Museos, bibliotecas, archivos digitales, humanidades',
  },
  {
    name: 'Moodle',
    plugin: 'mod_exeweb / mod_exescorm / mod_exelearning',
    color: 'orange',
    logoColor: '#F98012',
    type: 'Tres plugins de actividad',
    description: 'Tres opciones para crear, editar y publicar recursos en Moodle.',
    features: [
      'mod_exeweb: contenido web sin calificar ejercicios',
      'mod_exescorm: seguimiento SCORM y nota global',
      'mod_exelearning: navegación nativa y nota global o por iDevice',
    ],
    useCase: 'Publicación y evaluación dentro del aula virtual',
  },
  {
    name: 'Nextcloud',
    plugin: 'nextcloud-exelearning',
    color: 'blue',
    logoColor: '#0082C9',
    type: 'Archivos + edición embebida',
    description: 'Plugin para abrir y editar proyectos .elpx desde Nextcloud Files.',
    features: [
      'Visor integrado en Files',
      'Versión embebida para editar y guardar proyectos',
      'El visor descomprime el paquete en el navegador',
      'Service Worker para servir los archivos del contenido',
    ],
    useCase: 'Gestión y edición de recursos desde Nextcloud',
  },
];

// --- Formatos de exportación ---
export const EXPORT_FORMATS = [
  { name: 'ELPX', desc: 'Proyecto nativo eXeLearning 4.0', icon: '💾' },
  { name: 'HTML5', desc: 'Sitio web con varias páginas', icon: '🌐' },
  { name: 'Web de página única', desc: 'Contenido reunido en una página (single-page)', icon: '📄' },
  { name: 'SCORM 1.2', desc: 'Paquete de aprendizaje para LMS', icon: '📦' },
  { name: 'IMS CP', desc: 'Paquete de contenidos', icon: '📋' },
  { name: 'ePub3', desc: 'Libro electrónico', icon: '📚' },
];

// --- Métodos de autenticación ---
export const AUTH_METHODS = [
  { name: 'Contraseña local', desc: 'Correo y contraseña protegida con bcrypt' },
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
