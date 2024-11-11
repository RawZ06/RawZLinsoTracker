<script setup>
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, name, defaultActive} = useTrackerItem(props.item)
const stateStore = useTrackerStateStore()
if(stateStore.trackerState[name.value] === undefined) {
  stateStore.update(name.value, defaultActive === true)
}

const update = () => {
  stateStore.update(name.value, !stateStore.trackerState[name.value]);
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
      :active="stateStore.trackerState[name]"
    ></IconItem>
  </div>
</template>

<style scoped>

</style>