/**
 * Preet Interiors - Core Studio Data & Content Architecture
 * Keeps business information, services, projects, and process easily maintainable.
 */

import { STUDIO_IMAGES } from '../assets/images';

export interface BusinessInfo {
  name: string;
  tagline: string;
  businessType: string;
  phone: string;
  phoneRaw: string;
  whatsappUrl: string;
  address: {
    line1: string;
    landmark: string;
    locality: string;
    city: string;
    pincode: string;
    full: string;
  };
  mapsUrl: string;
  googleReviewsUrl: string;
  hours: string;
  consultationNote: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  idealFor: string;
  keyAspects: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Residential' | 'Living Room' | 'Bedroom' | 'Kitchen' | 'Commercial';
  location: string;
  shortDescription: string;
  fullOverview: string;
  heroImage: string;
  galleryImages: { url: string; caption: string }[];
  designDetails: {
    layoutPlanning: string;
    materialsFinishes: string;
    lightingConcept: string;
    storageSolutions: string;
  };
  features: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  details: string[];
}

export interface WhyChoosePillar {
  title: string;
  description: string;
}

export const BUSINESS_INFO: BusinessInfo = {
  name: 'Preet Interiors',
  tagline: 'Spaces designed around the way you live.',
  businessType: 'Interior Designer / Interior Design Studio',
  phone: '098111 81116',
  phoneRaw: '+919811181116',
  whatsappUrl: 'https://wa.me/919811181116?text=Hello%20Preet%20Interiors,%20I%20would%20like%20to%20inquire%20about%20interior%20design%20consultation.',
  address: {
    line1: 'H-22 East, Street No. 6',
    landmark: 'Opp. Reliance Fresh',
    locality: 'Gyan Park, Chander Nagar, Krishna Nagar',
    city: 'Delhi',
    pincode: '110051',
    full: 'H-22 East, Street No. 6, Opp. Reliance Fresh, Gyan Park, Chander Nagar, Krishna Nagar, Delhi - 110051',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Preet+Interiors+H-22+East+Street+No+6+Krishna+Nagar+Delhi+110051',
  googleReviewsUrl: 'https://www.google.com/maps/search/?api=1&query=Preet+Interiors+Krishna+Nagar+Delhi+reviews',
  hours: 'Monday – Saturday: 10:00 AM – 7:30 PM (Consultations by Appointment)',
  consultationNote: 'Consultations are scheduled in advance so our design team can give undivided attention to your space requirements.',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'residential-interiors',
    title: 'Residential Interiors',
    shortDescription: 'Complete interior planning for homes and apartments across Delhi.',
    fullDescription: 'Comprehensive spatial planning and interior design for new homes, complete floor renovations, and builder floors. We balance layout proportion, circulation, and material durability with your family\'s daily routines.',
    deliverables: [
      'Comprehensive floor layout and furniture zoning',
      'Civil modification guidance and electrical layouts',
      'False ceiling, lighting, and ambient illumination plans',
      'Material, woodwork, and finish curation',
    ],
    idealFor: 'Full apartments, independent floors, and family homes seeking cohesive end-to-end design.',
    keyAspects: ['Layout proportion', 'Natural light optimization', 'Cohesive material palette'],
  },
  {
    id: 'living-spaces',
    title: 'Living Spaces',
    shortDescription: 'Living rooms designed around comfort, proportion, lighting and everyday use.',
    fullDescription: 'Living areas serve dual roles: a quiet sanctuary for the family and an inviting space to host guests. We design balanced seating layouts, custom media consoles, and acoustic warmth suited for Delhi homes.',
    deliverables: [
      'Bespoke TV and display millwork design',
      'Seating ergonomics and conversation zones',
      'Multi-tiered architectural and decorative lighting',
      'Wall panelling, texture curation, and soft furnishing guidance',
    ],
    idealFor: 'Formal drawing rooms, combined living-dining spaces, and family lounges.',
    keyAspects: ['Conversation zoning', 'Layered lighting', 'Warm architectural millwork'],
  },
  {
    id: 'bedrooms',
    title: 'Bedrooms',
    shortDescription: 'Personal, comfortable bedroom interiors with thoughtful storage and materials.',
    fullDescription: 'Quiet, restful retreats crafted with calming palettes, tactile materials, and integrated wardrobe solutions. Every corner is calibrated for quiet relaxation and clutter-free organization.',
    deliverables: [
      'Custom bed backdrops and upholstered headboards',
      'Integrated floating bedside tables and reading illumination',
      'Dressing niches and full-height mirror details',
      'Acoustic wall treatments and blackout drapery coordination',
    ],
    idealFor: 'Master suites, guest bedrooms, and children’s rooms needing practical longevity.',
    keyAspects: ['Acoustic softness', 'Ambient bedside control', 'Clutter-free storage'],
  },
  {
    id: 'modular-kitchens',
    title: 'Modular Kitchens',
    shortDescription: 'Functional kitchen layouts with practical storage and clean detailing.',
    fullDescription: 'Kitchens built for rigorous Indian culinary requirements without compromising on refined aesthetics. We prioritize efficient work-triangles, heavy-duty hardware, quartz surfaces, and ventilated storage.',
    deliverables: [
      'Ergonomic work triangle (Hob - Sink - Refrigerator) layout',
      'Moisture-resistant HDHMR/plywood cabinetry with premium laminates/acrylic',
      'Corner carousels, soft-close tandem boxes, and pantry units',
      'Discreet chimney ducting, quartz counters, and task lighting',
    ],
    idealFor: 'Homeowners seeking durable, grease-resistant, high-efficiency kitchen architecture.',
    keyAspects: ['Indian cooking ergonomics', 'Stain-resistant quartz', 'Concealed task lighting'],
  },
  {
    id: 'wardrobes-storage',
    title: 'Wardrobes & Storage',
    shortDescription: 'Custom storage solutions designed around the available space.',
    fullDescription: 'Floor-to-ceiling wardrobe joinery that maximizes vertical volume in compact city rooms. We tailor internal subdivisions for Indian ethnic attire, formal wear, luggage, and concealed lockers.',
    deliverables: [
      'Sliding and hinged wardrobe configurations with soft-closing dampeners',
      'Internal partition layouts customized to your wardrobe inventory',
      'Concealed interior profile sensors and vanity lighting',
      'Matching chest of drawers, dresser mirrors, and shoe consoles',
    ],
    idealFor: 'Master dressing rooms, compact bedrooms, and hallway utility storage.',
    keyAspects: ['Floor-to-ceiling utilization', 'Concealed LED profiles', 'Bespoke internal modules'],
  },
  {
    id: 'commercial-interiors',
    title: 'Commercial Interiors',
    shortDescription: 'Interior planning for offices, studios, retail and other working environments.',
    fullDescription: 'Professional environments designed to cultivate productive focus, welcome visiting clients, and communicate clear brand discipline. We account for cabling management, acoustic clarity, and wear resistance.',
    deliverables: [
      'Reception, executive cabin, and collaborative workstation zoning',
      'Acoustic paneling and false ceiling lighting grids',
      'Durable commercial-grade laminate and stone finishes',
      'Signage integration and client waiting lounge hospitality',
    ],
    idealFor: 'Executive offices, retail storefronts, consulting firms, and creative studios in Delhi NCR.',
    keyAspects: ['Clean wire concealment', 'Acoustic comfort', 'Brand-aligned arrival'],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'chander-nagar-residence',
    title: 'The Chander Nagar Living Pavilion',
    category: 'Living Room',
    location: 'Krishna Nagar, East Delhi',
    shortDescription: 'A serene living lounge blending fluted teak woodwork, travertine surfaces, and warm layered cove illumination.',
    fullOverview: 'Designed for a Delhi family seeking warmth, understated elegance, and spaciousness in an urban floor. The primary living zone eliminates visual clutter with seamless concealed storage, low-slung linen seating, and ambient cove lighting that makes the space feel open throughout the evening.',
    heroImage: STUDIO_IMAGES.heroLiving,
    galleryImages: [
      {
        url: STUDIO_IMAGES.heroLiving,
        caption: 'Wide conversational living lounge with custom teak wood millwork and low travertine coffee table.',
      },
      {
        url: STUDIO_IMAGES.diningDetail,
        caption: 'Adjoining dining space with fluted timber screen and handcrafted cane-back seating.',
      },
    ],
    designDetails: {
      layoutPlanning: 'Clear linear circulation connecting the foyer, main conversation grouping, and dining transition.',
      materialsFinishes: 'Natural teak veneer with matte PU finish, honed beige travertine, textured linen upholstery, and brushed brass fixtures.',
      lightingConcept: 'Indirect 3000K warm cove ceiling details paired with focused architectural spot sconces.',
      storageSolutions: 'Concealed floor-to-ceiling audio-video console with hidden wire chases and acoustic louvers.',
    },
    features: [
      'Custom fluted wall paneling',
      'Seamless concealed media storage',
      'Dual conversation seating layout',
      'Integrated brass accent lighting',
    ],
  },
  {
    id: 'preet-vihar-dining-suite',
    title: 'Preet Vihar Dining & Partition Suite',
    category: 'Residential',
    location: 'Preet Vihar, Delhi',
    shortDescription: 'Bespoke timber partition screen separating dining and formal living, crafted with natural cane detailing.',
    fullOverview: 'This project addressed a classic Delhi apartment layout challenge: creating privacy between the dining table and the entrance without closing off natural light or air circulation. The fluted timber partition introduces architectural depth while serving as a beautiful backdrop.',
    heroImage: STUDIO_IMAGES.diningDetail,
    galleryImages: [
      {
        url: STUDIO_IMAGES.diningDetail,
        caption: 'Sculptural dining table with cane-back dining chairs and fluted vertical timber divider.',
      },
      {
        url: STUDIO_IMAGES.heroLiving,
        caption: 'Visual connection between the dining area and the main living space.',
      },
    ],
    designDetails: {
      layoutPlanning: 'A semi-permeable architectural screen that gently defines the dining precinct without rigid walling.',
      materialsFinishes: 'Solid seasoned white oak, natural woven rattan cane, off-white lime wash plaster texture.',
      lightingConcept: 'Single artisanal matte ceramic pendant providing focused warm illumination over dining surface.',
      storageSolutions: 'Discreet low-height crockery console integrated into the perimeter wall niche.',
    },
    features: [
      'Semi-open architectural divider',
      'Artisanal natural cane weave',
      'Custom solid oak dining furniture',
      'Soft diffused pendant lighting',
    ],
  },
  {
    id: 'anand-vihar-modular-kitchen',
    title: 'The Anand Vihar Taupe Kitchen',
    category: 'Kitchen',
    location: 'Anand Vihar, Delhi',
    shortDescription: 'High-performance modular kitchen with matte taupe cabinetry, fluted accents, and seamless quartz worktops.',
    fullOverview: 'Engineered for high-volume family cooking, this kitchen integrates moisture-sealed HDHMR carcases, heavy-duty soft-close drawer slides, and an ergonomic Golden Triangle workflow. Matte anti-fingerprint surfaces keep daily maintenance effortless.',
    heroImage: STUDIO_IMAGES.modularKitchen,
    galleryImages: [
      {
        url: STUDIO_IMAGES.modularKitchen,
        caption: 'Ergonomic kitchen layout featuring fluted oak base cabinets, quartz surfaces, and concealed under-shelf lighting.',
      },
      {
        url: STUDIO_IMAGES.wardrobeStorage,
        caption: 'High-capacity full-height pantry and utility storage in adjacent corridor.',
      },
    ],
    designDetails: {
      layoutPlanning: 'L-shaped workflow with dedicated wet prep counter, wide hob zone, and tall utility pantry column.',
      materialsFinishes: 'Anti-scratch acrylic and fluted natural oak veneers, Calacatta quartz countertops with 45-degree waterfall edge.',
      lightingConcept: 'Continuous concealed 4000K natural white LED strip lighting under all wall cabinets for shadowless cooking prep.',
      storageSolutions: 'Triple-tier tandem drawers for heavy cookware, pull-out spice rack, and built-in tandem trash separators.',
    },
    features: [
      'Anti-fingerprint matte cabinetry',
      'Seamless non-porous quartz',
      'Heavy-load soft-close pullouts',
      'Integrated under-cabinet task lighting',
    ],
  },
  {
    id: 'greater-kailash-master-suite',
    title: 'The Greater Kailash Sanctuary Bedroom',
    category: 'Bedroom',
    location: 'Greater Kailash, South Delhi',
    shortDescription: 'A calm, tactile master bedroom featuring tailored upholstered panelling and floating bedside woodwork.',
    fullOverview: 'A restorative sanctuary removed from the bustling city sounds. Soft acoustic fabric panels behind the bed provide quiet warmth, complemented by floating nightstands that keep the floor area open and easy to maintain.',
    heroImage: STUDIO_IMAGES.masterBedroom,
    galleryImages: [
      {
        url: STUDIO_IMAGES.masterBedroom,
        caption: 'Serene bedroom composition with full-width upholstered headboard and warm brass wall sconces.',
      },
      {
        url: STUDIO_IMAGES.wardrobeStorage,
        caption: 'Adjoining dressing suite with floor-to-ceiling timber wardrobe joinery.',
      },
    ],
    designDetails: {
      layoutPlanning: 'Centrally anchored king bed framed by dual reading sconces and direct access to dedicated walk-in dressing nook.',
      materialsFinishes: 'Textured boucle fabric, natural American walnut veneers, brass fixtures, and Belgian linen drapes.',
      lightingConcept: 'Independent dual-circuit reading lamps with master touch dimming beside each bedside table.',
      storageSolutions: 'Integrated under-bed hydraulic lift storage plus seamless floor-to-ceiling wardrobe dressing wall.',
    },
    features: [
      'Full-width upholstered acoustic headboard',
      'Floating bedside tables for easy cleaning',
      'Independent warm reading sconces',
      'Connected custom dressing suite',
    ],
  },
  {
    id: 'noida-dressing-suite',
    title: 'The Noida Sector 15 Custom Dressing Wall',
    category: 'Residential',
    location: 'Sector 15, Noida',
    shortDescription: 'Floor-to-ceiling storage architecture with integrated lighting and minimalist hardware.',
    fullOverview: 'Maximizing vertical space in a contemporary penthouse. This wardrobe features custom interior divisions mapped precisely to the homeowners’ clothing requirements, including deep drawers, velvet accessories trays, and high overhead suitcases storage.',
    heroImage: STUDIO_IMAGES.wardrobeStorage,
    galleryImages: [
      {
        url: STUDIO_IMAGES.wardrobeStorage,
        caption: 'Floor-to-ceiling timber wardrobe with concealed warm illumination profiles and integrated brass pulls.',
      },
      {
        url: STUDIO_IMAGES.masterBedroom,
        caption: 'View into the adjoining master sleeping sanctuary.',
      },
    ],
    designDetails: {
      layoutPlanning: 'Corridor dressing layout providing seamless passage while delivering 18 linear feet of storage volume.',
      materialsFinishes: 'Warm walnut exterior with textured fabric-finish interior laminate, slim brass edge profiles.',
      lightingConcept: 'Automatic door-sensor LED channels illuminating internal hanging rails upon opening.',
      storageSolutions: 'Dedicated saree and suit hanging heights, lockable private lockers, and pull-out jewelry inserts.',
    },
    features: [
      'Sensor-activated internal LED profiles',
      'Floor-to-ceiling height optimization',
      'Integrated full-height brass handles',
      'Customized Indian apparel partitioning',
    ],
  },
];

