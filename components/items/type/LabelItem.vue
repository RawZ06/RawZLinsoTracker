<script setup>
import {computed} from "vue";
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, defaultActive, id, labels, defaultLabel, hasDefaultLabel} = useTrackerItem(props.item)
const stateStore = useTrackerStateStore()
if(!stateStore.trackerState[id.value]) {
  stateStore.trackerState[id.value] = {
    state: defaultLabel.value ?? 0,
    active: defaultActive.value
  }
}

const updateStateInc = () => {
  if(hasDefaultLabel.value) {
    if(stateStore.trackerState[id.value].state+1 < labels.value.length) {
      stateStore.update(id.value, {...stateStore.trackerState[id.value], state: stateStore.trackerState[id.value].state+1});
    }
  } else {
    stateStore.update(id.value, {...stateStore.trackerState[id.value], state: (stateStore.trackerState[id.value].state+1)%labels.value.length});
  }
}
const updateStateDec = () => {
  if(hasDefaultLabel.value) {
    if(stateStore.trackerState[id.value].state-1 >= 0) {
      stateStore.update(id.value, {...stateStore.trackerState[id.value], state: stateStore.trackerState[id.value].state-1});
    }
  } else {
    stateStore.update(id.value, {...stateStore.trackerState[id.value], state: (stateStore.trackerState[id.value].state-1 < 0 ? labels.value.length-1 : stateStore.trackerState[id.value].state-1)});
  }
}
const updateActive = () => {
  stateStore.update(id.value, {...stateStore.trackerState[id.value], active: !stateStore.trackerState[id.value].active});
}
const currentLabel = computed(() => {
  return labels.value[stateStore.trackerState[id.value].state]
})
const handleWheel = (event) => {
  if (event.deltaY < 0) {
    updateStateDec()
  } else {
    updateStateInc()
  }
}
const handleRightClick = () => {
  if(!hasDefaultLabel.value) {
    updateStateInc()
  }
}
</script>

<template>
  <div
      class="absolute z-10"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="updateActive()"
      @contextmenu.prevent="handleRightClick()"
      @wheel.prevent="handleWheel($event)"
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