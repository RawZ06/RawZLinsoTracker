<script setup>
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, max, id} = useTrackerItem(props.item)
const stateStore = useTrackerStateStore()
if(stateStore.trackerState[id.value] === undefined) {
  stateStore.update(id.value, 0, true)
}
const update = (value) => {
  stateStore.update(id.value, value);
}
</script>

<template>
  <div
      class="absolute z-10"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="update((stateStore.trackerState[id] + 1)%(max + 1))"
      @contextmenu.prevent="update((stateStore.trackerState[id] === 0 ? max : (stateStore.trackerState[id] - 1)%(max+1)))"

  >
    <IconItem
        :item="item"
        :active="stateStore.trackerState[id] > 0"
    ></IconItem>
    <div :style="{fontFamily: 'countItemFont', color: stateStore.trackerState[id] === max, hidden: stateStore.trackerState[id] === 0 ? 'var(--color-incrementalItemFont-max)' : 'var(--color-incrementalItemFont)'}" class="z-20 absolute bottom-[-3px] right-[-10px] align-middle inline-block text-center w-full text-lg select-none text-shadow">
      {{stateStore.trackerState[id]}}
    </div>
  </div>
</template>

<style scoped>

</style>