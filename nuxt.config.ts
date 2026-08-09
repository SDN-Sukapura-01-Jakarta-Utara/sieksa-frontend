// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  
  css: ['~/app/assets/css/main.css'],
  
  dir: {
    layouts: 'app/layouts',
    pages: 'app/pages',
    middleware: 'app/middleware',
    plugins: 'app/plugins',
    assets: 'app/assets',
    public: 'public'
  },
  
  components: [
    {
      path: '~/app/components',
      pathPrefix: false
    }
  ],
  
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'SIEKSA',
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:4001'
    }
  },
  
  imports: {
    dirs: ['app/stores', 'app/composables', 'app/types', 'app/services']
  },
  
  devServer: {
    port: 4001
  }
})
