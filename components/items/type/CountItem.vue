<script setup>
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, count, id, defaultActive, sheet} = useTrackerItem(props.item)
const stateStore = useTrackerStateStore()
if(stateStore.trackerState[id.value] === undefined) {
  stateStore.update(id.value, count.value.start)
}
const update = (value) => {
  stateStore.update(id.value, value);
}

const trackerStore = useTrackerStore();
const itemSheetDimensions = trackerStore.itemSheetDimensions(sheet.value.name)
</script>

<template>
  <div
      class="absolute z-10 flex items-center justify-between"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
        width: `${2 * itemSheetDimensions.width}px`,
        height: `${itemSheetDimensions.height}px`,
      }"
      @click="update((stateStore.trackerState[id] + count.step)%(count.max + 1))"
      @contextmenu.prevent="update((stateStore.trackerState[id] === 0 ? count.max : (stateStore.trackerState[id] - 1)%(count.max+1)))"
  >
    <div class="relative" :style="{
        width: `${2 * itemSheetDimensions.width}px`,
        height: `${itemSheetDimensions.height}px`,
      }">
      <IconItem
          :item="item"
          :active="defaultActive"
      ></IconItem>
    </div>
    <div :style="{fontFamily: 'countItemFont', color: stateStore.trackerState[id] === count.max ? 'var(--color-countItemFont-max)' : 'var(--color-countItemFont)'}" class="z-20 h-full flex justify-center items-center text-center w-full text-lg select-none text-shadow">
      {{stateStore.trackerState[id]}}
    </div>
  </div>
</template>

<style scoped>
</style>