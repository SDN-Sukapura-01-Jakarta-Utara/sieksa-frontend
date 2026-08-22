<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-purple-50 font-jakarta">
    <Navbar :user-name="userName" />
    <main class="flex-1 container mx-auto px-4 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <button @click="router.push('/absensi')" class="text-purple-600 hover:text-purple-800 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-3xl font-bold text-gray-800">Rekap Absensi Pelatih</h1>
        </div>
        <p class="text-gray-600">Lihat laporan dan statistik kehadiran pelatih ekstrakurikuler</p>
      </div>

      <!-- Filter Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <!-- Filter Ekstrakurikuler -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Ekstrakurikuler</label>
            <select 
              v-model="filter.ekstrakurikuler_id" 
              @change="onEkskulChange" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            >
              <option value="">Pilih Ekstrakurikuler</option>
              <option v-for="ekskul in ekstrakurikulerList" :key="ekskul.id" :value="ekskul.id">
                {{ ekskul.name }}
              </option>
            </select>
          </div>

          <!-- Filter Pelatih -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Pelatih</label>
            <select 
              v-model="filter.pelatih_id" 
              @change="onFilterChange" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              :disabled="!filter.ekstrakurikuler_id"
            >
              <option value="">Pilih Pelatih</option>
              <option v-for="pelatih in pelatihList" :key="pelatih.id" :value="pelatih.id">
                {{ pelatih.nama }}
              </option>
            </select>
          </div>

          <!-- Filter Tahun Pelajaran -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tahun Pelajaran</label>
            <select 
              v-model="filter.tahun_pelajaran_id" 
              @change="onFilterChange" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            >
              <option value="">Pilih Tahun Pelajaran</option>
              <option v-for="tp in tahunPelajaranList" :key="tp.id" :value="tp.id">
                {{ tp.tahun_pelajaran }}
              </option>
            </select>
          </div>

          <!-- Desktop: Excel Button (separate column) -->
          <div v-if="filter.ekstrakurikuler_id && filter.tahun_pelajaran_id && filter.pelatih_id && !isLoading" class="hidden lg:block">
            <label class="block text-sm font-semibold text-gray-700 mb-2">&nbsp;</label>
            <button 
              @click="downloadExcel" 
              :disabled="isDownloading"
              class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
            >
              <svg v-if="!isDownloading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <svg v-else class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="hidden xl:inline">{{ isDownloading ? 'Mengunduh...' : 'Download Excel' }}</span>
              <span class="xl:hidden">{{ isDownloading ? '...' : 'Excel' }}</span>
            </button>
          </div>

          <!-- Desktop: PDF Button (separate column) -->
          <div v-if="filter.ekstrakurikuler_id && filter.tahun_pelajaran_id && filter.pelatih_id && !isLoading" class="hidden lg:block">
            <label class="block text-sm font-semibold text-gray-700 mb-2">&nbsp;</label>
            <button 
              @click="downloadPdf" 
              :disabled="isDownloadingPdf"
              class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
            >
              <svg v-if="!isDownloadingPdf" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <svg v-else class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="hidden xl:inline">{{ isDownloadingPdf ? 'Mengunduh...' : 'Download PDF' }}</span>
              <span class="xl:hidden">{{ isDownloadingPdf ? '...' : 'PDF' }}</span>
            </button>
          </div>

          <!-- Mobile/Tablet: Download buttons side by side -->
          <div v-if="filter.ekstrakurikuler_id && filter.tahun_pelajaran_id && filter.pelatih_id && !isLoading" class="md:col-span-3 lg:hidden">
            <label class="block text-sm font-semibold text-gray-700 mb-2">&nbsp;</label>
            <div class="flex gap-2">
              <button 
                @click="downloadExcel" 
                :disabled="isDownloading"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
              >
                <svg v-if="!isDownloading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <svg v-else class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isDownloading ? 'Mengunduh...' : 'Download Excel' }}
              </button>
              <button 
                @click="downloadPdf" 
                :disabled="isDownloadingPdf"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
              >
                <svg v-if="!isDownloadingPdf" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <svg v-else class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isDownloadingPdf ? 'Mengunduh...' : 'Download PDF' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Month/Year Navigation -->
        <div class="flex items-center justify-between mb-4">
          <button 
            @click="previousMonth" 
            class="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 class="text-xl font-bold text-gray-800">{{ currentMonthYear }}</h2>
          <button 
            @click="nextMonth" 
            class="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-8">
          <svg class="animate-spin h-8 w-8 mx-auto text-purple-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600 mt-2">Memuat data...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="!filter.ekstrakurikuler_id || !filter.pelatih_id || !filter.tahun_pelajaran_id" class="text-center py-8">
          <p class="text-gray-500">Pilih ekstrakurikuler, pelatih, dan tahun pelajaran untuk melihat rekap absensi</p>
        </div>

        <!-- No Data -->
        <div v-else-if="kegiatanList.length === 0" class="text-center py-8">
          <p class="text-gray-500">Tidak ada data kegiatan pada bulan ini</p>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto border border-gray-300 rounded-lg">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gradient-to-r from-purple-600 to-purple-700">
                <th class="px-4 py-3 text-left text-xs font-bold text-white uppercase border-r border-purple-500">No</th>
                <th class="px-4 py-3 text-left text-xs font-bold text-white uppercase border-r border-purple-500">Tanggal</th>
                <th class="px-4 py-3 text-left text-xs font-bold text-white uppercase border-r border-purple-500">Waktu</th>
                <th class="px-4 py-3 text-left text-xs font-bold text-white uppercase border-r border-purple-500">Materi Kegiatan</th>
                <th class="px-4 py-3 text-center text-xs font-bold text-white uppercase border-r border-purple-500">Status Kehadiran</th>
                <th class="px-4 py-3 text-center text-xs font-bold text-white uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr 
                v-for="(kegiatan, index) in kegiatanList" 
                :key="kegiatan.id" 
                class="hover:bg-purple-50 transition border-b border-gray-200"
              >
                <td class="px-4 py-3 text-sm text-gray-700 border-r border-gray-300 font-medium">
                  {{ index + 1 }}
                </td>
                <td class="px-4 py-3 text-sm text-gray-900 border-r border-gray-300">
                  {{ formatDate(kegiatan.tanggal_kegiatan) }}
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">
                  {{ kegiatan.waktu_mulai.substring(0, 5) }} - {{ kegiatan.waktu_selesai.substring(0, 5) }}
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">
                  {{ kegiatan.materi_kegiatan }}
                </td>
                <td class="px-4 py-3 text-center border-r border-gray-300">
                  <div v-if="editingKegiatanId === kegiatan.id">
                    <select 
                      v-model="editingStatus" 
                      class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                    >
                      <option :value="true">Hadir</option>
                      <option :value="false">Tidak Hadir</option>
                    </select>
                  </div>
                  <span 
                    v-else
                    :class="[
                      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold',
                      kegiatan.is_hadir ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    ]"
                  >
                    <svg v-if="kegiatan.is_hadir" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                    {{ kegiatan.is_hadir ? 'Hadir' : 'Tidak Hadir' }}
                  </span>
                </td>
                <td class="px-4 py-3 text-center">
                  <div v-if="editingKegiatanId === kegiatan.id" class="flex items-center justify-center gap-2">
                    <button
                      @click="saveKehadiran(kegiatan.id)"
                      :disabled="isSaving"
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      <svg v-if="!isSaving" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <svg v-else class="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ isSaving ? 'Menyimpan...' : 'Simpan' }}
                    </button>
                    <button
                      @click="cancelEdit"
                      :disabled="isSaving"
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                  <button
                    v-else
                    @click="openEditModal(kegiatan)"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Kehadiran
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import type { EkstrakurikulerItem, PelatihItem } from '~/app/types/master-data'
import type { TahunPelajaran, KegiatanEkskul } from '~/app/types/absensi'

