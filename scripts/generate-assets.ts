import { generateAssetManifest } from '../src/utils/generateAssetManifest';
import { mkdir } from 'fs/promises';
import { join } from 'path';

async function main() {
  try {
    // Ensure the generated directory exists
    const generatedDir = join(process.cwd(), 'src', 'generated');
    await mkdir(generatedDir, { recursive: true });

    // Generate the asset manifest
    await generateAssetManifest();
    
    console.log('✅ Asset manifest generated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating asset manifest:', error);
    process.exit(1);
  }
}

main(); 