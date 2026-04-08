import React, { useState, useEffect } from 'react';
import {
  Database, WifiOff, Server,
  Zap, HardDrive, Cpu, Network, Share2,
  FileJson, RefreshCw,
  CheckCircle2, ChevronLeft, ChevronRight as ChevronRightIcon,
  Layers, Package, Shield, Globe, Monitor, Terminal,
  ArrowRight, ArrowDown, ArrowLeftRight, Wifi, BookOpen,
  Users, LayoutDashboard, Upload, ExternalLink
} from 'lucide-react';
import { TerminalBlock } from './components/TerminalBlock';
import { FlowTimeline } from './components/FlowTimeline';
import { BackendDiagram } from './components/Diagrams';
import {
  CODE_YDOC_STRUCTURE, FLOW_SYNC_STEPS, FLOW_ASSET_STEPS,
  RUNTIME_MODES, INTEGRATIONS, EXPORT_FORMATS, AUTH_METHODS,
  KEY_IMPROVEMENTS
} from './content';

// --- Reusable Components ---

const FeatureCard: React.FC<{ icon: React.ElementType; title: string; desc: string; accent?: string }> = ({ icon: Icon, title, desc, accent = "blue" }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all hover:shadow-xl group h-full">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors
      ${accent === 'purple' ? 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30' :
        accent === 'green' ? 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30' :
        accent === 'orange' ? 'bg-orange-500/20 text-orange-400 group-hover:bg-orange-500/30' :
        'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30'}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold text-slate-200 mb-2">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

interface SlideContainerProps {
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}

const SlideContainer: React.FC<SlideContainerProps> = ({ title, subtitle, icon: Icon, children }) => (
  <div className="h-full w-full max-w-6xl mx-auto flex flex-col px-6 md:px-12 pt-8 pb-20">
    <div className="flex items-center gap-4 mb-2 flex-shrink-0">
      {Icon && <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-400"><Icon size={28} /></div>}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">{title}</h2>
    </div>
    {subtitle && <p className="text-slate-400 mb-6 max-w-3xl ml-0 md:ml-16 text-sm">{subtitle}</p>}
    {!subtitle && <div className="mb-6" />}
    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      {children}
    </div>
  </div>
);

// --- SVG Logo Components ---

const WordPressLogo = () => (
  <svg viewBox="0 0 122.52 122.52" className="w-12 h-12" fill="currentColor">
    <path d="M8.708 61.26c0 20.802 12.089 38.779 29.619 47.298L13.258 39.872a52.354 52.354 0 0 0-4.55 21.388zM96.74 58.608c0-6.495-2.333-10.993-4.334-14.494-2.664-4.329-5.161-7.995-5.161-12.324 0-4.831 3.664-9.328 8.825-9.328.233 0 .454.029.681.042-9.35-8.566-21.807-13.796-35.489-13.796-18.36 0-34.513 9.42-43.91 23.688 1.233.037 2.395.063 3.382.063 5.497 0 14.006-.668 14.006-.668 2.833-.167 3.167 3.994.337 4.329 0 0-2.847.335-6.015.501L48.2 93.547l11.501-34.493-8.188-22.434c-2.83-.166-5.511-.501-5.511-.501-2.832-.166-2.5-4.496.332-4.329 0 0 8.679.668 13.843.668 5.496 0 14.006-.668 14.006-.668 2.834-.167 3.168 3.994.337 4.329 0 0-2.853.335-6.015.501l18.992 56.494 5.242-17.517c2.272-7.269 4.001-12.49 4.001-16.989z"/>
    <path d="M62.184 65.857l-15.768 45.819a52.51 52.51 0 0 0 14.846 2.141c6.12 0 11.989-1.058 17.452-2.979a4.451 4.451 0 0 1-.374-.724L62.184 65.857zM107.376 36.046c.226 1.674.354 3.471.354 5.404 0 5.333-.996 11.328-3.996 18.824l-16.053 46.413c15.624-9.111 26.133-26.038 26.133-45.426.001-9.137-2.333-17.729-6.438-25.215z"/>
    <path d="M61.262 0C27.483 0 0 27.481 0 61.26c0 33.783 27.483 61.263 61.262 61.263 33.778 0 61.265-27.48 61.265-61.263C122.526 27.481 95.04 0 61.262 0zm0 119.715c-32.23 0-58.453-26.223-58.453-58.455 0-32.23 26.222-58.451 58.453-58.451 32.229 0 58.45 26.221 58.45 58.451 0 32.232-26.221 58.455-58.45 58.455z"/>
  </svg>
);

const MoodleLogo = () => (
  <svg viewBox="0 0 100 60" className="w-14 h-10" fill="currentColor">
    <path d="M20 50V25c0-8.284 6.716-15 15-15s15 6.716 15 15v25M50 50V30c0-5.523 4.477-10 10-10s10 4.477 10 10v20M70 50V30c0-5.523 4.477-10 10-10s10 4.477 10 10v20" strokeWidth="6" stroke="currentColor" fill="none" strokeLinecap="round"/>
    <circle cx="10" cy="15" r="6" />
    <rect x="7" y="21" width="6" height="29" rx="3" />
  </svg>
);

const OmekaLogo = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6"/>
    <text x="50" y="62" textAnchor="middle" fontSize="36" fontWeight="bold" fill="currentColor">Ω</text>
  </svg>
);

// ==================== SLIDES ====================

// SLIDE 1: Portada
const SlideHero = () => (
  <div className="h-full flex flex-col justify-center items-center text-center px-4">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 text-accent-400 text-xs font-medium mb-6 border border-accent-500/20">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
      </span>
      Presentación Técnica
    </div>
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
      Arquitectura de<br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">eXeLearning 4.0</span>
    </h1>
    <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
      Herramienta libre de autoría educativa.<br />
      <span className="text-slate-300">Browser-first</span>, colaborativa en tiempo real,
      con múltiples modos de despliegue e integración con <span className="text-slate-300">WordPress</span>, <span className="text-slate-300">Moodle</span> y <span className="text-slate-300">Omeka S</span>.
    </p>
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {['Offline-First', 'Colaboración Yjs', 'Multi-DB', 'Embebible', 'Electron Desktop', 'SCORM · HTML5 · ePub3'].map(tag => (
        <span key={tag} className="px-3 py-1 rounded-full text-xs bg-slate-800 border border-slate-700 text-slate-300">{tag}</span>
      ))}
    </div>
    <div className="text-slate-500 text-sm font-mono flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
      <span className="bg-slate-700 px-1.5 rounded text-slate-300">←</span>
      <span className="bg-slate-700 px-1.5 rounded text-slate-300">→</span>
      Usar flechas para navegar
    </div>
  </div>
);

// SLIDE 2: ¿Qué es eXeLearning 4.0?
const SlideWhatIs = () => (
  <SlideContainer title="¿Qué es eXeLearning 4.0?" icon={BookOpen}>
    <div className="grid md:grid-cols-2 gap-8 h-full content-center">
      <div className="space-y-6">
        <p className="text-lg text-slate-300 leading-relaxed">
          <strong className="text-white">eXeLearning</strong> es una herramienta <strong className="text-white">libre y gratuita</strong> (AGPL) para la creación de contenidos educativos interactivos. Mantenida por el <span className="text-primary-400">MEFPD</span> y comunidades autónomas de España.
        </p>
        <p className="text-slate-400 leading-relaxed">
          La versión <strong className="text-white">4.0</strong> es una reescritura completa que transforma eXeLearning de una aplicación de escritorio monolítica (Python + Qt + Firefox embebido) en una <strong className="text-white">plataforma web moderna</strong>, colaborativa y multi-despliegue.
        </p>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h4 className="text-white font-bold text-sm mb-3">Formatos de exportación</h4>
          <div className="grid grid-cols-2 gap-2">
            {EXPORT_FORMATS.map(f => (
              <div key={f.name} className="flex items-center gap-2 text-sm text-slate-300">
                <span>{f.icon}</span>
                <span><strong className="text-slate-200">{f.name}</strong> — {f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-2xl p-6">
          <h4 className="text-white font-bold mb-4">Evolución arquitectónica</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-16 text-right text-xs font-bold text-slate-500 mt-1 flex-shrink-0">Antes</div>
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <div className="text-sm text-slate-400">Python 2→3 · Twisted · Firefox embebido · Escritorio monolítico</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-16 text-right text-xs font-bold text-primary-400 mt-1 flex-shrink-0">4.0</div>
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
              <div className="text-sm text-slate-300">TypeScript end-to-end · Bun + Elysia · Yjs CRDTs · Multi-despliegue · Ecosistema de plugins</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <div className="text-2xl font-black text-primary-400">7+</div>
            <div className="text-xs text-slate-400 mt-1">Formatos de exportación</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <div className="text-2xl font-black text-green-400">7</div>
            <div className="text-xs text-slate-400 mt-1">Idiomas soportados</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <div className="text-2xl font-black text-purple-400">4</div>
            <div className="text-xs text-slate-400 mt-1">Modos de despliegue</div>
          </div>
        </div>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 3: Principios de Arquitectura
const SlidePrinciples = () => (
  <SlideContainer title="Principios de Arquitectura" icon={Cpu} subtitle="Decisiones de diseño que definen eXeLearning 4.0 y lo diferencian de versiones anteriores.">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full content-center">
      <FeatureCard
        icon={WifiOff}
        title="Browser-First / Offline-First"
        desc="El navegador es la fuente de verdad durante la sesión. El editor funciona completo sin servidor: la edición ocurre en memoria (Y.Doc) y los assets se persisten en IndexedDB."
      />
      <FeatureCard
        icon={Server}
        title="Servidor sin estado"
        desc="El backend no almacena ni interpreta el Y.Doc en memoria. Actúa como relay de WebSocket, coordinador de assets y punto de persistencia. Permite escalar horizontalmente."
        accent="purple"
      />
      <FeatureCard
        icon={HardDrive}
        title="Guardado explícito, sync desacoplado"
        desc="La sincronización entre pares es automática y continua. Pero el guardado a servidor es una acción manual del usuario. Esto separa colaboración de persistencia."
        accent="green"
      />
      <FeatureCard
        icon={Share2}
        title="Misma base, múltiples despliegues"
        desc="El mismo código fuente se compila para servidor multi-usuario, build estático offline, iframe embebido en CMS/LMS, o aplicación de escritorio con Electron."
        accent="orange"
      />
    </div>
  </SlideContainer>
);

// SLIDE 4: Arquitectura General
const SlideArchitecture = () => (
  <SlideContainer title="Arquitectura General" icon={Layers} subtitle="Visión global del sistema: cliente, servidor, persistencia y cómo interactúan.">
    <div className="w-full max-w-5xl mx-auto">
      {/* Client Layer */}
      <div className="bg-slate-800/40 rounded-2xl border-2 border-blue-500/40 p-6 relative">
        <div className="absolute -top-3 left-6 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Cliente (Navegador) — Fuente de verdad
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4 text-center">
            <FileJson size={28} className="mx-auto text-blue-300 mb-2" />
            <div className="font-mono text-blue-200 font-bold text-sm">Y.Doc</div>
            <div className="text-xs text-slate-400 mt-1">Documento en RAM</div>
          </div>
          <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4 text-center">
            <Database size={28} className="mx-auto text-emerald-300 mb-2" />
            <div className="font-mono text-emerald-200 font-bold text-sm">IndexedDB</div>
            <div className="text-xs text-slate-400 mt-1">Assets locales</div>
          </div>
          <div className="bg-cyan-900/20 border border-cyan-500/20 rounded-lg p-4 text-center">
            <RefreshCw size={28} className="mx-auto text-cyan-300 mb-2" />
            <div className="font-mono text-cyan-200 font-bold text-sm">WebSocket</div>
            <div className="text-xs text-slate-400 mt-1">Sync Yjs P2P</div>
          </div>
          <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4 text-center">
            <Upload size={28} className="mx-auto text-amber-300 mb-2" />
            <div className="font-mono text-amber-200 font-bold text-sm">REST API</div>
            <div className="text-xs text-slate-400 mt-1">Guardado explícito</div>
          </div>
        </div>
      </div>

      {/* Connection */}
      <div className="flex justify-center py-3">
        <div className="flex flex-col items-center text-slate-500">
          <div className="h-8 w-0.5 bg-gradient-to-b from-blue-500/50 to-purple-500/50" />
          <ArrowDown size={20} className="text-slate-600" />
          <div className="flex gap-4 text-xs mt-1">
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">WebSocket (sync)</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">HTTP (save/assets)</span>
          </div>
        </div>
      </div>

      {/* Server Layer */}
      <div className="bg-slate-800/40 rounded-2xl border-2 border-purple-500/40 p-6 relative">
        <div className="absolute -top-3 left-6 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Servidor (Bun + Elysia) — Coordinador
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4 text-center">
            <Wifi size={28} className="mx-auto text-purple-300 mb-2" />
            <div className="font-mono text-purple-200 font-bold text-sm">Relay WS</div>
            <div className="text-xs text-slate-400 mt-1">Reenvía Yjs binario</div>
          </div>
          <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-lg p-4 text-center">
            <Shield size={28} className="mx-auto text-indigo-300 mb-2" />
            <div className="font-mono text-indigo-200 font-bold text-sm">Auth</div>
            <div className="text-xs text-slate-400 mt-1">JWT · CAS · OIDC</div>
          </div>
          <div className="bg-rose-900/20 border border-rose-500/20 rounded-lg p-4 text-center">
            <Database size={28} className="mx-auto text-rose-300 mb-2" />
            <div className="font-mono text-rose-200 font-bold text-sm">DB</div>
            <div className="text-xs text-slate-400 mt-1">SQLite / PG / MySQL</div>
          </div>
          <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-4 text-center">
            <HardDrive size={28} className="mx-auto text-orange-300 mb-2" />
            <div className="font-mono text-orange-200 font-bold text-sm">Assets</div>
            <div className="text-xs text-slate-400 mt-1">Ficheros en disco</div>
          </div>
        </div>
      </div>

      {/* Tech badges */}
      <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500 justify-center">
        {['Bun Runtime', 'Elysia Framework', 'Kysely ORM', 'Yjs CRDT', 'Bootstrap 5', 'Nunjucks', 'Biome', 'Vitest + Playwright', 'Docker', 'Redis (multi-instancia)'].map(t => (
          <span key={t} className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">{t}</span>
        ))}
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 5: Cliente
const SlideClient = () => (
  <SlideContainer title="Cliente: el navegador como fuente de verdad" icon={Globe} subtitle="Todo el estado de edición vive en el navegador. El servidor solo interviene para coordinar y persistir.">
    <div className="grid md:grid-cols-2 gap-8 h-full content-center">
      <div className="space-y-4">
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h4 className="text-blue-300 font-mono font-bold mb-1">Y.Doc (Memoria RAM)</h4>
          <p className="text-sm text-slate-400">Estructura CRDT que contiene páginas, cajas de contenido y metadatos de assets. Se actualiza en tiempo real con cada edición del usuario.</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h4 className="text-emerald-300 font-mono font-bold mb-1">IndexedDB (exelearning-assets-v2)</h4>
          <p className="text-sm text-slate-400">Almacén persistente en el navegador para binarios (imágenes, vídeos). Cada asset tiene id, blob, hash SHA-256, tipo MIME y estado de subida.</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h4 className="text-cyan-300 font-mono font-bold mb-1">WebSocketProvider</h4>
          <p className="text-sm text-slate-400">Conexión Yjs al servidor para sincronización. Si no hay conexión, el cliente sigue funcionando sin interrupción (offline-first).</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h4 className="text-amber-300 font-mono font-bold mb-1">Adaptadores de plataforma</h4>
          <p className="text-sm text-slate-400">Capa de abstracción para integración embebida: adapta el comportamiento según si se ejecuta en iframe (Moodle, WordPress), Electron o navegador standalone.</p>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Estructura Y.Doc</h4>
        <TerminalBlock content={CODE_YDOC_STRUCTURE} title="YDoc_schema.ts" highlight />
        <div className="mt-4 bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg">
          <p className="text-xs text-blue-200/70 leading-relaxed">
            <strong className="text-blue-300">Nota:</strong> Los assets binarios nunca se almacenan dentro del Y.Doc. Solo se guardan metadatos (hash, tamaño, tipo MIME). Los binarios viajan por un canal separado (REST API + P2P coordination).
          </p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 6: Servidor
const SlideServer = () => (
  <SlideContainer title="Servidor: coordinador sin estado" icon={Server} subtitle="Elysia sobre Bun. No interpreta ni almacena el Y.Doc en memoria. Escala horizontalmente.">
    <div className="grid md:grid-cols-2 gap-8 h-full">
      <div>
        <BackendDiagram />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
            <div className="text-xs font-bold text-slate-500 uppercase mb-1">Base de datos</div>
            <div className="text-sm text-slate-300">SQLite (dev) · PostgreSQL (prod) · MySQL/MariaDB</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
            <div className="text-xs font-bold text-slate-500 uppercase mb-1">Tablas principales</div>
            <div className="text-sm text-slate-300 font-mono text-xs">users · projects · assets · yjs_documents · activity_log</div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Componentes del servidor</h4>
        <div className="space-y-3">
          {[
            { name: 'Yjs WebSocket Relay', desc: 'Reenvía mensajes binarios Yjs entre clientes sin decodificarlos. Rooms por proyecto-UUID.', color: 'text-indigo-300' },
            { name: 'Asset Coordinator', desc: 'Protocolo P2P: coordina qué cliente tiene qué asset. Prioridades (CRITICAL→IDLE), batching inteligente.', color: 'text-orange-300' },
            { name: 'Room Manager', desc: 'Gestiona ciclo de vida de salas. Limpieza tras 30s sin clientes. Redis para multi-instancia.', color: 'text-green-300' },
            { name: 'REST API', desc: '/api/projects · /api/assets · /api/auth · /api/export — Elysia type-safe con Swagger auto-generado.', color: 'text-cyan-300' },
            { name: 'Auth Middleware', desc: 'JWT con httpOnly cookies. Soporta Password, CAS, OIDC, Guest. RBAC con roles y cuotas.', color: 'text-rose-300' },
            { name: 'Admin Panel', desc: 'Gestión de usuarios, temas, plantillas, analytics. Impersonación con auditoría completa.', color: 'text-amber-300' },
          ].map(c => (
            <div key={c.name} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 flex items-start gap-3">
              <div className={`${c.color} font-mono font-bold text-sm flex-shrink-0 w-40`}>{c.name}</div>
              <div className="text-xs text-slate-400">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 7: Persistencia y Assets
const SlideAssets = () => (
  <SlideContainer title="Persistencia y Assets" icon={FileJson} subtitle="Separación entre documento y binarios. Assets content-addressable con hash SHA-256.">
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <p className="text-slate-400 mb-6">
          Los archivos binarios <strong className="text-slate-200">nunca</strong> viajan dentro del documento Yjs.
          Solo se sincronizan metadatos. Los binarios se transfieren por canal separado y se cachean en IndexedDB.
        </p>
        <FlowTimeline steps={FLOW_ASSET_STEPS} />
      </div>
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <Database size={18} className="text-emerald-400" /> Almacenamiento por capa
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-20 text-xs font-bold text-blue-400 mt-0.5 flex-shrink-0">Cliente</div>
              <div className="text-sm text-slate-300">IndexedDB <span className="text-slate-500 font-mono text-xs">(exelearning-assets-v2)</span> — Blob + hash + estado de sync</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-20 text-xs font-bold text-purple-400 mt-0.5 flex-shrink-0">Servidor</div>
              <div className="text-sm text-slate-300">Sistema de ficheros <span className="text-slate-500 font-mono text-xs">(FILES_DIR/perm/odes/{'{projectId}'}/assets/)</span></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-20 text-xs font-bold text-green-400 mt-0.5 flex-shrink-0">BD</div>
              <div className="text-sm text-slate-300">Tabla <span className="text-slate-500 font-mono">assets</span> — Metadatos, hash, referencia a fichero, usuario</div>
            </div>
          </div>
        </div>
        <div className="bg-amber-900/20 border border-amber-500/20 p-4 rounded-lg">
          <h5 className="text-amber-400 font-bold text-sm mb-2">Sistema de prioridades para transferencia</h5>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300"><span className="text-red-400 font-bold">CRITICAL (100)</span> Render actual</div>
            <div className="flex items-center gap-2 text-slate-300"><span className="text-orange-400 font-bold">HIGH (75)</span> Página actual</div>
            <div className="flex items-center gap-2 text-slate-300"><span className="text-yellow-400 font-bold">MEDIUM (50)</span> Páginas cercanas</div>
            <div className="flex items-center gap-2 text-slate-300"><span className="text-green-400 font-bold">LOW/IDLE</span> Prefetch</div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3">Deduplicación</h4>
          <p className="text-sm text-slate-400">
            Mismo contenido = mismo hash SHA-256 = mismo ID global.
            Si dos usuarios suben la misma imagen, solo se almacena una vez en el servidor.
          </p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 8: Sincronización y Colaboración
const SlideSync = () => (
  <SlideContainer title="Sincronización y Colaboración" icon={RefreshCw} subtitle="Yjs CRDTs + WebSocket relay sin estado. Convergencia automática sin conflictos.">
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <p className="text-slate-400 mb-6">
          La sincronización utiliza <strong className="text-slate-200">CRDTs (Conflict-free Replicated Data Types)</strong> via Yjs.
          Cada cambio es un delta binario que se propaga sin necesidad de resolución manual de conflictos.
        </p>
        <FlowTimeline steps={FLOW_SYNC_STEPS} />
      </div>
      <div className="space-y-5">
        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <Network size={18} className="text-indigo-400" /> Modelo de relay
          </h4>
          <div className="bg-slate-900/60 rounded-lg p-4 font-mono text-sm text-slate-300 text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <span className="text-blue-400">Browser A (Y.Doc)</span>
              <ArrowLeftRight size={16} className="text-slate-500" />
              <span className="text-purple-400">WS Relay</span>
              <ArrowLeftRight size={16} className="text-slate-500" />
              <span className="text-blue-400">Browser B (Y.Doc)</span>
            </div>
            <div className="text-xs text-slate-500">El servidor NO decodifica el contenido</div>
          </div>
        </div>
        <div className="bg-amber-900/20 border border-amber-500/20 p-4 rounded-lg">
          <h5 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-2">
            <Network size={16} /> Resolución de conflictos
          </h5>
          <p className="text-xs text-amber-200/70 leading-relaxed">
            Si dos usuarios editan el mismo párrafo simultáneamente, Yjs garantiza convergencia automática al mismo estado final, preservando la intención de ambos editores.
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3">Sync ≠ Save</h4>
          <p className="text-sm text-slate-400">
            La <strong className="text-slate-200">sincronización</strong> entre pares es automática y continua (Yjs WebSocket).
            El <strong className="text-slate-200">guardado</strong> a servidor (base de datos) es una acción explícita del usuario.
            Esto permite colaborar sin riesgo de sobreescribir datos persistidos.
          </p>
        </div>
        <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-5">
          <h4 className="text-white font-bold mb-2">Escalabilidad</h4>
          <ul className="space-y-1 text-sm text-slate-300">
            <li className="flex gap-2"><CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0" /> Zero-memory: sin Y.Doc en servidor</li>
            <li className="flex gap-2"><CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0" /> Redis para multi-instancia horizontal</li>
            <li className="flex gap-2"><CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0" /> Heartbeat 30s (server) / 60s (desktop)</li>
          </ul>
        </div>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 9: Modos de ejecución
const SlideRuntimeModes = () => {
  const colorMap: Record<string, { border: string; badge: string; icon: string }> = {
    blue:   { border: 'border-blue-500/50',   badge: 'bg-blue-600',   icon: 'text-blue-400'   },
    green:  { border: 'border-green-500/50',  badge: 'bg-green-600',  icon: 'text-green-400'  },
    purple: { border: 'border-purple-500/50', badge: 'bg-purple-600', icon: 'text-purple-400' },
    cyan:   { border: 'border-cyan-500/50',   badge: 'bg-cyan-600',   icon: 'text-cyan-400'   },
  };
  return (
    <SlideContainer title="Modos de Ejecución" icon={Layers} subtitle="El mismo código fuente soporta cuatro modos de despliegue, cada uno optimizado para un contexto diferente.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full content-start">
        {RUNTIME_MODES.map(mode => {
          const colors = colorMap[mode.color];
          return (
            <div key={mode.name} className={`bg-slate-800/40 rounded-2xl border-2 ${colors.border} p-5 relative flex flex-col gap-3`}>
              <div className={`absolute -top-3 left-5 ${colors.badge} text-white px-3 py-0.5 rounded-full text-xs font-bold`}>
                {mode.name}
              </div>
              <p className="text-sm text-slate-400 mt-2">{mode.description}</p>
              <ul className="space-y-1.5">
                {mode.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 size={14} className={`mt-0.5 flex-shrink-0 ${colors.icon}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 font-mono text-xs text-slate-400 break-all">
                {mode.deploy}
              </div>
            </div>
          );
        })}
      </div>
    </SlideContainer>
  );
};

// SLIDE 10: Ecosistema de integraciones
const SlideEcosystem = () => (
  <SlideContainer title="Ecosistema de Integraciones" icon={ExternalLink} subtitle="eXeLearning 4.0 se integra con las principales plataformas educativas y de publicación de contenidos.">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {INTEGRATIONS.map(integration => {
        const borderColor = integration.color === 'blue' ? 'border-blue-500/30' :
          integration.color === 'red' ? 'border-red-500/30' : 'border-orange-500/30';
        const textColor = integration.color === 'blue' ? 'text-blue-400' :
          integration.color === 'red' ? 'text-red-400' : 'text-orange-400';
        const badgeColor = integration.color === 'blue' ? 'bg-blue-600' :
          integration.color === 'red' ? 'bg-red-600' : 'bg-orange-600';
        return (
          <div key={integration.name} className={`bg-slate-800/40 rounded-xl border ${borderColor} p-5 flex flex-col gap-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`${textColor}`}>
                  {integration.name === 'WordPress' && <WordPressLogo />}
                  {integration.name === 'Omeka S' && <OmekaLogo />}
                  {(integration.name.includes('Moodle')) && <MoodleLogo />}
                </div>
                <div>
                  <h4 className="text-white font-bold">{integration.name}</h4>
                  <span className={`text-xs ${badgeColor} text-white px-2 py-0.5 rounded-full`}>{integration.type}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-400">{integration.description}</p>
            <ul className="space-y-1">
              {integration.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 size={12} className={`mt-0.5 flex-shrink-0 ${textColor}`} />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto text-xs text-slate-500 italic">{integration.useCase}</div>
          </div>
        );
      })}
    </div>
  </SlideContainer>
);

// SLIDE 11: WordPress
const SlideWordPress = () => (
  <SlideContainer title="Integración: WordPress" icon={Globe} subtitle="Plugin autocontenido que no requiere servidor eXeLearning externo.">
    <div className="grid md:grid-cols-2 gap-8 h-full content-center">
      <div className="space-y-5">
        <div className="flex items-center gap-4 text-blue-400 mb-2">
          <WordPressLogo />
          <div>
            <h3 className="text-white text-xl font-bold">wp-exelearning</h3>
            <span className="text-xs text-slate-500">WordPress 6.1+ · PHP 8.0+</span>
          </div>
        </div>
        <p className="text-slate-400">
          Permite a sitios WordPress <strong className="text-slate-200">alojar, gestionar y editar</strong> contenidos eXeLearning directamente desde el panel de administración, sin infraestructura adicional.
        </p>
        <div className="space-y-3">
          {[
            'Archivos ELPX tratados como media nativo de WordPress',
            'Bloque Gutenberg para insertar contenidos en páginas/entradas',
            'Shortcode [exelearning id="123"] como alternativa',
            'Editor embebido opcional descargable desde GitHub Releases',
            'Extracción automática de ZIP e indexado de contenidos',
            'Metadatos visibles en Media Library (licencia, idioma, tipo)',
          ].map(f => (
            <div key={f} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3">Flujo de integración</h4>
          <div className="space-y-3">
            {[
              { step: '1', text: 'Profesor sube archivo .elpx via Media Library', color: 'bg-blue-600' },
              { step: '2', text: 'WordPress extrae y almacena los contenidos', color: 'bg-blue-600' },
              { step: '3', text: 'Inserción en página via bloque Gutenberg o shortcode', color: 'bg-blue-600' },
              { step: '4', text: 'Edición in-situ con editor embebido (opcional)', color: 'bg-blue-600' },
            ].map(s => (
              <div key={s.step} className="flex items-center gap-3">
                <span className={`${s.color} text-white w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold flex-shrink-0`}>{s.step}</span>
                <span className="text-sm text-slate-300">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h4 className="text-white font-bold text-sm mb-2">¿Por qué importa?</h4>
          <p className="text-xs text-slate-400">WordPress alimenta el 43% de la web. Este plugin permite que cualquier sitio educativo pequeño o mediano integre eXeLearning sin servidor dedicado ni costes de infraestructura.</p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 12: Omeka S
const SlideOmeka = () => (
  <SlideContainer title="Integración: Omeka S" icon={Globe} subtitle="Módulo que trata contenidos educativos como objetos digitales catalogables.">
    <div className="grid md:grid-cols-2 gap-8 h-full content-center">
      <div className="space-y-5">
        <div className="flex items-center gap-4 text-red-400 mb-2">
          <OmekaLogo />
          <div>
            <h3 className="text-white text-xl font-bold">omeka-s-exelearning</h3>
            <span className="text-xs text-slate-500">Omeka S 3.0+ · PHP 7.4+</span>
          </div>
        </div>
        <p className="text-slate-400">
          Integra cursos eXeLearning como <strong className="text-slate-200">objetos digitales de primera clase</strong> en Omeka S, con metadatos Dublin Core, API REST y proxy seguro de contenidos.
        </p>
        <div className="space-y-3">
          {[
            'ELPX como media item con metadatos Dublin Core',
            'API REST: /api/exelearning/save/:id, /elp-data/:id',
            'Proxy seguro con CSP headers + iframe sandbox',
            'Editor instalable desde panel de administración',
            'Generación automática de thumbnails',
            'Contenidos buscables junto al resto de la colección',
          ].map(f => (
            <div key={f} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3">Arquitectura de seguridad</h4>
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <Shield size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
              <span>Content Security Policy (CSP) estricto en cabeceras HTTP</span>
            </div>
            <div className="flex items-start gap-2">
              <Shield size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
              <span>Sandbox de iframe para prevenir breakout</span>
            </div>
            <div className="flex items-start gap-2">
              <Shield size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
              <span>Acceso a contenidos via hash (no rutas directas)</span>
            </div>
            <div className="bg-slate-900/50 font-mono text-xs text-slate-400 p-2 rounded mt-2">
              /exelearning/content/{'{hash}'}/{'{file}'}
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h4 className="text-white font-bold text-sm mb-2">¿Por qué importa?</h4>
          <p className="text-xs text-slate-400">Omeka S es la plataforma de referencia para museos, bibliotecas y proyectos de humanidades digitales. Esta integración posiciona eXeLearning como herramienta de autoría en el ámbito cultural y patrimonial.</p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 13: Moodle
const SlideMoodle = () => (
  <SlideContainer title="Integración: Moodle" icon={Globe} subtitle="Dos módulos de actividad con edición embebida vía JWT y callbacks seguros.">
    <div className="grid md:grid-cols-2 gap-8 h-full content-center">
      <div className="space-y-5">
        <div className="flex items-center gap-4 text-orange-400 mb-2">
          <MoodleLogo />
          <div>
            <h3 className="text-white text-xl font-bold">mod_exeweb + mod_exescorm</h3>
            <span className="text-xs text-slate-500">Moodle 3.9+ · eXeLearning Online requerido</span>
          </div>
        </div>
        <p className="text-slate-400">
          Permiten crear y editar contenidos educativos <strong className="text-slate-200">directamente desde Moodle</strong>, usando una instancia remota de eXeLearning Online como editor en iframe.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-4">
            <h5 className="text-orange-300 font-bold text-sm mb-2">mod_exeweb</h5>
            <p className="text-xs text-slate-400">Genera <strong className="text-slate-300">paquetes web (HTML)</strong> navegables directamente en Moodle.</p>
          </div>
          <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-4">
            <h5 className="text-orange-300 font-bold text-sm mb-2">mod_exescorm</h5>
            <p className="text-xs text-slate-400">Genera <strong className="text-slate-300">paquetes SCORM 1.2/2004</strong> con tracking de progreso del alumno.</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-orange-900/20 border border-orange-500/20 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3">Flujo de autenticación JWT</h4>
          <div className="space-y-3">
            {[
              { step: '1', text: 'Profesor pulsa "Editar" en la actividad Moodle' },
              { step: '2', text: 'Moodle genera token JWT firmado con HMAC SHA-256' },
              { step: '3', text: 'eXeLearning Online se abre en iframe con el token' },
              { step: '4', text: 'Al guardar: set_ode.php recibe paquete + valida JWT' },
              { step: '5', text: 'Moodle valida ficheros (obligatorios/prohibidos) y almacena' },
            ].map(s => (
              <div key={s.step} className="flex items-center gap-3">
                <span className="bg-orange-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold flex-shrink-0">{s.step}</span>
                <span className="text-sm text-slate-300">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h4 className="text-white font-bold text-sm mb-2">¿Por qué importa?</h4>
          <p className="text-xs text-slate-400">Moodle es el LMS líder a nivel global (~25% del mercado). Estos módulos permiten que millones de profesores creen contenido interactivo sin salir de su entorno habitual, con doble opción: web o SCORM portable.</p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 14: Mejoras clave de 4.0
const SlideImprovements = () => (
  <SlideContainer title="Mejoras clave de eXeLearning 4.0" icon={Zap} subtitle="Comparativa con versiones anteriores: qué cambia y por qué importa.">
    <div className="space-y-3">
      {KEY_IMPROVEMENTS.map(item => (
        <div key={item.title} className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-3">
            <h4 className="text-white font-bold text-sm">{item.title}</h4>
          </div>
          <div className="md:col-span-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
            <span className="text-xs text-slate-400">{item.before}</span>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight size={16} className="text-slate-600" />
          </div>
          <div className="md:col-span-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
            <span className="text-xs text-slate-200">{item.after}</span>
          </div>
          <div className="md:col-span-2">
            <span className="text-xs text-primary-400 italic">{item.why}</span>
          </div>
        </div>
      ))}
    </div>
  </SlideContainer>
);

// SLIDE 15: Capacidades
const SlideFeatures = () => (
  <SlideContainer title="Capacidades del Sistema" icon={LayoutDashboard} subtitle="Resumen de funcionalidades disponibles en eXeLearning 4.0.">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={18} className="text-green-400" />
          <h4 className="text-white font-bold">Autenticación</h4>
        </div>
        <ul className="space-y-1 text-sm text-slate-300">
          {AUTH_METHODS.map(m => (
            <li key={m.name} className="flex gap-2 items-start"><CheckCircle2 size={12} className="text-green-500/70 flex-shrink-0 mt-0.5" /><span><strong className="text-slate-200">{m.name}</strong> — {m.desc}</span></li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Package size={18} className="text-violet-400" />
          <h4 className="text-white font-bold">Exportación</h4>
        </div>
        <ul className="space-y-1 text-sm text-slate-300">
          {EXPORT_FORMATS.map(f => (
            <li key={f.name} className="flex gap-2 items-center"><span>{f.icon}</span><span><strong className="text-slate-200">{f.name}</strong> — {f.desc}</span></li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Globe size={18} className="text-amber-400" />
          <h4 className="text-white font-bold">iDevices e i18n</h4>
        </div>
        <ul className="space-y-1 text-sm text-slate-300">
          {[
            'iDevices interactivos extensibles',
            'ES, CA, EU, GL, VA, EO, EN',
            'Temas personalizables',
            'Instalación online de iDevices y estilos',
          ].map(m => (
            <li key={m} className="flex gap-2 items-center"><CheckCircle2 size={12} className="text-amber-500/70 flex-shrink-0" />{m}</li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Terminal size={18} className="text-orange-400" />
          <h4 className="text-white font-bold">Despliegue rápido</h4>
        </div>
        <div className="space-y-2">
          <div className="bg-slate-900 rounded-lg px-3 py-2 font-mono text-xs text-green-300 border border-slate-700">
            # Docker (1 comando)<br />
            docker run -p 8080:8080 \<br />
            &nbsp;&nbsp;exelearning/exelearning
          </div>
          <div className="bg-slate-900 rounded-lg px-3 py-2 font-mono text-xs text-blue-300 border border-slate-700">
            # Desarrollo local<br />
            git clone …/exelearning<br />
            make up-local
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Users size={18} className="text-indigo-400" />
          <h4 className="text-white font-bold">Administración</h4>
        </div>
        <ul className="space-y-1 text-sm text-slate-300">
          {[
            'Panel de admin con gestión de usuarios',
            'Gestión de temas y plantillas',
            'Analytics y logs de actividad',
            'Impersonación con auditoría completa',
            'RBAC con roles y cuotas de espacio',
          ].map(m => (
            <li key={m} className="flex gap-2 items-center"><CheckCircle2 size={12} className="text-indigo-500/70 flex-shrink-0" />{m}</li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Monitor size={18} className="text-cyan-400" />
          <h4 className="text-white font-bold">Testing</h4>
        </div>
        <ul className="space-y-1 text-sm text-slate-300">
          {[
            'Tests unitarios (Bun test runner)',
            'Tests de integración',
            'Tests frontend (Vitest)',
            'Tests E2E (Playwright)',
            'Linting con Biome',
          ].map(m => (
            <li key={m} className="flex gap-2 items-center"><CheckCircle2 size={12} className="text-cyan-500/70 flex-shrink-0" />{m}</li>
          ))}
        </ul>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 16: Cierre
const SlideClosure = () => (
  <div className="h-full flex flex-col justify-center items-center text-center px-4">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
      eXeLearning 4.0
    </h1>
    <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
      Una evolución arquitectónica y funcional:<br />
      más modular, más flexible, más integrable.
    </p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mb-10">
      {[
        { label: 'Browser-first', desc: 'Cliente como fuente de verdad', icon: Globe },
        { label: 'Colaborativo', desc: 'Yjs CRDTs en tiempo real', icon: Users },
        { label: 'Multi-despliegue', desc: 'Server · Static · Embebido · Desktop', icon: Layers },
        { label: 'Ecosistema', desc: 'WordPress · Moodle · Omeka S', icon: ExternalLink },
      ].map(item => (
        <div key={item.label} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
          <item.icon size={24} className="mx-auto text-primary-400 mb-2" />
          <div className="text-white font-bold text-sm">{item.label}</div>
          <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
        </div>
      ))}
    </div>

    {/* Platform logos */}
    <div className="flex items-center gap-8 mb-8 text-slate-500">
      <div className="flex flex-col items-center gap-1">
        <WordPressLogo />
        <span className="text-xs">WordPress</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <MoodleLogo />
        <span className="text-xs">Moodle</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <OmekaLogo />
        <span className="text-xs">Omeka S</span>
      </div>
    </div>

    <div className="space-y-2 text-sm text-slate-500">
      <div className="flex items-center justify-center gap-2">
        <span className="font-mono">github.com/exelearning/exelearning</span>
      </div>
      <div>Licencia AGPL · Software libre · Mantenido por MEFPD</div>
    </div>
  </div>
);

// ==================== MAIN APP ====================

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: <SlideHero />, id: 'hero' },
    { component: <SlideWhatIs />, id: 'what-is' },
    { component: <SlidePrinciples />, id: 'principles' },
    { component: <SlideArchitecture />, id: 'architecture' },
    { component: <SlideClient />, id: 'client' },
    { component: <SlideServer />, id: 'server' },
    { component: <SlideAssets />, id: 'assets' },
    { component: <SlideSync />, id: 'sync' },
    { component: <SlideRuntimeModes />, id: 'runtime' },
    { component: <SlideEcosystem />, id: 'ecosystem' },
    { component: <SlideWordPress />, id: 'wordpress' },
    { component: <SlideOmeka />, id: 'omeka' },
    { component: <SlideMoodle />, id: 'moodle' },
    { component: <SlideImprovements />, id: 'improvements' },
    { component: <SlideFeatures />, id: 'features' },
    { component: <SlideClosure />, id: 'closure' },
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-300 overflow-hidden flex flex-col relative">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10" />

      {/* Slide Content */}
      <main className="flex-1 w-full h-full relative overflow-hidden transition-all duration-300">
        {slides[currentSlide].component}
      </main>

      {/* Bottom Navigation */}
      <footer className="h-14 border-t border-slate-800 bg-slate-950/80 backdrop-blur flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4 text-sm font-mono text-slate-500">
          <span className="hidden md:inline">Arquitectura eXeLearning 4.0</span>
          <div className="h-4 w-px bg-slate-800 hidden md:block" />
          <span className="text-slate-300">
            {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full">
          <div
            className="h-full bg-primary-500 transition-all duration-300 ease-out"
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-lg hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-slate-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="p-2 rounded-lg hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-slate-300"
          >
            <ChevronRightIcon size={24} />
          </button>
        </div>
      </footer>
    </div>
  );
}
