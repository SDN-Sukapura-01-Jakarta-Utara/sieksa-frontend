module.exports = {
  apps: [
    {
      name: 'sieksa-frontend',
      script: './.output/server/index.mjs',
      env_production: {
        NUXT_PUBLIC_API_BASE_URL: 'https://api-sieksa.sdnsukapura01dev.my.id',
        PORT: 4001,
        NODE_ENV: 'production'
      }
    }
  ]
}
