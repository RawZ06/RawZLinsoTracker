<script setup>
import Tracker from "~/components/Tracker.vue";
const route = useRoute()
const tracker = route.params.tracker
</script>

<template>
  <Tracker :tracker="tracker" />
</template>

<style scoped>

</style>