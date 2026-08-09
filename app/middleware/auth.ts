export default defineNuxtRouteMiddleware((to) => {
  // Skip di server side
  if (process.server) return

  // Cek localStorage
  const token = localStorage.getItem('auth_token')
  
  // Jika belum login, redirect ke login
  if (!token) {
    return navigateTo('/login', { replace: true })
  }
})
