<template>
  <div class="container">
    <color-scheme-dropdown class="z-50"
      :selected-scheme="colorScheme"
      @update-color-scheme="updateColorScheme"
    ></color-scheme-dropdown>
    <saturation-dropdown class="z-50" @update-saturation="updateSaturation" />
    <div class="grid" :style="gridStyle">
      <div
        v-for="(square, index) in totalSquares"
        :key="index"
        class="square"
        :style="squareStyle(index)"
      ></div>
    </div>
  </div>
</template>
<script>
import chroma from 'chroma-js';

import {
  randomHexColor,
  generateMonochromatic,
  generateAnalogous,
  generateComplementary,
  generateTriadic
} from '@/utils/colorUtils';


export default {

  data() {
    return {
      screenWidth: 0,
      screenHeight: 0,
      squareSize: 100,
      colors: [],
      colorScheme: 'triadic',
      saturation: 1,
    };
  },
  computed: {
    totalSquares() {
      return this.columns * this.rows;
    },
    columns() {
      return Math.floor(this.screenWidth / this.squareSize);
    },
    rows() {
      return Math.floor(this.screenHeight / this.squareSize);
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
        gridAutoRows: `${this.screenHeight / this.rows}px`,
      };
    },
  },
  mounted() {
    this.updateDimensions();
    this.generateColors();
    window.addEventListener('resize', this.updateDimensions);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateDimensions);
  },
  methods: {
    updateDimensions() {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    },
 
    generateColors() {
  const baseColor = randomHexColor();
  let colorPalette;

  switch (this.colorScheme) {
    case 'monochromatic':
      colorPalette = generateMonochromatic(baseColor);
      break;
    case 'analogous':
      colorPalette = generateAnalogous(baseColor);
      break;
    case 'complementary':
      colorPalette = generateComplementary(baseColor);
      break;
    default:
      colorPalette = generateTriadic(baseColor);
  }

  if (
    this.colors.length === 0 ||
    this.colors[0] !== colorPalette[0] ||
    this.saturation !== 1
  ) {
    this.colors = [];
    for (let i = 0; i < 5; i++) {
      const color = chroma(colorPalette[i % colorPalette.length]).hex();
      this.colors.push(color);
    }
  }

  for (let i = 0; i < this.colors.length; i++) {
    const color = chroma(this.colors[i]).saturate(this.saturation).hex();
    this.colors.splice(i, 1, color);
  }
},




    squareStyle(index) {
      const color = this.colors[index % this.colors.length];
      const width = `${this.screenWidth / this.columns}px`;
      const height = `${this.screenHeight / this.rows}px`;

      return { backgroundColor: color, width, height };
    },

    updateColorScheme(newScheme) {
      this.colorScheme = newScheme;
      this.generateColors();
    },
    updateSaturation(saturation) {
    this.saturation = saturation;}
  },

  watch: {
    colorScheme() {
      this.generateColors();
    },
    saturation() {
      this.generateColors();
    },
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}

.grid {
  display: grid;
  width: 100%;
  height: 100%;
}

.square {
  border: 1px solid #ccc;
}

</style>
