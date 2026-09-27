import { useState } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/studioData';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsGalleryProps {
  onDiscussSpace: (projectTitle: string, category: string) => void;
}

type CategoryFilter = 'All' | 'Residential' | 'Living Room' | 'Bedroom' | 'Kitchen' | 'Commercial';

export function ProjectsGallery({ onDiscussSpace }: ProjectsGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories: CategoryFilter[] = ['All', 'Residential', 'Living Room', 'Bedroom', 'Kitchen', 'Commercial'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Editorial Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest font-medium text-stone-500 block mb-2">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight">
              Selected Works
            </h2>
          </div>

          {/* Clean Segmented Filter Controls */}
          <div className="flex flex-wrap items-center gap-1 border-b border-stone-300 pb-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs tracking-wider transition-colors ${
                    isActive
                      ? 'text-stone-950 font-semibold border-b-2 border-stone-900 -mb-[5px]'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical Editorial Projects Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {filteredProjects.map((project, index) => {
            const isFeaturedWide = index % 3 === 0;
            const colSpanClass = isFeaturedWide
              ? 'md:col-span-12 lg:col-span-7'
              : 'md:col-span-6 lg:col-span-5';

            return (
              <article
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`${colSpanClass} group cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  {/* Clean Editorial Photography */}
                  <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-stone-100 border border-stone-200">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Quiet location stamp */}
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white px-2.5 py-1 text-[11px] font-mono">
                      {project.location}
                    </div>
                  </div>

                  {/* Clean Unboxed Metadata */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-stone-500 font-mono">
                    <span className="uppercase tracking-wider">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Delhi NCR</span>
                  </div>

                  {/* Project Title with Clean Arrow */}
                  <div className="mt-1.5 flex items-start justify-between gap-3">
                    <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal group-hover:text-[#9A6B43] transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors shrink-0 mt-1" />
                  </div>

                  {/* Short Description */}
                  <p className="mt-2 text-xs sm:text-sm text-stone-600 line-clamp-2 font-light leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Hairline Divider */}
                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-mono">
                  <span>{project.galleryImages.length} Plates</span>
                  <span className="text-stone-900 group-hover:underline">View Architectural Specifications →</span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-16 text-center text-xs text-stone-500 max-w-xl mx-auto font-light">
          Photography shown represents selected completed Delhi interiors. New project portfolios are added periodically upon homeowner handover.
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onDiscussSpace={onDiscussSpace}
      />
    </section>
  );
}
