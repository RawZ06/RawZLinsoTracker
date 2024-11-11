<script setup>
import {computed} from "vue";
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, defaultActive, name, increments} = useTrackerItem(props.item)
const max = computed(() => {
  return increments.value.length + 2
})
const stateStore = useTrackerStateStore()
if(stateStore.trackerState[name.value] === undefined) {
  stateStore.update(name.value, defaultActive === true ? 1 : 0)
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
      @click="update((stateStore.trackerState[name] + 1)%max)"
      @contextmenu.prevent="update(stateStore.trackerState[name] === 0 ? max - 1 : (stateStore.trackerState[name] - 1)%max)"
  >
    <IconItem
        :item="item"
        :active="stateStore.trackerState[name] > 0"
    ></IconItem>
    <div
        class="z-20 text-white absolute top-[20px] select-none"
        :class="{'hidden': stateStore.trackerState[name]  < 2, 'text-green-600': stateStore.trackerState[name]  === max-1}"
        :style="{fontFamily: 'incrementalItemFont'}"
    >
      {{increments[stateStore.trackerState[name] -2]}}
    </div>
  </div>
</template>

<style scoped>

</style>