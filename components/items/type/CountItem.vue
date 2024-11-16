<script setup>
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, count, id, defaultActive} = useTrackerItem(props.item)
const stateStore = useTrackerStateStore()
if(stateStore.trackerState[id.value] === undefined) {
  stateStore.update(id.value, count.value.start)
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
      @click="update((stateStore.trackerState[id] + count.step)%(count.max + 1))"
      @contextmenu.prevent="update((stateStore.trackerState[id] === 0 ? count.max : (stateStore.trackerState[id] - 1)%(count.max+1)))"
  >
    <IconItem
        :item="item"
        :active="defaultActive"
    ></IconItem>
    <div :style="{fontFamily: 'countItemFont'}" class="z-20 text-white absolute top-[2px] right-[-36px] align-middle inline-block text-center w-full text-lg select-none stroke-black" :class="{'!text-green-600': stateStore.trackerState[id] === count.max}">
      {{stateStore.trackerState[id]}}
    </div>
  </div>
</template>

<style scoped>

</style>