<script setup>
import {ref} from "vue";
import IconItem from "../IconItem.vue";
import ImageCrop from "../../utils/ImageCrop.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerCheckItem} from "~/hooks/useTrackerCheckItem.js";

const props = defineProps(['item', 'itemSheetImage', 'itemSheet', 'itemSheetDimensions'])

const {position, defaultActive} = useTrackerItem(props.item)
const {sheet} = useTrackerCheckItem(props.item)
const {itemSheet, itemSheetDimensions} = props;
const active = ref(defaultActive.value);
const checkActive = ref(false);
</script>

<template>
  <div
      class="absolute z-10"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="active = !active"
      @contextmenu.prevent="checkActive = !checkActive"
  >
    <IconItem
      :item="item"
      :itemSheetImage="itemSheetImage"
      :itemSheet="itemSheet"
      :itemSheetDimensions="itemSheetDimensions"
      :active="active"
    ></IconItem>
    <div class="relative">
      <div class="absolute -top-[46px] -right-[10px] z-20" :class="{'hidden': !checkActive}">
        <ImageCrop
            :image="itemSheetImage(sheet.name)"
            :width="itemSheetDimensions(sheet.name).width"
            :height="itemSheetDimensions(sheet.name).height"
            :row="sheet.row"
            :column="sheet.column"
        ></ImageCrop>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>