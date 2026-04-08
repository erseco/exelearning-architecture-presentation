import React, { useState, useEffect } from 'react';
import { 
  Database, WifiOff, Server, 
  Zap, HardDrive, Cpu, Network, Share2,
  FileJson, Lock, RefreshCw,
  CheckCircle2, ChevronLeft, ChevronRight as ChevronRightIcon,
  Layers, Package, Shield, Globe, Smartphone, Terminal
} from 'lucide-react';
import { TerminalBlock } from './components/TerminalBlock';
import { FlowTimeline } from './components/FlowTimeline';
import { HierarchyDiagram, BackendDiagram } from './components/Diagrams';
import { CODE_YDOC_STRUCTURE, FLOW_SYNC_STEPS, FLOW_ASSET_STEPS, TECH_STACK, RUNTIME_MODES } from './content';

// --- Components ---

const FeatureCard: React.FC<{ icon: React.ElementType, title: string, desc: string, accent?: string }> = ({ icon: Icon, title, desc, accent = "blue" }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all hover:shadow-xl group h-full">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors 
      ${accent === 'purple' ? 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30' : 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30'}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold text-slate-200 mb-2">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

interface SlideContainerProps {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}

const SlideContainer: React.FC<SlideContainerProps> = ({ title, icon: Icon, children }) => {
  return (
    <div className="h-full w-full max-w-6xl mx-auto flex flex-col px-6 md:px-12 pt-8 pb-20">
      <div className="flex items-center gap-4 mb-8 flex-shrink-0">
        {Icon && <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-400"><Icon size={32} /></div>}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {children}
      </div>
    </div>
  )
}

// --- Slides Content ---

const SlideHero = () => (
  <div className="h-full flex flex-col justify-center items-center text-center px-4">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 text-accent-400 text-xs font-medium mb-8 border border-accent-500/20">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
      </span>
      Presentación Técnica — Nueva Arquitectura
    </div>
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
      eXeLearning 4<br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Arquitectura Moderna</span>
    </h1>
    <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-6">
      Reescrito con <strong className="text-orange-400">Bun</strong> + <strong className="text-sky-400">TypeScript</strong> + <strong className="text-violet-400">Elysia</strong>.<br/>
      <strong>Offline-First</strong>, colaborativo en tiempo real con <strong className="text-green-400">Yjs</strong> y disponible como app de escritorio con <strong className="text-cyan-400">Electron</strong>.
    </p>
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {['Bun Runtime', 'Elysia Framework', 'Yjs CRDT', 'WebSocket', 'SQLite · PG · MySQL', 'Electron Desktop', 'Docker'].map(tag => (
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

const SlideTechStack = () => {
  const colorMap: Record<string, string> = {
    orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    violet: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    blue:   'bg-blue-500/20   text-blue-400   border-blue-500/30',
    sky:    'bg-sky-500/20    text-sky-400    border-sky-500/30',
    green:  'bg-green-500/20  text-green-400  border-green-500/30',
    cyan:   'bg-cyan-500/20   text-cyan-400   border-cyan-500/30',
  };
  return (
    <SlideContainer title="Stack Tecnológico" icon={Package}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 h-full content-center">
        {TECH_STACK.map(item => (
          <div key={item.name} className={`rounded-xl border p-5 bg-slate-800/40 hover:bg-slate-800/70 transition-colors ${colorMap[item.color]}`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-black">{item.name}</span>
            </div>
            <div className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-2">{item.role}</div>
            <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500 justify-center">
        <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">Bootstrap UI</span>
        <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">Nunjucks Templates</span>
        <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">Vitest + Playwright</span>
        <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">Biome Linter</span>
        <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">Redis (multi-instancia)</span>
        <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">Docker</span>
      </div>
    </SlideContainer>
  );
};

const SlideRuntimeModes = () => {
  const colorBorder: Record<string, string> = {
    blue: 'border-blue-500/50',
    green: 'border-green-500/50',
    purple: 'border-purple-500/50',
  };
  const colorBadge: Record<string, string> = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
  };
  const colorIcon: Record<string, string> = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
  };
  return (
    <SlideContainer title="Modos de Ejecución" icon={Layers}>
      <p className="text-slate-400 mb-6 max-w-3xl">
        eXeLearning soporta tres modos de despliegue, cada uno con sus propias capacidades y casos de uso.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full content-start">
        {RUNTIME_MODES.map(mode => (
          <div key={mode.name} className={`bg-slate-800/40 rounded-2xl border-2 ${colorBorder[mode.color]} p-6 relative flex flex-col gap-4`}>
            <div className={`absolute -top-3 left-5 ${colorBadge[mode.color]} text-white px-3 py-0.5 rounded-full text-xs font-bold`}>
              {mode.name}
            </div>
            <ul className="space-y-2 mt-2">
              {mode.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={14} className={`mt-0.5 flex-shrink-0 ${colorIcon[mode.color]}`} />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 font-mono text-xs text-slate-400 break-all">
              {mode.deploy}
            </div>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};


const SlidePrinciples = () => (
  <SlideContainer title="Principios Arquitectónicos" icon={Cpu}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full content-center">
      <FeatureCard 
        icon={WifiOff} 
        title="Offline-First" 
        desc="El cliente es completamente funcional sin servidor. Toda la edición ocurre en memoria y persiste en IndexedDB localmente."
      />
      <FeatureCard 
        icon={Server} 
        title="Servidor Stateless" 
        desc="El backend no mantiene estado de documentos. Actúa solo como Relay de WebSockets y Coordinador de assets."
        accent="purple"
      />
      <FeatureCard 
        icon={HardDrive} 
        title="Lazy Loading" 
        desc="Nada se carga hasta que se necesita. Los assets pesados (imágenes/videos) se solicitan bajo demanda P2P."
      />
      <FeatureCard 
        icon={Share2} 
        title="Peer Coordination" 
        desc="Los clientes colaboran directamente. El servidor no interpreta el contenido, garantizando privacidad y velocidad."
        accent="purple"
      />
    </div>
  </SlideContainer>
);

const SlideHierarchy = () => (
  <SlideContainer title="Jerarquía de Fuentes de Verdad" icon={Database}>
     <div className="flex flex-col h-full">
        <p className="text-slate-400 mb-8 max-w-3xl">
          El modelo invierte la arquitectura tradicional. El <strong>Cliente</strong> es la autoridad primaria durante la sesión, mientras que el <strong>Servidor</strong> actúa solo como backup y punto de encuentro.
        </p>
        <div className="flex-1 flex items-center justify-center">
           <HierarchyDiagram />
        </div>
     </div>
  </SlideContainer>
);

const SlideComponents = () => (
  <SlideContainer title="Componentes del Sistema" icon={Server}>
    <div className="grid md:grid-cols-2 gap-12 h-full">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Server className="text-orange-400" /> Backend (Elysia + Bun)
          </h3>
          <p className="text-slate-400 mb-4 text-sm">
              Router type-safe sobre Bun. Gestiona autenticación, proyectos, assets y el relay WebSocket para colaboración.
          </p>
        </div>
        <div className="flex-1">
          <BackendDiagram />
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Lock className="text-blue-400" /> Frontend (Cliente)
        </h3>
        <div className="grid gap-4">
            <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
              <h4 className="text-blue-300 font-mono font-bold mb-1">YjsDocumentManager</h4>
              <p className="text-sm text-slate-400">Orquestador principal. Gestiona la instancia Y.Doc, la persistencia en IndexedDB y la conexión WebSocketProvider (y-websocket).</p>
            </div>
            <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
              <h4 className="text-blue-300 font-mono font-bold mb-1">AssetManager</h4>
              <p className="text-sm text-slate-400">Sistema de caché inteligente con cola de prioridad. Intercepta peticiones de imágenes, verifica caché local y solicita vía P2P si es necesario.</p>
            </div>
            <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
              <h4 className="text-blue-300 font-mono font-bold mb-1">IndexedDB</h4>
              <p className="text-sm text-slate-400">
                Almacenamiento persistente en navegador.
                <br/><span className="text-slate-500 text-xs">store: y-indexeddb (historial cambios Yjs)</span>
                <br/><span className="text-slate-500 text-xs">store: assets-blob (archivos binarios, content-addressable)</span>
              </p>
            </div>
        </div>
      </div>
    </div>
  </SlideContainer>
);

const SlideSync = () => (
  <SlideContainer title="Flujo de Sincronización" icon={RefreshCw}>
    <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-slate-400 mb-8">
            La sincronización utiliza <strong>CRDTs (Conflict-free Replicated Data Types)</strong>. 
            Cada cambio es un delta matemático que se propaga sin conflictos.
          </p>
          <FlowTimeline steps={FLOW_SYNC_STEPS} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Estructura de Datos Yjs</h4>
          <TerminalBlock content={CODE_YDOC_STRUCTURE} title="YDoc_schema.ts" highlight />
          
          <div className="mt-6 bg-amber-900/20 border border-amber-500/20 p-5 rounded-lg">
              <h5 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-2">
                <Network size={16}/> Resolución de Conflictos
              </h5>
              <p className="text-xs text-amber-200/70 leading-relaxed">
                Si dos usuarios editan el mismo párrafo simultáneamente, Yjs garantiza que ambos converjan al mismo estado final automáticamente, preservando la intención de ambos.
              </p>
          </div>
        </div>
    </div>
  </SlideContainer>
);

const SlideAssets = () => (
  <SlideContainer title="Gestión de Assets (P2P)" icon={FileJson}>
    <div className="mb-8">
      <p className="text-lg text-slate-300 max-w-3xl">
        Para mantener el documento ligero, los archivos binarios (imágenes, videos) <strong>NO se guardan dentro del documento Yjs</strong>. Se transfieren bajo demanda.
      </p>
    </div>
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-10">
        <FlowTimeline steps={FLOW_ASSET_STEPS} />
    </div>
  </SlideContainer>
);

const SlideFeatures = () => (
  <SlideContainer title="Características y Capacidades" icon={Zap}>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={18} className="text-green-400" />
          <h4 className="text-white font-bold">Autenticación</h4>
        </div>
        <ul className="space-y-1 text-sm text-slate-300">
          {['Password (local)', 'CAS (SSO institucional)', 'OpenID Connect (OIDC)', 'Guest (acceso temporal)', 'Sin auth (modo offline)'].map(m => (
            <li key={m} className="flex gap-2 items-center"><CheckCircle2 size={12} className="text-green-500/70 flex-shrink-0" />{m}</li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Database size={18} className="text-blue-400" />
          <h4 className="text-white font-bold">Bases de Datos</h4>
        </div>
        <ul className="space-y-1 text-sm text-slate-300">
          {['SQLite (por defecto)', 'PostgreSQL', 'MySQL / MariaDB', 'ORM Kysely (type-safe)', 'Multi-instancia con Redis'].map(m => (
            <li key={m} className="flex gap-2 items-center"><CheckCircle2 size={12} className="text-blue-500/70 flex-shrink-0" />{m}</li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Package size={18} className="text-violet-400" />
          <h4 className="text-white font-bold">Exportación</h4>
        </div>
        <ul className="space-y-1 text-sm text-slate-300">
          {['HTML5 (web autónoma)', 'SCORM 1.2 y SCORM 2004', 'IMS Content Package', 'ePub3 (e-readers)', 'Integración con Moodle'].map(m => (
            <li key={m} className="flex gap-2 items-center"><CheckCircle2 size={12} className="text-violet-500/70 flex-shrink-0" />{m}</li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Smartphone size={18} className="text-cyan-400" />
          <h4 className="text-white font-bold">Instaladores Desktop</h4>
        </div>
        <ul className="space-y-1 text-sm text-slate-300">
          {['Electron (Win / macOS / Linux)', 'Formato .elpx (nuevo)', 'Compatibilidad .elp (legacy)', 'Actualizaciones automáticas', 'Firma y notarización'].map(m => (
            <li key={m} className="flex gap-2 items-center"><CheckCircle2 size={12} className="text-cyan-500/70 flex-shrink-0" />{m}</li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Globe size={18} className="text-amber-400" />
          <h4 className="text-white font-bold">iDevices & i18n</h4>
        </div>
        <ul className="space-y-1 text-sm text-slate-300">
          {['Múltiples iDevices interactivos', 'ES, CA, EU, GL, VA, EO, EN', 'Temas personalizables', 'Import/install de iDevices online', 'Import/install de estilos online'].map(m => (
            <li key={m} className="flex gap-2 items-center"><CheckCircle2 size={12} className="text-amber-500/70 flex-shrink-0" />{m}</li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Terminal size={18} className="text-orange-400" />
          <h4 className="text-white font-bold">Inicio Rápido</h4>
        </div>
        <div className="space-y-2">
          <div className="bg-slate-900 rounded-lg px-3 py-2 font-mono text-xs text-green-300 border border-slate-700">
            # Docker (1 comando)<br/>
            docker run -p 8080:8080 \<br/>
            &nbsp;&nbsp;exelearning/exelearning
          </div>
          <div className="bg-slate-900 rounded-lg px-3 py-2 font-mono text-xs text-blue-300 border border-slate-700">
            # Desarrollo local<br/>
            git clone …/exelearning<br/>
            make up-local
          </div>
        </div>
      </div>

    </div>
  </SlideContainer>
);

// --- Main App Controller ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: <SlideHero />, id: 'hero' },
    { component: <SlideTechStack />, id: 'techstack' },
    { component: <SlideRuntimeModes />, id: 'runtime' },
    { component: <SlidePrinciples />, id: 'principles' },
    { component: <SlideHierarchy />, id: 'hierarchy' },
    { component: <SlideComponents />, id: 'components' },
    { component: <SlideSync />, id: 'sync' },
    { component: <SlideAssets />, id: 'assets' },
    { component: <SlideFeatures />, id: 'features' },
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-300 overflow-hidden flex flex-col relative">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10"></div>

      {/* Slide Content Area */}
      <main className="flex-1 w-full h-full relative overflow-hidden transition-all duration-300">
        {slides[currentSlide].component}
      </main>

      {/* Navigation Controls (Bottom Bar) */}
      <footer className="h-16 border-t border-slate-800 bg-slate-950/80 backdrop-blur flex items-center justify-between px-6 z-50">
        
        {/* Progress Info */}
        <div className="flex items-center gap-4 text-sm font-mono text-slate-500">
          <span className="hidden md:inline">eXeLearning Arch v4.0</span>
          <div className="h-4 w-px bg-slate-800 hidden md:block"></div>
          <span className="text-slate-300">
            {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full">
           <div 
             className="h-full bg-primary-500 transition-all duration-300 ease-out"
             style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
           ></div>
        </div>

        {/* Controls */}
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
