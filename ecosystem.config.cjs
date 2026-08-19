module.exports = {
  apps: [
    {
      name: 'sieksa-frontend',
      script: './.output/server/index.mjs',
      env: {
        NUXT_PUBLIC_API_BASE_URL: 'https://api-sieksa.sdnsukapura01.sch.id',
        NUXT_PORT: 4001,
        NODE_ENV: 'production'
      }
    }
  ]
}
