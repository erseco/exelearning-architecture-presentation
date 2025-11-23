import React, { useState, useEffect, useRef } from 'react';
import { 
  Layers, Database, WifiOff, Server, Save, 
  Zap, HardDrive, Cpu, Network, Share2,
  ArrowRight, FileJson, ChevronRight, Lock, RefreshCw,
  ArrowDown, CheckCircle2, ChevronLeft, ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { TerminalBlock } from './components/TerminalBlock';
import { FlowTimeline } from './components/FlowTimeline';
import { HierarchyDiagram, BackendDiagram } from './components/Diagrams';
import { CODE_YDOC_STRUCTURE, FLOW_SYNC_STEPS, FLOW_ASSET_STEPS } from './content';

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

const StatCard: React.FC<{ label: string, before: string, after: string, saved: string }> = ({ label, before, after, saved }) => (
  <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 relative overflow-hidden">
    <div className="absolute top-0 right-0 bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-bl-lg border-b border-l border-green-500/20">
      {saved}
    </div>
    <h4 className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-4">{label}</h4>
    <div className="flex items-center justify-between">
      <div className="text-center opacity-50">
        <div className="text-lg font-mono text-red-400 line-through decoration-red-500/50">{before}</div>
        <div className="text-xs text-slate-500 mt-1">Antes</div>
      </div>
      <ArrowRight size={20} className="text-slate-600" />
      <div className="text-center">
        <div className="text-2xl font-mono text-primary-400 font-bold">{after}</div>
        <div className="text-xs text-slate-500 mt-1">Ahora</div>
      </div>
    </div>
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
      Presentación Técnica
    </div>
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
      Nueva Arquitectura <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">para eXeLearning</span>
    </h1>
    <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed mb-10">
      Un enfoque <strong>Offline-First</strong> y colaborativo basado en Yjs para transformar la creación de contenidos educativos.
    </p>
    <div className="text-slate-500 text-sm font-mono flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
      <span className="bg-slate-700 px-1.5 rounded text-slate-300">←</span> 
      <span className="bg-slate-700 px-1.5 rounded text-slate-300">→</span> 
      Usar flechas para navegar
    </div>
  </div>
);

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
            <Server className="text-purple-400" /> Backend (NestJS)
          </h3>
          <p className="text-slate-400 mb-4 text-sm">
              Actúa como un router inteligente. No procesa lógica de negocio compleja sobre el contenido.
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
              <h4 className="text-blue-300 font-mono font-bold mb-1">DocumentManager</h4>
              <p className="text-sm text-slate-400">Orquestador principal. Gestiona la instancia Y.Doc, la persistencia en IndexedDB y la conexión WebSocketProvider.</p>
            </div>
            <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
              <h4 className="text-blue-300 font-mono font-bold mb-1">AssetManager</h4>
              <p className="text-sm text-slate-400">Sistema de caché inteligente. Intercepta peticiones de imágenes, verifica caché local y solicita vía P2P si es necesario.</p>
            </div>
            <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
              <h4 className="text-blue-300 font-mono font-bold mb-1">IndexedDB</h4>
              <p className="text-sm text-slate-400">
                Almacenamiento persistente en navegador.
                <br/><span className="text-slate-500 text-xs">store: y-indexeddb (historial cambios)</span>
                <br/><span className="text-slate-500 text-xs">store: assets-blob (archivos binarios)</span>
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

const SlideMetrics = () => (
  <SlideContainer title="Impacto y Métricas" icon={Zap}>
     <div className="flex flex-col h-full justify-center">
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <StatCard 
            label="Tráfico de Red (Inicio)" 
            before="~5 MB" 
            after="~50 KB" 
            saved="-99%" 
        />
          <StatCard 
            label="Tiempo de Carga (2ª vez)" 
            before="5-10s" 
            after="<300ms" 
            saved="Instant" 
        />
          <StatCard 
            label="Ancho de Banda Semanal" 
            before="300 MB" 
            after="6 MB" 
            saved="-98%" 
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
            <h4 className="text-white font-bold mb-4">Estrategias Clave</h4>
            <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <div className="mt-1 p-1 bg-green-500/20 text-green-400 rounded"><CheckCircle2 size={14}/></div>
                  <div>
                      <strong className="text-slate-200 block text-sm">Compresión Delta</strong>
                      <span className="text-xs text-slate-400">Solo se envían los cambios, no el archivo entero.</span>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="mt-1 p-1 bg-green-500/20 text-green-400 rounded"><CheckCircle2 size={14}/></div>
                  <div>
                      <strong className="text-slate-200 block text-sm">Batching de Websocket</strong>
                      <span className="text-xs text-slate-400">Agrupa eventos rápidos en un solo paquete de red.</span>
                  </div>
                </li>
            </ul>
          </div>
          
          <div className="flex flex-col justify-center items-center text-center p-8 bg-gradient-to-br from-primary-900/20 to-slate-900 rounded-xl border border-primary-500/20">
            <Cpu size={48} className="text-primary-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Browser Computing</h3>
            <p className="text-slate-400 text-sm max-w-xs">
                Movemos el coste computacional del servidor (centralizado) al dispositivo del usuario (distribuido).
            </p>
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
    { component: <SlidePrinciples />, id: 'principles' },
    { component: <SlideHierarchy />, id: 'hierarchy' },
    { component: <SlideComponents />, id: 'components' },
    { component: <SlideSync />, id: 'sync' },
    { component: <SlideAssets />, id: 'assets' },
    { component: <SlideMetrics />, id: 'metrics' },
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
          <span className="hidden md:inline">eXeLearning Arch v3.1</span>
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
