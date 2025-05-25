import type { ImageAsset } from '../types/assets';

export const backgrounds: ImageAsset[] = [
  {
    src: '/images/background-1.jpg',
    alt: 'Background image 1',
    format: 'jpg',
    size: 167,
    optimized: false
  },
  {
    src: '/images/background-2.jpg',
    alt: 'Background image 2',
    format: 'jpg',
    size: 167,
    optimized: false
  },
  {
    src: '/images/background-3.jpg',
    alt: 'Background image 3',
    format: 'jpg',
    size: 199,
    optimized: false
  },
  {
    src: '/images/background-4.jpg',
    alt: 'Background image 4',
    format: 'jpg',
    size: 167,
    optimized: false
  },
  {
    src: '/images/background-5.jpg',
    alt: 'Background image 5',
    format: 'jpg',
    size: 152,
    optimized: false
  },
  {
    src: '/images/background-6.jpg',
    alt: 'Background image 6',
    format: 'jpg',
    size: 210,
    optimized: false
  },
  {
    src: '/images/background-7.jpg',
    alt: 'Background image 7',
    format: 'jpg',
    size: 166,
    optimized: false
  },
  {
    src: '/images/background-8.jpg',
    alt: 'Background image 8',
    format: 'jpg',
    size: 263,
    optimized: false
  },
  {
    src: '/images/background-9.jpg',
    alt: 'Background image 9',
    format: 'jpg',
    size: 224,
    optimized: false
  },
  {
    src: '/images/background-10.jpg',
    alt: 'Background image 10',
    format: 'jpg',
    size: 143,
    optimized: false
  }
];

// Export a function to get a random background
export const getRandomBackground = (): ImageAsset => {
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  return backgrounds[randomIndex];
};

// Export a function to get a specific background by index
export const getBackgroundByIndex = (index: number): ImageAsset | undefined => {
  return backgrounds[index];
}; 