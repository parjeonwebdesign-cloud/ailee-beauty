import React from 'react';

// Import image assets directly so Vite bundles and resolves them with hashed production URLs
import heroBanner from './images/ailee_hero_banner.jpg';
import jellyTint from './images/ailee_jelly_tint.jpg';
import cloudMousse from './images/ailee_cloud_mousse.jpg';
import glassHighlighter from './images/ailee_glass_highlighter.jpg';
import dewBalm from './images/ailee_dew_balm.jpg';
import journalFlatlay from './images/ailee_journal_flatlay.jpg';
import glassVeilLip from './images/ailee_glass_veil_lip.jpg';
import glowCushion from './images/ailee_glow_cushion.jpg';
import skinVeilFoundation from './images/ailee_skin_veil_foundation.jpg';
import softBlurPowder from './images/ailee_soft_blur_powder.jpg';
import lightBeamPalette from './images/ailee_light_beam_palette.jpg';
import glassShadow from './images/ailee_glass_shadow.jpg';
import dewyMascara from './images/ailee_dewy_mascara.jpg';
import prismBlush from './images/ailee_prism_blush.jpg';
import glassBeamBlush from './images/ailee_glass_beam_blush.jpg';
import toneUpBase from './images/ailee_tone_up_base.jpg';
import silkSlimEyeliner from './images/ailee_silk_slim_eyeliner.jpg';
import velvetCreamBlush from './images/ailee_velvet_cream_blush.jpg';
import bloomWaterBlush from './images/ailee_bloom_water_blush.jpg';
import diamondStickHighlighter from './images/ailee_diamond_stick_highlighter.jpg';
import luminousLiquidHighlighter from './images/ailee_luminous_liquid_highlighter.jpg';
import moonlightPearlHighlighter from './images/ailee_moonlight_pearl_highlighter.jpg';

export const IMAGES = {
  heroBanner,
  jellyTint,
  cloudMousse,
  glassHighlighter,
  dewBalm,
  glassVeilLip,
  glowCushion,
  skinVeilFoundation,
  softBlurPowder,
  lightBeamPalette,
  glassShadow,
  dewyMascara,
  prismBlush,
  glassBeamBlush,
  toneUpBase,
  silkSlimEyeliner,
  velvetCreamBlush,
  bloomWaterBlush,
  diamondStickHighlighter,
  luminousLiquidHighlighter,
  moonlightPearlHighlighter,
  journalFlatlay,
  fallback: heroBanner,
};

export const getImageCategoryForProductId = (id: string): keyof typeof IMAGES => {
  switch (id) {
    case 'jelly-glow-tint': return 'jellyTint';
    case 'cloud-blur-lip-mousse': return 'cloudMousse';
    case 'glass-veil-highlighter': return 'glassHighlighter';
    case 'dew-drop-glow-balm': return 'dewBalm';
    case 'glass-veil-lip': return 'glassVeilLip';
    case 'glow-cushion': return 'glowCushion';
    case 'skin-veil-foundation': return 'skinVeilFoundation';
    case 'soft-blur-powder': return 'softBlurPowder';
    case 'tone-up-glow-base': return 'toneUpBase';
    case 'light-beam-palette': return 'lightBeamPalette';
    case 'glass-shadow': return 'glassShadow';
    case 'dewy-mascara': return 'dewyMascara';
    case 'silk-slim-eyeliner': return 'silkSlimEyeliner';
    case 'prism-blush': return 'prismBlush';
    case 'glass-beam-blush': return 'glassBeamBlush';
    case 'velvet-cream-blush': return 'velvetCreamBlush';
    case 'bloom-water-blush': return 'bloomWaterBlush';
    case 'diamond-stick-highlighter': return 'diamondStickHighlighter';
    case 'luminous-liquid-highlighter': return 'luminousLiquidHighlighter';
    case 'moonlight-pearl-highlighter': return 'moonlightPearlHighlighter';
    default: return 'heroBanner';
  }
};

// Extremely simple, bulletproof error handler
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  category: keyof typeof IMAGES = 'heroBanner'
) => {
  const img = e.currentTarget;
  img.onerror = null; // prevent loops
  const targetImg = IMAGES[category] || IMAGES.heroBanner;
  if (img.src !== targetImg) {
    img.src = targetImg;
  }
};

export const handleProductImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  productId: string
) => {
  const category = getImageCategoryForProductId(productId);
  handleImageError(e, category);
};
