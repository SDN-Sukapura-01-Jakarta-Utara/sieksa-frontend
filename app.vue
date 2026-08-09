<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// Prevent flash of wrong page
if (process.client) {
  const token = localStorage.getItem('auth_token')
  const path = window.location.pathname
  
  // Hide body until we confirm correct route
  if ((path === '/login' && token) || (path === '/dashboard' && !token)) {
    document.documentElement.style.visibility = 'hidden'
  }
}

onMounted(() => {
  // Show body after mount
  document.documentElement.style.visibility = 'visible'
})
</script>

<style>
html {
  visibility: visible;
}
</style>
