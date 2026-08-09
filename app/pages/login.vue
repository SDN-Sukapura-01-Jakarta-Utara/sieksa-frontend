<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-200 via-purple-300 to-indigo-300 flex items-center justify-center p-4 relative overflow-hidden font-jakarta">
    <!-- Animated Background Icons -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Icon Bola -->
      <div class="absolute top-20 left-10 text-purple-400 opacity-30 animate-float">
        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      </div>

      <!-- Icon Buku -->
      <div class="absolute top-40 right-20 text-pink-400 opacity-30 animate-float animation-delay-2000">
        <svg class="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
        </svg>
      </div>

      <!-- Icon Musik -->
      <div class="absolute bottom-32 left-20 text-indigo-400 opacity-30 animate-float animation-delay-4000">
        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      </div>

      <!-- Icon Palette -->
      <div class="absolute top-1/3 right-10 text-violet-400 opacity-30 animate-float animation-delay-1000">
        <svg class="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      </div>

      <!-- Icon Komputer -->
      <div class="absolute bottom-20 right-32 text-purple-500 opacity-30 animate-float animation-delay-3000">
        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
        </svg>
      </div>

      <!-- Icon Kamera -->
      <div class="absolute top-52 left-1/4 text-pink-500 opacity-30 animate-float animation-delay-5000">
        <svg class="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 15.2c-2.1 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8 3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8zm0-6c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2 2.2-1 2.2-2.2-1-2.2-2.2-2.2z"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
        </svg>
      </div>

      <!-- Icon Trophy -->
      <div class="absolute top-3/4 left-1/3 text-indigo-500 opacity-30 animate-float animation-delay-6000">
        <svg class="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
        </svg>
      </div>

      <!-- Icon Mikroskop -->
      <div class="absolute bottom-40 left-1/2 text-violet-500 opacity-30 animate-float animation-delay-7000">
        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z"/>
        </svg>
      </div>

      <!-- Icon Teater -->
      <div class="absolute top-60 right-1/4 text-purple-600 opacity-30 animate-float animation-delay-8000">
        <svg class="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 2v5.5c0 .83-.67 1.5-1.5 1.5S8 8.33 8 7.5V3c-2.21 0-4 1.79-4 4v10c0 2.21 1.79 4 4 4h1v3h7v-3h1c2.21 0 4-1.79 4-4v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V17c0 1.1-.9 2-2 2h-1V3c-1.1 0-2 .9-2 2v2.5c0 .83-.67 1.5-1.5 1.5S11 8.33 11 7.5V2z"/>
        </svg>
      </div>
    </div>

    <div class="w-full max-w-lg relative z-10">
      <!-- Card Login -->
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <!-- Header Section with Gradient -->
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-8 text-center relative overflow-hidden">
          <!-- Decorative circles -->
          <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
          
          <div class="relative z-10">
            <!-- Logo -->
            <div class="flex justify-center mb-4 animate-fade-in-down">
              <div class="w-28 h-28 bg-white rounded-full p-3 shadow-lg">
                <img src="/logo-sieksa.png" alt="Logo SIEKSA" class="w-full h-full object-contain">
              </div>
            </div>

            <!-- Title -->
            <h1 class="text-3xl font-bold text-white mb-2 animate-fade-in">
              LOGIN SIEKSA
            </h1>
            <p class="text-white/70 text-sm">Sistem Informasi Ekstrakurikuler SDN Sukapura 01</p>
          </div>
        </div>

        <!-- Form Section -->
        <div class="px-8 py-8">
          <form @submit.prevent="handleLogin" class="space-y-5 animate-fade-in-up">
            <!-- Username Input -->
            <div class="group">
              <label for="username" class="block text-base font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="username"
                  v-model="form.username"
                  type="text"
                  required
                  class="w-full pl-12 pr-4 py-3.5 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                  placeholder="Masukkan username"
                >
              </div>
            </div>

            <!-- Password Input -->
            <div class="group">
              <label for="password" class="block text-base font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  class="w-full pl-12 pr-4 py-3.5 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                  placeholder="Masukkan password"
                >
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
            >
              <span class="flex items-center justify-center">
                <span v-if="!isLoading">Masuk Sekarang</span>
                <span v-else class="flex items-center gap-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              </span>
            </button>
          </form>
        </div>
      </div>

      <!-- Made with Love -->
      <div class="flex justify-center mt-6 animate-fade-in">
        <div class="text-center text-purple-900/80 text-xs font-medium backdrop-blur-sm bg-white/30 rounded-full py-2 px-4">
          <p class="flex items-center justify-center gap-1">
            Handcrafted and made with 
            <svg class="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            by Syahira Isnaeni Dewi
          </p>
        </div>
      </div>

      <!-- Copyright -->
      <div class="text-center mt-2 text-purple-800/70 text-xs font-medium animate-fade-in">
        © 2026 SIEKSA - SDN Sukapura 01. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginResponse } from '~/app/types/auth'

definePageMeta({
  middleware: 'guest'
})

const toast = useNuxtApp().$toast as any
const router = useRouter()

const form = ref({
  username: '',
  password: ''
})

const isLoading = ref(false)
const isPageLoading = ref(true)

// Ensure page is loaded before showing
onMounted(() => {
  isPageLoading.value = false
})

useHead({
  title: 'Login | SIEKSA',
  meta: [
    { name: 'description', content: 'Login SIEKSA - Sistem Informasi Ekstrakurikuler SDN Sukapura 01' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/title-sieksa.png' }
  ]
})

const handleLogin = async () => {
  isLoading.value = true
  
  try {
    const { useAuthService } = await import('~/app/services/authService')
    const { authServiceAlt } = await import('~/app/services/authServiceAlt')
    const authService = useAuthService()
    
    // Coba dengan alternative service dulu untuk debug
    console.log('Trying alternative auth service...')
    const response = await authServiceAlt.login(form.value)
    
    if (response.status === 'success' && response.data) {
      // Simpan data auth menggunakan service
      authService.saveAuthData(response.data)
      
      // Tampilkan toast sukses (2 detik)
      toast.success(`Selamat datang, ${response.data.user.nama}! Anda akan diarahkan ke dashboard.`, {
        timeout: 2000
      })
      
      // Redirect setelah toast selesai (2 detik)
      setTimeout(() => {
        window.location.replace('/dashboard')
      }, 2000)
    } else {
      throw new Error('Response tidak valid')
    }
  } catch (error: any) {
    console.error('Login error:', error)
    
    // Tampilkan toast error (2 detik)
    const errorMessage = error.data?.error || error.message || 'Username atau password salah'
    toast.error(errorMessage, {
      timeout: 2000
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(20px, -30px) rotate(5deg);
  }
  50% {
    transform: translate(-15px, -20px) rotate(-5deg);
  }
  75% {
    transform: translate(25px, 15px) rotate(3deg);
  }
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-float {
  animation: float 12s ease-in-out infinite;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-3000 {
  animation-delay: 3s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-5000 {
  animation-delay: 5s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

.animation-delay-7000 {
  animation-delay: 7s;
}

.animation-delay-8000 {
  animation-delay: 8s;
}

.animate-fade-in-down {
  animation: fade-in-down 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>
