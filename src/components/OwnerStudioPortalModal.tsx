import { useState, useEffect } from 'react';
import { X, Calendar, MessageSquare, Phone, MessageCircle, Clock, CheckCircle, Trash2, Filter, Edit3, Save, ExternalLink } from 'lucide-react';
import { bookingService, ConsultationRequest, GeneralEnquiry, AppointmentStatus, EnquiryStatus } from '../services/bookingService';
import { BUSINESS_INFO } from '../data/studioData';

interface OwnerStudioPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OwnerStudioPortalModal({ isOpen, onClose }: OwnerStudioPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'consultations' | 'enquiries'>('consultations');
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [enquiries, setEnquiries] = useState<GeneralEnquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');
  const [confirmedTimeInput, setConfirmedTimeInput] = useState<string>('');

  const loadData = () => {
    setConsultations(bookingService.getConsultations());
    setEnquiries(bookingService.getEnquiries());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
      const handler = () => loadData();
      window.addEventListener('preet_data_updated', handler);
      return () => window.removeEventListener('preet_data_updated', handler);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdateConsultationStatus = (id: string, newStatus: AppointmentStatus) => {
    bookingService.updateConsultationStatus(id, newStatus);
    loadData();
  };

  const handleSaveNotes = (id: string) => {
    bookingService.updateConsultationStatus(id, undefined as any, noteText, confirmedTimeInput);
    setEditingId(null);
    loadData();
  };

  const handleDeleteConsultation = (id: string) => {
    if (confirm('Are you sure you want to remove this consultation request?')) {
      bookingService.deleteConsultation(id);
      loadData();
    }
  };

  const handleUpdateEnquiryStatus = (id: string, newStatus: EnquiryStatus) => {
    bookingService.updateEnquiryStatus(id, newStatus);
    loadData();
  };

  const handleDeleteEnquiry = (id: string) => {
    if (confirm('Are you sure you want to remove this enquiry?')) {
      bookingService.deleteEnquiry(id);
      loadData();
    }
  };

  const filteredConsultations = statusFilter === 'All'
    ? consultations
    : consultations.filter((c) => c.status === statusFilter);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="owner-portal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-300 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-white flex items-center justify-between sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 id="owner-portal-title" className="font-serif text-xl sm:text-2xl text-stone-900 font-medium">
                Studio Management Portal
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Review and manage incoming consultation requests and website inquiries for Preet Interiors.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Close studio portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher & Filters */}
        <div className="px-6 py-3 bg-stone-100/90 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('consultations')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'consultations'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Consultation Requests ({consultations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'enquiries'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-700 hover:bg-stone-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>General Enquiries ({enquiries.length})</span>
            </button>
          </div>

          {activeTab === 'consultations' && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500">Status Filter:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1 bg-white border border-stone-300 rounded text-xs text-stone-800"
              >
                <option value="All">All Requests</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          )}
        </div>

        {/* Scrollable Records */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {activeTab === 'consultations' ? (
            filteredConsultations.length === 0 ? (
              <div className="text-center py-16 text-stone-500 text-sm">
                No consultation requests match the selected filter.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredConsultations.map((req) => {
                  const isEditing = editingId === req.id;
                  const dateStr = new Date(req.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={req.id}
                      className="bg-white rounded-lg border border-stone-200 p-5 shadow-xs space-y-4"
                    >
                      {/* Top Row: Client Name, Project Type, Status */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="font-serif text-lg font-medium text-stone-900">
                              {req.fullName}
                            </h3>
                            <span className="text-xs text-stone-500 font-mono">
                              ({req.projectType})
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5">
                            Received: {dateStr} · Area: <strong>{req.locationArea}</strong> {req.approxSize && `(${req.approxSize})`}
                          </p>
                        </div>

                        {/* Status Select */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-stone-500">Status:</span>
                          <select
                            value={req.status}
                            onChange={(e) =>
                              handleUpdateConsultationStatus(req.id, e.target.value as AppointmentStatus)
                            }
                            className={`text-xs font-semibold px-2.5 py-1 rounded border ${
                              req.status === 'Confirmed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : req.status === 'Completed'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : req.status === 'Cancelled'
                                ? 'bg-red-50 text-red-800 border-red-200'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="Pending Review">Pending Review</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Middle: Details & Client Message */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-700">
                        <div className="space-y-1.5">
                          <p>
                            <span className="text-stone-500">Preferred Date:</span>{' '}
                            <strong>{req.preferredDate || 'Flexible / Not specified'}</strong>
                          </p>
                          <p>
                            <span className="text-stone-500">Time Slot:</span>{' '}
                            <strong>{req.preferredTime}</strong>
                          </p>
                          {req.email && (
                            <p>
                              <span className="text-stone-500">Email:</span> {req.email}
                            </p>
                          )}
                          {req.confirmedDate && (
                            <p className="text-emerald-800 bg-emerald-50 p-1.5 rounded inline-block">
                              ✓ Studio Confirmed: {req.confirmedDate}
                            </p>
                          )}
                        </div>

                        <div>
                          <span className="text-stone-500 block mb-1">Client Message / Scope:</span>
                          <p className="bg-stone-50 p-2.5 rounded border border-stone-200 text-stone-800 italic">
                            {req.message || 'No additional message provided.'}
                          </p>
                        </div>
                      </div>

                      {/* Notes / Confirmation Editor */}
                      {isEditing ? (
                        <div className="p-3 bg-stone-50 rounded border border-stone-300 space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="text-[11px] font-medium text-stone-700 block">
                                Confirmed Date / Time with Client:
                              </label>
                              <input
                                type="text"
                                value={confirmedTimeInput}
                                onChange={(e) => setConfirmedTimeInput(e.target.value)}
                                placeholder="e.g. Saturday 11:30 AM at site"
                                className="w-full text-xs p-1.5 border rounded bg-white"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-medium text-stone-700 block">
                                Internal Studio Notes:
                              </label>
                              <input
                                type="text"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                placeholder="e.g. Needs quote by Thursday; modular kitchen focus"
                                className="w-full text-xs p-1.5 border rounded bg-white"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-200 rounded"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveNotes(req.id)}
                              className="px-3 py-1 text-xs font-medium text-white bg-stone-900 rounded flex items-center gap-1"
                            >
                              <Save className="w-3 h-3" /> Save Note
                            </button>
                          </div>
                        </div>
                      ) : (
                        req.ownerNotes && (
                          <div className="text-xs bg-amber-50/50 p-2 rounded border border-amber-200 text-amber-900">
                            <span className="font-semibold">Internal Note:</span> {req.ownerNotes}
                          </div>
                        )
                      )}

                      {/* Bottom Actions Bar */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${req.phone}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded font-medium text-stone-800"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#9A6B43]" />
                            <span>Call {req.phone}</span>
                          </a>

                          <a
                            href={`https://wa.me/91${req.phone.replace(/[^0-9]/g, '').slice(-10)}?text=Hello%20${encodeURIComponent(req.fullName)},%20this%20is%20Preet%20Interiors%20regarding%20your%20consultation%20request.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded font-medium"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <button
                            onClick={() => {
                              setEditingId(req.id);
                              setNoteText(req.ownerNotes || '');
                              setConfirmedTimeInput(req.confirmedDate || '');
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{req.ownerNotes ? 'Edit Notes' : 'Add Note'}</span>
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeleteConsultation(req.id)}
                          className="text-stone-400 hover:text-red-600 p-1.5 rounded transition-colors"
                          title="Delete Request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* General Enquiries Tab */
            enquiries.length === 0 ? (
              <div className="text-center py-16 text-stone-500 text-sm">
                No general enquiries recorded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => {
                  const dateStr = new Date(enq.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <div
                      key={enq.id}
                      className="bg-white rounded-lg border border-stone-200 p-5 shadow-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif text-lg font-medium text-stone-900">
                              {enq.name}
                            </h4>
                            <span className="text-xs text-stone-500">
                              · {enq.projectType} · {enq.location}
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-400">Date: {dateStr}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={enq.status}
                            onChange={(e) =>
                              handleUpdateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)
                            }
                            className="text-xs font-semibold px-2 py-1 rounded border border-stone-300"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>

                          <button
                            onClick={() => handleDeleteEnquiry(enq.id)}
                            className="text-stone-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded border border-stone-200">
                        {enq.requirements}
                      </p>

                      <div className="flex items-center gap-3 pt-1 text-xs">
                        <a
                          href={`tel:${enq.phone}`}
                          className="inline-flex items-center gap-1 font-medium text-stone-800 hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#9A6B43]" />
                          <span>{enq.phone}</span>
                        </a>

                        {enq.email && (
                          <span className="text-stone-500">Email: {enq.email}</span>
                        )}

                        <a
                          href={`https://wa.me/91${enq.phone.replace(/[^0-9]/g, '').slice(-10)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:underline inline-flex items-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Preet Interiors Administrative Architecture</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-stone-800 hover:bg-stone-200 rounded"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
}
