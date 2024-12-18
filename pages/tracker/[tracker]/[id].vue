<script setup lang="ts">
import Tracker from "~/components/Tracker.vue";
const route = useRoute()
const tracker = route.params.tracker
const id = route.params.id
const scroll = route.query.scroll

useHead({
  title: `Tracker ${tracker} - ${id}`,
})

</script>

<template>
  <Tracker :tracker="tracker" :id="id" :scroll="scroll"/>
</template>

<style scoped>

</style>