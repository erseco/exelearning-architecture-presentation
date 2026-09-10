import React, { useState, useEffect } from 'react';
import {
  Database, WifiOff, Server,
  Zap, HardDrive, Cpu, Network, Share2,
  FileJson, RefreshCw,
  CheckCircle2, ChevronLeft, ChevronRight as ChevronRightIcon,
  Layers, Package, Shield, Globe, Monitor, Terminal,
  BookOpen,
  Users, LayoutDashboard, ExternalLink, Sun, Moon
} from 'lucide-react';
import { NextcloudLogo } from './components/NextcloudLogo';
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
      <span className="text-slate-300">Edición en el navegador</span>, colaborativa en tiempo real,
      con múltiples modos de despliegue e integración con <span className="text-slate-300">WordPress</span>, <span className="text-slate-300">Moodle</span>, <span className="text-slate-300">Omeka S</span> y <span className="text-slate-300">Nextcloud</span>.
    </p>
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {['Edición en el navegador', 'Colaboración Yjs', 'Varias bases de datos', 'Integrable', 'Escritorio con Electron', 'SCORM · HTML5 · ePub3'].map(tag => (
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
              <div className="text-sm text-slate-200 font-semibold mb-2">Edición en el navegador colaborativo</div>
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
        title="Edición en el navegador"
        desc="La edición ocurre en memoria (Y.Doc). IndexedDB conserva el documento y Cache API almacena los archivos, con IndexedDB como alternativa."
      />
      <FeatureCard
        icon={Server}
        title="Servicios del servidor"
        desc="El servidor controla el acceso, guarda los archivos y transmite los cambios entre las personas que editan."
        accent="purple"
      />
      <FeatureCard
        icon={HardDrive}
        title="Sincronización y guardado"
        desc="La sincronización comparte cambios. El guardado conserva el proyecto; las sesiones colaborativas de Cloud también disponen de autoguardado."
        accent="green"
      />
      <FeatureCard
        icon={Share2}
        title="Misma base, múltiples despliegues"
        desc="Online ejecuta el editor en el navegador. Cloud añade colaboración y guardado en servidor. Los plugins y la aplicación de escritorio integran la versión embebida."
        accent="orange"
      />
    </div>
  </SlideContainer>
);

// SLIDE 4: Arquitectura General
const SlideArchitecture = () => (
  <SlideContainer title="Arquitectura General" icon={Layers} subtitle="Visión global del sistema: navegador, servidor, almacenamiento y cómo interactúan.">
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
              Documento compartido con páginas, bloques de contenido e información de los archivos. Yjs combina los cambios de las personas que editan.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-3">
              <div className="text-xs font-bold text-emerald-300 uppercase mb-1">IndexedDB</div>
              <div className="text-xs text-slate-400">Estado del documento. Los archivos se almacenan en Cache API, con IndexedDB como alternativa.</div>
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
            <div className="flex items-center gap-2 text-xs text-slate-300"><span className="w-2 h-2 rounded-full bg-blue-400" /> El navegador mantiene el estado de edición</div>
            <div className="flex items-center gap-2 text-xs text-slate-300"><span className="w-2 h-2 rounded-full bg-purple-400" /> El servidor transmite los cambios entre usuarios</div>
            <div className="flex items-center gap-2 text-xs text-slate-300"><span className="w-2 h-2 rounded-full bg-green-400" /> Guardado manual o autoguardado colaborativo</div>
            <div className="flex items-center gap-2 text-xs text-slate-300"><span className="w-2 h-2 rounded-full bg-orange-400" /> Los archivos viajan por un canal separado</div>
          </div>
          <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800/70 p-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Yjs combina las aportaciones</strong> de varias personas para que todas vean el mismo contenido.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/40 rounded-2xl border border-purple-500/30 p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3">Servidor de Cloud</div>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-3">
              <div className="text-xs font-bold text-purple-300 uppercase mb-1">Transmisión de cambios</div>
              <div className="text-xs text-slate-400">Reenvía actualizaciones Yjs sin interpretar el documento.</div>
            </div>
            <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-lg p-3">
              <div className="text-xs font-bold text-indigo-300 uppercase mb-1">Acceso</div>
              <div className="text-xs text-slate-400">JWT, CAS y OpenID Connect para acceso y sesiones.</div>
            </div>
            <div className="bg-rose-900/20 border border-rose-500/20 rounded-lg p-3">
              <div className="text-xs font-bold text-rose-300 uppercase mb-1">Base de datos</div>
              <div className="text-xs text-slate-400">SQLite, PostgreSQL o MySQL para información del proyecto y guardado.</div>
            </div>
            <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-3">
              <div className="text-xs font-bold text-orange-300 uppercase mb-1">Archivos</div>
              <div className="text-xs text-slate-400">Ficheros en disco y coordinación de subida entre clientes.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech badges */}
      <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500 justify-center">
        {['Bun (ejecución)', 'Elysia (API web)', 'Kysely (consultas a la BD)', 'Yjs (edición compartida)', 'Bootstrap 5', 'Nunjucks', 'Biome', 'Vitest + Playwright', 'Docker', 'Redis (varios servidores)'].map(t => (
          <span key={t} className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">{t}</span>
        ))}
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 5: Cliente
const SlideClient = () => (
  <SlideContainer title="Cliente: edición en el navegador" icon={Globe} subtitle="Todo el estado de edición vive en el navegador. El servidor solo interviene para coordinar y guardar.">
    <div className="grid md:grid-cols-2 gap-8 h-full content-center">
      <div className="space-y-4">
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h4 className="text-blue-300 font-mono font-bold mb-1">Y.Doc (Memoria RAM)</h4>
          <p className="text-sm text-slate-400">Documento compartido con páginas, bloques e información de los archivos. Los cambios se aplican en la memoria del navegador.</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h4 className="text-emerald-300 font-mono font-bold mb-1">IndexedDB</h4>
          <p className="text-sm text-slate-400">Almacena el estado del documento Yjs en el navegador. También sirve como alternativa para archivos si Cache API no está disponible.</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h4 className="text-cyan-300 font-mono font-bold mb-1">Cache API</h4>
          <p className="text-sm text-slate-400">Almacena los archivos del proyecto en el navegador. Los binarios se mantienen separados de la estructura del documento.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <h4 className="text-amber-300 font-mono font-bold mb-1">Sincronización</h4>
          <p className="text-sm text-slate-400">En Cloud, WebSocket sincroniza los cambios entre usuarios. El estado de edición se mantiene en el navegador.</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3">Qué guarda cada capa</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-24 text-xs font-bold text-blue-400 mt-0.5 flex-shrink-0">Y.Doc</div>
              <div className="text-slate-300">Páginas, bloques de contenido y referencias a archivos. Es el estado activo del proyecto.</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-24 text-xs font-bold text-emerald-400 mt-0.5 flex-shrink-0">IndexedDB</div>
              <div className="text-slate-300">Estado local del documento; archivos como alternativa a Cache API.</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-24 text-xs font-bold text-cyan-400 mt-0.5 flex-shrink-0">Servidor</div>
              <div className="text-slate-300">Proyectos guardados, archivos y coordinación entre clientes.</div>
            </div>
          </div>
        </div>
        <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg">
          <p className="text-xs text-blue-200/70 leading-relaxed">
            <strong className="text-blue-300">Idea clave:</strong> el documento cambia en memoria, los binarios se guardan aparte y guardar el proyecto permite conservarlo fuera de la sesión.
          </p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 6: Servidor
const SlideServer = () => (
  <SlideContainer title="Cloud: API, colaboración y guardado" icon={Server} subtitle="Elysia sobre Bun. Gestiona autenticación, sincronización y guardado del proyecto.">
    <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-8 h-full content-center">
      <div>
        <BackendDiagram />
      </div>
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3">Qué hace realmente</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2 items-start"><CheckCircle2 size={14} className="text-indigo-400 mt-0.5 flex-shrink-0" />Transmite los cambios entre las personas que editan el proyecto.</li>
            <li className="flex gap-2 items-start"><CheckCircle2 size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />Valida acceso con JWT, CAS, OIDC o invitado.</li>
            <li className="flex gap-2 items-start"><CheckCircle2 size={14} className="text-green-400 mt-0.5 flex-shrink-0" />Guarda metadatos en BD y ficheros en disco.</li>
          </ul>
        </div>
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Compartir cambios y guardar son tareas distintas. El servidor también recupera el documento a partir de los datos guardados.
          </p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

// SLIDE 7: Guardado y archivos
const SlideAssets = () => (
  <SlideContainer title="Guardado y archivos" icon={FileJson} subtitle="El documento guarda estructura y metadatos; los binarios viven fuera del Y.Doc. Eso evita bloquear la edición.">
    <div className="grid lg:grid-cols-2 gap-8 h-full content-center">
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-blue-300 font-mono font-bold mb-1">1. Documento</h4>
          <p className="text-sm text-slate-400">Yjs mantiene las páginas, los bloques y su contenido. Las imágenes y vídeos se guardan por separado.</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-emerald-300 font-mono font-bold mb-1">2. Imágenes, audio y vídeo</h4>
          <p className="text-sm text-slate-400">Las imágenes y vídeos se guardan en Cache API (o IndexedDB) en el navegador y en disco en el servidor; la BD conserva metadatos.</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-amber-300 font-mono font-bold mb-1">3. Sin duplicados</h4>
          <p className="text-sm text-slate-400">SHA-256 calcula una huella del archivo. Si dos archivos tienen el mismo contenido, se puede reutilizar la misma copia.</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <Database size={18} className="text-emerald-400" /> Mapa rápido de capas
          </h4>
          <div className="space-y-2 text-sm text-slate-300">
            <div><strong className="text-blue-300">Cliente:</strong> IndexedDB conserva el documento; Cache API almacena los archivos.</div>
            <div><strong className="text-purple-300">Servidor:</strong> guarda archivos e información del proyecto.</div>
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
  <SlideContainer title="Sincronización y Colaboración" icon={RefreshCw} subtitle="Yjs combina los cambios del documento y WebSocket los transmite entre usuarios.">
    <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8">
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <p className="text-slate-400 text-sm leading-relaxed">
            <strong className="text-slate-200">Yjs</strong> combina los cambios del documento. El servidor los transmite para que las personas que colaboran vean el mismo contenido.
          </p>
        </div>
        <div className="grid gap-3">
          <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-1">1. Edita en el navegador</div>
            <div className="text-sm text-slate-300">Cada cambio actualiza el documento Yjs local y se ve al instante.</div>
          </div>
          <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-1">2. Se transmite por WebSocket</div>
            <div className="text-sm text-slate-300">El servidor transmite el cambio a los demás participantes.</div>
          </div>
          <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-green-300 mb-1">3. Yjs combina los cambios</div>
            <div className="text-sm text-slate-300">Yjs combina las ediciones simultáneas para que todos vean el mismo contenido.</div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <Network size={18} className="text-indigo-400" /> Transmisión de cambios
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            El servidor transmite los cambios durante la colaboración. Por separado, guarda y recupera los proyectos.
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h4 className="text-white font-bold mb-2">Sincronizar y guardar</h4>
          <p className="text-sm text-slate-400">
            Cloud permite guardado manual y autoguardado tras la participación de otro colaborador. Este autoguardado no se activa en Online ni en la versión embebida.
          </p>
        </div>
        <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4">
          <h4 className="text-white font-bold mb-2">Coordinación entre servidores</h4>
          <p className="text-sm text-slate-300">
            Redis ayuda a coordinar varios servidores cuando trabajan juntos.
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
    <SlideContainer title="Modos de Ejecución" icon={Layers} subtitle="Online para editar en el navegador, Cloud para colaborar y versión embebida en plugins y escritorio.">
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
                  {integration.name === 'Nextcloud' && <NextcloudLogo />}
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
            'Descarga de iDevices y estilos',
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
            'Acceso como otro usuario con registro de actividad',
            'Permisos por rol y límites de almacenamiento',
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
            'Pruebas de la interfaz (Vitest)',
            'Pruebas de uso completo (Playwright)',
            'Revisión del código con Biome',
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
        { label: 'Edición en el navegador', desc: 'Estado de edición local', icon: Globe },
        { label: 'Colaborativo', desc: 'Edición compartida con Yjs', icon: Users },
        { label: 'Multi-despliegue', desc: 'Online · Cloud · Embebida', icon: Layers },
        { label: 'Ecosistema', desc: 'WordPress · Moodle · Omeka S · Nextcloud', icon: ExternalLink },
      ].map(item => (
        <div key={item.label} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
          <item.icon size={24} className="mx-auto text-primary-400 mb-2" />
          <div className="text-white font-bold text-sm">{item.label}</div>
          <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
        </div>
      ))}
    </div>

    {/* Platform logos */}
    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-8 text-slate-500">
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
      <div className="flex flex-col items-center gap-1">
        <NextcloudLogo />
        <span className="text-xs">Nextcloud</span>
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
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('presentation-theme', theme);
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }, [theme]);

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
      // Let focused controls handle Space and other keys themselves.
      if (e.target instanceof HTMLElement && e.target.closest('button, a, input, textarea, select, [contenteditable]')) return;
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
            type="button"
            onClick={() => setTheme(value => value === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            title={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="theme-toggle p-2 rounded-lg hover:bg-slate-800 text-slate-300"
          >
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button
            aria-label="Diapositiva anterior"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-lg hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-slate-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            aria-label="Diapositiva siguiente"
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
