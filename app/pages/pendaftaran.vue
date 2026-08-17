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
              v-model="selectedTahunPelajaran"
              @change="onFilterChange"
              class="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
            >
              <option value="">Pilih Tahun Pelajaran</option>
              <option
                v-for="tp in tahunPelajaranList"
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
              v-model="selectedRombel"
              @change="onFilterChange"
              class="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
            >
              <option value="">Pilih Rombel</option>
              <option
                v-for="rombel in rombelList"
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
      <div v-if="isLoading" class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div class="flex flex-col items-center justify-center">
          <svg class="animate-spin h-12 w-12 text-purple-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">Memuat data...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!selectedTahunPelajaran || !selectedRombel" class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <svg class="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Pilih Filter</h3>
        <p class="text-gray-600">Silakan pilih Tahun Pelajaran dan Rombel untuk menampilkan data siswa</p>
      </div>

      <!-- Table Section -->
      <div v-else-if="siswaList.length > 0" class="bg-white rounded-2xl shadow-lg overflow-hidden">
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
                  v-for="ekskul in ekskulTidakWajib"
                  :key="ekskul.id"
                  class="px-4 py-4 text-center text-sm font-bold min-w-[120px]"
                >
                  {{ ekskul.name }}
                </th>
                <!-- Kolom Ekstrakurikuler Wajib -->
                <th
                  v-for="ekskul in ekskulWajib"
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
                v-for="(siswa, index) in siswaList"
                :key="siswa.id"
                class="border-b hover:bg-purple-50 transition"
              >
                <td class="px-4 py-4 text-sm text-gray-700 sticky left-0 bg-white z-20 border-r border-gray-200 shadow-sticky">{{ (index + 1).toString() }}</td>
                <td class="px-4 py-4 text-sm font-semibold text-gray-800 sticky left-12 bg-white z-20 border-r border-gray-200 shadow-sticky">
                  {{ siswa.peserta_didik.nama }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-700 text-center">{{ siswa.peserta_didik.nis }}</td>
                <td class="px-4 py-4 text-sm text-gray-700 text-center">{{ siswa.peserta_didik.jenis_kelamin }}</td>
                
                <!-- Checkbox Ekstrakurikuler Tidak Wajib -->
                <td
                  v-for="ekskul in ekskulTidakWajib"
                  :key="ekskul.id"
                  class="px-4 py-4 text-center"
                >
                  <input
                    type="checkbox"
                    :checked="isEkskulChecked(siswa.peserta_didik_id, ekskul.id)"
                    @change="handleCheckboxChange(siswa.peserta_didik_id, ekskul.id, $event)"
                    class="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                  />
                </td>
                
                <!-- Checkbox Ekstrakurikuler Wajib -->
                <td
                  v-for="ekskul in ekskulWajib"
                  :key="ekskul.id"
                  class="px-4 py-4 text-center bg-indigo-50"
                >
                  <input
                    type="checkbox"
                    :checked="isEkskulChecked(siswa.peserta_didik_id, ekskul.id)"
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
            @click="handleSimpanPerubahan"
            :disabled="isSaving"
            class="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg v-if="isSaving" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
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
const router = useRouter()
const config = useRuntimeConfig()
const toast = useNuxtApp().$toast as any

definePageMeta({
  middleware: 'auth'
})

interface TahunPelajaran {
  id: number
  tahun_pelajaran: string
  status: string
  created_at: string
  updated_at: string
  created_by_id: number | null
  updated_by_id: number | null
}

interface Rombel {
  id: number
  name: string
  status: string
  kelas_id: number
  kelas: {
    id: number
    name: string
    status: string
  }
}

interface PesertaDidik {
  id: number
  nama: string
  nis: string
  jenis_kelamin: string
  nisn: string
  tempat_lahir: string
  tanggal_lahir: string
}

interface Siswa {
  id: number
  peserta_didik_id: number
  peserta_didik: PesertaDidik
  rombel_id: number
  tahun_pelajaran_id: number
  status: string
}

interface Ekstrakurikuler {
  id: number
  name: string
  kelas_ids: number[] | null
  kelas: any[] | null
  kategori: string
  status: string
}

interface EkskulSiswaItem {
  id: number
  peserta_didik_rombel_id: number
  ekstrakurikuler_id: number
  ekstrakurikuler?: {
    id: number
    name: string
    kategori: string
  }
}

interface SiswaEkskul {
  peserta_didik_rombel_id: number
  peserta_didik_id: number
  nama_lengkap: string
  nisn: string
  ekstrakurikuler: EkskulSiswaItem[]
  total_ekskul: number
}

// State
const userName = ref<string>('Admin User')
const isLoading = ref<boolean>(false)
const isSaving = ref<boolean>(false)

// Filter State
const selectedTahunPelajaran = ref<number | string>('')
const selectedRombel = ref<number | string>('')

// Data Lists
const tahunPelajaranList = ref<TahunPelajaran[]>([])
const rombelList = ref<Rombel[]>([])
const siswaList = ref<Siswa[]>([])
const ekskulList = ref<Ekstrakurikuler[]>([])
const ekskulSiswaData = ref<{ siswa: SiswaEkskul[] } | null>(null)

// Checkbox state tracking
const checkboxStates = ref<Record<string, boolean>>({})

// Computed
const ekskulTidakWajib = computed(() => {
  if (!selectedRombel.value || !rombelList.value.length) return []
  
  const rombel = rombelList.value.find(r => r.id === selectedRombel.value)
  if (!rombel) return []
  
  const kelasId = rombel.kelas_id
  
  return ekskulList.value
    .filter(ekskul => {
      // Filter berdasarkan kategori tidak wajib
      if (ekskul.kategori !== 'tidak wajib') return false
      
      // Filter berdasarkan kelas
      if (!ekskul.kelas_ids || ekskul.kelas_ids.length === 0) return true
      return ekskul.kelas_ids.includes(kelasId)
    })
    .sort((a, b) => a.name.localeCompare(b.name))
})

const ekskulWajib = computed(() => {
  if (!selectedRombel.value || !rombelList.value.length) return []
  
  const rombel = rombelList.value.find(r => r.id === selectedRombel.value)
  if (!rombel) return []
  
  const kelasId = rombel.kelas_id
  
  return ekskulList.value
    .filter(ekskul => {
      // Filter berdasarkan kategori wajib
      if (ekskul.kategori !== 'wajib') return false
      
      // Filter berdasarkan kelas - jika kelas_ids null berarti untuk semua kelas
      if (!ekskul.kelas_ids || ekskul.kelas_ids.length === 0) return true
      return ekskul.kelas_ids.includes(kelasId)
    })
    .sort((a, b) => a.name.localeCompare(b.name))
})

// Functions
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

const fetchTahunPelajaran = async () => {
  try {
    const token = getAuthToken()
    const response: any = await $fetch(`${config.public.apiBase}/api/sieksa/tahun-pelajaran/get-tahun-pelajaran`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        search: {
          tahun_pelajaran: null,
          status: null
        },
        pagination: {
          limit: 50,
          page: 1
        }
      }
    })
    
    tahunPelajaranList.value = response.data || []
    
    // Set default ke yang active
    const activeTahunPelajaran = tahunPelajaranList.value.find((tp: TahunPelajaran) => tp.status === 'active')
    if (activeTahunPelajaran) {
      selectedTahunPelajaran.value = activeTahunPelajaran.id
    }
  } catch (error: any) {
    console.error('Error fetching tahun pelajaran:', error)
    
    // Handle auth error
    const { handleAuthError } = await import('~/app/utils/authErrorHandler')
    const wasAuthError = await handleAuthError(error)
    
    if (!wasAuthError) {
      toast.error('Gagal memuat tahun pelajaran')
    }
  }
}

