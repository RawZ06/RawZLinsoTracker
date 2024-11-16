<script setup>
import {computed, ref} from "vue";
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, defaultActive, id, next} = useTrackerItem(props.item)
const max = computed(() => {
  return (next?.value?.length ?? 0) + 2
})
const stateStore = useTrackerStateStore()
if(stateStore.trackerState[id.value] === undefined) {
  stateStore.update(id.value, defaultActive.value === true ? 1 : 0)
}
const update = (value) => {
  stateStore.update(id.value, value);
}
const currentItem = computed(() => {
  if(stateStore.trackerState[id.value] < 2) {
    return props.item;
  } else {
    return next.value[stateStore.trackerState[id.value] - 2];
  }
})
</script>

<template>
  <div
      class="absolute z-10"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="update((stateStore.trackerState[id] + 1)%max)"
      @contextmenu.prevent="update(stateStore.trackerState[id] === 0 ? max - 1 : (stateStore.trackerState[id] - 1)%max)"
  >
    <IconItem
        :item="currentItem"
        :active="stateStore.trackerState[id] > 0"
        :isMaxLabel="stateStore.trackerState[id] === max - 1"
    ></IconItem>
  </div>
</template>

<style scoped>

</style>