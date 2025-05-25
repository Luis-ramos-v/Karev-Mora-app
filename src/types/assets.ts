export type ImageAsset = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  format: 'jpg' | 'png' | 'webp' | 'svg';
  size: number;
  optimized: boolean;
};

export type IconAsset = {
  src: string;
  name: string;
  size: number;
  format: 'svg' | 'png';
};

export type FontAsset = {
  family: string;
  weights: number[];
  formats: ('woff2' | 'woff' | 'ttf')[];
  display: 'swap' | 'block' | 'fallback' | 'optional';
};

export type AssetManifest = {
  images: Record<string, ImageAsset>;
  icons: Record<string, IconAsset>;
  fonts: Record<string, FontAsset>;
};

export type AssetCategory = keyof AssetManifest;
export type AssetType = ImageAsset | IconAsset | FontAsset;
