<template>
  <div :style="cropStyle" class="overflow-hidden z-20 relative"></div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  width: {
    type: Number,
    default: 35, // Largeur par défaut d'une cellule
  },
  height: {
    type: Number,
    default: 35, // Hauteur par défaut d'une cellule
  },
  column: {
    type: Number,
    default: 1, // Colonne de la grille (à partir de 1)
  },
  row: {
    type: Number,
    default: 1, // Ligne de la grille (à partir de 1)
  },
  image: {
    type: String,
    required: true, // URL de l'image
  },
  opacity: {
    type: Number,
    default: 1
  },
  grayScale: {
    type: Boolean,
    default: false
  }
});

const cropStyle = computed(() => {
  const offsetX = (props.column - 1) * props.width;
  const offsetY = (props.row - 1) * props.height;

  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
    backgroundImage: `url(${props.image})`,
    backgroundPosition: `-${offsetX}px -${offsetY}px`,
    backgroundSize: 'auto', // Ajustement en fonction de l'image
    backgroundRepeat: 'no-repeat',
    opacity: props.opacity,
    filter: props.grayScale ? 'grayscale(100%)' : 'none',
  };
});
</script>

<style scoped>
</style>