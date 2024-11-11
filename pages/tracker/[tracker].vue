<script setup>
import ItemList from "../../components/items/ItemList.vue";
import {useTrackerStore} from "~/stores/tracker-store.js";

const route = useRoute()
const tracker = route.params.tracker

const trackerStore = useTrackerStore()
trackerStore.load(tracker);

const dimensions = trackerStore.dimensions();
const background = trackerStore.background();
const backgroundColor = trackerStore.backgroundColor();
const loaded = trackerStore.loaded;

</script>

<template>
<div v-if="loaded" class="">
  <div class="relative" :style="{backgroundColor: backgroundColor, width: dimensions.width + 'px', height: dimensions.height + 'px'}">
    <ItemList  />
    <img :src="background" alt="Background" class="absolute inset-0 z-0">
  </div>
</div>
  <div v-else>
    Loading...
  </div>
</template>

<style scoped>

</style>