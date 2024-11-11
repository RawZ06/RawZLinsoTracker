<script setup>

import SimpleItem from "./type/SimpleItem.vue";
import IncrementalItem from "./type/IncrementalItem.vue";
import EvolutionItem from "./type/EvolutionItem.vue";
import CountItem from "./type/CountItem.vue";
import LabelItem from "./type/LabelItem.vue";
import CheckItem from "./type/CheckItem.vue";
import GoModeItem from "./type/GoModeItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import AlternateCountItem from "~/components/items/type/AlternateCountItem.vue";

const props = defineProps(['item', 'itemSheetImage', 'itemSheet', 'itemSheetDimensions', 'tracker'])

const {itemType} = useTrackerItem(props.item)
const {itemSheet, itemSheetDimensions} = props;
</script>

<template>
  <div>
    <template v-if="itemType === 'Item'">
      <SimpleItem
          :item="item"
          :itemSheetImage="itemSheetImage"
          :itemSheetDimensions="itemSheetDimensions"
          :itemSheet="itemSheet"
      ></SimpleItem>
    </template>
    <template v-else-if="itemType === 'IncrementalItem'">
      <IncrementalItem
          :item="item"
          :itemSheetImage="itemSheetImage"
          :itemSheetDimensions="itemSheetDimensions"
          :itemSheet="itemSheet"
      ></IncrementalItem>
    </template>
    <template v-else-if="itemType === 'EvolutionItem'">
      <EvolutionItem
          :item="item"
          :itemSheetImage="itemSheetImage"
          :itemSheetDimensions="itemSheetDimensions"
          :itemSheet="itemSheet"
      ></EvolutionItem>
    </template>
    <template v-else-if="itemType === 'CountItem'">
      <CountItem
          :item="item"
          :itemSheetImage="itemSheetImage"
          :itemSheetDimensions="itemSheetDimensions"
          :itemSheet="itemSheet"
      ></CountItem>
    </template>
    <template v-else-if="itemType === 'LabelItem'">
      <LabelItem
          :item="item"
          :itemSheetImage="itemSheetImage"
          :itemSheetDimensions="itemSheetDimensions"
          :itemSheet="itemSheet"
      ></LabelItem>
    </template>
    <template v-else-if="itemType === 'CheckItem'">
      <CheckItem
          :item="item"
          :itemSheetImage="itemSheetImage"
          :itemSheetDimensions="itemSheetDimensions"
          :itemSheet="itemSheet"
      ></CheckItem>
    </template>
    <template v-else-if="itemType === 'GoModeItem'">
      <GoModeItem
          :item="item"
          :itemSheetImage="itemSheetImage"
          :itemSheetDimensions="itemSheetDimensions"
          :itemSheet="itemSheet"
          :tracker="tracker"
      ></GoModeItem>
    </template>
    <template v-else-if="itemType === 'AlternateCountItem'">
      <AlternateCountItem
          :item="item"
          :itemSheetImage="itemSheetImage"
          :itemSheetDimensions="itemSheetDimensions"
          :itemSheet="itemSheet"
      ></AlternateCountItem>
    </template>

    <!-- default -->
    <template v-else>
      <span></span>
    </template>
  </div>
</template>

<style scoped>

</style>