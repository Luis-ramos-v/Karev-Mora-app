import { mkdir } from 'fs/promises';
import { join } from 'path';

const directories = [
  // Components
  'components/common',
  'components/layout',
  'components/pages',

  // Hooks
  'hooks',

  // Services
  'services',

  // Utils
  'utils',

  // Types
  'types',

  // Styles
  'styles',

  // Assets
  'assets/images',
  'assets/fonts',
  'assets/icons',

  // Tests
  '__tests__/components',
  '__tests__/hooks',
  '__tests__/services',
  '__tests__/utils',
];

async function createDirectories() {
  for (const dir of directories) {
    const path = join(process.cwd(), 'src', dir);
    try {
      await mkdir(path, { recursive: true });
      console.log(`Created directory: ${path}`);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        console.error(`Error creating directory ${path}:`, error);
      }
    }
  }
}

createDirectories().catch(console.error);
