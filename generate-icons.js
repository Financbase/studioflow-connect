const fs = require('fs');
const path = require('path');

// Ensure directories exist
const imagesDir = path.join(__dirname, 'src', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate a simple placeholder SVG icon
function generateSVGIcon(size) {
  const halfSize = size / 2;
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#1a73e8" rx="5" ry="5"/>
  <text x="${halfSize}" y="${halfSize + 5}" font-family="Arial" font-size="${size / 3}" fill="white" text-anchor="middle">TM</text>
</svg>`;
}

// Write SVG files
const sizes = [16, 48, 128];
sizes.forEach(size => {
  const svgContent = generateSVGIcon(size);
  fs.writeFileSync(path.join(imagesDir, `icon${size}.svg`), svgContent);
  console.log(`Created ${size}x${size} icon`);
});

// If you want PNG files, you would need to convert the SVGs
// For this simple example, we'll just use SVGs and update the manifest accordingly
console.log('Icon generation complete!');

// Update manifest to use SVG icons
const manifestPath = path.join(__dirname, 'src', 'manifest.json');
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  
  if (manifest.action && manifest.action.default_icon) {
    sizes.forEach(size => {
      manifest.action.default_icon[size] = `images/icon${size}.svg`;
    });
    
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('Updated manifest.json to use SVG icons');
  }
} 