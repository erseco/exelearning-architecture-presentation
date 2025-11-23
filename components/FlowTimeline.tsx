import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  details?: string[];
  actor?: 'Client' | 'Server' | 'Shared';
}

interface FlowTimelineProps {
  steps: Step[];
}

export const FlowTimeline: React.FC<FlowTimelineProps> = ({ steps }) => {
  return (
    <div className="space-y-0 relative pl-4 md:pl-0">
      {steps.map((step, index) => (
        <div key={index} className="relative flex items-start md:ml-12 group pb-8 last:pb-0">
          {/* Connector Line */}
          {index !== steps.length - 1 && (
            <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-slate-700 group-last:hidden"></div>
          )}

          {/* Icon */}
          <div className="flex-shrink-0 relative z-10">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${step.actor === 'Server' ? 'bg-purple-900/20 border-purple-500 text-purple-400' : 
                  step.actor === 'Client' ? 'bg-blue-900/20 border-blue-500 text-blue-400' :
                  'bg-slate-800 border-slate-500 text-slate-300'}`}>
                <span className="text-xs font-bold">{index + 1}</span>
             </div>
          </div>

          {/* Content */}
          <div className="ml-6 bg-slate-800/50 border border-slate-700 rounded-lg p-4 w-full shadow-sm hover:border-slate-600 transition-colors">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
               <h4 className="text-lg font-semibold text-slate-100">{step.title}</h4>
               {step.actor && (
                 <span className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wider font-bold mt-1 md:mt-0 w-fit
                    ${step.actor === 'Server' ? 'bg-purple-500/10 text-purple-400' : 
                      step.actor === 'Client' ? 'bg-blue-500/10 text-blue-400' : 
                      'bg-slate-500/10 text-slate-400'}`}>
                    {step.actor}
                 </span>
               )}
            </div>
            <p className="text-slate-400 text-sm mb-2">{step.description}</p>
            
            {step.details && (
              <ul className="space-y-1 mt-3 bg-slate-900/50 p-3 rounded text-sm border border-slate-800">
                {step.details.map((d, i) => (
                  <li key={i} className="flex items-start text-slate-300">
                    <CheckCircle2 size={14} className="mr-2 mt-0.5 text-green-500/70 flex-shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};