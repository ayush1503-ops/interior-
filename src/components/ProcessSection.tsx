import { DESIGN_PROCESS } from '../data/studioData';
import { ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onOpenConsultation: () => void;
}

export function ProcessSection({ onOpenConsultation }: ProcessSectionProps) {
  return (
    <section id="process" className="py-24 lg:py-32 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest font-medium text-stone-500 block mb-2">
              Working Method
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight">
              Design & Execution Roadmap
            </h2>
          </div>
          <p className="text-stone-600 text-sm sm:text-base font-light max-w-md leading-relaxed">
            A clear four-stage sequence ensuring transparency from site measurement to final handover.
          </p>
        </div>

        {/* 4-Step Continuous Sequence */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {DESIGN_PROCESS.map((stepItem) => (
            <div key={stepItem.step} className="border-t-2 border-stone-900 pt-6 flex flex-col justify-between">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal block mb-4">
                  {stepItem.step}
                </span>

                <h3 className="font-serif text-2xl text-stone-900 font-normal mb-3">
                  {stepItem.title}
                </h3>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {stepItem.summary}
                </p>

                <ul className="space-y-2 text-xs text-stone-600 border-t border-stone-200 pt-4">
                  {stepItem.details.map((detail, idx) => (
                    <li key={idx} className="flex items-baseline gap-2">
                      <span className="text-[#9A6B43] text-sm">·</span>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 text-[11px] font-mono text-stone-400">
                Phase {stepItem.step} Milestone
              </div>
            </div>
          ))}
        </div>

        {/* Quiet Footnote Strip */}
        <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-stone-500 font-light">
            Every phase requires homeowner sign-off before proceeding to material procurement or civil execution.
          </p>

          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-[#9A6B43] transition-colors"
          >
            <span>Initiate Step 01 Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
