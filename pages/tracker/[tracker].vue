<script setup>
import ItemList from "../../components/items/ItemList.vue";
import {useTrackerData} from "~/hooks/useTrackerData.js";
import {useTrackerGeneral} from "~/hooks/useTrackerGeneral.js";

const route = useRoute()
const tracker = route.params.tracker

const {data, loading, load} = useTrackerData(tracker)
const {dimensions, background, backgroundColor, items, itemSheetImage, itemSheetDimensions, fonts} = useTrackerGeneral(data, tracker);
load()

</script>

<template>
<div v-if="!loading" class="">
  <div class="relative" :style="{backgroundColor: backgroundColor, width: dimensions.width + 'px', height: dimensions.height + 'px'}">
    <ItemList :items="items" :itemSheetImage="itemSheetImage" :itemSheetDimensions="itemSheetDimensions" :fonts="fonts" :tracker="tracker" />
    <img :src="background" alt="Background" class="absolute inset-0 z-0">
  </div>
</div>
</template>

<style scoped>

</style>