<script setup lang="ts">
import Tracker from "~/components/Tracker.vue";
const route = useRoute()
const tracker = route.params.tracker
const id = route.params.id
const isSmallWindow = route.query.isSmallWindow

useHead({
  title: `Tracker ${tracker} - ${id}`,
})

</script>

<template>
  <Tracker :tracker="tracker" :id="id" :isSmallWindow="isSmallWindow"/>
</template>

<style scoped>

</style>