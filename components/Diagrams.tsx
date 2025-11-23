import React from 'react';
import { Database, Server, Smartphone, HardDrive, Wifi, ArrowDown, ArrowUp, ArrowLeftRight, FileJson, Layers } from 'lucide-react';

export const HierarchyDiagram = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center gap-8 font-sans">
      
      {/* CLIENTE */}
      <div className="w-full bg-slate-800/50 rounded-2xl border-2 border-blue-500/50 p-6 relative">
        <div className="absolute -top-3 left-6 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Prioridad 1: Cliente (Edición)
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 py-4">
          {/* Y.Doc */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-blue-900/30 rounded-xl border border-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform">
              <FileJson size={40} className="text-blue-300" />
            </div>
            <div className="mt-3 font-mono text-blue-200 font-bold">Y.Doc</div>
            <div className="text-xs text-slate-400 mt-1">Memoria RAM</div>
          </div>

          {/* Arrows */}
          <div className="flex flex-col items-center gap-1">
             <ArrowLeftRight size={24} className="text-slate-500 animate-pulse" />
             <span className="text-[10px] text-slate-500 uppercase font-bold">Sync &lt; 100ms</span>
          </div>

          {/* IndexedDB */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-emerald-900/30 rounded-xl border border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10 group-hover:scale-105 transition-transform">
              <Database size={40} className="text-emerald-300" />
            </div>
            <div className="mt-3 font-mono text-emerald-200 font-bold">IndexedDB</div>
            <div className="text-xs text-slate-400 mt-1">Persistencia Local</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-slate-400 bg-slate-900/50 p-3 rounded-lg">
           <span>✓ Edición Instantánea</span>
           <span>✓ Undo/Redo Local</span>
           <span>✓ Auto-Sync</span>
        </div>
      </div>

      {/* CONNECTION ARROW */}
      <div className="flex flex-col items-center text-slate-500">
        <div className="h-12 w-0.5 bg-gradient-to-b from-blue-500/50 to-purple-500/50"></div>
        <ArrowDown size={24} className="text-slate-600" />
        <span className="text-xs bg-slate-900 px-2 py-1 rounded border border-slate-800 mt-2">Solo al Guardar (Manual)</span>
      </div>

      {/* SERVER */}
      <div className="w-full bg-slate-800/50 rounded-2xl border-2 border-purple-500/50 p-6 relative opacity-80">
        <div className="absolute -top-3 left-6 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Prioridad 2: Servidor (Backup)
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12 py-4">
          <div className="flex items-center gap-4 bg-purple-900/20 p-4 rounded-xl border border-purple-500/20">
             <Server size={32} className="text-purple-400" />
             <div className="text-left">
                <div className="font-bold text-slate-200">Base de Datos</div>
                <div className="text-xs text-slate-400">PostgreSQL / MariaDB</div>
             </div>
          </div>

          <div className="h-full w-px bg-purple-500/20 hidden md:block"></div>

          <div className="grid grid-cols-2 gap-4 text-sm">
             <div className="bg-slate-900 p-3 rounded border border-slate-700">
                <div className="font-mono text-purple-300 mb-1">projects</div>
                <div className="text-xs text-slate-500">Blob binario (Yjs)</div>
             </div>
             <div className="bg-slate-900 p-3 rounded border border-slate-700">
                <div className="font-mono text-purple-300 mb-1">assets</div>
                <div className="text-xs text-slate-500">Archivos (Imágenes/Videos)</div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export const BackendDiagram = () => {
  return (
    <div className="w-full max-w-3xl mx-auto font-sans">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.5)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
            {/* Title */}
            <div className="flex items-center gap-3 mb-8 bg-slate-800 px-6 py-2 rounded-full border border-slate-600 shadow-xl">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <span className="font-bold text-slate-200">NestJS Server</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
               
               {/* GATEWAY */}
               <div className="bg-indigo-900/20 border border-indigo-500/40 p-5 rounded-lg flex flex-col gap-3 hover:bg-indigo-900/30 transition-colors">
                  <div className="flex items-center justify-between text-indigo-300 mb-2">
                     <span className="font-mono font-bold">YjsGateway</span>
                     <Wifi size={18} />
                  </div>
                  <div className="bg-slate-950/50 p-2 rounded text-xs text-slate-400 font-mono border border-indigo-500/20">
                     Port: 3000/yjs (WS)
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 ml-1 list-disc list-inside">
                     <li>Pure Relay (Sin memoria)</li>
                     <li>Binary Forwarding</li>
                     <li>Rooms por proyecto</li>
                  </ul>
               </div>

               {/* ASSET COORDINATOR */}
               <div className="bg-cyan-900/20 border border-cyan-500/40 p-5 rounded-lg flex flex-col gap-3 hover:bg-cyan-900/30 transition-colors">
                  <div className="flex items-center justify-between text-cyan-300 mb-2">
                     <span className="font-mono font-bold">AssetCoordinator</span>
                     <Layers size={18} />
                  </div>
                  <div className="bg-slate-950/50 p-2 rounded text-xs text-slate-400 font-mono border border-cyan-500/20">
                     Awareness Logic
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 ml-1 list-disc list-inside">
                     <li>Mapea quién tiene qué</li>
                     <li>Rutea peticiones P2P</li>
                     <li>Trigger pre-fetch</li>
                  </ul>
               </div>

               {/* REST API */}
               <div className="md:col-span-2 bg-slate-800/40 border border-slate-600 border-dashed p-4 rounded-lg flex justify-between items-center">
                  <span className="text-slate-400 font-bold text-sm">REST API Controllers</span>
                  <div className="flex gap-4">
                     <span className="px-3 py-1 bg-slate-700 rounded text-xs text-slate-300 font-mono">/api/projects</span>
                     <span className="px-3 py-1 bg-slate-700 rounded text-xs text-slate-300 font-mono">/api/assets</span>
                  </div>
               </div>

            </div>
        </div>
      </div>
    </div>
  );
};