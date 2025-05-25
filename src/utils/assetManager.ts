import type { AssetType } from '../types/assets';
import {
  assetManifest,
  type ImageName,
  type IconName,
  type FontName,
} from '../generated/asset-manifest';
import { useMemo } from 'react';

// Import all images
const imageImports = import.meta.glob<{ default: string }>(
  '/src/assets/images/*.{jpg,png,webp,svg}',
  {
    eager: true,
  }
);

// Import all icons
const iconImports = import.meta.glob<{ default: string }>('/src/assets/icons/*.{svg,png}', {
  eager: true,
});

// Create the asset manifest
const assetManifest: AssetManifest = {
  images: {},
  icons: {},
  fonts: {
    Inter: {
      family: 'Inter',
      weights: [400, 500, 600, 700],
      formats: ['woff2', 'woff'],
      display: 'swap',
    },
    // Add more fonts as needed
  },
};

// Process and add images to manifest
Object.entries(imageImports).forEach(([path, module]) => {
  const fileName = path.split('/').pop()?.split('.')[0] || '';
  const format = path.split('.').pop() as ImageAsset['format'];

  // Create a temporary image to get dimensions
  const img = new Image();
  img.src = module.default;

  assetManifest.images[fileName] = {
    src: module.default,
    alt: fileName.replace(/-/g, ' '),
    format,
    size: 0, // This will be updated when we implement image optimization
    optimized: false, // This will be updated when we implement image optimization
  };
});

// Process and add icons to manifest
Object.entries(iconImports).forEach(([path, module]) => {
  const fileName = path.split('/').pop()?.split('.')[0] || '';
  const format = path.split('.').pop() as IconAsset['format'];

  assetManifest.icons[fileName] = {
    src: module.default,
    name: fileName,
    format,
    size: 0, // This will be updated when we implement icon optimization
  };
});

// Utility functions with type-safe asset names
export const getAsset = <T extends AssetType>(
  category: keyof typeof assetManifest,
  name: string
): T | undefined => {
  return assetManifest[category][name] as T | undefined;
};

export const getImage = (name: ImageName) => {
  return assetManifest.images[name] ?? null;
};

export const getIcon = (name: IconName) => {
  return assetManifest.icons[name] ?? null;
};

export const getFont = (name: FontName) => {
  return assetManifest.fonts[name];
};

// Export the manifest for debugging and development
export const manifest = assetManifest;

// Export type-safe asset names
export type { ImageName, IconName, FontName };

// Export a hook-friendly version with type safety
export const useAsset = <T extends AssetType>(
  category: keyof typeof assetManifest,
  name: string
): T | undefined => {
  return getAsset<T>(category, name);
};

export const useIcon = (name: IconName) => {
  return useMemo(() => {
    const icon = assetManifest.icons[name];
    if (!icon) {
      console.warn(`Icon "${name}" not found in asset manifest`);
      return null;
    }
    return icon;
  }, [name]);
};

export const useImage = (name: ImageName) => {
  return useMemo(() => {
    const image = assetManifest.images[name];
    if (!image) {
      console.warn(`Image "${name}" not found in asset manifest`);
      return null;
    }
    return image;
  }, [name]);
};

export const getAllIcons = () => {
  return Object.values(assetManifest.icons);
};

export const getAllImages = () => {
  return Object.values(assetManifest.images);
};
