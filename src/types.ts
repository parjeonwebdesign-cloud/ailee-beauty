export type ColorTone = 'Warm' | 'Cool' | 'Neutral';
export type TextureType = 
  | 'Jelly Glow' 
  | 'Cloud Velvet' 
  | 'Glass Veil' 
  | 'Dewy Multi Balm' 
  | 'Glow Cushion' 
  | 'Skin Veil' 
  | 'Soft Blur' 
  | 'Light Beam' 
  | 'Glass Shadow' 
  | 'Dewy Mascara' 
  | 'Prism Blush' 
  | 'Glass Beam' 
  | 'Cream Pearl';
export type FinishType = 'Glossy' | 'Blur' | 'Dewy' | 'Pearl' | 'Velvet' | 'Matte' | 'Satin' | 'Shimmer';
export type CategoryType = 'Lip' | 'Face' | 'Eye' | 'Cheek' | 'Highlighter' | 'Face Glow';

export interface ColorShade {
  id: string;
  code: string; // e.g., '01'
  name: string; // e.g., 'Rosy Glass'
  nameKo: string; // e.g., '로지 글래스'
  hex: string;
  tone: ColorTone;
  toneTag: string; // e.g., '여름 쿨 / 봄 웜'
  description: string;
  lipSwatchBg?: string; // CSS gradient or color preview
}

export interface TextureMetrics {
  moisture: number; // 1-100
  gloss: number; // 1-100
  adherence: number; // 1-100
  pigmentation: number; // 1-100
  weightlessness: number; // 1-100
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  shadeUsed: string;
  skinType: string;
  title: string;
  content: string;
  helpfulCount: number;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  nameKo: string;
  price: number;
  category: CategoryType;
  tag: string;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  image: string;
  hoverImage?: string;
  textureType: TextureType;
  finish: FinishType;
  summary: string;
  description: string;
  shades: ColorShade[];
  textureMetrics: TextureMetrics;
  howToUse: string[];
  recommendedSkinTones: {
    tone: string;
    description: string;
  }[];
  recommendedMakeupLook: {
    title: string;
    description: string;
    tip: string;
  };
  keyIngredients: {
    name: string;
    nameKo: string;
    effect: string;
  }[];
  reviews: Review[];
  pairsWellWithIds: string[];
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
  relatedProductIds: string[];
}

export interface CartItem {
  product: Product;
  selectedShade: ColorShade;
  quantity: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    value: string;
    description: string;
    iconName?: string;
  }[];
}

export interface ShadeFinderAnswers {
  mood: string; // 'Natural' | 'Lovely' | 'Cool' | 'Bold'
  finish: string; // 'Glossy' | 'Blur' | 'Dewy'
  undertone: string; // 'Spring' | 'Summer' | 'Autumn' | 'Winter'
}
