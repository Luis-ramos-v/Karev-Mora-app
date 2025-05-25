const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '../public/images');

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading images directory:', err);
    process.exit(1);
  }

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const filePath = path.join(imagesDir, file);
      // Read the image into a buffer (synchronously) so that the file isn't "open" (and locked) when sharp writes the optimized version.
      const buffer = fs.readFileSync(filePath);
      sharp(buffer)
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer()
        .then((data) => {
          fs.writeFile(filePath, data, (err) => {
            if (err) {
              console.error('Error writing optimized image:', file, err);
            } else {
              console.log('Optimized:', file);
            }
          });
        })
        .catch((err) => {
          console.error('Error optimizing image:', file, err);
        });
    }
  });
}); 