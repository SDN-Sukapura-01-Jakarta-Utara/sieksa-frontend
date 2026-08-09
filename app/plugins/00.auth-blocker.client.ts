export default defineNuxtPlugin(() => {
  // Run IMMEDIATELY before anything else
  if (process.client) {
    const token = localStorage.getItem('auth_token')
    const path = window.location.pathname
    
    // Create blocking overlay
    const shouldBlock = (path === '/login' && token) || (path === '/dashboard' && !token)
    
    if (shouldBlock) {
      // Create overlay to hide page
      const overlay = document.createElement('div')
      overlay.id = 'auth-blocking-overlay'
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
      `
      
      overlay.innerHTML = `
        <div style="text-center">
          <div style="display: inline-block; width: 48px; height: 48px; border: 4px solid #9333ea; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
          <p style="margin-top: 16px; color: #6b7280; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif;">Redirecting...</p>
        </div>
      `
      
      // Add spin animation
      const style = document.createElement('style')
      style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }'
      document.head.appendChild(style)
      
      document.body.appendChild(overlay)
      
      // Redirect immediately
      if (path === '/login' && token) {
        window.location.replace('/dashboard')
      } else if (path === '/dashboard' && !token) {
        window.location.replace('/login')
      }
    }
  }
})
