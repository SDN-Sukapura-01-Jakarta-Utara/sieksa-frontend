<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-purple-50 font-jakarta">
    <Navbar :user-name="userName" />

    <main class="flex-1 container mx-auto px-4 lg:px-8 py-12">
      <!-- Welcome Section -->
      <div class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        
        <div class="relative z-10">
          <h1 class="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Selamat Datang di SIEKSA
          </h1>
          <p class="text-white/90 text-lg md:text-xl max-w-3xl leading-relaxed">
            Sistem informasi ekstrakurikuler yang memudahkan pengelolaan data kegiatan ekstrakurikuler siswa SDN Sukapura 01
          </p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border-t-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-semibold mb-1">Total Siswa</p>
              <p class="text-3xl font-bold text-gray-800">450</p>
            </div>
            <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border-t-4 border-indigo-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-semibold mb-1">Siswa Aktif Ekskul</p>
              <p class="text-3xl font-bold text-gray-800">320</p>
            </div>
            <div class="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border-t-4 border-pink-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-semibold mb-1">Ekskul Aktif</p>
              <p class="text-3xl font-bold text-gray-800">15</p>
            </div>
            <div class="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border-t-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-semibold mb-1">Total Prestasi</p>
              <p class="text-3xl font-bold text-gray-800">68</p>
            </div>
            <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu Section -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Menu Utama</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- Menu Card Template -->
          <div class="menu-card group bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden border-2 border-gray-200 hover:border-purple-400 hover:shadow-2xl">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="shimmer"></div>
            
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-purple-300 relative z-10">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300 relative z-10">Monitoring Data</h3>
            <p class="text-sm text-gray-600 relative z-10">Monitor data ekstrakurikuler secara real-time</p>
          </div>

          <div class="menu-card group bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden border-2 border-gray-200 hover:border-indigo-400 hover:shadow-2xl">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="shimmer"></div>
            
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-indigo-300 relative z-10">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300 relative z-10">Master Data</h3>
            <p class="text-sm text-gray-600 relative z-10">Kelola data master sistem</p>
          </div>

          <div class="menu-card group bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden border-2 border-gray-200 hover:border-pink-400 hover:shadow-2xl">
            <div class="absolute inset-0 bg-gradient-to-br from-pink-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="shimmer"></div>
            
            <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-pink-300 relative z-10">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors duration-300 relative z-10">Pendaftaran</h3>
            <p class="text-sm text-gray-600 relative z-10">Pendaftaran ekstrakurikuler siswa</p>
          </div>

          <div class="menu-card group bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden border-2 border-gray-200 hover:border-violet-400 hover:shadow-2xl">
            <div class="absolute inset-0 bg-gradient-to-br from-violet-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="shimmer"></div>
            
            <div class="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-violet-300 relative z-10">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-violet-600 transition-colors duration-300 relative z-10">Rekap Siswa</h3>
            <p class="text-sm text-gray-600 relative z-10">Rekap siswa ekstrakurikuler</p>
          </div>

          <div class="menu-card group bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="shimmer"></div>
            
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-blue-300 relative z-10">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 relative z-10">Absensi</h3>
            <p class="text-sm text-gray-600 relative z-10">Absensi kegiatan ekstrakurikuler</p>
          </div>

          <div class="menu-card group bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden border-2 border-gray-200 hover:border-green-400 hover:shadow-2xl">
            <div class="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="shimmer"></div>
            
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-300 relative z-10">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300 relative z-10">Dokumentasi Kegiatan</h3>
            <p class="text-sm text-gray-600 relative z-10">Dokumentasi kegiatan ekstrakurikuler</p>
          </div>

          <div class="menu-card group bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl">
            <div class="absolute inset-0 bg-gradient-to-br from-yellow-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="shimmer"></div>
            
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-yellow-300 relative z-10">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors duration-300 relative z-10">Penilaian</h3>
            <p class="text-sm text-gray-600 relative z-10">Penilaian siswa ekstrakurikuler</p>
          </div>

          <div class="menu-card group bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden border-2 border-gray-200 hover:border-red-400 hover:shadow-2xl">
            <div class="absolute inset-0 bg-gradient-to-br from-red-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="shimmer"></div>
            
            <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-red-300 relative z-10">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300 relative z-10">Rekap Prestasi</h3>
            <p class="text-sm text-gray-600 relative z-10">Rekap prestasi siswa</p>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const userName = ref('Admin User')

// Load user name dari localStorage saat mounted (client-only)
onMounted(async () => {
  const { useAuthService } = await import('~/app/services/authService')
  const authService = useAuthService()
  
  const authData = authService.getAuthData()
  if (authData && authData.user) {
    userName.value = authData.user.nama
  }
})

useHead({
  title: 'Dashboard | SIEKSA',
  meta: [
    { name: 'description', content: 'Dashboard SIEKSA - Sistem Informasi Ekstrakurikuler SDN Sukapura 01' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/title-sieksa.png' }
  ]
})
</script>

<style scoped>
.menu-card {
  position: relative;
  transform: translateY(0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shimmer {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.3s;
}

.menu-card:hover .shimmer {
  opacity: 1;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}
</style>
