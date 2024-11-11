<script setup>
import {computed, ref} from "vue";
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";

const props = defineProps(['item'])

const {position, count, defaultActive} = useTrackerItem(props.item)
const {itemSheet, itemSheetDimensions} = props;
const state = ref(count.value.start);
</script>

<template>
  <div
      class="absolute z-10"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="state = (state + count.step)%(count.max + 1)"
      @contextmenu.prevent="state = state === 0 ? count.max : (state - 1)%(count.max+1)"
  >
    <IconItem
        :item="item"
        :active="defaultActive"
    ></IconItem>
    <div :style="{fontFamily: 'countItemFont'}" class="z-20 text-white absolute top-[2px] right-[-36px] align-middle inline-block text-center w-full text-lg select-none" :class="{'text-green-600': state === count.max}">
      {{state}}
    </div>
  </div>
</template>

<style scoped>

</style>