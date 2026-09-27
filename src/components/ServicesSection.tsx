import { useState } from 'react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { SERVICES } from '../data/studioData';

interface ServicesSectionProps {
  onSelectServiceForConsultation: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectServiceForConsultation }: ServicesSectionProps) {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest font-medium text-stone-500 block mb-2">
              Scope of Work
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight">
              Interior Disciplines
            </h2>
          </div>
          <p className="text-stone-600 text-sm sm:text-base font-light max-w-md leading-relaxed">
            From single-room carpentry and modular kitchens to complete residence overhauls in Delhi NCR.
          </p>
        </div>

        {/* Editorial Split Layout: Left Active Discipline Spotlight, Right Interactive Catalog */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Visual & Deliverables Spotlight */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-sm overflow-hidden bg-stone-100 border border-stone-200">
              <div className="aspect-[4/3] w-full relative">
                <img
                  src={
                    activeService.id === 'modular-kitchens'
                      ? '/src/assets/images/preet_modular_kitchen_1790515176816.jpg'
                      : activeService.id === 'bedrooms'
                      ? '/src/assets/images/preet_master_bedroom_1790515188090.jpg'
                      : activeService.id === 'wardrobes-storage'
                      ? '/src/assets/images/preet_wardrobe_storage_1790515203354.jpg'
                      : activeService.id === 'living-spaces'
                      ? '/src/assets/images/hero_preet_living_1790515137644.jpg'
                      : '/src/assets/images/preet_dining_detail_1790515157449.jpg'
                  }
                  alt={activeService.title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 bg-white border-t border-stone-200">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-mono">
                  <span>Selected Discipline</span>
                  <span>{activeService.keyAspects[0]}</span>
                </div>
                <h3 className="font-serif text-2xl text-stone-900 font-normal mb-3">
                  {activeService.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {activeService.fullDescription}
                </p>

                <div className="border-t border-stone-100 pt-4 mb-6">
                  <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-2">
                    Key Inclusions
                  </p>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {activeService.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-baseline gap-2">
                        <span className="text-[#9A6B43] font-serif text-sm">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectServiceForConsultation(activeService.title)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-sm hover:bg-stone-800 transition-colors"
                >
                  <span>Inquire for {activeService.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural List with Hairline Rules */}
          <div className="lg:col-span-7 divide-y divide-stone-200 border-y border-stone-200">
            {SERVICES.map((service, index) => {
              const isSelected = activeServiceId === service.id;

              return (
                <div
                  key={service.id}
                  className={`py-6 sm:py-8 transition-colors ${
                    isSelected ? 'bg-white/60 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-sm' : 'hover:bg-stone-50/50'
                  }`}
                >
                  <div
                    onClick={() => setActiveServiceId(service.id)}
                    className="flex items-start justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className="font-serif text-xl sm:text-2xl text-stone-400 group-hover:text-stone-900 transition-colors w-8 shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="font-serif text-xl sm:text-2xl text-stone-900 font-normal group-hover:text-[#9A6B43] transition-colors">
                          {service.title}
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-stone-600 font-light max-w-xl">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="pt-1 text-stone-400 group-hover:text-stone-900 shrink-0">
                      {isSelected ? <Minus className="w-5 h-5 text-stone-900" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Expanded Scope Breakdown */}
                  {isSelected && (
                    <div className="mt-6 pt-4 border-t border-stone-100 pl-12 sm:pl-14 text-xs text-stone-600 space-y-3 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
                        {service.deliverables.map((d, dIdx) => (
                          <div key={dIdx} className="flex items-baseline gap-2">
                            <span className="text-[#9A6B43]">·</span>
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-stone-500 italic">
                          Ideal for: {service.idealFor}
                        </span>
                        <button
                          onClick={() => onSelectServiceForConsultation(service.title)}
                          className="text-xs font-semibold text-stone-900 hover:text-[#9A6B43] underline underline-offset-4"
                        >
                          Request Scope Details →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
