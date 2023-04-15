<template>
  <select class="saturation-dropdown p-2 bg-black rounded m-2 fixed left-40" @change="onChange($event)">
    <option
  v-for="(saturation, index) in saturations"
  :key="index"
  :value="saturation"
  :selected="Number(saturation) === Number(selectedSaturation)"
>

      {{ saturation }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    saturations: {
      type: Array,
      default: () => ['0', '25', '50', '75', '100'],
    },
    selectedSaturation: {
      type: String,
      default: '100',
    },
  },
  methods: {
    onChange(event) {
      this.$emit('update-saturation', event.target.value);
    },
  },
};
</script>

<style scoped>
.saturation-dropdown {

  /* Add any desired styling for the dropdown */
}
</style>