interface KegiatanWithStatus extends KegiatanEkskul {
  is_hadir: boolean
}

const router = useRouter()
const toast = useNuxtApp().$toast as any

definePageMeta({
  middleware: 'auth'
})

const userName = ref('Admin User')
const isLoading = ref(false)
const isDownloading = ref(false)
const isDownloadingPdf = ref(false)

const filter = ref({
  ekstrakurikuler_id: '',
  pelatih_id: '',
  tahun_pelajaran_id: ''
})

const currentMonth = ref(new Date().getMonth() + 1)
const currentYear = ref(new Date().getFullYear())

const ekstrakurikulerList = ref<EkstrakurikulerItem[]>([])
const pelatihList = ref<PelatihItem[]>([])
const tahunPelajaranList = ref<TahunPelajaran[]>([])
const kegiatanList = ref<KegiatanWithStatus[]>([])
const rekapData = ref<any>(null)
const absensiPelatihData = ref<any>(null)
const editingKegiatanId = ref<number | null>(null)
const editingStatus = ref<boolean>(false)
const isSaving = ref(false)

const currentMonthYear = computed(() => {
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]
  return `${monthNames[currentMonth.value - 1]} ${currentYear.value}`
})

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const previousMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
  loadRekapData()
}

const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
  loadRekapData()
}

