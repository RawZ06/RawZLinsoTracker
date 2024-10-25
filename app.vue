<script setup lang="ts">
const wrapper =
  "min-h-[calc(100vh-2*var(--header-height))] h-[1px] overflow-scroll";
</script>

<template>
  <UHeader>
    <template #logo>
      <span>Nuxt Boilerplate</span>
    </template>

    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>

  <UMain
    :ui="{
      wrapper,
    }"
    style=""
  >
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </UMain>

  <UFooter>
    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }} RawZ06 -
        <NuxtLink
          class="hover:underline"
          to="https://github.com/nuxt/nuxt/blob/main/LICENSE"
          target="_blank"
        >
          MIT License
        </NuxtLink>
      </p>
    </template>

    <template #right>
      <UButton
        to="https://x.com/nuxt_js"
        target="_blank"
        icon="i-simple-icons-x"
        color="gray"
        variant="ghost"
      />
      <UButton
        to="https://discord.com/invite/ps2h6QT"
        target="_blank"
        icon="i-simple-icons-discord"
        color="gray"
        variant="ghost"
      />
      <UButton
        to="https://github.com/nuxt/nuxt"
        target="_blank"
        icon="i-simple-icons-github"
        color="gray"
        variant="ghost"
      />
    </template>
  </UFooter>
  <UNotifications />
</template>
