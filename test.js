const { convertImage, verifyImage } = require("./index");

verifyImage("512-yellow.png").then((result) => {
  console.log(result);
});

convertImage("512-yellow.png")
  .then((outputPath) => {
    console.log(`Converted image saved as ${outputPath}`);
  })
  .catch((error) => {
    console.error("Error during image conversion:", error);
  });
