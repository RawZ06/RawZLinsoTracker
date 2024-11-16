// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: {enabled: true},
    modules: [
        "@nuxt/ui",
        "@nuxt/icon",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/color-mode",
        "@nuxt/fonts",
        "@nuxt/eslint",
        "@pinia/nuxt",
    ],
    nitro: {
        experimental: {
            websocket: true
        },
    },
    ssr: false,
});