import { writeFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import type { AssetManifest, ImageAsset, IconAsset } from '../types/assets';

interface AssetMetadata {
  width?: number;
  height?: number;
  size: number;
  format: string;
}

async function getImageMetadata(path: string): Promise<AssetMetadata> {
  const image = sharp(path);
  const metadata = await image.metadata();
  const stats = await image.stats();
  
  return {
    width: metadata.width,
    height: metadata.height,
    size: stats.size || 0,
    format: metadata.format || 'unknown'
  };
}

export async function generateAssetManifest(): Promise<void> {
  const manifest: AssetManifest = {
    images: {},
    icons: {},
    fonts: {
      'Inter': {
        family: 'Inter',
        weights: [400, 500, 600, 700],
        formats: ['woff2', 'woff'],
        display: 'swap',
      }
    }
  };

  // Process images
  const imageImports = import.meta.glob<{ default: string }>('/src/assets/images/*.{jpg,png,webp,svg}', {
    eager: true,
  });

  for (const [path, module] of Object.entries(imageImports)) {
    const fileName = path.split('/').pop()?.split('.')[0] || '';
    const metadata = await getImageMetadata(module.default);
    
    manifest.images[fileName] = {
      src: module.default,
      alt: fileName.replace(/-/g, ' '),
      width: metadata.width,
      height: metadata.height,
      format: metadata.format as ImageAsset['format'],
      size: metadata.size,
      optimized: true // Since we're using sharp for optimization
    };
  }

  // Process icons
  const iconImports = import.meta.glob<{ default: string }>('/src/assets/icons/*.{svg,png}', {
    eager: true,
  });

  for (const [path, module] of Object.entries(iconImports)) {
    const fileName = path.split('/').pop()?.split('.')[0] || '';
    const metadata = await getImageMetadata(module.default);
    
    manifest.icons[fileName] = {
      src: module.default,
      name: fileName,
      format: metadata.format as IconAsset['format'],
      size: metadata.size
    };
  }

  // Write the manifest to a file
  const manifestPath = join(process.cwd(), 'src', 'generated', 'asset-manifest.ts');
  const manifestContent = `// This file is auto-generated. Do not edit manually.
import type { AssetManifest } from '../types/assets';

export const assetManifest: AssetManifest = ${JSON.stringify(manifest, null, 2)} as const;

// Type-safe asset names
export type ImageName = keyof typeof assetManifest.images;
export type IconName = keyof typeof assetManifest.icons;
export type FontName = keyof typeof assetManifest.fonts;
`;

  writeFileSync(manifestPath, manifestContent);
  console.log('Asset manifest generated successfully!');
} 