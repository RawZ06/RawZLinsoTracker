<script setup>
import {ref} from "vue";
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";

const props = defineProps(['item'])

const {position, defaultActive} = useTrackerItem(props.item)
const active = ref(defaultActive.value);
</script>

<template>
  <div
      class="absolute z-10"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="active = !active"
      @contextmenu.prevent="active = !active"
  >
    <IconItem
      :item="item"
      :active="active"
    ></IconItem>
  </div>
</template>

<style scoped>

</style>