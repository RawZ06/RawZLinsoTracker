<script setup>
import {computed} from "vue";
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, defaultActive, id, labels} = useTrackerItem(props.item)
const stateStore = useTrackerStateStore()
if(!stateStore.trackerState[id.value]) {
  stateStore.trackerState[id.value] = {
    state: 0,
    active: defaultActive.value
  }
}

const updateState = (value) => {
  stateStore.update(id.value, {...stateStore.trackerState[id.value], state: value});
}
const updateActive = () => {
  stateStore.update(id.value, {...stateStore.trackerState[id.value], active: !stateStore.trackerState[id.value].active});
}
const currentLabel = computed(() => {
  return labels.value[stateStore.trackerState[id.value].state]
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
      @contextmenu.prevent="updateState((stateStore.trackerState[id].state+1)%labels.length)"
  >
    <IconItem
        :item="item"
        :active="stateStore.trackerState[id].active"
    ></IconItem>
    <div :style="{fontFamily: 'labelItemFont', color: 'var(--color-labelItemFont)'}" class="z-20 absolute top-[30px] w-full text-center text-xs select-none text-shadow">
      {{currentLabel}}
    </div>
  </div>
</template>

<style scoped>

</style>