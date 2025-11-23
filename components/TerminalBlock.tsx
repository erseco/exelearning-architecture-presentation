import React from 'react';
import { Terminal, Copy } from 'lucide-react';

interface TerminalBlockProps {
  title?: string;
  content: string;
  language?: string;
  highlight?: boolean;
}

export const TerminalBlock: React.FC<TerminalBlockProps> = ({ title = "diagram.txt", content, highlight = false }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl my-6 font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="ml-4 flex items-center text-slate-400 text-xs">
            <Terminal size={12} className="mr-1.5" />
            {title}
          </div>
        </div>
        <Copy size={14} className="text-slate-500 cursor-pointer hover:text-slate-300" />
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className={`${highlight ? 'text-primary-400' : 'text-slate-300'} leading-relaxed`}>
          {content}
        </pre>
      </div>
    </div>
  );
};