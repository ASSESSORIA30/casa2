export type RoomType =
  | 'living'
  | 'kitchen'
  | 'bedroom'
  | 'suite'
  | 'bath'
  | 'laundry'
  | 'pantry'
  | 'office'
  | 'garage'
  | 'technical'
  | 'gym'
  | 'hall'
  | 'closet';

export type PlanRoom = {
  name: string;
  type: RoomType;
  area: number;
  x: number;
  y: number;
  w: number;
  h: number;
  window?: 'top' | 'bottom' | 'left' | 'right' | 'none';
  door?: 'top' | 'bottom' | 'left' | 'right' | 'none';
};

export type PublicHouse = {
  id: string;
  name: string;
  slug: string;
  surface: number;
  usableSurface: number;
  porchSurface: number;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  garage: boolean;
  pool: boolean;
  dimensions: string;
  tagline: string;
  description: string;
  audience: string;
  hero: string;
  gallery: { src: string; alt: string; prompt: string }[];
  features: string[];
  equipment: string[];
  options: string[];
  rooms: { name: string; area: number }[];
  plan: {
    widthM: number;
    depthM: number;
    rooms: PlanRoom[];
  };
  retailPrice: number;
};
