module.exports = {
  apps: [
    {
      name: 'sieksa-frontend',
      port: 4001,
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