const onEkskulChange = async () => {
  filter.value.pelatih_id = ''
  pelatihList.value = []
  kegiatanList.value = []
  rekapData.value = null
  
  if (filter.value.ekstrakurikuler_id) {
    await loadPelatihList()
  }
}

const onFilterChange = () => {
  if (filter.value.ekstrakurikuler_id && filter.value.pelatih_id && filter.value.tahun_pelajaran_id) {
    loadRekapData()
  }
}

const loadEkstrakurikulerList = async () => {
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    const response = await absensiService.getEkstrakurikulerActive()
    ekstrakurikulerList.value = response.data
  } catch (error: any) {
    console.error('Error loading ekstrakurikuler:', error)
    toast.error(error.data?.error || 'Gagal memuat data ekstrakurikuler')
  }
}

const loadPelatihList = async () => {
  if (!filter.value.ekstrakurikuler_id) return
  
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    const response = await absensiService.getPelatihForFilter(Number(filter.value.ekstrakurikuler_id))
    pelatihList.value = response.data
  } catch (error: any) {
    console.error('Error loading pelatih:', error)
    toast.error(error.data?.error || 'Gagal memuat data pelatih')
  }
}

const loadTahunPelajaranList = async () => {
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    const response = await absensiService.getTahunPelajaranAll()
    tahunPelajaranList.value = response.data
    
    // Set default to active tahun pelajaran
    const activeTahunPelajaran = response.data.find(tp => tp.status === 'active')
    if (activeTahunPelajaran) {
      filter.value.tahun_pelajaran_id = String(activeTahunPelajaran.id)
    }
  } catch (error: any) {
    console.error('Error loading tahun pelajaran:', error)
    toast.error(error.data?.error || 'Gagal memuat data tahun pelajaran')
  }
}

const loadRekapData = async () => {
  if (!filter.value.ekstrakurikuler_id || !filter.value.pelatih_id || !filter.value.tahun_pelajaran_id) {
    return
  }

  isLoading.value = true
  
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    
    // Call both APIs in parallel
    const [kegiatanResponse, absensiResponse] = await Promise.all([
      absensiService.getKegiatanEkskul(
        Number(filter.value.ekstrakurikuler_id),
        Number(filter.value.tahun_pelajaran_id),
        currentMonth.value,
        currentYear.value
      ),
      absensiService.getRekapAbsensiPelatih(
        Number(filter.value.pelatih_id),
        Number(filter.value.tahun_pelajaran_id),
        Number(filter.value.ekstrakurikuler_id),
        currentMonth.value,
        currentYear.value
      )
    ])
    
    rekapData.value = kegiatanResponse.data
    absensiPelatihData.value = absensiResponse.data
    
    // Create a map of kegiatan IDs where pelatih is hadir
    const hadirKegiatanIds = new Set(
      absensiResponse.data.kegiatan
        .filter((k: any) => k.is_hadir)
        .map((k: any) => k.id)
    )
    
    // Map kegiatan with status
    kegiatanList.value = kegiatanResponse.data.kegiatan.map((kegiatan: KegiatanEkskul) => ({
      ...kegiatan,
      is_hadir: hadirKegiatanIds.has(kegiatan.id)
    }))
  } catch (error: any) {
    console.error('Error loading rekap data:', error)
    toast.error(error.data?.error || 'Gagal memuat data rekap absensi')
    kegiatanList.value = []
    rekapData.value = null
    absensiPelatihData.value = null
  } finally {
    isLoading.value = false
  }
}

const openEditModal = (kegiatan: KegiatanWithStatus) => {
  editingKegiatanId.value = kegiatan.id
  editingStatus.value = kegiatan.is_hadir
}

const cancelEdit = () => {
  editingKegiatanId.value = null
  editingStatus.value = false
}

