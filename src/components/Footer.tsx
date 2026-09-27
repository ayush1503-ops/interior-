import { Phone, MapPin, MessageCircle, Star, ShieldCheck, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/studioData';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenOwnerPortal: () => void;
}

export function Footer({ onOpenConsultation, onOpenOwnerPortal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 sm:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-stone-800">
          
          {/* Col 1: Studio Identity & Description */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="inline-block focus:outline-none">
              <span className="font-serif text-3xl font-semibold text-white tracking-tight">
                Preet Interiors
              </span>
              <span className="block text-xs uppercase tracking-widest text-[#E7DFD5] font-medium mt-1">
                Interior Design Studio · Delhi
              </span>
            </a>

            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Thoughtful residential and commercial interiors in Delhi. Spaces planned with attention to daily living, ergonomic comfort, and enduring craftsmanship.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E7DFD5] shrink-0" />
                <span>Delhi, India · Krishna Nagar - 110051</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E7DFD5] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-white font-mono">
                  {BUSINESS_INFO.phone}
                </a>
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Preet Interiors
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Design Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Project Gallery
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Design Process
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Studio Links & Consultation */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Verified Links
            </h4>
            
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E7DFD5]" />
                  <span>Google Maps Location</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>Google Reviews Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp ({BUSINESS_INFO.phone})</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E7DFD5]" />
                  <span>Direct Studio Phone</span>
                </a>
              </li>
            </ul>

            <div className="pt-3">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-[#E7DFD5] hover:bg-white rounded transition-colors"
              >
                Book a Consultation
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Owner Portal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© Preet Interiors. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenOwnerPortal}
              className="text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-1.5"
              title="Studio Portal for Preet Interiors management"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
              <span>Studio Portal</span>
            </button>

            <span aria-hidden="true" className="text-stone-700">·</span>

            <button
              onClick={scrollToTop}
              className="text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-1"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
