import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDirs = [
  'public/lovable-uploads',
  'public/images'
];

const sizes = [320, 640, 768, 1024, 1920];

async function optimizeImage(inputPath) {
  const dir = dirname(inputPath);
  const filename = basename(inputPath, extname(inputPath));
  
  try {
    // Create WebP version
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(`${dir}/${filename}.webp`);

    // Create responsive versions
    for (const width of sizes) {
      await sharp(inputPath)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 80 })
        .toFile(`${dir}/${filename}-${width}.webp`);
    }
    
    console.log(`✓ Optimized: ${inputPath}`);
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error);
  }
}

async function processDirectory(directory) {
  try {
    const files = await readdir(directory);
    
    for (const file of files) {
      const filePath = join(directory, file);
      const fileStat = await stat(filePath);
      
      if (fileStat.isDirectory()) {
        await processDirectory(filePath);
      } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
        await optimizeImage(filePath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
}

async function main() {
  for (const dir of inputDirs) {
    const fullPath = join(process.cwd(), dir);
    try {
      await stat(fullPath);
      await processDirectory(fullPath);
    } catch (error) {
      console.warn(`Directory not found: ${dir}`);
    }
  }
}

main().catch(console.error);
