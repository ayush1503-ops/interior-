import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/studioData';

interface FloatingActionsProps {
  onOpenConsultation: () => void;
}

export function FloatingActions({ onOpenConsultation }: FloatingActionsProps) {
  return (
    <>
      {/* Mobile Bottom Contact Bar (Strictly capped <= 15% mobile viewport) */}
      <aside aria-label="Quick contact actions" className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 px-3 py-2.5 shadow-2xl">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          
          {/* Action 1: Call */}
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex flex-col items-center justify-center py-1.5 px-1 text-stone-200 hover:text-white rounded active:bg-stone-800 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#E7DFD5] mb-0.5" />
            <span className="text-[11px] font-medium tracking-wide">Call</span>
          </a>

          {/* Action 2: WhatsApp */}
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-1 text-emerald-300 hover:text-emerald-200 rounded active:bg-stone-800 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
            <span className="text-[11px] font-medium tracking-wide">WhatsApp</span>
          </a>

          {/* Action 3: Book Consultation */}
          <button
            onClick={onOpenConsultation}
            className="flex flex-col items-center justify-center py-1.5 px-1 text-[#E7DFD5] hover:text-white rounded active:bg-stone-800 transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#9A6B43] mb-0.5" />
            <span className="text-[11px] font-semibold tracking-wide">Book</span>
          </button>

        </div>
      </aside>

      {/* Desktop Floating WhatsApp Affordance */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-40 group">
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 bg-stone-900 text-white rounded-full shadow-lg border border-stone-700/80 hover:bg-stone-800 hover:scale-[1.02] active:scale-[0.98] transition-all"
          aria-label={`Chat on WhatsApp with Preet Interiors at ${BUSINESS_INFO.phone}`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium tracking-wide">WhatsApp Studio</span>
          <span className="text-[11px] text-stone-400 font-mono pl-1 border-l border-stone-700">
            {BUSINESS_INFO.phone}
          </span>
        </a>
      </div>
    </>
  );
}
