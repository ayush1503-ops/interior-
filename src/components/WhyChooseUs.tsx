import { ArrowRight } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/studioData';

interface WhyChooseUsProps {
  onOpenConsultation: () => void;
}

export function WhyChooseUs({ onOpenConsultation }: WhyChooseUsProps) {
  return (
    <section className="py-24 lg:py-32 bg-[#F4EFEB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Authentic Studio Manifesto */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-xs uppercase tracking-widest font-medium text-stone-500 block mb-3">
              Studio Principles
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight leading-tight mb-6">
              A Delhi home should be built for real life, not just photographs.
            </h2>

            <p className="text-stone-700 text-sm sm:text-base font-light leading-relaxed mb-6">
              Many interior designs look striking when photographed, only to prove frustrating during everyday use. In Delhi, homes must withstand heat, dust, continuous cooking, and the storage demands of multi-generational households.
            </p>

            <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed mb-8">
              At Preet Interiors, we design with materials that age gracefully, joinery that does not warp, and layouts that prioritize effortless daily maintenance over delicate gimmicks.
            </p>

            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-900 border-b-2 border-stone-900 pb-1 hover:text-[#9A6B43] hover:border-[#9A6B43] transition-colors"
            >
              <span>Discuss Your Home Requirements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column: 6 Practical Pillars as Clean Architectural Prose */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {WHY_CHOOSE_US.map((pillar, index) => (
              <div key={pillar.title} className="border-t border-stone-300 pt-5">
                <span className="font-mono text-xs text-stone-400 block mb-2">
                  0{index + 1}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-normal mb-2">
                  {pillar.title}
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
