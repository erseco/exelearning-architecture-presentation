export const CODE_YDOC_STRUCTURE = `Y.Doc {
  // Jerarquía del documento
  pages: Y.Array<Y.Map> [
    {
      id: 'page-uuid-1',
      title: Y.Text('Introduction'),
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

export const TECH_STACK = [
  { name: 'Bun', role: 'Runtime & Package Manager', color: 'orange', desc: 'Ultra-rápido runtime JS/TS. Reemplaza Node.js + npm.' },
  { name: 'Elysia', role: 'Web Framework', color: 'violet', desc: 'Framework type-safe para Bun. REST API + WebSocket.' },
  { name: 'Kysely', role: 'ORM / Query Builder', color: 'blue', desc: 'SQL type-safe. Soporta SQLite, PostgreSQL y MySQL.' },
  { name: 'TypeScript', role: 'Lenguaje', color: 'sky', desc: 'Todo el backend en TS. Biome como linter/formatter.' },
  { name: 'Yjs + WS', role: 'Colaboración', color: 'green', desc: 'CRDTs para edición colaborativa en tiempo real vía WebSocket.' },
  { name: 'Electron', role: 'Desktop App', color: 'cyan', desc: 'Instaladores offline para Windows, macOS y Linux.' },
];

export const RUNTIME_MODES = [
  {
    name: 'Online',
    color: 'blue',
    features: ['API REST + WebSocket', 'Base de datos (SQLite / PG / MySQL)', 'Colaboración en tiempo real', 'Assets bajo demanda + caché local'],
    deploy: 'docker run exelearning/exelearning',
    icon: 'server',
  },
  {
    name: 'Static (Monousuario)',
    color: 'green',
    features: ['Sin servidor ni base de datos', 'Uso local en una única instancia', 'Assets cacheados con Cache API', 'Exportar / guardar en fichero .elpx'],
    deploy: 'make build-static',
    icon: 'harddrive',
  },
  {
    name: 'Embeddable',
    color: 'purple',
    features: ['Integrable en cualquier web/LMS', 'postMessage API (OPEN / SAVE)', 'Compatible con modo Online o Static', 'Moodle, CMS y portales educativos'],
    deploy: '<iframe src="…/exelearning/" />',
    icon: 'layers',
  },
];

export const FLOW_SYNC_STEPS = [
  {
    title: "Edición Local",
    description: "El usuario realiza cambios en el editor (TinyMCE, etc).",
    details: ["Y.Text.insert()", "Y.Doc se actualiza en memoria", "La sesión local sigue funcionando también en modo Static"],
    actor: "Client" as const
  },
  {
    title: "Propagación (Si Online)",
    description: "El cliente envía el update binario a través del WebSocket.",
    details: ["WebsocketProvider emite binario", "Optimización: Batch de updates"],
    actor: "Client" as const
  },
  {
    title: "Relay",
    description: "El servidor recibe el mensaje binario y lo reenvía a otros clientes conectados a la misma sala.",
    details: ["Servidor NO decodifica el mensaje", "Broadcasting a sala 'project-uuid'"],
    actor: "Server" as const
  },
  {
    title: "Merge Remoto",
    description: "Otros clientes reciben el binario y lo aplican.",
    details: ["Y.applyUpdate(update)", "Resolución automática de conflictos (CRDT)", "Update UI"],
    actor: "Client" as const
  }
];

export const FLOW_ASSET_STEPS = [
    {
        title: "Solicitud de Asset",
        description: "Usuario B necesita ver una imagen 'asset-1'.",
        details: ["Cache API.match('asset-1') (Miss)", "Resolver referencia del asset en el documento", "Si está online, solicitar asset al backend"],
        actor: "Client" as const
    },
    {
        title: "Resolución",
        description: "El sistema localiza el binario según el modo de ejecución.",
        details: ["Online: backend sirve o coordina la subida del asset", "Static: el asset se resuelve desde el paquete/proyecto local", "El documento solo guarda metadatos y referencias"],
        actor: "Server" as const
    },
    {
        title: "Transferencia",
        description: "El binario se entrega bajo demanda, sin incrustarlo en Yjs.",
        details: ["POST /api/assets/upload o GET /api/assets/:id", "Respuesta HTTP cacheable", "La colaboración solo replica referencias, no blobs"],
        actor: "Server" as const
    },
    {
        title: "Cache local y Render",
        description: "Usuario B descarga y muestra la imagen.",
        details: ["Guardar respuesta en Cache API", "Reutilización offline en sesiones posteriores", "Renderizar Blob/Object URL"],
        actor: "Client" as const
    }
]
