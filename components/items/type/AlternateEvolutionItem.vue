<script setup>
import {computed, ref} from "vue";
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, defaultActive, id, next, globalLabel, sizeLabel} = useTrackerItem(props.item)
const max = computed(() => {
  return (next?.value?.length ?? 0) + 1
})
const stateStore = useTrackerStateStore()
stateStore.init(id.value,{
  state: 0,
  active: defaultActive.value
})
const changeActive = () => {
  stateStore.update(id.value, {...stateStore.get(id.value), active: !stateStore.get(id.value).active});
}
const updateStateInc = () => {
  stateStore.update(id.value, {...stateStore.get(id.value), state: (stateStore.get(id.value).state + 1)%max.value});
}
const updateStateDec = () => {
  stateStore.update(id.value, {...stateStore.get(id.value), state: stateStore.get(id.value).state === 0 ? max - 1 : (stateStore.get(id.value).state - 1)%max.value});
}

const currentItem = computed(() => {
  if(!stateStore.get(id.value) || stateStore.get(id.value)?.state < 1) {
    return props.item;
  } else {
    return next.value[stateStore.get(id.value).state - 1];
  }
})
</script>

<template>
  <div
      class="absolute z-10"
      v-if="stateStore.get(id) !== undefined && stateStore.get(id) !== null"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="changeActive()"
      @contextmenu.prevent="updateStateInc()"
  >
    <IconItem
        :item="currentItem"
        :active="stateStore.get(id).active"
        :isMaxLabel="stateStore.get(id).state === max - 1"
    ></IconItem>
    <div :style="{fontFamily: 'labelItemFont', color: 'var(--color-labelItemFont)', fontSize: sizeLabel + 'px'}" class="z-20 absolute top-[30px] w-full text-center text-sm select-none text-shadow">
      {{globalLabel}}
    </div>
  </div>
</template>

<style scoped>

</style>