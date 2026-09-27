import { useState } from 'react';
import { Menu, X, Phone, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/studioData';

interface HeaderProps {
  onOpenConsultation: () => void;
  onOpenOwnerPortal: () => void;
}

export function Header({ onOpenConsultation, onOpenOwnerPortal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Process', href: '#process' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single element brand wordmark */}
          <a
            href="#"
            className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9A6B43]"
            aria-label="Preet Interiors Home"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 group-hover:text-[#9A6B43] transition-colors">
              Preet Interiors
            </span>
            <span className="text-[10px] tracking-widest uppercase font-medium text-stone-500">
              Interior Design Studio · Delhi
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#9A6B43] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-950 transition-colors"
              title="Call studio directly"
            >
              <Phone className="w-3.5 h-3.5 text-[#9A6B43]" />
              <span className="tabular-nums">{BUSINESS_INFO.phone}</span>
            </a>

            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded hover:bg-stone-800 active:scale-[0.99] transition-all shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E7DFD5]" />
              <span>Book a Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="px-2.5 py-1.5 text-xs font-semibold text-white bg-stone-900 rounded"
              aria-label="Book Consultation"
            >
              Book
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9A6B43]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF8F5] border-b border-stone-200 px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-base font-medium text-stone-800 hover:text-[#9A6B43] py-1 border-b border-stone-100 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold tracking-wider uppercase text-white bg-stone-900 rounded"
              >
                <Calendar className="w-4 h-4 text-[#E7DFD5]" />
                Book a Consultation
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-stone-800 bg-stone-100 border border-stone-200 rounded"
              >
                <Phone className="w-4 h-4 text-[#9A6B43]" />
                Call {BUSINESS_INFO.phone}
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOwnerPortal();
                }}
                className="text-xs text-stone-500 hover:text-stone-800 py-1 text-center flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                Studio Owner Portal
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
