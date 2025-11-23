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

export const FLOW_SYNC_STEPS = [
  {
    title: "Edición Local",
    description: "El usuario realiza cambios en el editor (TinyMCE, etc).",
    details: ["Y.Text.insert()", "Y.Doc se actualiza en memoria", "IndexeddbPersistence guarda automáticamente (<100ms)"],
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
        details: ["Check IndexedDB (Miss)", "WebSocket: request-asset { assetId: 'asset-1' }"],
        actor: "Client" as const
    },
    {
        title: "Coordinación",
        description: "Servidor busca quién tiene el archivo.",
        details: ["BD Check (No encontrado)", "Awareness Check (Usuario A lo tiene)", "WS: upload-request -> Usuario A"],
        actor: "Server" as const
    },
    {
        title: "Subida P2P (Relay)",
        description: "Usuario A sube el archivo bajo demanda.",
        details: ["Lectura IndexedDB", "POST /api/assets/upload", "Servidor guarda y notifica 'asset-ready'"],
        actor: "Client" as const
    },
    {
        title: "Descarga y Render",
        description: "Usuario B descarga y muestra la imagen.",
        details: ["GET /api/assets/asset-1", "Guardar en IndexedDB", "Renderizar Blob URL"],
        actor: "Client" as const
    }
]