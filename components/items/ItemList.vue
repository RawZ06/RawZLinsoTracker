<script setup>
import Item from "./Item.vue";
import {useCustomFont} from "~/hooks/useCustomFont.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const trackerStore = useTrackerStore();
const fonts = trackerStore.fonts();
const tracker = trackerStore.trackerName;
const items = trackerStore.items();
for(let font of fonts) {
  useCustomFont(tracker, font.name, font.filename)
  document.documentElement.style.setProperty('--color-' + font.name, font.colors[0]);
  document.documentElement.style.setProperty('--color-' + font.name + '-max', font.colors[1]);
}
</script>

<template>
  <div v-for="item of items" class="relative">
    <Item :item="item" />
  </div>
</template>

<style scoped>

</style>