const fetchRombel = async () => {
  try {
    const token = getAuthToken()
    const response: any = await $fetch(`${config.public.apiBase}/api/sieksa/rombel/get-rombel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        search: {
          name: null,
          status: 'active',
          kelas_id: null
        },
        pagination: {
          limit: 50,
          page: 1
        }
      }
    })
    
    rombelList.value = response.data || []
  } catch (error: any) {
    console.error('Error fetching rombel:', error)
    
    // Handle auth error
    const { handleAuthError } = await import('~/app/utils/authErrorHandler')
    const wasAuthError = await handleAuthError(error)
    
    if (!wasAuthError) {
      toast.error('Gagal memuat data rombel')
    }
  }
}

const fetchEkstrakurikuler = async () => {
  try {
    const token = getAuthToken()
    const response: any = await $fetch(`${config.public.apiBase}/api/sieksa/ekstrakurikuler/get-ekstrakurikuler`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        search: {
          name: null,
          kelas_id: null,
          kategori: null,
          status: 'active'
        },
        pagination: {
          limit: 50,
          page: 1
        }
      }
    })
    
    ekskulList.value = response.data || []
  } catch (error: any) {
    console.error('Error fetching ekstrakurikuler:', error)
    
    // Handle auth error
    const { handleAuthError } = await import('~/app/utils/authErrorHandler')
    const wasAuthError = await handleAuthError(error)
    
    if (!wasAuthError) {
      toast.error('Gagal memuat data ekstrakurikuler')
    }
  }
}

const fetchSiswa = async () => {
  if (!selectedTahunPelajaran.value || !selectedRombel.value) return
  
  isLoading.value = true
  try {
    const token = getAuthToken()
    const response: any = await $fetch(`${config.public.apiBase}/api/sieksa/peserta-didik/get-pemetaan-rombel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        search: {
          nama: null,
          rombel_id: selectedRombel.value,
          tahun_pelajaran_id: selectedTahunPelajaran.value,
          status: 'active'
        },
        pagination: {
          limit: 50,
          page: 1
        }
      }
    })
    
    siswaList.value = response.data || []
  } catch (error: any) {
    console.error('Error fetching siswa:', error)
    
    // Handle auth error
    const { handleAuthError } = await import('~/app/utils/authErrorHandler')
    const wasAuthError = await handleAuthError(error)
    
    if (!wasAuthError) {
      toast.error('Gagal memuat data siswa')
    }
  } finally {
    isLoading.value = false
  }
}

