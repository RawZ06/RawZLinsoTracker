<script setup>
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, count, name, defaultActive} = useTrackerItem(props.item)
const stateStore = useTrackerStateStore()
if(stateStore.trackerState[name.value] === undefined) {
  stateStore.update(name.value, count.value.start)
}
const update = (value) => {
  stateStore.update(name.value, value);
}
</script>

<template>
  <div
      class="absolute z-10"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="update((stateStore.trackerState[name] + count.step)%(count.max + 1))"
      @contextmenu.prevent="update((stateStore.trackerState[name] === 0 ? count.max : (stateStore.trackerState[name] - 1)%(count.max+1)))"
  >
    <IconItem
        :item="item"
        :active="defaultActive"
    ></IconItem>
    <div :style="{fontFamily: 'countItemFont'}" class="z-20 text-white absolute top-[2px] right-[-36px] align-middle inline-block text-center w-full text-lg select-none" :class="{'text-green-600': stateStore.trackerState[name] === count.max}">
      {{stateStore.trackerState[name]}}
    </div>
  </div>
</template>

<style scoped>

</style>