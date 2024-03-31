# Playmakers-Test

# Image Happiness Verifier and Converter

This Node.js script utilizes the `canvas` library to analyze and convert images based on a defined "happy" color palette. It checks if an image predominantly consists of certain cheerful colors and applies a circular mask to the image.

## Dependencies

- [canvas](https://www.npmjs.com/package/canvas): A Cairo backed Canvas implementation for Node.js.
- [fs](https://nodejs.org/api/fs.html): Node.js file system module.

## Color Palette

The script uses a predefined set of "happy" colors represented in both HEX and RGB formats:

```javascript
const happyColors = [
  { hex: "#ff9a55", rgb: [255, 154, 85] },
  { hex: "#ffea6c", rgb: [255, 234, 108] },
  { hex: "#54fffb", rgb: [84, 255, 251] },
  { hex: "#e7b2ff", rgb: [231, 178, 255] },
  { hex: "#89ffcc", rgb: [137, 255, 204] },
];

- Happy colors: [https://www.color-hex.com/color-palette/7779](https://www.color-hex.com/color-palette/7779)
