import React, { useState, useEffect } from 'react';
import {
  Database, WifiOff, Server,
  Zap, HardDrive, Cpu, Network, Share2,
  FileJson, RefreshCw,
  CheckCircle2, ChevronLeft, ChevronRight as ChevronRightIcon,
  Layers, Package, Shield, Globe, Monitor, Terminal,
  BookOpen,
  Users, LayoutDashboard, ExternalLink
} from 'lucide-react';
import { BackendDiagram } from './components/Diagrams';
import {
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
  <img
    src="https://commons.wikimedia.org/wiki/Special:FilePath/Moodle-logo.svg"
    alt="Moodle"
    className="w-14 h-10 object-contain"
  />
);

const OmekaLogo = () => (
  <img
    src="https://commons.wikimedia.org/wiki/Special:FilePath/OmekaBadge.png"
    alt="Omeka"
    className="w-12 h-12 object-contain"
  />
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
      {['Browser-first', 'Colaboración Yjs', 'Multi-DB', 'Embebible', 'Electron Desktop', 'SCORM · HTML5 · ePub3'].map(tag => (
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
          <strong className="text-white">eXeLearning</strong> es una herramienta <strong className="text-white">libre y gratuita</strong> (AGPL) para la creación de contenidos educativos interactivos. La mantiene el <span className="text-primary-400">CEDEC</span> (Centro de desarrollo curricular en sistemas no propietarios), dependiente del <span className="text-primary-400">INTEF</span>, con la colaboración de las Comunidades Autónomas.
        </p>
        <p className="text-slate-400 leading-relaxed">
          La versión <strong className="text-white">4.0</strong> es una reescritura completa que transforma eXeLearning de una aplicación de escritorio monolítica (Python + Qt) en una <strong className="text-white">plataforma web moderna</strong>, colaborativa y multi-despliegue.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-xl border border-red-500/30 bg-red-950/25 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-red-300 mb-2">2.0</div>
              <div className="text-sm text-slate-200 font-semibold mb-2">Escritorio clásico</div>
              <div className="text-xs text-slate-400 leading-relaxed">Python 2, Twisted y una app monolítica de escritorio.</div>
            </div>
            <div className="rounded-xl border border-orange-500/30 bg-orange-950/25 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-orange-300 mb-2">3.0</div>
              <div className="text-sm text-slate-200 font-semibold mb-2">Reescritura web</div>
              <div className="text-xs text-slate-400 leading-relaxed">Symfony (PHP 8), interfaz web moderna, API REST y colaboración en tiempo real.</div>
            </div>
            <div className="rounded-xl border border-green-500/30 bg-green-950/25 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-green-300 mb-2">4.0</div>
              <div className="text-sm text-slate-200 font-semibold mb-2">Browser-first colaborativo</div>
              <div className="text-xs text-slate-400 leading-relaxed">Yjs + Elysia (Bun), despliegues múltiples y ecosistema de plugins e integraciones.</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <div className="text-2xl font-black text-primary-400">6+</div>
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
        title="Browser-First"
        desc="El navegador es la fuente de verdad durante la sesión. La edición ocurre en memoria (Y.Doc) y los assets se persisten en IndexedDB para continuidad local."
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
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.9fr_1.15fr] gap-4">
        <div className="bg-slate-800/40 rounded-2xl border border-blue-500/30 p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-3">Cliente en memoria</div>
          <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <FileJson size={28} className="text-blue-300" />
              <div>
                <div className="font-mono text-blue-200 font-bold text-sm">Y.Doc (RAM)</div>
                <div className="text-xs text-slate-400">Estado activo del proyecto</div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Estructura CRDT que contiene páginas, cajas de contenido y metadatos de assets. Cada edición se aplica en tiempo real y converge sin conflictos.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-3">
              <div className="text-xs font-bold text-emerald-300 uppercase mb-1">IndexedDB</div>
              <div className="text-xs text-slate-400">Persistencia local de assets y recuperación offline de la sesión.</div>
            </div>
            <div className="bg-cyan-900/20 border border-cyan-500/20 rounded-lg p-3">
              <div className="text-xs font-bold text-cyan-300 uppercase mb-1">WebSocket</div>
              <div className="text-xs text-slate-400">Sincronización binaria Yjs entre clientes conectados.</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 rounded-2xl border border-slate-700 p-5 flex flex-col justify-center">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">Cómo fluye</div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-300"><span className="w-2 h-2 rounded-full bg-blue-400" /> El navegador mantiene la autoridad del documento</div>
            <div className="flex items-center gap-2 text-xs text-slate-300"><span className="w-2 h-2 rounded-full bg-purple-400" /> El servidor no guarda el Y.Doc en RAM</div>
            <div className="flex items-center gap-2 text-xs text-slate-300"><span className="w-2 h-2 rounded-full bg-green-400" /> La persistencia llega por guardado explícito</div>
            <div className="flex items-center gap-2 text-xs text-slate-300"><span className="w-2 h-2 rounded-full bg-orange-400" /> Los assets viajan por un canal separado</div>
          </div>
          <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800/70 p-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              CRDT significa <strong className="text-slate-200">Conflict-free Replicated Data Type</strong>: varias copias del mismo estado pueden editarse a la vez y terminar igualadas automáticamente.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/40 rounded-2xl border border-purple-500/30 p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3">Servidor coordinador</div>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-3">
              <div className="text-xs font-bold text-purple-300 uppercase mb-1">Relay WS</div>
              <div className="text-xs text-slate-400">Reenvía actualizaciones Yjs sin interpretar el documento.</div>
            </div>
            <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-lg p-3">
              <div className="text-xs font-bold text-indigo-300 uppercase mb-1">Auth</div>
              <div className="text-xs text-slate-400">JWT, CAS y OpenID Connect para acceso y sesiones.</div>
            </div>
            <div className="bg-rose-900/20 border border-rose-500/20 rounded-lg p-3">
              <div className="text-xs font-bold text-rose-300 uppercase mb-1">DB</div>
              <div className="text-xs text-slate-400">SQLite, PostgreSQL o MySQL para metadatos y persistencia.</div>
            </div>
            <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-3">
              <div className="text-xs font-bold text-orange-300 uppercase mb-1">Assets</div>
              <div className="text-xs text-slate-400">Ficheros en disco y coordinación de subida entre clientes.</div>
            </div>
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
          <p className="text-sm text-slate-400">Estructura CRDT que contiene páginas, cajas de contenido y metadatos de assets. Cada edición se aplica en RAM y converge sin conflictos.</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h4 className="text-emerald-300 font-mono font-bold mb-1">IndexedDB (exelearning-assets-v2)</h4>
          <p className="text-sm text-slate-400">Almacén persistente del navegador para binarios. Guarda blobs, hash SHA-256, tipo MIME y estado de subida para reabrir proyectos sin perder assets.</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h4 className="text-cyan-300 font-mono font-bold mb-1">Cache API</h4>
          <p className="text-sm text-slate-400">Cachea respuestas y recursos estáticos del editor para arranque rápido y mejor continuidad cuando la conexión es inestable.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <h4 className="text-amber-300 font-mono font-bold mb-1">Sincronización</h4>
          <p className="text-sm text-slate-400">La sincronización con el servidor es continua vía WebSocket, pero el documento sigue viviendo primero en el navegador.</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3">Qué guarda cada capa</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-24 text-xs font-bold text-blue-400 mt-0.5 flex-shrink-0">Y.Doc</div>
              <div className="text-slate-300">Páginas, cajas de contenido y referencias a assets. Es el estado activo del proyecto.</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-24 text-xs font-bold text-emerald-400 mt-0.5 flex-shrink-0">IndexedDB</div>
              <div className="text-slate-300">Blobs y estado local para reabrir proyectos sin depender del servidor.</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-24 text-xs font-bold text-cyan-400 mt-0.5 flex-shrink-0">Servidor</div>
              <div className="text-slate-300">Solo metadatos, persistencia y coordinación entre clientes.</div>
            </div>
          </div>
        </div>
        <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg">
          <p className="text-xs text-blue-200/70 leading-relaxed">
            <strong className="text-blue-300">Idea clave:</strong> el documento cambia en memoria, los binarios se guardan aparte y el navegador siempre conserva la primera copia útil.
          </p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 6: Servidor
const SlideServer = () => (
  <SlideContainer title="Servidor: coordinador sin estado" icon={Server} subtitle="Elysia sobre Bun. No interpreta ni almacena el Y.Doc en memoria. Su papel es relé, autenticación y persistencia.">
    <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-8 h-full content-center">
      <div>
        <BackendDiagram />
      </div>
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3">Qué hace realmente</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2 items-start"><CheckCircle2 size={14} className="text-indigo-400 mt-0.5 flex-shrink-0" />Reenvía deltas Yjs entre clientes sin interpretar el documento.</li>
            <li className="flex gap-2 items-start"><CheckCircle2 size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />Valida acceso con JWT, CAS, OIDC o invitado.</li>
            <li className="flex gap-2 items-start"><CheckCircle2 size={14} className="text-green-400 mt-0.5 flex-shrink-0" />Guarda metadatos en BD y ficheros en disco.</li>
          </ul>
        </div>
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            El servidor no es dueño del contenido. Solo coordina sesiones, assets y persistencia para que varios navegadores trabajen sobre el mismo proyecto.
          </p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 7: Persistencia y Assets
const SlideAssets = () => (
  <SlideContainer title="Persistencia y Assets" icon={FileJson} subtitle="El documento guarda estructura y metadatos; los binarios viven fuera del Y.Doc. Eso evita bloquear la edición.">
    <div className="grid lg:grid-cols-2 gap-8 h-full content-center">
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-blue-300 font-mono font-bold mb-1">1. Documento</h4>
          <p className="text-sm text-slate-400">Yjs mantiene páginas, cajas y referencias a assets. Solo guarda metadatos, no ficheros binarios.</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-emerald-300 font-mono font-bold mb-1">2. Binarios</h4>
          <p className="text-sm text-slate-400">Las imágenes y vídeos se guardan en IndexedDB en el navegador y en disco/BD en el servidor.</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-amber-300 font-mono font-bold mb-1">3. Sin duplicados</h4>
          <p className="text-sm text-slate-400">El hash SHA-256 identifica cada asset. Si el contenido es igual, se reutiliza la misma referencia.</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <Database size={18} className="text-emerald-400" /> Mapa rápido de capas
          </h4>
          <div className="space-y-2 text-sm text-slate-300">
            <div><strong className="text-blue-300">Cliente:</strong> IndexedDB cachea blobs y estado local.</div>
            <div><strong className="text-purple-300">Servidor:</strong> persiste archivos y metadatos del proyecto.</div>
            <div><strong className="text-green-300">BD:</strong> conserva referencias, autoría y trazabilidad.</div>
          </div>
        </div>
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            La consecuencia práctica es simple: editar no depende de tener todos los binarios en memoria, y el proyecto puede reabrirse con su estado coherente.
          </p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 8: Sincronización y Colaboración
const SlideSync = () => (
  <SlideContainer title="Sincronización y Colaboración" icon={RefreshCw} subtitle="Yjs CRDTs + WebSocket relay sin estado. Convergencia automática sin conflictos.">
    <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8">
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <p className="text-slate-400 text-sm leading-relaxed">
            <strong className="text-slate-200">Yjs</strong> sincroniza el documento como deltas binarios. El navegador edita primero, el servidor solo reenvía cambios y varios usuarios terminan en el mismo estado.
          </p>
        </div>
        <div className="grid gap-3">
          <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-1">1. Edita en el navegador</div>
            <div className="text-sm text-slate-300">Cada cambio toca el `Y.Doc` local y se ve al instante.</div>
          </div>
          <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-1">2. Se transmite por WebSocket</div>
            <div className="text-sm text-slate-300">El servidor reenvía el delta binario a los demás clientes sin interpretarlo.</div>
          </div>
          <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-green-300 mb-1">3. Yjs converge sin conflictos</div>
            <div className="text-sm text-slate-300">Si hay ediciones simultáneas, CRDT resuelve el merge automáticamente.</div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <Network size={18} className="text-indigo-400" /> Relay sin estado
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            El servidor no decodifica el contenido ni guarda el documento. Solo hace de puente entre navegadores conectados.
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-white font-bold mb-2">Sync ≠ Save</h4>
          <p className="text-sm text-slate-400">
            La colaboración es continua; el guardado a servidor sigue siendo una acción explícita para persistir el proyecto.
          </p>
        </div>
        <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4">
          <h4 className="text-white font-bold mb-2">Escala bien</h4>
          <p className="text-sm text-slate-300">
            Sin estado en memoria y con Redis opcional, el relay puede crecer horizontalmente.
          </p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full content-start">
        {RUNTIME_MODES.map(mode => {
          const colors = colorMap[mode.color];
          return (
            <div key={mode.name} className={`bg-slate-800/40 rounded-2xl border-2 ${colors.border} px-4 pb-4 pt-6 relative flex flex-col gap-2.5`}>
              <div className={`absolute top-2 left-5 ${colors.badge} text-white px-3 py-0.5 rounded-full text-[11px] font-bold`}>
                {mode.name}
              </div>
              <p className="text-[12px] leading-relaxed text-slate-400 mt-1">{mode.description}</p>
              <ul className="space-y-1">
                {mode.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-[12px] text-slate-300">
                    <CheckCircle2 size={14} className={`mt-0.5 flex-shrink-0 ${colors.icon}`} />
                    {f}
                  </li>
                ))}
              </ul>
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

// SLIDE 11: Mejoras clave de 4.0
const SlideImprovements = () => (
  <SlideContainer title="Mejoras clave de eXeLearning 4.0" icon={Zap} subtitle="Resumen de las mejoras introducidas en la versión 4.0.">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {KEY_IMPROVEMENTS.map((item, index) => {
        const palette = [
          'border-green-500/30 bg-green-950/20',
          'border-cyan-500/30 bg-cyan-950/20',
          'border-blue-500/30 bg-blue-950/20',
          'border-amber-500/30 bg-amber-950/20',
          'border-fuchsia-500/30 bg-fuchsia-950/20',
          'border-emerald-500/30 bg-emerald-950/20',
        ][index % 6];
        return (
          <div key={item.title} className={`rounded-2xl border p-5 ${palette}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-white/70" />
              <h4 className="text-white font-bold text-lg">{item.title}</h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
          </div>
        );
      })}
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
