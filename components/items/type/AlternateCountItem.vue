<script setup>
import {computed, ref} from "vue";
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";

const props = defineProps(['item', 'itemSheetImage', 'itemSheet', 'itemSheetDimensions'])

const {position, max, defaultActive} = useTrackerItem(props.item)
const {itemSheet, itemSheetDimensions} = props;
const state = ref(0);
</script>

<template>
  <div
      class="absolute z-10"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="state = (state + 1)%(max + 1)"
      @contextmenu.prevent="state = state === 0 ? max : (state - 1)%(max+1)"
  >
    <IconItem
        :item="item"
        :itemSheetImage="itemSheetImage"
        :itemSheet="itemSheet"
        :itemSheetDimensions="itemSheetDimensions"
        :active="state > 0"
    ></IconItem>
    <div :style="{fontFamily: 'countItemFont'}" class="z-20 text-white absolute bottom-[-3px] right-[-10px] align-middle inline-block text-center w-full text-lg select-none" :class="{'text-green-600': state === max, hidden: state === 0}">
      {{state}}
    </div>
  </div>
</template>

<style scoped>

</style>