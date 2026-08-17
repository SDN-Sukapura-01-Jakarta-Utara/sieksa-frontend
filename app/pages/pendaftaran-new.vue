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
          <h1 class="text-3xl font-bold text-gray-800">Pendaftaran Ekstrakurikuler</h1>
        </div>
        <p class="text-gray-600">Kelola pendaftaran siswa ke ekstrakurikuler</p>
      </div>

      <!-- Filter Section -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Filter Data</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Dropdown Tahun Pelajaran -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Tahun Pelajaran
            </label>
            <select
              v-model="pendaftaranStore.selectedTahunPelajaran"
              @change="handleFilterChange"
              class="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
            >
              <option value="">Pilih Tahun Pelajaran</option>
              <option
                v-for="tp in pendaftaranStore.tahunPelajaranList"
                :key="tp.id"
                :value="tp.id"
              >
                {{ tp.tahun_pelajaran }}
              </option>
            </select>
          </div>

          <!-- Dropdown Rombel -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Rombel
            </label>
            <select
              v-model="pendaftaranStore.selectedRombel"
              @change="handleFilterChange"
              class="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
            >
              <option value="">Pilih Rombel</option>
              <option
                v-for="rombel in pendaftaranStore.rombelList"
                :key="rombel.id"
                :value="rombel.id"
              >
                {{ rombel.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pendaftaranStore.isLoading" class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div class="flex flex-col items-center justify-center">
          <svg class="animate-spin h-12 w-12 text-purple-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">Memuat data...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!pendaftaranStore.isFilterReady" class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <svg class="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Pilih Filter</h3>
        <p class="text-gray-600">Silakan pilih Tahun Pelajaran dan Rombel untuk menampilkan data siswa</p>
      </div>

      <!-- Table Section -->
      <div v-else-if="pendaftaranStore.siswaList.length > 0" class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <tr>
                <th class="px-4 py-4 text-left text-sm font-bold sticky left-0 bg-purple-600 z-30 shadow-sticky">No</th>
                <th class="px-4 py-4 text-left text-sm font-bold sticky left-12 bg-purple-600 z-30 min-w-[200px] shadow-sticky">Nama</th>
                <th class="px-4 py-4 text-center text-sm font-bold min-w-[100px]">NIS</th>
                <th class="px-4 py-4 text-center text-sm font-bold min-w-[80px]">P/L</th>
                <!-- Kolom Ekstrakurikuler Tidak Wajib -->
                <th
                  v-for="ekskul in pendaftaranStore.ekskulTidakWajib"
                  :key="ekskul.id"
                  class="px-4 py-4 text-center text-sm font-bold min-w-[120px]"
                >
                  {{ ekskul.name }}
                </th>
                <!-- Kolom Ekstrakurikuler Wajib -->
                <th
                  v-for="ekskul in pendaftaranStore.ekskulWajib"
                  :key="ekskul.id"
                  class="px-4 py-4 text-center text-sm font-bold min-w-[120px] bg-indigo-700"
                >
                  {{ ekskul.name }}
                  <span class="block text-xs font-normal mt-1">(Wajib)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(siswa, index) in pendaftaranStore.siswaList"
                :key="siswa.id"
                class="border-b hover:bg-purple-50 transition"
              >
                <td class="px-4 py-4 text-sm text-gray-700 sticky left-0 bg-white z-20 border-r border-gray-200 shadow-sticky">{{ index + 1 }}</td>
                <td class="px-4 py-4 text-sm font-semibold text-gray-800 sticky left-12 bg-white z-20 border-r border-gray-200 shadow-sticky">
                  {{ siswa.peserta_didik.nama }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-700 text-center">{{ siswa.peserta_didik.nis }}</td>
                <td class="px-4 py-4 text-sm text-gray-700 text-center">{{ siswa.peserta_didik.jenis_kelamin }}</td>
                
                <!-- Checkbox Ekstrakurikuler Tidak Wajib -->
                <td
                  v-for="ekskul in pendaftaranStore.ekskulTidakWajib"
                  :key="ekskul.id"
                  class="px-4 py-4 text-center"
                >
                  <input
                    type="checkbox"
                    :checked="pendaftaranStore.isEkskulChecked(siswa.peserta_didik_id, ekskul.id)"
                    @change="handleCheckboxChange(siswa.peserta_didik_id, ekskul.id, $event)"
                    class="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                  />
                </td>
                
                <!-- Checkbox Ekstrakurikuler Wajib -->
                <td
                  v-for="ekskul in pendaftaranStore.ekskulWajib"
                  :key="ekskul.id"
                  class="px-4 py-4 text-center bg-indigo-50"
                >
                  <input
                    type="checkbox"
                    :checked="pendaftaranStore.isEkskulChecked(siswa.peserta_didik_id, ekskul.id)"
                    @change="handleCheckboxChange(siswa.peserta_didik_id, ekskul.id, $event)"
                    class="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Tombol Simpan -->
        <div class="mt-6 flex justify-end px-6 pb-6">
          <button
            @click="handleSimpan"
            :disabled="pendaftaranStore.isSaving"
            class="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg v-if="pendaftaranStore.isSaving" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ pendaftaranStore.isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
          </button>
        </div>
      </div>

      <!-- No Data State -->
      <div v-else class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <svg class="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Tidak Ada Data</h3>
        <p class="text-gray-600">Tidak ada siswa ditemukan untuk rombel dan tahun pelajaran yang dipilih</p>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { usePendaftaran } from '~/app/composables/usePendaftaran'

const router = useRouter()

definePageMeta({
  middleware: 'auth'
})

const userName = ref('Admin User')

// Use composable
const {
  store: pendaftaranStore,
  loadInitialData,
  handleFilterChange,
  handleCheckboxChange,
  simpanPerubahan
} = usePendaftaran()

// Handle simpan
const handleSimpan = async () => {
  try {
    await simpanPerubahan()
  } catch (error) {
    // Error already handled in composable
  }
}

// Load user name
onMounted(async () => {
  const { useAuthService } = await import('~/app/services/authService')
  const authService = useAuthService()
  
  const authData = authService.getAuthData()
  if (authData && authData.user) {
    userName.value = authData.user.nama
  }
  
  // Load initial data
  await loadInitialData()
})

useHead({
  title: 'Pendaftaran Ekstrakurikuler | SIEKSA',
  meta: [
    { name: 'description', content: 'Pendaftaran Ekstrakurikuler SIEKSA' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/title-sieksa.png' }
  ]
})
</script>

<style scoped>
/* Styling untuk sticky columns dengan shadow */
.shadow-sticky {
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

/* Ensure sticky columns stay on top */
thead th.sticky,
tbody td.sticky {
  position: sticky;
}

/* Z-index hierarchy */
thead th {
  z-index: 5;
}

thead th.sticky {
  z-index: 30 !important;
}

tbody td {
  z-index: 1;
}

tbody td.sticky {
  z-index: 20 !important;
}

/* Custom scrollbar */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #9333ea;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #7c3aed;
}
</style>
