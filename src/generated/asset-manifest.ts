export type IconName = 
  | 'github'
  | 'twitter'
  | 'linkedin'
  | 'instagram'
  | 'youtube'
  | 'discord'
  | 'email'
  | 'external'
  | 'menu'
  | 'close'
  | 'refresh'
  | 'settings'
  | 'theme'
  | 'language'
  | 'onlyfans'
  | 'crown'
  | 'gift'
  | 'paypal'
  | 'circle-user';

export type ImageName = 
  | 'background-default'
  | 'background-links'
  | 'background-about'
  | 'background-projects'
  | 'background-contact'
  | 'avatar'
  | 'logo'
  | 'logo-dark'
  | 'logo-light';

export interface AssetMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
}

export interface AssetManifest {
  icons: Record<IconName, {
    src: string;
    name: IconName;
    metadata: AssetMetadata;
  }>;
  images: Record<ImageName, {
    src: string;
    name: ImageName;
    metadata: AssetMetadata;
  }>;
}

// This will be generated at build time
export const assetManifest: AssetManifest = {
  icons: {} as AssetManifest['icons'],
  images: {} as AssetManifest['images'],
}; 