<script setup>
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, max, name} = useTrackerItem(props.item)
const stateStore = useTrackerStateStore()
if(stateStore.trackerState[name.value] === undefined) {
  stateStore.update(name.value, 0)
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
      @click="update((stateStore.trackerState[name] + 1)%(max + 1))"
      @contextmenu.prevent="update((stateStore.trackerState[name] === 0 ? max : (stateStore.trackerState[name] - 1)%(max+1)))"

  >
    <IconItem
        :item="item"
        :active="stateStore.trackerState[name] > 0"
    ></IconItem>
    <div :style="{fontFamily: 'countItemFont'}" class="z-20 text-white absolute bottom-[-3px] right-[-10px] align-middle inline-block text-center w-full text-lg select-none" :class="{'text-green-600': stateStore.trackerState[name] === max, hidden: stateStore.trackerState[name] === 0}">
      {{stateStore.trackerState[name]}}
    </div>
  </div>
</template>

<style scoped>

</style>