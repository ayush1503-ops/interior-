import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutPreview } from './components/AboutPreview';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { ProcessSection } from './components/ProcessSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ConsultationModal } from './components/ConsultationModal';
import { OwnerStudioPortalModal } from './components/OwnerStudioPortalModal';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isOwnerPortalOpen, setIsOwnerPortalOpen] = useState(false);
  const [consultationProjectType, setConsultationProjectType] = useState<string>('Apartment');
  const [consultationNotes, setConsultationNotes] = useState<string>('');

  const handleOpenConsultation = (projectType?: string, initialNotes?: string) => {
    if (projectType) setConsultationProjectType(projectType);
    if (initialNotes) setConsultationNotes(initialNotes);
    setIsConsultationOpen(true);
  };

  const handleExploreWork = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLearnMoreAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectServiceForConsultation = (serviceTitle: string) => {
    handleOpenConsultation(serviceTitle, `Inquiring about ${serviceTitle} scope.`);
  };

  const handleDiscussProjectSpace = (projectTitle: string, category: string) => {
    handleOpenConsultation(category, `Interested in an aesthetic and layout similar to ${projectTitle}.`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      
      {/* 1. Header (3-Zone Top Bar Contract) */}
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenOwnerPortal={() => setIsOwnerPortalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <Hero
          onOpenConsultation={() => handleOpenConsultation()}
          onExploreWork={handleExploreWork}
        />

        {/* 3. Intro / About Preview (Split Layout) */}
        <AboutPreview
          onLearnMore={handleLearnMoreAbout}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 4. Services Section */}
        <ServicesSection
          onSelectServiceForConsultation={handleSelectServiceForConsultation}
        />

        {/* 5. Projects / Portfolio Section */}
        <ProjectsGallery
          onDiscussSpace={handleDiscussProjectSpace}
        />

        {/* 6. Design Process Section */}
        <ProcessSection
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 7. Why Preet Interiors (Practical Pillars) */}
        <WhyChooseUs
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 8. Google Reviews & Reputation Section */}
        <ReviewsSection />

        {/* 9. Contact Section & Enquiry Form */}
        <ContactSection
          onOpenConsultation={() => handleOpenConsultation()}
        />

      </main>

      {/* 11. Footer */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenOwnerPortal={() => setIsOwnerPortalOpen(true)}
      />

      {/* 12. Floating Actions (Mobile Bar + Desktop WhatsApp) */}
      <FloatingActions
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* 13. Book a Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => {
          setIsConsultationOpen(false);
          setConsultationNotes('');
        }}
        initialProjectType={consultationProjectType}
        initialNotes={consultationNotes}
      />

      {/* 14. Studio Owner Management Portal */}
      <OwnerStudioPortalModal
        isOpen={isOwnerPortalOpen}
        onClose={() => setIsOwnerPortalOpen(false)}
      />

    </div>
  );
}