const fetchEkskulSiswa = async () => {
  if (!selectedTahunPelajaran.value || !selectedRombel.value) return
  
  try {
    const token = getAuthToken()
    const response: any = await $fetch(`${config.public.apiBase}/api/sieksa/register-ekstrakurikuler/get-all-ekstrakurikuler-siswa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        rombel_id: selectedRombel.value,
        tahun_pelajaran_id: selectedTahunPelajaran.value
      }
    })
    
    ekskulSiswaData.value = response.data || null
    console.log('Ekskul Siswa Data:', ekskulSiswaData.value)
    
    if (ekskulSiswaData.value && ekskulSiswaData.value.siswa) {
      console.log('Total siswa with ekskul:', ekskulSiswaData.value.siswa.length)
      ekskulSiswaData.value.siswa.forEach((s: any) => {
        console.log(`Siswa ${s.nama_lengkap} (ID: ${s.peserta_didik_id}) - ${s.total_ekskul} ekskul`)
      })
    }
  } catch (error: any) {
    console.error('Error fetching ekskul siswa:', error)
    
    // Handle auth error
    const { handleAuthError } = await import('~/app/utils/authErrorHandler')
    const wasAuthError = await handleAuthError(error)
    
    if (!wasAuthError) {
      toast.error('Gagal memuat data ekstrakurikuler siswa')
    }
  }
}

const isEkskulChecked = (pesertaDidikId: number, ekskulId: number): boolean => {
  const key = `${pesertaDidikId}-${ekskulId}`
  
  // Check if we have a tracked state for this checkbox
  if (key in checkboxStates.value) {
    return checkboxStates.value[key]
  }
  
  // Otherwise, check from API data
  if (!ekskulSiswaData.value || !ekskulSiswaData.value.siswa) {
    return false
  }
  
  const siswaData = ekskulSiswaData.value.siswa.find(
    (s: SiswaEkskul) => s.peserta_didik_id === pesertaDidikId
  )
  
  if (!siswaData || !siswaData.ekstrakurikuler) {
    return false
  }
  
  const hasEkskul = siswaData.ekstrakurikuler.some(
    (e: EkskulSiswaItem) => e.ekstrakurikuler_id === ekskulId
  )
  
  return hasEkskul
}

const handleCheckboxChange = (pesertaDidikId: number, ekskulId: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const key = `${pesertaDidikId}-${ekskulId}`
  checkboxStates.value[key] = target.checked
}

const getCheckboxKey = (pesertaDidikId: number, ekskulId: number): string => {
  return `${pesertaDidikId}-${ekskulId}`
}

const initializeCheckboxStates = () => {
  // Initialize checkbox states from API data
  checkboxStates.value = {}
  
  if (!ekskulSiswaData.value || !ekskulSiswaData.value.siswa) return
  
  ekskulSiswaData.value.siswa.forEach((siswa: SiswaEkskul) => {
    siswa.ekstrakurikuler.forEach((ekskul: EkskulSiswaItem) => {
      const key = `${siswa.peserta_didik_id}-${ekskul.ekstrakurikuler_id}`
      checkboxStates.value[key] = true
    })
  })
}

const handleSimpanPerubahan = async () => {
  if (!selectedTahunPelajaran.value || !selectedRombel.value) {
    toast.error('Pilih tahun pelajaran dan rombel terlebih dahulu')
    return
  }
  
  if (siswaList.value.length === 0) {
    toast.error('Tidak ada data siswa untuk disimpan')
    return
  }
  
  isSaving.value = true
  
  try {
    // Build request payload
    const payload = {
      siswa: siswaList.value.map(siswa => {
        // Get all ekstrakurikuler IDs that are checked for this student
        const ekskulIds: number[] = []
        
        // Check tidak wajib
        ekskulTidakWajib.value.forEach(ekskul => {
          const key = `${siswa.peserta_didik_id}-${ekskul.id}`
          if (checkboxStates.value[key] === true || 
              (!(key in checkboxStates.value) && isEkskulChecked(siswa.peserta_didik_id, ekskul.id))) {
            ekskulIds.push(ekskul.id)
          }
        })
        
        // Check wajib
        ekskulWajib.value.forEach(ekskul => {
          const key = `${siswa.peserta_didik_id}-${ekskul.id}`
          if (checkboxStates.value[key] === true || 
              (!(key in checkboxStates.value) && isEkskulChecked(siswa.peserta_didik_id, ekskul.id))) {
            ekskulIds.push(ekskul.id)
          }
        })
        
        return {
          peserta_didik_rombel_id: siswa.id,
          ekstrakurikuler_ids: ekskulIds
        }
      })
    }
    
    console.log('Saving payload:', payload)
    
    const token = getAuthToken()
    const response: any = await $fetch(`${config.public.apiBase}/api/sieksa/register-ekstrakurikuler/register-all-ekstrakurikuler-siswa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: payload
    })
    
    console.log('Save response:', response)
    
    // Check if there are any failures
    if (response.summary && response.summary.failed_count > 0) {
      // Show error details
      const failedDetails = response.details.filter((d: any) => d.status === 'failed')
      
      if (failedDetails.length > 0) {
        const errorMessages = failedDetails.map((d: any) => 
          `Siswa ID ${d.peserta_didik_rombel_id}: ${d.error}`
        ).join('\n')
        
        toast.error(`Gagal menyimpan beberapa data:\n${errorMessages}`, {
          timeout: 5000
        })
      }
    } else {
      // All success
      const summary = response.summary
      toast.success(
        `Berhasil menyimpan! Ditambahkan: ${summary.total_added}, Dihapus: ${summary.total_removed}, Dipertahankan: ${summary.total_kept}`,
        { timeout: 4000 }
      )
      
      // Reload data
      await fetchEkskulSiswa()
      initializeCheckboxStates()
    }
    
  } catch (error: any) {
    console.error('Error saving ekstrakurikuler:', error)
    
    // Handle auth error
    const { handleAuthError } = await import('~/app/utils/authErrorHandler')
    const wasAuthError = await handleAuthError(error)
    
    if (!wasAuthError) {
      toast.error(error.data?.message || 'Gagal menyimpan perubahan')
    }
  } finally {
    isSaving.value = false
  }
}

const onFilterChange = async () => {
  if (selectedTahunPelajaran.value && selectedRombel.value) {
    await fetchSiswa()
    await fetchEkskulSiswa()
    initializeCheckboxStates()
  }
}

// Load user name dan initial data
onMounted(async () => {
  const { useAuthService } = await import('~/app/services/authService')
  const authService = useAuthService()
  
  const authData = authService.getAuthData()
  if (authData && authData.user) {
    userName.value = authData.user.nama
  }
  
  // Load initial data
  await Promise.all([
    fetchTahunPelajaran(),
    fetchRombel(),
    fetchEkstrakurikuler()
  ])
  
  // Auto load siswa jika filter sudah terisi
  if (selectedTahunPelajaran.value && selectedRombel.value) {
    await onFilterChange()
  }
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
