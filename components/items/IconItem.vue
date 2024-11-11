<script setup>

import ImageCrop from "../utils/ImageCrop.vue";
import {useTrackerItemFunction} from "~/hooks/useTrackerItemFunction.js";

const props = defineProps(['item', 'active', 'isMaxLabel'])
const {sheet, disabledOpacity, label} = useTrackerItemFunction()
const trackerStore = useTrackerStore();
const itemSheetImage = trackerStore.itemSheetImage(sheet.value(props.item).name)
const itemSheetDimensions = trackerStore.itemSheetDimensions(sheet.value(props.item).name)
</script>

<template>
  <ImageCrop
      :image="itemSheetImage"
      :width="itemSheetDimensions.width"
      :height="itemSheetDimensions.height"
      :row="sheet(props.item).row"
      :column="sheet(props.item).column"
      :opacity="active ? 1 : disabledOpacity(props.item)"
      :grayScale="!active"
  ></ImageCrop>
  <div :style="{fontFamily: 'evolutionItemFont'}" class="z-20 text-white absolute top-[20px] right-[0px] select-none" :class="{'hidden': !label(props.item) || !active, 'text-green-600': isMaxLabel}">
    {{label(props.item)}}
  </div>
</template>

<style scoped>

</style>