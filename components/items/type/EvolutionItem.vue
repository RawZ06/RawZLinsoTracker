<script setup>
import {computed, ref} from "vue";
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";

const props = defineProps(['item'])

const {position, defaultActive, next} = useTrackerItem(props.item)
const max = computed(() => {
  return (next?.value?.length ?? 0) + 2
})
const state = ref(defaultActive.value ? 1 : 0);
const currentItem = computed(() => {
  if(state.value < 2) {
    return props.item;
  } else {
    return next.value[state.value - 2];
  }
})
</script>

<template>
  <div
      class="absolute z-10"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="state = (state + 1)%max"
      @contextmenu.prevent="state = state === 0 ? max - 1 : (state - 1)%max"
  >
    <IconItem
        :item="currentItem"
        :active="state > 0"
        :isMaxLabel="state === max - 1"
    ></IconItem>
  </div>
</template>

<style scoped>

</style>