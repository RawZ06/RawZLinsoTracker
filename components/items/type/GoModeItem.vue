<script setup>
import {ref} from "vue";
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";

const props = defineProps(['item', 'itemSheetImage', 'itemSheet', 'itemSheetDimensions', 'tracker'])

const {position, defaultActive, glow, sheet} = useTrackerItem(props.item)
const {itemSheet, itemSheetDimensions} = props;
const active = ref(defaultActive.value);
const glowImage = glow.value(props.tracker)
</script>

:width=""
:height="itemSheetDimensions(sheet(props.item).name).height"

<template>
  <div
      class="absolute z-30"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="active = !active"
      @contextmenu.prevent="active = !active"
  >
    <IconItem
        v-if="active"
        :item="item"
        :itemSheetImage="itemSheetImage"
        :itemSheet="itemSheet"
        :itemSheetDimensions="itemSheetDimensions"
        :active="active"
    ></IconItem>
    <div v-else :style="{
      width: itemSheetDimensions(sheet.name).width + 'px',
      height: itemSheetDimensions(sheet.name).height + 'px',
    }"></div>
  </div>
  <div class="absolute z-20 select-none pointer-events-none -translate-x-1/2 -translate-y-1/2 duration-1000	" :style="{
        left: position.x + 18 + 'px',
        top: position.y + 18 + 'px',
      }" :class="{hidden: !active}">
    <img class="animate-low-spin" :src="glowImage" alt="glow" />
  </div>
</template>

<style scoped>
.animate-low-spin {
  animation: spin 8s linear infinite;
}
</style>