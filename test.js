const { convertImage, verifyImage } = require("./index");

verifyImage("assets/not-512.png").then((result) => {
  console.log(result);
});

convertImage("assets/not-512.png")
  .then((outputPath) => {
    console.log(`Converted image saved as ${outputPath}`);
  })
  .catch((error) => {
    console.error("Error during image conversion:", error);
  });
