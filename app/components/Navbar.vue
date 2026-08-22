<template>
  <nav class="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo & Brand -->
        <div class="flex items-center gap-3">
          <div class="relative">
            <div class="absolute inset-0 bg-white/30 blur-md opacity-50 rounded-full"></div>
            <img src="/logo-sieksa.png" alt="Logo SIEKSA" class="h-12 w-12 object-contain relative z-10 bg-white rounded-full p-1">
          </div>
          <div>
            <h1 class="text-xl md:text-2xl font-bold text-white">SIEKSA</h1>
            <p class="text-xs text-purple-100 font-medium hidden sm:block">SDN Sukapura 01</p>
          </div>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center gap-2">
          <NuxtLink
            to="/dashboard"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white hover:bg-white/20 transition font-semibold"
            active-class="bg-white/30 shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/video-tutorial"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white hover:bg-white/20 transition font-semibold"
            active-class="bg-white/30 shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Video Tutorial
          </NuxtLink>
          <NuxtLink
            to="/buku-panduan"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white hover:bg-white/20 transition font-semibold"
            active-class="bg-white/30 shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Buku Panduan
          </NuxtLink>
          <a
            href="https://wa.me/628889125991?text=Halo%2C%20saya%20pelatih%20ekskul%20ingin%20bertanya%20terkait%20"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white hover:bg-white/20 transition font-semibold"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Bantuan
          </a>
        </div>

        <!-- User & Logout -->
        <div class="hidden lg:flex items-center gap-4">
          <div class="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span class="text-purple-600 font-bold text-sm">{{ userName.charAt(0) }}</span>
            </div>
            <span class="text-white font-semibold">{{ userName }}</span>
          </div>
          <button
            @click="handleLogout"
            class="bg-white text-purple-600 hover:bg-purple-50 px-5 py-2.5 rounded-xl font-semibold transition shadow-lg hover:shadow-xl hover:scale-105"
          >
            Logout
          </button>
        </div>

        <!-- Hamburger Button (Mobile) -->
        <button
          @click="toggleSidebar"
          class="lg:hidden p-2 rounded-xl hover:bg-white/20 transition"
        >
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
      @click="toggleSidebar"
    ></div>

    <!-- Mobile Sidebar -->
    <div
      :class="[
        'fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 shadow-2xl transform transition-transform duration-300 z-50 lg:hidden',
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <div class="p-6">
        <!-- Close Button -->
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-bold text-white">Menu</h2>
          <button @click="toggleSidebar" class="text-white hover:bg-white/20 p-2 rounded-xl transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- User Info -->
        <div class="mb-6 pb-6 border-b border-white/20">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span class="text-purple-600 font-bold">{{ userName.charAt(0) }}</span>
            </div>
            <div>
              <p class="text-white font-bold">{{ userName }}</p>
              <p class="text-purple-100 text-sm">Administrator</p>
            </div>
          </div>
        </div>

        <!-- Menu Links -->
        <div class="space-y-2 mb-6">
          <NuxtLink
            to="/dashboard"
            class="flex items-center gap-3 text-white hover:bg-white/20 px-4 py-3 rounded-xl transition font-semibold group"
            active-class="bg-white/30 shadow-lg"
            @click="toggleSidebar"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/video-tutorial"
            class="flex items-center gap-3 text-white hover:bg-white/20 px-4 py-3 rounded-xl transition font-semibold group"
            active-class="bg-white/30 shadow-lg"
            @click="toggleSidebar"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Video Tutorial
          </NuxtLink>
          <NuxtLink
            to="/buku-panduan"
            class="flex items-center gap-3 text-white hover:bg-white/20 px-4 py-3 rounded-xl transition font-semibold group"
            active-class="bg-white/30 shadow-lg"
            @click="toggleSidebar"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Buku Panduan
          </NuxtLink>
          <a
            href="https://wa.me/628889125991?text=Halo%2C%20saya%20pelatih%20ekskul%20ingin%20bertanya%20terkait%20"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 text-white hover:bg-white/20 px-4 py-3 rounded-xl transition font-semibold group"
            @click="toggleSidebar"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Bantuan
          </a>
        </div>

        <button
          @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 bg-white text-purple-600 hover:bg-purple-50 px-4 py-3 rounded-xl font-bold transition shadow-lg hover:scale-105"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  userName?: string
}>(), {
  userName: 'User'
})

const isSidebarOpen = ref(false)
const toast = useNuxtApp().$toast as any
const router = useRouter()

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleLogout = async () => {
  try {
    // Import service
    const { useAuthService } = await import('~/app/services/authService')
    const authService = useAuthService()
    
    // Call logout API
    const response = await authService.logout()
    
    // Clear auth data dari localStorage
    authService.clearAuthData()
    
    // Tampilkan toast sukses (2 detik)
    if (response.status === 'success') {
      toast.success('Logout berhasil! Anda akan diarahkan ke halaman login.', {
        timeout: 2000
      })
    }
    
    // Redirect setelah toast selesai (2 detik)
    setTimeout(() => {
      window.location.replace('/login')
    }, 2000)
  } catch (error: any) {
    console.error('Logout error:', error)
    
    // Tetap clear data dan redirect meskipun API error
    const { useAuthService } = await import('~/app/services/authService')
    const authService = useAuthService()
    authService.clearAuthData()
    
    toast.success('Anda telah keluar dari sistem.', {
      timeout: 2000
    })
    
    setTimeout(() => {
      window.location.replace('/login')
    }, 2000)
  }
}
</script>
