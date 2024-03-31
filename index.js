const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

// Color palette from the source in Readme.md
const happyColors = [
  { hex: "#ff9a55", rgb: [255, 154, 85] },
  { hex: "#ffea6c", rgb: [255, 234, 108] },
  { hex: "#54fffb", rgb: [84, 255, 251] },
  { hex: "#e7b2ff", rgb: [231, 178, 255] },
  { hex: "#89ffcc", rgb: [137, 255, 204] },
];

// Function to check if a color is close to the happy color palette
function isColorHappy(rgb) {
  const colorThreshold = 30; // How close the color should be to be considered "happy"

  return happyColors.some((happyColor) => {
    return (
      Math.abs(happyColor.rgb[0] - rgb[0]) <= colorThreshold &&
      Math.abs(happyColor.rgb[1] - rgb[1]) <= colorThreshold &&
      Math.abs(happyColor.rgb[2] - rgb[2]) <= colorThreshold
    );
  });
}

function verifyImage(path) {
  return loadImage(path).then((image) => {
    if (image.width !== 512 || image.height !== 512) {
      return { success: false, message: "Image size is not 512x512." };
    }

    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, 512, 512);
    const data = imageData.data;
    let happyColorPixels = 0;

    for (let y = 0; y < 512; y++) {
      for (let x = 0; x < 512; x++) {
        const distance = Math.sqrt(Math.pow(x - 256, 2) + Math.pow(y - 256, 2));
        const index = (y * 512 + x) * 4;
        if (distance <= 256 && data[index + 3] > 0) {
          // Check if the color of this pixel is happy
          if (isColorHappy([data[index], data[index + 1], data[index + 2]])) {
            happyColorPixels++;
          }
        }
      }
    }

    const totalPixels = Math.PI * 256 * 256; // Total pixels within the circle
    const happyColorThreshold = 0.75; // 75% of the pixels should be "happy" colors

    if (happyColorPixels / totalPixels < happyColorThreshold) {
      return {
        success: false,
        message: 'Image does not contain enough "happy" colors.',
      };
    }

    return { success: true, message: "Image meets all requirements." };
  });
}

function convertImage(path) {
  return loadImage(path).then((image) => {
    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext("2d");

    // Draw the image resized to 512x512
    ctx.drawImage(image, 0, 0, 512, 512);

    // Create a circular mask
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.arc(256, 256, 256, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Return the canvas as a Buffer (e.g., PNG)
    const buffer = canvas.toBuffer();

    // Define the output path, changing the filename as needed
    const outputPath = path.replace(/(\.[\w\d_-]+)$/i, "_converted$1");

    // Save the file
    fs.writeFileSync(outputPath, buffer);

    return outputPath; // Return the path of the saved file
  });
}

module.exports = { verifyImage, convertImage };
