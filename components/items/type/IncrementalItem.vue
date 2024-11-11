<script setup>
import {computed, ref} from "vue";
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";

const props = defineProps(['item', 'itemSheetImage', 'itemSheet', 'itemSheetDimensions'])

const {position, defaultActive, increments} = useTrackerItem(props.item)
const max = computed(() => {
  return increments.value.length + 2
})
const {itemSheet, itemSheetDimensions} = props;
const state = ref(defaultActive.value ? 1 : 0);
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
        :item="item"
        :itemSheetImage="itemSheetImage"
        :itemSheet="itemSheet"
        :itemSheetDimensions="itemSheetDimensions"
        :active="state > 0"
    ></IconItem>
    <div
        class="z-20 text-white absolute top-[20px] select-none"
        :class="{'hidden': state < 2, 'text-green-600': state === max-1}"
        :style="{fontFamily: 'incrementalItemFont'}"
    >
      {{increments[state-2]}}
    </div>
  </div>
</template>

<style scoped>

</style>