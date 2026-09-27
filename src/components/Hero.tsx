import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/studioData';
import { STUDIO_IMAGES } from '../assets/images';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreWork: () => void;
}

export function Hero({ onOpenConsultation, onExploreWork }: HeroProps) {
  return (
    <section className="relative bg-[#FAF8F5] pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Intro */}
        <div className="max-w-3xl mb-8 lg:mb-12">
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-stone-500 mb-4">
            <span className="text-[#9A6B43]">Preet Interiors</span>
            <span aria-hidden="true">·</span>
            <span>Delhi Interior Design Studio</span>
            <span aria-hidden="true">·</span>
            <span>Krishna Nagar</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal tracking-tight leading-[1.12] text-balance">
            Spaces designed around the way you live.
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-stone-600 font-light leading-relaxed max-w-2xl">
            Thoughtful interiors for homes and spaces in Delhi, designed with attention to comfort, detail and everyday living.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold tracking-wider uppercase text-white bg-stone-900 rounded hover:bg-stone-800 active:scale-[0.99] transition-all shadow-sm group"
            >
              <Calendar className="w-4 h-4 text-[#E7DFD5]" />
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreWork}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-stone-800 bg-white border border-stone-300 rounded hover:bg-stone-100 hover:border-stone-400 transition-colors"
            >
              <span>Explore Our Work</span>
            </button>
          </div>
        </div>

        {/* Large Editorial Photography Anchor */}
        <div className="relative rounded-lg overflow-hidden border border-stone-200 shadow-md bg-stone-100">
          <div className="aspect-[16/9] w-full relative">
            <img
              src={STUDIO_IMAGES.heroLiving}
              alt="Warm, sophisticated living room in a Delhi residence designed with custom teak woodwork and layered cove lighting by Preet Interiors"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="eager"
            />
            {/* Subtle soft gradient scrim along the bottom for legibility of caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent pointer-events-none" />

            {/* Quiet photo caption & location strip */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div>
                <p className="text-xs uppercase tracking-wider text-stone-300 font-medium">Featured Space</p>
                <p className="font-serif text-lg sm:text-xl text-stone-100 font-normal">
                  The Chander Nagar Living Pavilion · Krishna Nagar
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-stone-300">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E7DFD5]" />
                  <span>East Delhi</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E7DFD5]" />
                  <span>By Appointment</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Trust Markers */}
        <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-stone-600 text-sm">
          <div>
            <h3 className="font-semibold text-stone-900 text-xs tracking-wider uppercase mb-1">
              Studio Location
            </h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              H-22 East, St. No. 6, Opp. Reliance Fresh, Gyan Park, Krishna Nagar, Delhi 110051.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 text-xs tracking-wider uppercase mb-1">
              Direct Access
            </h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              Call <a href={`tel:${BUSINESS_INFO.phone}`} className="font-medium text-stone-900 hover:underline">{BUSINESS_INFO.phone}</a> or connect via WhatsApp for consultations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 text-xs tracking-wider uppercase mb-1">
              Design Philosophy
            </h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              Considered spatial planning, enduring materials, and homes built around real household routines.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