export const DESIGN_PROCESS: ProcessStep[] = [
  {
    step: '01',
    title: 'Consultation',
    summary: 'Understand the space, requirements, lifestyle and expectations.',
    details: [
      'In-depth discussion on how your household uses each room',
      'Review of floor plans, dimensions, and natural lighting',
      'Clear definition of scope, timelines, and practical expectations',
    ],
  },
  {
    step: '02',
    title: 'Planning',
    summary: 'Develop the design direction, layout and practical requirements.',
    details: [
      'Space-efficient 2D furniture layouts and circulation paths',
      'Preliminary zoning for storage, lighting, and civil interventions',
      'Agreement on ergonomic proportions before visual detailing',
    ],
  },
  {
    step: '03',
    title: 'Design Development',
    summary: 'Refine materials, finishes, furniture, lighting and details.',
    details: [
      'Selection of timber veneers, laminates, fabrics, and stone',
      'Detailed 3D visualizations and elevation drawings',
      'Electrical, ceiling, and plumbing drawings for seamless execution',
    ],
  },
  {
    step: '04',
    title: 'Execution',
    summary: 'Move from the approved design toward the finished space.',
    details: [
      'Site coordination and milestone-based carpenter and vendor supervision',
      'Material quality verification at arrival',
      'Final snag checklist and seamless handover of your home',
    ],
  },
];

