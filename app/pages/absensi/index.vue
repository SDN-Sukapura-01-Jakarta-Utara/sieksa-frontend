<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-purple-50 font-jakarta">
    <Navbar :user-name="userName" />

    <main class="flex-1 container mx-auto px-4 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <button
            @click="router.push('/dashboard')"
            class="text-purple-600 hover:text-purple-800 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-3xl font-bold text-gray-800">Absensi Ekstrakurikuler</h1>
        </div>
        <p class="text-gray-600">Kelola kehadiran siswa dan pelatih</p>
      </div>

      <!-- Menu Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Buat Absensi Card -->
        <NuxtLink
          to="/absensi/buat"
          class="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden text-left p-6 border border-gray-100 transform hover:-translate-y-2 block"
        >
          <div class="relative z-10">
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300">
                <svg class="w-6 h-6 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div class="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Buat Absensi</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-5 group-hover:text-gray-700 transition-colors">Catat kehadiran siswa dan pelatih pada kegiatan ekstrakurikuler</p>
            
            <div class="flex items-center text-blue-600 font-semibold text-sm transition-all duration-300">
              <span class="group-hover:translate-x-2 transition-transform duration-300">Mulai</span>
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Rekap Absensi Siswa Card -->
        <NuxtLink
          to="/absensi/rekap-siswa"
          class="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden text-left p-6 border border-gray-100 transform hover:-translate-y-2 block"
        >
          <div class="relative z-10">
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300">
                <svg class="w-6 h-6 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">Rekap Absensi Siswa</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-5 group-hover:text-gray-700 transition-colors">Lihat laporan dan statistik kehadiran siswa ekstrakurikuler</p>
            
            <div class="flex items-center text-green-600 font-semibold text-sm transition-all duration-300">
              <span class="group-hover:translate-x-2 transition-transform duration-300">Lihat Laporan</span>
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Rekap Absensi Pelatih Card -->
        <NuxtLink
          to="/absensi/rekap-pelatih"
          class="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden text-left p-6 border border-gray-100 transform hover:-translate-y-2 block"
        >
          <div class="relative z-10">
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300">
                <svg class="w-6 h-6 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <svg class="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">Rekap Absensi Pelatih</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-5 group-hover:text-gray-700 transition-colors">Lihat laporan dan statistik kehadiran pelatih ekstrakurikuler</p>
            
            <div class="flex items-center text-purple-600 font-semibold text-sm transition-all duration-300">
              <span class="group-hover:translate-x-2 transition-transform duration-300">Lihat Laporan</span>
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

definePageMeta({
  middleware: 'auth'
})

const userName = ref('Admin User')



onMounted(async () => {
  const { useAuthService } = await import('~/app/services/authService')
  const authService = useAuthService()
  
  const authData = authService.getAuthData()
  if (authData && authData.user) {
    userName.value = authData.user.nama
  }
})

useHead({
  title: 'Absensi | SIEKSA',
  meta: [
    { name: 'description', content: 'Kelola Absensi Ekstrakurikuler SIEKSA' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/title-sieksa.png' }
  ]
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
