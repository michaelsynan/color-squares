import chroma from 'chroma-js';

// Function to generate a random hex color
export function randomHexColor() {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + hex.padStart(6, '0');
}

// Function to generate light and dark variations of a color
export function generateShades(color) {
  const light = chroma(color).brighten(1).hex();
  const dark = chroma(color).darken(1).hex();
  return { light, dark };
}

// Function to generate a monochromatic color palette
export function generateMonochromatic(baseColor, numberOfColors = 5) {
  return chroma.scale([chroma(baseColor).darken(), chroma(baseColor).brighten()]).colors(numberOfColors);
}

// Function to generate an analogous color palette
export function generateAnalogous(baseColor, numberOfColors = 5, angle = 30) {
  const colors = [];
  const baseHue = chroma(baseColor).get('hsl.h');
  const startHue = (baseHue - ((numberOfColors - 1) * angle) / 2 + 360) % 360;

  for (let i = 0; i < numberOfColors; i++) {
    const hue = (startHue + i * angle) % 360;
    colors.push(chroma(baseColor).set('hsl.h', hue).hex());
  }

  return colors;
}

// Function to generate a complementary color palette
export function generateComplementary(baseColor) {
  const complementaryColor = chroma(baseColor).set('hsl.h', (chroma(baseColor).get('hsl.h') + 180) % 360);
  return [baseColor, complementaryColor.hex()];
}

// Function to generate a triadic color palette
export function generateTriadic(baseColor) {
  const secondColor = chroma(baseColor).set('hsl.h', (chroma(baseColor).get('hsl.h') + 120) % 360);
  const thirdColor = chroma(baseColor).set('hsl.h', (chroma(baseColor).get('hsl.h') + 240) % 360);
  return [baseColor, secondColor.hex(), thirdColor.hex()];
}
