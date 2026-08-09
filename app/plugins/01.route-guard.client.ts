export default defineNuxtPlugin(() => {
  const router = useRouter()
  
  // Immediately check on initial load BEFORE anything renders
  if (process.client) {
    const token = localStorage.getItem('auth_token')
    const currentPath = window.location.pathname
    
    // Block rendering and redirect immediately
    if (currentPath === '/login' && token) {
      window.location.replace('/dashboard')
      return // Stop plugin execution
    }
    
    if (currentPath === '/dashboard' && !token) {
      window.location.replace('/login')
      return // Stop plugin execution
    }
  }
  
  // Guard untuk navigation (back button, manual URL)
  router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('auth_token')
    
    // Block navigation and force replace
    if (to.path === '/login' && token) {
      window.location.replace('/dashboard')
      return false // Cancel navigation
    }
    
    if (to.path === '/dashboard' && !token) {
      window.location.replace('/login')
      return false // Cancel navigation
    }
    
    next()
  })
})
