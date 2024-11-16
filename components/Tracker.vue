<script setup>
import {useTrackerStore} from "~/stores/tracker-store.js";
import {useSocket} from "~/hooks/useSocket.js";
import {useTrackerStateStore} from "~/stores/state-store.js";
import ItemList from "~/components/items/ItemList.vue";

const props = defineProps(['tracker', 'id'])

const loaded = ref(false)
const dimensions = ref(null)
const background = ref("")
const backgroundColor = ref("")

const trackerStore = useTrackerStore()
const stateStore = useTrackerStateStore()
trackerStore.load(props.tracker).then((status) => {
  loaded.value = status;
  const dim = trackerStore.dimensions();
  const bg = trackerStore.background();
  const bgColor = trackerStore.backgroundColor();

  dimensions.value = dim;
  background.value = bg;
  backgroundColor.value = bgColor;
});

useTrackerStateStore()
if(props.id) {
  useSocket(props.id)
}

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