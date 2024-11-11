<script setup>
import Item from "./Item.vue";
import {useCustomFont} from "~/hooks/useCustomFont.js";

const props = defineProps(['items', 'itemSheetImage', 'itemSheetDimensions', 'fonts', 'tracker'])
for(let font of props.fonts) {
  useCustomFont(props.tracker, font.name, font.filename)
}
</script>

<template>
  <div v-for="item of props.items" class="relative">
    <Item :itemSheetImage="itemSheetImage" :item="item" :tracker="tracker" :itemSheetDimensions="itemSheetDimensions" />
  </div>
</template>

<style scoped>

</style>