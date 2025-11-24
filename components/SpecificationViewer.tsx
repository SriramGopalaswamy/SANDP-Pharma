import React from 'react';
import { SPEC_SECTIONS, ACTION_ITEMS } from '../constants';
import { SpecSection } from '../types';
import { CheckSquare, AlertCircle } from 'lucide-react';

const SpecificationViewer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      
      {/* Document Header */}
      <div className="text-center space-y-4 border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Product & Technical Specification</h1>
        <p className="text-xl text-gray-500">SANDP Pharma B2B Commerce Platform (AWS)</p>
        <div className="flex justify-center gap-2 text-sm text-gray-400">
           <span>Version 1.0</span>
           <span>•</span>
           <span>Status: Draft for Approval</span>
        </div>
      </div>

      {/* Action Items Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="bg-amber-100 p-2 rounded-full text-amber-700 mt-1">
            <AlertCircle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-amber-900 mb-3">Immediate Leadership Actions Required [ ]</h3>
            <ul className="space-y-3">
              {ACTION_ITEMS.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-amber-800">
                  <div className="mt-1 min-w-[20px] h-[20px] border-2 border-amber-400 rounded bg-white flex items-center justify-center cursor-pointer hover:border-amber-600">
                    <span className="opacity-0 hover:opacity-100 text-xs font-bold text-amber-600">✓</span>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sections Loop */}
      <div className="space-y-16">
        {SPEC_SECTIONS.map((section: SpecSection) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-pharma-500 rounded-full"></span>
              {section.title}
            </h2>

            {/* Content Rendering Logic */}
            <div className="pl-4 border-l-2 border-gray-100 ml-1.5 space-y-6">
              
              {/* Type: Text */}
              {section.type === 'text' && (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                  {section.content}
                </p>
              )}

              {/* Type: List */}
              {section.type === 'list' && Array.isArray(section.content) && (
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-700">
                       <span className="text-pharma-500 font-bold">•</span>
                       <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Type: Code */}
              {section.type === 'code' && (
                <div className="relative group">
                  <div className="absolute top-0 right-0 bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-bl">JSON</div>
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm font-mono shadow-inner border border-gray-700">
                    <code>{section.content}</code>
                  </pre>
                </div>
              )}

              {/* Type: Mixed (Subsections) */}
              {section.type === 'mixed' && (
                <div className="space-y-6">
                  <p className="text-gray-700 italic">{section.content}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.subsections?.map((sub, subIdx) => (
                      <div key={subIdx} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:border-pharma-300 transition-colors">
                        <h4 className="font-bold text-pharma-700 mb-2">{sub.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{sub.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20 pt-10 border-t border-gray-200 text-center text-gray-400">
        <p>End of Specification - Generated for SANDP Pharma</p>
      </div>
    </div>
  );
};

export default SpecificationViewer;