import { useState } from 'react';
import { Phone, MapPin, Navigation, Calendar, Send, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, PROJECT_TYPES } from '../data/studioData';
import { bookingService } from '../services/bookingService';

interface ContactSectionProps {
  onOpenConsultation: () => void;
}

interface EnquiryFormState {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  requirements: string;
}

export function ContactSection({ onOpenConsultation }: ContactSectionProps) {
  const [formState, setFormState] = useState<EnquiryFormState>({
    name: '',
    phone: '',
    email: '',
    projectType: 'Home',
    location: '',
    requirements: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof EnquiryFormState, string>> = {};

    if (!formState.name.trim()) {
      errs.name = 'Please provide your name.';
    }

    const cleanPhone = formState.phone.replace(/[\s\-\+]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Phone number is required.';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please provide a valid 10-digit phone number.';
    }

    if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      errs.email = 'Please provide a valid email format.';
    }

    if (!formState.location.trim()) {
      errs.location = 'Please indicate your area/locality in Delhi NCR.';
    }

    if (!formState.requirements.trim()) {
      errs.requirements = 'Please tell us briefly about your space requirements.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      bookingService.submitEnquiry({
        name: formState.name.trim(),
        phone: formState.phone.trim(),
        email: formState.email.trim(),
        projectType: formState.projectType,
        location: formState.location.trim(),
        requirements: formState.requirements.trim(),
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormState({
      name: '',
      phone: '',
      email: '',
      projectType: 'Home',
      location: '',
      requirements: '',
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest font-medium text-stone-500 block mb-2">
              Studio Location & Inquiry
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight">
              Contact Preet Interiors
            </h2>
          </div>
          <p className="text-stone-600 text-sm sm:text-base font-light max-w-md leading-relaxed">
            Visit our Krishna Nagar design office or send your project specifications for review.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Business Details, Visiting Info & Interactive Map */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="bg-white p-8 border border-stone-200">
              <span className="font-mono text-xs text-stone-400 block mb-1">
                Studio Address
              </span>
              <h3 className="font-serif text-2xl text-stone-900 font-normal mb-4">
                {BUSINESS_INFO.name}
              </h3>

              <div className="text-sm text-stone-700 leading-relaxed font-light space-y-1 mb-6">
                <p className="font-medium text-stone-900">{BUSINESS_INFO.address.line1}</p>
                <p>{BUSINESS_INFO.address.landmark}</p>
                <p>{BUSINESS_INFO.address.locality}</p>
                <p>{BUSINESS_INFO.address.city} - {BUSINESS_INFO.address.pincode}</p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-0.5">Direct Line</span>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="font-mono text-base font-semibold text-stone-900 hover:text-[#9A6B43]"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-sm hover:bg-stone-800 transition-colors"
                  >
                    Call Studio
                  </a>

                  <a
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-stone-100 border border-stone-200 rounded-sm hover:bg-stone-200 transition-colors"
                  >
                    Directions
                  </a>
                </div>
              </div>

              <p className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-light">
                {BUSINESS_INFO.hours}
              </p>
            </div>

            {/* Embedded Google Maps View */}
            <div className="border border-stone-200 bg-stone-100 overflow-hidden">
              <div className="p-3 bg-white border-b border-stone-200 flex items-center justify-between text-xs text-stone-600 font-mono">
                <span>Location: Krishna Nagar, Delhi 110051</span>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-900 hover:underline"
                >
                  View Large Map ↗
                </a>
              </div>

              <div className="relative aspect-[16/9] w-full">
                <iframe
                  title="Preet Interiors Studio Location Delhi"
                  src="https://maps.google.com/maps?q=H-22%20East,%20Street%20No.%206,%20Opp.%20Reliance%20Fresh,%20Krishna%20Nagar,%20Delhi%20110051&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="p-3 bg-stone-50 text-[11px] text-stone-600 border-t border-stone-200 flex items-center justify-between font-light">
                <span>Landmark: Opposite Reliance Fresh</span>
                <span>Metro: Krishna Nagar / Preet Vihar</span>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Enquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-white p-8 sm:p-10 border border-stone-200">
              <div className="mb-6 pb-4 border-b border-stone-100">
                <span className="font-mono text-xs text-stone-400 block mb-1">
                  Online Inquiry
                </span>
                <h3 className="font-serif text-2xl text-stone-900 font-normal">
                  Send Project Specifications
                </h3>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-10 h-10 bg-stone-100 text-stone-900 rounded-full flex items-center justify-center mx-auto border border-stone-300">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-2xl text-stone-900 font-normal">Enquiry Received</h4>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto font-light leading-relaxed">
                    Thank you, <strong className="font-medium text-stone-900">{formState.name}</strong>. Your project specifications have been delivered to our studio. We will review the details and contact you at <span className="font-mono font-medium">{formState.phone}</span>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-stone-100 border border-stone-200 rounded-sm hover:bg-stone-200"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-5" noValidate>
                  
                  <div>
                    <label htmlFor="enquiry-name" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                      Full Name <span className="text-stone-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="enquiry-name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Sangeeta Chadha"
                      className={`w-full px-3 py-2.5 bg-stone-50 border rounded-sm text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-stone-900 ${
                        errors.name ? 'border-red-500' : 'border-stone-300'
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="enquiry-phone" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                        Phone Number <span className="text-stone-400">*</span>
                      </label>
                      <input
                        type="tel"
                        id="enquiry-phone"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="e.g. 98111 81116"
                        className={`w-full px-3 py-2.5 bg-stone-50 border rounded-sm text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-stone-900 ${
                          errors.phone ? 'border-red-500' : 'border-stone-300'
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="enquiry-email" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                        Email Address <span className="text-stone-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        id="enquiry-email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="name@domain.com"
                        className={`w-full px-3 py-2.5 bg-stone-50 border rounded-sm text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-stone-900 ${
                          errors.email ? 'border-red-500' : 'border-stone-300'
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="enquiry-type" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                        Project Type <span className="text-stone-400">*</span>
                      </label>
                      <select
                        id="enquiry-type"
                        value={formState.projectType}
                        onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                        className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-sm text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-stone-900"
                      >
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="enquiry-location" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                        Delhi NCR Area <span className="text-stone-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="enquiry-location"
                        value={formState.location}
                        onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                        placeholder="e.g. Krishna Nagar / Preet Vihar"
                        className={`w-full px-3 py-2.5 bg-stone-50 border rounded-sm text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-stone-900 ${
                          errors.location ? 'border-red-500' : 'border-stone-300'
                        }`}
                      />
                      {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="enquiry-requirements" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                      Requirements & Current Handover Stage <span className="text-stone-400">*</span>
                    </label>
                    <textarea
                      id="enquiry-requirements"
                      rows={3}
                      value={formState.requirements}
                      onChange={(e) => setFormState({ ...formState, requirements: e.target.value })}
                      placeholder="Brief details about the property (e.g. 3 BHK builder floor, need complete woodwork and modular kitchen)..."
                      className={`w-full px-3 py-2.5 bg-stone-50 border rounded-sm text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-stone-900 resize-none ${
                        errors.requirements ? 'border-red-500' : 'border-stone-300'
                      }`}
                    />
                    {errors.requirements && <p className="mt-1 text-xs text-red-600">{errors.requirements}</p>}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                    <span className="text-[11px] text-stone-400 font-mono">
                      * Required fields
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-sm hover:bg-stone-800 transition-colors disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5 text-[#E7DFD5]" />
                      <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
