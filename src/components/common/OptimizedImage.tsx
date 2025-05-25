import { memo } from 'react';
import styled from 'styled-components';
import { useImage } from '../../hooks/useAsset';
import type { ImageAsset } from '../../types/assets';

interface OptimizedImageProps {
  name: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

const StyledImage = styled.img<{ $isLoading: boolean }>`
  opacity: ${({ $isLoading }) => ($isLoading ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;

export const OptimizedImage = memo(({
  name,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  priority = false,
}: OptimizedImageProps) => {
  const image = useImage(name);
  
  if (!image) {
    console.warn(`Image "${name}" not found in asset manifest`);
    return null;
  }

  const finalAlt = alt || image.alt;
  const finalWidth = width || image.width;
  const finalHeight = height || image.height;

  return (
    <StyledImage
      src={image.src}
      alt={finalAlt}
      width={finalWidth}
      height={finalHeight}
      className={className}
      loading={priority ? 'eager' : loading}
      decoding={priority ? 'sync' : 'async'}
      $isLoading={!image.optimized}
      onLoad={(e) => {
        const img = e.target as HTMLImageElement;
        if (img.complete) {
          img.style.opacity = '1';
        }
      }}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage'; 