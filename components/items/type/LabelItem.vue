<script setup>
import {computed} from "vue";
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, defaultActive, name, labels} = useTrackerItem(props.item)
const stateStore = useTrackerStateStore()
if(!stateStore.trackerState[name.value]) {
  stateStore.trackerState[name.value] = {
    state: 0,
    active: defaultActive
  }
}

const updateState = (value) => {
  stateStore.update(name.value, {...stateStore.trackerState[name.value], state: value});
}
const updateActive = () => {
  stateStore.update(name.value, {...stateStore.trackerState[name.value], active: !stateStore.trackerState[name.value].active});
}
const currentLabel = computed(() => {
  return labels.value[stateStore.trackerState[name.value].state]
})
</script>

<template>
  <div
      class="absolute z-10"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="updateActive()"
      @contextmenu.prevent="updateState((stateStore.trackerState[name].state+1)%labels.length)"
  >
    <IconItem
        :item="item"
        :active="stateStore.trackerState[name].active"
    ></IconItem>
    <div :style="{fontFamily: 'labelItemFont'}" class="z-20 text-white absolute top-[30px] w-full text-center text-xs select-none">
      {{currentLabel}}
    </div>
  </div>
</template>

<style scoped>

</style>