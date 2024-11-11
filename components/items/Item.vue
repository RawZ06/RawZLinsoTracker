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

const props = defineProps(['item'])

const {itemType} = useTrackerItem(props.item)
</script>

<template>
  <div>
    <template v-if="itemType === 'Item'">
      <SimpleItem
          :item="item"
      ></SimpleItem>
    </template>
    <template v-else-if="itemType === 'IncrementalItem'">
      <IncrementalItem
          :item="item"
      ></IncrementalItem>
    </template>
    <template v-else-if="itemType === 'EvolutionItem'">
      <EvolutionItem
          :item="item"
      ></EvolutionItem>
    </template>
    <template v-else-if="itemType === 'CountItem'">
      <CountItem
          :item="item"
      ></CountItem>
    </template>
    <template v-else-if="itemType === 'LabelItem'">
      <LabelItem
          :item="item"
      ></LabelItem>
    </template>
    <template v-else-if="itemType === 'CheckItem'">
      <CheckItem
          :item="item"
      ></CheckItem>
    </template>
    <template v-else-if="itemType === 'GoModeItem'">
      <GoModeItem
          :item="item"
      ></GoModeItem>
    </template>
    <template v-else-if="itemType === 'AlternateCountItem'">
      <AlternateCountItem
          :item="item"
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