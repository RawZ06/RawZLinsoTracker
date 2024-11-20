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
      "@kgierke/nuxt-basic-auth"
    ],
    nitro: {
        experimental: {
            websocket: true
        },
    },
    basicAuth: {
        enabled: true,
        // Optional: Delimiter for users string
        // usersDelimiter: ",",
        // Optional: Whitelist routes
        allowedRoutes: [
            '^((?!/api/tracker).)*$' // Exclure toutes les routes sauf /api/tracker et ses sous-routes
        ],
    },
});