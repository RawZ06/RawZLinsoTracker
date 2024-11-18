<script setup>
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, id, defaultActive} = useTrackerItem(props.item)
const stateStore = useTrackerStateStore()
if(stateStore.trackerState[id.value] === undefined) {
  stateStore.update(id.value, defaultActive.value === true, true)
}

const update = () => {
  stateStore.update(id.value, !stateStore.trackerState[id.value]);
}
</script>

<template>
  <div
      class="absolute z-10"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="update()"
      @contextmenu.prevent="update()"
  >
    <IconItem
      :item="item"
      :active="stateStore.trackerState[id]"
    ></IconItem>
  </div>
</template>

<style scoped>

</style>