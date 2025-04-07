<script setup>
import IconItem from "../IconItem.vue";
import {useTrackerItem} from "~/hooks/useTrackerItem.js";
import {useTrackerStateStore} from "~/stores/state-store.js";

const props = defineProps(['item'])

const {position, max, id} = useTrackerItem(props.item)
const stateStore = useTrackerStateStore()
stateStore.init(id.value, 0)
const update = (value) => {
  stateStore.update(id.value, value);
}
</script>

<template>
  <div
      v-if="stateStore.get(id) !== undefined && stateStore.get(id) !== null"
      class="absolute z-10"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @click="update((stateStore.get(id) + 1)%(max + 1))"
      @contextmenu.prevent="update((stateStore.get(id) === 0 ? max : (stateStore.get(id) - 1)%(max+1)))"

  >
    <IconItem
        :item="item"
        :active="stateStore.get(id) > 0"
    ></IconItem>
    <div v-if="stateStore.get(id) > 0" :style="{fontFamily: 'countItemFont', color: stateStore.get(id)  === max ? 'var(--color-incrementalItemFont-max)' : 'var(--color-incrementalItemFont)', hidden: stateStore.get(id) === 0 ? 'var(--color-incrementalItemFont-max)' : 'var(--color-incrementalItemFont)'}" class="z-20 absolute bottom-[-3px] right-[-10px] align-middle inline-block text-center w-full text-lg select-none text-shadow">
      {{stateStore.get(id)}}
    </div>
  </div>
</template>

<style scoped>

</style>