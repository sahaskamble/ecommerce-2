const fs = require('fs');
const https = require('https');
const path = require('path');

const UNSPLASH_BASE = 'https://source.unsplash.com/random';

const imagePaths = {
  'hero-bg.jpg': `${UNSPLASH_BASE}/1920x1080/?fashion`,
  'products/product-1.jpg': `${UNSPLASH_BASE}/800x1000/?tshirt`,
  'products/product-1-alt.jpg': `${UNSPLASH_BASE}/800x1000/?tshirt`,
  'products/product-2.jpg': `${UNSPLASH_BASE}/800x1000/?jacket`,
  'products/product-2-alt.jpg': `${UNSPLASH_BASE}/800x1000/?jacket`,
  'products/product-3.jpg': `${UNSPLASH_BASE}/800x1000/?dress`,
  'products/product-3-alt.jpg': `${UNSPLASH_BASE}/800x1000/?dress`,
  'categories/men.jpg': `${UNSPLASH_BASE}/600x800/?mensfashion`,
  'categories/women.jpg': `${UNSPLASH_BASE}/600x800/?womensfashion`,
  'categories/accessories.jpg': `${UNSPLASH_BASE}/600x800/?accessories`,
  'categories/sale.jpg': `${UNSPLASH_BASE}/600x800/?shopping`
};

async function downloadImage(url, filepath) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  const publicDir = path.join(process.cwd(), 'public');
  
  for (const [imagePath, url] of Object.entries(imagePaths)) {
    const filepath = path.join(publicDir, imagePath);
    console.log(`Downloading ${imagePath}...`);
    try {
      await downloadImage(url, filepath);
      console.log(`Downloaded ${imagePath}`);
    } catch (error) {
      console.error(`Failed to download ${imagePath}:`, error);
    }
  }
}

downloadAllImages().then(() => {
  console.log('All images downloaded successfully!');
}).catch(console.error); 