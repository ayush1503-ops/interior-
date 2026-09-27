import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { PROJECT_TYPES, TIME_SLOTS, BUSINESS_INFO } from '../data/studioData';
import { bookingService } from '../services/bookingService';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectType?: string;
  initialNotes?: string;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  preferredDate: string;
  preferredTime: string;
  locationArea: string;
  approxSize: string;
  message: string;
}

export function ConsultationModal({
  isOpen,
  onClose,
  initialProjectType,
  initialNotes,
}: ConsultationModalProps) {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    projectType: initialProjectType || 'Apartment',
    preferredDate: '',
    preferredTime: TIME_SLOTS[0],
    locationArea: '',
    approxSize: '',
    message: initialNotes || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, projectType: initialProjectType }));
    }
    if (initialNotes) {
      setFormData((prev) => ({ ...prev, message: initialNotes }));
    }
  }, [initialProjectType, initialNotes]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please provide your full name.';
    }

    const cleanPhone = formData.phone.replace(/[\s\-\+]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Phone number is required so we can confirm details.';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.locationArea.trim()) {
      newErrors.locationArea = 'Please state your area in Delhi NCR (e.g. Krishna Nagar, Preet Vihar, Noida).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      bookingService.submitConsultationRequest({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        projectType: formData.projectType,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        locationArea: formData.locationArea.trim(),
        approxSize: formData.approxSize.trim(),
        message: formData.message.trim(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setErrors({});
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      projectType: 'Apartment',
      preferredDate: '',
      preferredTime: TIME_SLOTS[0],
      locationArea: '',
      approxSize: '',
      message: '',
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-300 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-white/90 backdrop-blur flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 id="consultation-modal-title" className="font-serif text-xl sm:text-2xl text-stone-900 font-medium">
              Book a Consultation
            </h2>
            <p className="text-[11px] text-stone-500 uppercase tracking-wider font-mono">
              Preet Interiors · Delhi Studio
            </p>
          </div>

          <button
            onClick={resetAndClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-8 px-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-300">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900">
                Consultation Request Received
              </h3>

              <div className="p-4 bg-white rounded-lg border border-stone-200 max-w-lg mx-auto text-left text-xs sm:text-sm text-stone-700 space-y-2">
                <p className="font-medium text-stone-900">
                  Thank you, {formData.fullName}. Your consultation request has been received.
                </p>
                <p className="text-stone-600 font-light leading-relaxed">
                  Preet Interiors will contact you at <span className="font-mono font-medium text-stone-900">{formData.phone}</span> to confirm your preferred appointment time and discuss initial project details.
                </p>
                <div className="pt-2 border-t border-stone-100 text-stone-500 text-xs">
                  <span>Selected Scope: <strong>{formData.projectType}</strong></span> · 
                  <span> Area: <strong>{formData.locationArea}</strong></span>
                </div>
              </div>

              <p className="text-xs text-stone-500 italic max-w-md mx-auto">
                Need immediate site assistance? You can also reach our studio directly at {BUSINESS_INFO.phone}.
              </p>

              <div className="pt-4 flex justify-center gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 border border-stone-200 rounded hover:bg-stone-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#9A6B43]" />
                  <span>Call Studio</span>
                </a>

                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded hover:bg-stone-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              {/* Important Transparency Notice (Requirement 25) */}
              <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-md text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-semibold block mb-0.5">Appointment Request Procedure:</span>
                  Submitting this form records your consultation request. Our design studio will review your space details and contact you via phone or WhatsApp to finalize the confirmed appointment date and time.
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                    Full Name <span className="text-amber-700">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Verma"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9A6B43] ${
                      errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                    }`}
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                    Phone Number <span className="text-amber-700">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 98111 81116"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9A6B43] ${
                      errors.phone ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>
              </div>

              {/* Email & Project Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                    Email Address <span className="text-stone-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul@example.com"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9A6B43] ${
                      errors.email ? 'border-red-500' : 'border-stone-300'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                    Project Type <span className="text-amber-700">*</span>
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A6B43]"
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location & Approximate Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="locationArea" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                    Location / Area <span className="text-amber-700">*</span>
                  </label>
                  <input
                    type="text"
                    id="locationArea"
                    value={formData.locationArea}
                    onChange={(e) => setFormData({ ...formData, locationArea: e.target.value })}
                    placeholder="e.g. Krishna Nagar / Preet Vihar"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9A6B43] ${
                      errors.locationArea ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                    }`}
                  />
                  {errors.locationArea && <p className="mt-1 text-xs text-red-600">{errors.locationArea}</p>}
                </div>

                <div>
                  <label htmlFor="approxSize" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                    Approximate Size <span className="text-stone-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="approxSize"
                    value={formData.approxSize}
                    onChange={(e) => setFormData({ ...formData, approxSize: e.target.value })}
                    placeholder="e.g. 1,600 sq ft or 3 BHK"
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9A6B43]"
                  />
                </div>
              </div>

              {/* Preferred Date & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A6B43]"
                  />
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    id="preferredTime"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A6B43]"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message / Requirements */}
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-stone-800 uppercase tracking-wider mb-1">
                  Message / Requirements <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your space, key priorities (e.g. modular kitchen, storage, living room woodwork), or current handover stage..."
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9A6B43] resize-none"
                />
              </div>

              {/* Form Submission Button */}
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                <p className="text-[11px] text-stone-500">
                  <span className="text-amber-700">*</span> Required fields
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded hover:bg-stone-800 active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Request Consultation'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E7DFD5]" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
