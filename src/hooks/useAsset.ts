import { useMemo } from 'react';
import type { AssetType } from '../types/assets';
import { getAsset } from '../utils/assetManager';

export const useAsset = <T extends AssetType>(
  category: 'images' | 'icons' | 'fonts',
  name: string
): T | undefined => {
  return useMemo(() => getAsset<T>(category, name), [category, name]);
};

// Convenience hooks for specific asset types
export const useImage = (name: string) => useAsset<'images'>(name);
export const useIcon = (name: string) => useAsset<'icons'>(name);
export const useFont = (name: string) => useAsset<'fonts'>(name);
