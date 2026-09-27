/**
 * Centralized Studio Image Assets
 * Uses Vite asset bundling so all images are properly hashed, bundled,
 * and served correctly in production (Vercel, Netlify, Cloud Run, etc.)
 * with static /public/images fallback.
 */

import heroLiving from './images/hero_preet_living_1790515137644.jpg';
import diningDetail from './images/preet_dining_detail_1790515157449.jpg';
import modularKitchen from './images/preet_modular_kitchen_1790515176816.jpg';
import masterBedroom from './images/preet_master_bedroom_1790515188090.jpg';
import wardrobeStorage from './images/preet_wardrobe_storage_1790515203354.jpg';

export const STUDIO_IMAGES = {
  heroLiving,
  diningDetail,
  modularKitchen,
  masterBedroom,
  wardrobeStorage,
};