export const WHY_CHOOSE_US: WhyChoosePillar[] = [
  {
    title: 'Personalised Design',
    description: 'Every Delhi home has unique spatial realities and family dynamics. We never force cookie-cutter templates.',
  },
  {
    title: 'Practical Planning',
    description: 'A beautiful room must function smoothly day to day. We prioritize easy maintenance, natural circulation, and ergonomic ease.',
  },
  {
    title: 'Attention to Detail',
    description: 'From precision woodwork joints to hidden wire conduits and smooth drawer closures, quality shows in the details.',
  },
  {
    title: 'Space-Conscious Solutions',
    description: 'Maximizing every inch in Delhi apartments with floor-to-ceiling storage, multi-functional furniture, and uncluttered layouts.',
  },
  {
    title: 'Clear Communication',
    description: 'Straightforward discussions on what can realistically be achieved, realistic timelines, and transparent coordination.',
  },
  {
    title: 'Designed Around Your Needs',
    description: 'Your habits, routines, and aesthetic sensibilities guide every finish, lighting choice, and material recommendation.',
  },
];

export const PROJECT_TYPES = [
  'Home',
  'Apartment',
  'Villa',
  'Bedroom',
  'Living Room',
  'Kitchen',
  'Office',
  'Commercial Space',
  'Other',
] as const;

export const TIME_SLOTS = [
  'Morning (10:00 AM – 1:00 PM)',
  'Afternoon (2:00 PM – 5:00 PM)',
  'Evening (5:00 PM – 7:30 PM)',
] as const;
