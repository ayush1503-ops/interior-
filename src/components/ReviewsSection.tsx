import { ExternalLink, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/studioData';

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 lg:py-32 bg-[#F4EFEB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <span className="text-xs uppercase tracking-widest font-medium text-stone-500 block mb-2">
            Reputation & Transparency
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight">
            What clients are saying
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            We value genuine relationships built over real site conversations, thoughtful detailing, and finished homes in Delhi.
          </p>
        </div>

        {/* Quiet, Authentic Google Reviews Notice & Link */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 border border-stone-200">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-mono block mb-2">
              Verified Public Feedback
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal mb-4">
              Google Business Profile & Map Reviews
            </h3>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light mb-6">
              In accordance with our commitment to transparency, we do not present fabricated testimonials or anonymous quotes on this website. All client reviews and ratings are hosted publicly on Google Maps by genuine homeowners and commercial clients in Delhi.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={BUSINESS_INFO.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-sm hover:bg-stone-800 transition-colors"
              >
                <span>View Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-[#9A6B43] py-3 px-2 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>Locate Studio on Map</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#FAF8F5] p-8 border border-stone-200">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-mono block mb-2">
              Past Client
            </span>
            <h4 className="font-serif text-xl text-stone-900 font-normal mb-2">
              Share Your Experience
            </h4>
            <p className="text-stone-600 text-xs leading-relaxed font-light mb-6">
              Have we completed an interior project for your apartment, villa, or office? Your honest feedback helps future Delhi homeowners make informed decisions.
            </p>

            <a
              href={BUSINESS_INFO.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wider text-[#9A6B43] hover:underline underline-offset-4"
            >
              Leave a Google Review →
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
