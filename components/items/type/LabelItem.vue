<script setup>
import {computed, ref} from "vue";
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";

const props = defineProps(['item', 'itemSheetImage', 'itemSheet', 'itemSheetDimensions'])

const {position, defaultActive, labels} = useTrackerItem(props.item)
const {itemSheet, itemSheetDimensions} = props;
const active = ref(defaultActive.value);
const state = ref(0)
const currentLabel = computed(() => {
  return labels.value[state.value]
})
</script>

<template>
  <div
      class="absolute z-10"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="active = !active"
      @contextmenu.prevent="state = (state+1)%labels.length"
  >
    <IconItem
        :item="item"
        :itemSheetImage="itemSheetImage"
        :itemSheet="itemSheet"
        :itemSheetDimensions="itemSheetDimensions"
        :active="active"
    ></IconItem>
    <div :style="{fontFamily: 'labelItemFont'}" class="z-20 text-white absolute top-[30px] w-full text-center text-xs select-none">
      {{currentLabel}}
    </div>
  </div>
</template>

<style scoped>

</style>