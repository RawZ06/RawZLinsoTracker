<script setup lang="ts">
import Tracker from "~/components/Tracker.vue";
const route = useRoute()
const tracker = route.params.tracker
const id = route.params.id
</script>

<template>
  <Tracker :tracker="tracker" :id="id" />
</template>

<style scoped>

</style>