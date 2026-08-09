export default defineNuxtRouteMiddleware((to) => {
  // Skip di server side
  if (process.server) return

  // Cek localStorage
  const token = localStorage.getItem('auth_token')
  
  // Jika sudah login, redirect ke dashboard
  if (token) {
    return navigateTo('/dashboard', { replace: true })
  }
})
