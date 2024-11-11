<script setup>
import {ref} from "vue";
import IconItem from "../IconItem.vue";
import ImageCrop from "../../utils/ImageCrop.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerCheckItem} from "~/hooks/useTrackerCheckItem.js";

const props = defineProps(['item'])

const {position, defaultActive} = useTrackerItem(props.item)
const {sheet} = useTrackerCheckItem(props.item)
const active = ref(defaultActive.value);
const checkActive = ref(false);
const trackerStore = useTrackerStore();
const itemSheetImage = trackerStore.itemSheetImage(sheet.value.name)
const itemSheetDimensions = trackerStore.itemSheetDimensions(sheet.value.name)
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
      :active="active"
    ></IconItem>
    <div class="relative">
      <div class="absolute -top-[46px] -right-[10px] z-20" :class="{'hidden': !checkActive}">
        <ImageCrop
            :image="itemSheetImage"
            :width="itemSheetDimensions.width"
            :height="itemSheetDimensions.height"
            :row="sheet.row"
            :column="sheet.column"
        ></ImageCrop>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>