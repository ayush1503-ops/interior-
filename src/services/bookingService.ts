/**
 * Booking and Enquiry Data Management Service
 * Handles consultation requests and customer enquiries.
 * Fulfills prompt requirements 25 & 26 (Distinction between request vs confirmed, owner review & status updates).
 */

export type AppointmentStatus = 'Pending Review' | 'Confirmed' | 'Completed' | 'Cancelled';
export type EnquiryStatus = 'New' | 'Contacted' | 'Closed';

export interface ConsultationRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  preferredDate: string;
  preferredTime: string;
  locationArea: string;
  approxSize: string;
  message: string;
  status: AppointmentStatus;
  createdAt: string;
  confirmedDate?: string;
  ownerNotes?: string;
}

export interface GeneralEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  requirements: string;
  status: EnquiryStatus;
  createdAt: string;
  ownerNotes?: string;
}

const CONSULTATIONS_STORAGE_KEY = 'preet_interiors_consultations';
const ENQUIRIES_STORAGE_KEY = 'preet_interiors_enquiries';

const INITIAL_CONSULTATIONS: ConsultationRequest[] = [
  {
    id: 'req-101',
    fullName: 'Rajesh Malhotra',
    phone: '9810234567',
    email: 'r.malhotra@gmail.com',
    projectType: 'Apartment',
    preferredDate: '2026-10-04',
    preferredTime: 'Morning (10:00 AM – 1:00 PM)',
    locationArea: 'Preet Vihar, Delhi',
    approxSize: '1,850 sq ft (3 BHK)',
    message: 'Looking for complete woodwork, modular kitchen and living room false ceiling for newly handed over apartment.',
    status: 'Pending Review',
    createdAt: '2026-09-26T14:30:00.000Z',
    ownerNotes: 'Client called on Saturday morning. Prefers meeting at site.',
  },
  {
    id: 'req-102',
    fullName: 'Sunita Sharma',
    phone: '9873412345',
    email: 'sunita.sharma@yahoo.com',
    projectType: 'Kitchen',
    preferredDate: '2026-10-02',
    preferredTime: 'Afternoon (2:00 PM – 5:00 PM)',
    locationArea: 'Krishna Nagar, Delhi',
    approxSize: '14 x 10 ft kitchen',
    message: 'Need modular kitchen renovation with quartz countertop and acrylic shutters.',
    status: 'Confirmed',
    createdAt: '2026-09-25T11:15:00.000Z',
    confirmedDate: '2026-10-02 at 3:00 PM',
    ownerNotes: 'Confirmed site measurement visit with senior carpenter.',
  },
];

const INITIAL_ENQUIRIES: GeneralEnquiry[] = [
  {
    id: 'enq-201',
    name: 'Vikram Sethi',
    phone: '9911223344',
    email: 'vikram.sethi@gmail.com',
    projectType: 'Living Room',
    location: 'Anand Vihar, Delhi',
    requirements: 'Interested in bespoke TV wall paneling and low travertine coffee table as shown in your portfolio.',
    status: 'New',
    createdAt: '2026-09-26T16:45:00.000Z',
  },
];

export const bookingService = {
  getConsultations(): ConsultationRequest[] {
    try {
      const stored = localStorage.getItem(CONSULTATIONS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(CONSULTATIONS_STORAGE_KEY, JSON.stringify(INITIAL_CONSULTATIONS));
        return INITIAL_CONSULTATIONS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading consultations from localStorage:', e);
      return INITIAL_CONSULTATIONS;
    }
  },

  submitConsultationRequest(
    data: Omit<ConsultationRequest, 'id' | 'status' | 'createdAt'>
  ): ConsultationRequest {
    const newRequest: ConsultationRequest = {
      ...data,
      id: `req-${Date.now().toString(36)}`,
      status: 'Pending Review',
      createdAt: new Date().toISOString(),
    };

    const current = this.getConsultations();
    const updated = [newRequest, ...current];
    try {
      localStorage.setItem(CONSULTATIONS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('preet_data_updated'));
    } catch (e) {
      console.error('Failed to save consultation request:', e);
    }
    return newRequest;
  },

  updateConsultationStatus(
    id: string,
    status: AppointmentStatus,
    ownerNotes?: string,
    confirmedDate?: string
  ): boolean {
    const current = this.getConsultations();
    const index = current.findIndex((item) => item.id === id);
    if (index === -1) return false;

    current[index] = {
      ...current[index],
      status,
      ownerNotes: ownerNotes !== undefined ? ownerNotes : current[index].ownerNotes,
      confirmedDate: confirmedDate !== undefined ? confirmedDate : current[index].confirmedDate,
    };

    try {
      localStorage.setItem(CONSULTATIONS_STORAGE_KEY, JSON.stringify(current));
      window.dispatchEvent(new CustomEvent('preet_data_updated'));
      return true;
    } catch (e) {
      console.error('Failed to update consultation:', e);
      return false;
    }
  },

  deleteConsultation(id: string): boolean {
    const current = this.getConsultations();
    const filtered = current.filter((item) => item.id !== id);
    try {
      localStorage.setItem(CONSULTATIONS_STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new CustomEvent('preet_data_updated'));
      return true;
    } catch (e) {
      return false;
    }
  },

  getEnquiries(): GeneralEnquiry[] {
    try {
      const stored = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(INITIAL_ENQUIRIES));
        return INITIAL_ENQUIRIES;
      }
      return JSON.parse(stored);
    } catch (e) {
      return INITIAL_ENQUIRIES;
    }
  },

  submitEnquiry(data: Omit<GeneralEnquiry, 'id' | 'status' | 'createdAt'>): GeneralEnquiry {
    const newEnquiry: GeneralEnquiry = {
      ...data,
      id: `enq-${Date.now().toString(36)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    const current = this.getEnquiries();
    const updated = [newEnquiry, ...current];
    try {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('preet_data_updated'));
    } catch (e) {
      console.error('Failed to save enquiry:', e);
    }
    return newEnquiry;
  },

  updateEnquiryStatus(id: string, status: EnquiryStatus, ownerNotes?: string): boolean {
    const current = this.getEnquiries();
    const index = current.findIndex((item) => item.id === id);
    if (index === -1) return false;

    current[index] = {
      ...current[index],
      status,
      ownerNotes: ownerNotes !== undefined ? ownerNotes : current[index].ownerNotes,
    };

    try {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(current));
      window.dispatchEvent(new CustomEvent('preet_data_updated'));
      return true;
    } catch (e) {
      return false;
    }
  },

  deleteEnquiry(id: string): boolean {
    const current = this.getEnquiries();
    const filtered = current.filter((item) => item.id !== id);
    try {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new CustomEvent('preet_data_updated'));
      return true;
    } catch (e) {
      return false;
    }
  },
};