const saveKehadiran = async (kegiatanId: number) => {
  if (!filter.value.pelatih_id) return
  
  isSaving.value = true
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    
    await absensiService.updateAbsensiPelatih(
      kegiatanId,
      Number(filter.value.pelatih_id),
      editingStatus.value
    )
    
    toast.success('Status kehadiran berhasil diperbarui')
    
    // Update local data
    const kegiatan = kegiatanList.value.find(k => k.id === kegiatanId)
    if (kegiatan) {
      kegiatan.is_hadir = editingStatus.value
    }
    
    // Reset editing state
    editingKegiatanId.value = null
    editingStatus.value = false
  } catch (error: any) {
    console.error('Error updating kehadiran:', error)
    toast.error(error.data?.error || 'Gagal memperbarui status kehadiran')
  } finally {
    isSaving.value = false
  }
}

const downloadExcel = async () => {
  if (!filter.value.tahun_pelajaran_id || !filter.value.ekstrakurikuler_id) {
    toast.error('Pilih ekstrakurikuler dan tahun pelajaran terlebih dahulu')
    return
  }

  if (!filter.value.pelatih_id) {
    toast.error('Pilih pelatih terlebih dahulu')
    return
  }

  isDownloading.value = true
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    
    const blob = await absensiService.downloadExcelAbsensiPelatih(
      Number(filter.value.tahun_pelajaran_id),
      Number(filter.value.ekstrakurikuler_id),
      Number(filter.value.pelatih_id),
      currentMonth.value,
      currentYear.value
    )
    
    // Create download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    // Generate filename
    const ekskulName = ekstrakurikulerList.value.find(e => e.id === Number(filter.value.ekstrakurikuler_id))?.name || 'Ekskul'
    const pelatihName = pelatihList.value.find(p => p.id === Number(filter.value.pelatih_id))?.nama || 'Pelatih'
    const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][currentMonth.value - 1]
    link.download = `Absensi_Pelatih_${pelatihName}_${ekskulName}_${monthName}_${currentYear.value}.xlsx`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    toast.success('File excel berhasil diunduh')
  } catch (error: any) {
    console.error('Error downloading excel:', error)
    toast.error(error.data?.error || 'Gagal mengunduh file excel')
  } finally {
    isDownloading.value = false
  }
}

const downloadPdf = async () => {
  if (!filter.value.tahun_pelajaran_id || !filter.value.ekstrakurikuler_id) {
    toast.error('Pilih ekstrakurikuler dan tahun pelajaran terlebih dahulu')
    return
  }

  if (!filter.value.pelatih_id) {
    toast.error('Pilih pelatih terlebih dahulu')
    return
  }

  isDownloadingPdf.value = true
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    
    const blob = await absensiService.downloadPdfAbsensiPelatih(
      Number(filter.value.tahun_pelajaran_id),
      Number(filter.value.ekstrakurikuler_id),
      Number(filter.value.pelatih_id),
      currentMonth.value,
      currentYear.value
    )
    
    // Create download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    // Generate filename
    const ekskulName = ekstrakurikulerList.value.find(e => e.id === Number(filter.value.ekstrakurikuler_id))?.name || 'Ekskul'
    const pelatihName = pelatihList.value.find(p => p.id === Number(filter.value.pelatih_id))?.nama || 'Pelatih'
    const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][currentMonth.value - 1]
    link.download = `Absensi_Pelatih_${pelatihName}_${ekskulName}_${monthName}_${currentYear.value}.pdf`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    toast.success('File PDF berhasil diunduh')
  } catch (error: any) {
    console.error('Error downloading PDF:', error)
    toast.error(error.data?.error || 'Gagal mengunduh file PDF')
  } finally {
    isDownloadingPdf.value = false
  }
}

onMounted(async () => {
  const { useAuthService } = await import('~/app/services/authService')
  const authService = useAuthService()
  
  const authData = authService.getAuthData()
  if (authData && authData.user) {
    userName.value = authData.user.nama
  }

  await loadEkstrakurikulerList()
  await loadTahunPelajaranList()
})

useHead({
  title: 'Rekap Absensi Pelatih | SIEKSA',
  meta: [
    { name: 'description', content: 'Rekap Absensi Pelatih Ekstrakurikuler SIEKSA' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/title-sieksa.png' }
  ]
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
