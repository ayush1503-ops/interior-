import { useEffect, useState } from 'react';
import { X, MapPin, Layers, Lightbulb, Box, Check, ArrowRight, Calendar, Compass } from 'lucide-react';
import { ProjectItem } from '../data/studioData';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onDiscussSpace: (projectTitle: string, category: string) => void;
}

export function ProjectDetailModal({ project, onClose, onDiscussSpace }: ProjectDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  if (!project) return null;

  const currentImage = project.galleryImages[activeImageIndex] || {
    url: project.heroImage,
    caption: project.shortDescription,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-300 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-stone-200 bg-white/90 backdrop-blur flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3 text-xs text-stone-500">
            <span className="font-semibold text-[#9A6B43] uppercase tracking-wider">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-stone-700">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {project.location}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-10">
          
          {/* Main Hero & Gallery Viewport */}
          <div>
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-stone-900 border border-stone-200 shadow-inner">
              <img
                src={currentImage.url}
                alt={currentImage.caption || project.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
              
              {/* Image Caption Scrim */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent p-4 sm:p-6 text-white text-xs sm:text-sm">
                <p className="font-light">{currentImage.caption}</p>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {project.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                {project.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 sm:w-32 sm:h-20 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#9A6B43] ring-2 ring-[#9A6B43]/30 scale-[1.02]' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Introduction */}
          <div>
            <h2 id="modal-project-title" className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal mb-3">
              {project.title}
            </h2>
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-light max-w-3xl">
              {project.fullOverview}
            </p>
          </div>

          {/* Key Architectural & Design Details Grid */}
          <div className="border-t border-stone-200 pt-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#9A6B43] mb-6">
              Design & Material Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-5 bg-white rounded-lg border border-stone-200">
                <div className="flex items-center gap-2 mb-2 text-stone-900 font-semibold text-sm">
                  <Compass className="w-4 h-4 text-[#9A6B43]" />
                  <h4>Layout Planning</h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {project.designDetails.layoutPlanning}
                </p>
              </div>

              <div className="p-5 bg-white rounded-lg border border-stone-200">
                <div className="flex items-center gap-2 mb-2 text-stone-900 font-semibold text-sm">
                  <Layers className="w-4 h-4 text-[#9A6B43]" />
                  <h4>Materials & Finishes</h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {project.designDetails.materialsFinishes}
                </p>
              </div>

              <div className="p-5 bg-white rounded-lg border border-stone-200">
                <div className="flex items-center gap-2 mb-2 text-stone-900 font-semibold text-sm">
                  <Lightbulb className="w-4 h-4 text-[#9A6B43]" />
                  <h4>Lighting Concept</h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {project.designDetails.lightingConcept}
                </p>
              </div>

              <div className="p-5 bg-white rounded-lg border border-stone-200">
                <div className="flex items-center gap-2 mb-2 text-stone-900 font-semibold text-sm">
                  <Box className="w-4 h-4 text-[#9A6B43]" />
                  <h4>Storage Solutions</h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {project.designDetails.storageSolutions}
                </p>
              </div>

            </div>
          </div>

          {/* Distinctive Features */}
          <div className="border-t border-stone-200 pt-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">
              Highlighted Considerations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, fIndex) => (
                <div key={fIndex} className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-3.5 h-3.5 text-[#9A6B43] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="p-6 bg-stone-100 rounded-lg border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-xl text-stone-900 font-medium">
                Envisioning a similar aesthetic for your space?
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Schedule a consultation to discuss your Delhi property dimensions and requirements.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onDiscussSpace(project.title, project.category);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-stone-900 rounded hover:bg-stone-800 transition-colors whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E7DFD5]" />
              <span>Discuss Your Space</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
