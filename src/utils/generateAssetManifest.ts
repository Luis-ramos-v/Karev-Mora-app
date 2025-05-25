import { writeFileSync } from 'fs';
import { join, resolve } from 'path';
import sharp from 'sharp';
import { glob } from 'glob';
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
  const imageFiles = await glob('src/assets/images/*.{jpg,png,webp,svg}', {
    cwd: process.cwd(),
    absolute: true,
  });
  
  for (const filePath of imageFiles) {
    const fileName = filePath.split('/').pop()?.split('.')[0] || '';
    const metadata = await getImageMetadata(filePath);
    const relativePath = filePath.replace(process.cwd(), '').replace(/\\/g, '/');
    
    manifest.images[fileName] = {
      src: relativePath,
      alt: fileName.replace(/-/g, ' '),
      width: metadata.width,
      height: metadata.height,
      format: metadata.format as ImageAsset['format'],
      size: metadata.size,
      optimized: true
    };
  }

  // Process icons
  const iconFiles = await glob('src/assets/icons/*.{svg,png}', {
    cwd: process.cwd(),
    absolute: true,
  });
  
  for (const filePath of iconFiles) {
    const fileName = filePath.split('/').pop()?.split('.')[0] || '';
    const metadata = await getImageMetadata(filePath);
    const relativePath = filePath.replace(process.cwd(), '').replace(/\\/g, '/');
    
    manifest.icons[fileName] = {
      src: relativePath,
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