<script setup>
import Tracker from "~/components/Tracker.vue";
const route = useRoute()
const tracker = route.params.tracker
const isOpen = ref(false)
const form = reactive({
  name: ""
})

const scroll = route.query.scroll

async function onSubmit(event) {
  // Do something with event.data
  event.preventDefault()
  const value = event.data.name;
  form.name = "";
  await navigateTo(`/tracker/${tracker}/${value}`)
}

useHead({
  title: `Tracker ${tracker}`,
})
</script>

<template>
  <div class="mb-2 ml-2">
    <UButton label="Go Live" icon="i-heroicons-globe-alt"
             size="sm"
             color="primary"
             :trailing="false" @click="isOpen = true"/>
  </div>
  <Tracker :tracker="tracker" :scroll="scroll" />
  <UModal v-model="isOpen">
    <UCard
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow'
          }
        }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Go Live
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
        </div>
      </template>

      <div>
        <UForm :state="form" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Name" name="name">
            <UInput v-model="form.name" />
          </UFormGroup>

          <UButton icon="i-heroicons-globe-alt"
                   size="sm"
                   color="primary"
                   :trailing="false" type="submit">
            Go
          </UButton>
        </UForm>
      </div>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>