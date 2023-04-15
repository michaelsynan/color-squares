<template>
  <div class="container">
    <color-scheme-dropdown
      :selected-scheme="colorScheme"
      @update-color-scheme="updateColorScheme"
    ></color-scheme-dropdown>
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

export default {

  data() {
    return {
      screenWidth: 0,
      screenHeight: 0,
      squareSize: 100,
      colors: [],
      colorScheme: 'triadic',
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
  this.colors = [];
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

  for (let i = 0; i < 5; i++) {
    const color = colorPalette[i % colorPalette.length];
    this.colors.push(color);
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
