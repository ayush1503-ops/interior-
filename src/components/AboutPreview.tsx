import { ArrowRight } from 'lucide-react';

interface AboutPreviewProps {
  onLearnMore: () => void;
  onOpenConsultation: () => void;
}

export function AboutPreview({ onLearnMore, onOpenConsultation }: AboutPreviewProps) {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Large Interior Photography */}
          <div className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden border border-stone-200 bg-stone-100">
              <div className="aspect-[4/3] w-full">
                <img
                  src="/src/assets/images/preet_dining_detail_1790515157449.jpg"
                  alt="Preet Interiors dining and fluted wood partition architectural craftsmanship in Delhi"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Minimal architectural caption */}
              <div className="p-4 bg-white border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between font-mono">
                <span>Handcrafted Oak & Cane Partition</span>
                <span>Preet Vihar Residence</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <span className="text-xs uppercase tracking-widest font-medium text-stone-500 mb-3">
              PREET INTERIORS
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight leading-[1.15] mb-6">
              Interior design that feels personal.
            </h2>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed mb-6 font-light">
              At Preet Interiors, we believe true luxury in a Delhi home is not about flashy ornamentation or transient trends. It is about how seamlessly a room accommodates your family’s daily life, how effortlessly storage conceals clutter, and how warm lighting feels at the end of a long day.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8 font-light">
              Based in Krishna Nagar, our studio focuses on creating considered interiors rooted in your specific habits, spatial proportions, and material preferences. Whether planning a complete apartment or detailing a modular kitchen, every decision is guided by longevity and practical comfort.
            </p>

            {/* Studio Standards as Clean Architectural Columns without Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-stone-200 mb-8">
              <div>
                <h4 className="text-sm font-semibold text-stone-900 mb-1">Custom Spatial Planning</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-light">Layouts engineered to maximize usable area, circulation, and natural light.</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-stone-900 mb-1">Durable Materials</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-light">Teak, quartz, HDHMR, and finishes chosen specifically for Delhi’s climate.</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-900 border-b border-stone-900 pb-1 hover:text-[#9A6B43] hover:border-[#9A6B43] transition-colors"
              >
                <span>About Preet Interiors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-stone-900 rounded-sm hover:bg-stone-800 transition-colors"
              >
                <span>Book Consultation</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
