<script setup>
import ItemList from "../../components/items/ItemList.vue";
import {useTrackerStore} from "~/stores/tracker-store.js";
// import {useTrackerStateStore} from "~/stores/state-store.js";

const route = useRoute()
const tracker = route.params.tracker
const loaded = ref(false)
const dimensions = ref(null)
const background = ref("")
const backgroundColor = ref("")

const trackerStore = useTrackerStore()
// const stateStore = useTrackerStateStore()
trackerStore.load(tracker).then((status) => {
  loaded.value = status;
  const dim = trackerStore.dimensions();
  const bg = trackerStore.background();
  const bgColor = trackerStore.backgroundColor();

  dimensions.value = dim;
  background.value = bg;
  backgroundColor.value = bgColor;
});



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
<!--  <pre>{{JSON.stringify(stateStore.trackerState, null, 4)}}</pre>-->
</template>

<style scoped>

</style>