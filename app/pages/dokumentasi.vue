<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-purple-50 font-jakarta">
    <Navbar :user-name="userName" />
    <main class="flex-1 container mx-auto px-4 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <button @click="router.push('/dashboard')" class="text-purple-600 hover:text-purple-800 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-3xl font-bold text-gray-800">Dokumentasi Kegiatan</h1>
        </div>
        <p class="text-gray-600">Kelola dokumentasi kegiatan ekstrakurikuler</p>
      </div>

      <!-- Filter Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <!-- Filter Ekstrakurikuler -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Ekstrakurikuler</label>
            <select 
              v-model="filter.ekstrakurikuler_id" 
              @change="onFilterChange" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            >
              <option value="">Pilih Ekstrakurikuler</option>
              <option v-for="ekskul in ekstrakurikulerList" :key="ekskul.id" :value="ekskul.id">
                {{ ekskul.name }}
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
        <div v-else-if="!filter.ekstrakurikuler_id || !filter.tahun_pelajaran_id" class="text-center py-8">
          <p class="text-gray-500">Pilih ekstrakurikuler dan tahun pelajaran untuk melihat dokumentasi kegiatan</p>
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
                <th class="px-4 py-3 text-left text-xs font-bold text-white uppercase border-r border-purple-500">Nama Pelatih</th>
                <th class="px-4 py-3 text-center text-xs font-bold text-white uppercase border-r border-purple-500">Foto</th>
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
                <td class="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">
                  <span v-if="kegiatan.pelatih_hadir && kegiatan.pelatih_hadir.length > 0">
                    {{ kegiatan.pelatih_hadir.join(', ') }}
                  </span>
                  <span v-else class="text-gray-400 italic">Belum ada pelatih</span>
                </td>
                <td class="px-4 py-3 border-r border-gray-300">
                  <div v-if="parseFotoKegiatan(kegiatan.foto_kegiatan).length > 0" class="flex items-center gap-2">
                    <button 
                      v-for="(foto, fotoIndex) in parseFotoKegiatan(kegiatan.foto_kegiatan).slice(0, 3)" 
                      :key="fotoIndex"
                      @click="viewFoto(foto)"
                      class="relative group"
                    >
                      <img 
                        :src="foto" 
                        alt="Foto kegiatan"
                        class="w-12 h-12 object-cover rounded border border-gray-300 hover:border-purple-500 transition cursor-pointer"
                      />
                      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded transition flex items-center justify-center">
                        <svg class="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </button>
                    <span v-if="parseFotoKegiatan(kegiatan.foto_kegiatan).length > 3" class="text-xs text-gray-500">
                      +{{ parseFotoKegiatan(kegiatan.foto_kegiatan).length - 3 }}
                    </span>
                  </div>
                  <span v-else class="text-gray-400 italic text-xs">Belum ada foto</span>
                </td>
                <td class="px-4 py-3 text-center">
                  <button
                    v-if="hasPermission('UPDATE_KEGIATAN_EKSTRAKURIKULER')"
                    @click="openEditModal(kegiatan)"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <span v-else class="text-gray-400 italic text-xs">Tidak ada akses</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal Edit Kegiatan -->
      <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="backdrop-filter: blur(8px); background-color: rgba(0, 0, 0, 0.5);" @click.self="closeEditModal">
          <transition
            enter-active-class="transition ease-out duration-300 transform"
            enter-from-class="opacity-0 scale-95 -translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition ease-in duration-200 transform"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-4"
          >
            <div v-if="showEditModal" class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden" style="max-height: 90vh;">
              <!-- Header -->
              <div class="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 px-6 py-4 flex-shrink-0 rounded-t-2xl z-10">
                <div class="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                <div class="relative flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-bold text-white">Edit Kegiatan</h3>
                      <p class="text-purple-100 text-xs">Perbarui dokumentasi kegiatan ekstrakurikuler</p>
                    </div>
                  </div>
                  <button @click="closeEditModal" class="text-white hover:bg-white/20 rounded-lg p-2 transition-all duration-200 hover:rotate-90">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Loading State -->
              <div v-if="isLoadingDetail" class="p-12 text-center flex-1 flex items-center justify-center">
                <div class="flex flex-col items-center gap-3">
                  <svg class="animate-spin h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p class="text-gray-600 font-medium text-sm">Memuat data kegiatan...</p>
                </div>
              </div>

              <!-- Content -->
              <div v-else class="overflow-y-auto flex-1 p-6 space-y-4">
                <!-- Tanggal Kegiatan -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Tanggal Kegiatan</label>
                  <input 
                    v-model="editForm.tanggal_kegiatan" 
                    type="date" 
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>

                <!-- Waktu Mulai & Selesai -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Waktu Mulai</label>
                    <input 
                      v-model="editForm.waktu_mulai" 
                      type="time" 
                      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Waktu Selesai</label>
                    <input 
                      v-model="editForm.waktu_selesai" 
                      type="time" 
                      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <!-- Materi Kegiatan -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Materi Kegiatan</label>
                  <textarea 
                    v-model="editForm.materi_kegiatan" 
                    rows="4" 
                    maxlength="1000"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                    placeholder="Masukkan materi kegiatan..."
                  ></textarea>
                  <p class="text-xs text-gray-500 mt-1 text-right">{{ editForm.materi_kegiatan.length }}/1000</p>
                </div>

                <!-- Foto Kegiatan Saat Ini -->
                <div v-if="editForm.foto_kegiatan.length > 0">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Foto Saat Ini</label>
                  <div class="grid grid-cols-3 gap-3">
                    <div v-for="(foto, index) in editForm.foto_kegiatan" :key="index" class="relative group">
                      <img :src="foto" alt="Foto kegiatan" class="w-full h-24 object-cover rounded-lg border border-gray-300" />
                      <button 
                        @click="removeFoto(foto)"
                        class="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button 
                        @click="viewFoto(foto)"
                        class="absolute bottom-1 right-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Upload Foto Baru -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Upload Foto Baru</label>
                  <input 
                    type="file" 
                    @change="handleFileSelect"
                    accept="image/*"
                    multiple
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-sm"
                  />
                  <p class="text-xs text-gray-500 mt-1">Maksimal 5 foto total, masing-masing maksimal 2MB</p>
                </div>

                <!-- Preview Foto Baru -->
                <div v-if="editForm.new_foto.length > 0">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Foto Baru ({{ editForm.new_foto.length }})</label>
                  <div class="grid grid-cols-3 gap-3">
                    <div v-for="(file, index) in editForm.new_foto" :key="index" class="relative group">
                      <img 
                        :src="editForm.new_foto_previews[index]" 
                        alt="Preview foto baru"
                        class="w-full h-24 object-cover rounded-lg border border-gray-300"
                      />
                      <button 
                        @click="removeNewFoto(index)"
                        class="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="flex gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200 flex-shrink-0">
                <button 
                  @click="saveKegiatan"
                  :disabled="isSaving"
                  class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <svg v-if="!isSaving" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg v-else class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
                </button>
                <button 
                  @click="closeEditModal"
                  :disabled="isSaving"
                  class="px-4 py-2.5 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import type { EkstrakurikulerItem } from '~/app/types/master-data'
import type { TahunPelajaran, KegiatanEkskul } from '~/app/types/absensi'

const router = useRouter()
const toast = useNuxtApp().$toast as any

definePageMeta({
  middleware: 'auth'
})

const userName = ref('Admin User')
const isLoading = ref(false)
const userPermissions = ref<string[]>([])

const filter = ref({
  ekstrakurikuler_id: '',
  tahun_pelajaran_id: ''
})

const currentMonth = ref(new Date().getMonth() + 1)
const currentYear = ref(new Date().getFullYear())

const ekstrakurikulerList = ref<EkstrakurikulerItem[]>([])
const tahunPelajaranList = ref<TahunPelajaran[]>([])
const kegiatanList = ref<KegiatanEkskul[]>([])
const rekapData = ref<any>(null)
const showEditModal = ref(false)
const isLoadingDetail = ref(false)
const isSaving = ref(false)
const editForm = ref({
  id: 0,
  tanggal_kegiatan: '',
  waktu_mulai: '',
  waktu_selesai: '',
  materi_kegiatan: '',
  foto_kegiatan: [] as string[],
  new_foto: [] as File[],
  new_foto_previews: [] as string[],
  foto_to_delete: [] as string[]
})

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
  loadKegiatanData()
}

const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
  loadKegiatanData()
}

const onFilterChange = () => {
  if (filter.value.ekstrakurikuler_id && filter.value.tahun_pelajaran_id) {
    loadKegiatanData()
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

const loadKegiatanData = async () => {
  if (!filter.value.ekstrakurikuler_id || !filter.value.tahun_pelajaran_id) {
    return
  }

  isLoading.value = true
  
  try {
    const { useDokumentasiService } = await import('~/app/services/dokumentasiService')
    const dokumentasiService = useDokumentasiService()
    
    const response = await dokumentasiService.getKegiatanEkskul(
      Number(filter.value.ekstrakurikuler_id),
      Number(filter.value.tahun_pelajaran_id),
      currentMonth.value,
      currentYear.value
    )
    
    rekapData.value = response.data
    kegiatanList.value = response.data.kegiatan
  } catch (error: any) {
    console.error('Error loading kegiatan data:', error)
    toast.error(error.data?.error || 'Gagal memuat data kegiatan')
    kegiatanList.value = []
    rekapData.value = null
  } finally {
    isLoading.value = false
  }
}

const parseFotoKegiatan = (fotoString: string | null): string[] => {
  if (!fotoString) return []
  try {
    return JSON.parse(fotoString)
  } catch {
    return []
  }
}

const viewFoto = (fotoUrl: string) => {
  window.open(fotoUrl, '_blank')
}

const hasPermission = (permission: string): boolean => {
  return userPermissions.value.includes(permission)
}

const openEditModal = async (kegiatan: KegiatanEkskul) => {
  showEditModal.value = true
  isLoadingDetail.value = true
  editForm.value = {
    id: kegiatan.id,
    tanggal_kegiatan: '',
    waktu_mulai: '',
    waktu_selesai: '',
    materi_kegiatan: '',
    foto_kegiatan: [],
    new_foto: [],
    new_foto_previews: [],
    foto_to_delete: []
  }
  
  try {
    const { useDokumentasiService } = await import('~/app/services/dokumentasiService')
    const dokumentasiService = useDokumentasiService()
    const response = await dokumentasiService.getKegiatanById(kegiatan.id)
    
    const data = response.data
    editForm.value = {
      id: data.id,
      tanggal_kegiatan: data.tanggal_kegiatan,
      waktu_mulai: data.waktu_mulai.substring(0, 5),
      waktu_selesai: data.waktu_selesai.substring(0, 5),
      materi_kegiatan: data.materi_kegiatan,
      foto_kegiatan: data.foto_kegiatan || [],
      new_foto: [],
      new_foto_previews: [],
      foto_to_delete: []
    }
  } catch (error: any) {
    console.error('Error loading kegiatan detail:', error)
    toast.error(error.data?.error || 'Gagal memuat detail kegiatan')
    showEditModal.value = false
  } finally {
    isLoadingDetail.value = false
  }
}

const closeEditModal = () => {
  showEditModal.value = false
  
  // Revoke preview URLs to free memory
  editForm.value.new_foto_previews.forEach(url => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url)
    }
  })
  
  editForm.value = {
    id: 0,
    tanggal_kegiatan: '',
    waktu_mulai: '',
    waktu_selesai: '',
    materi_kegiatan: '',
    foto_kegiatan: [],
    new_foto: [],
    new_foto_previews: [],
    foto_to_delete: []
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  
  if (!files) return
  
  const newFiles = Array.from(files)
  
  // Validasi jumlah total foto (existing + new)
  const totalFoto = editForm.value.foto_kegiatan.length + editForm.value.new_foto.length + newFiles.length
  if (totalFoto > 5) {
    toast.error(`Maksimal 5 foto. Saat ini ada ${editForm.value.foto_kegiatan.length + editForm.value.new_foto.length} foto.`)
    target.value = ''
    return
  }
  
  // Validasi size masing-masing file (max 2MB)
  const maxSize = 2 * 1024 * 1024 // 2MB in bytes
  for (const file of newFiles) {
    if (file.size > maxSize) {
      toast.error(`File ${file.name} terlalu besar. Maksimal 2MB per foto.`)
      target.value = ''
      return
    }
  }
  
  // Add files dan create preview
  newFiles.forEach((file) => {
    editForm.value.new_foto.push(file)
    
    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        editForm.value.new_foto_previews.push(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  })
  
  target.value = ''
}

const removeFoto = (fotoUrl: string) => {
  editForm.value.foto_to_delete.push(fotoUrl)
  editForm.value.foto_kegiatan = editForm.value.foto_kegiatan.filter(url => url !== fotoUrl)
}

const removeNewFoto = (index: number) => {
  editForm.value.new_foto.splice(index, 1)
  editForm.value.new_foto_previews.splice(index, 1)
}

const saveKegiatan = async () => {
  if (!editForm.value.tanggal_kegiatan || !editForm.value.waktu_mulai || !editForm.value.waktu_selesai || !editForm.value.materi_kegiatan) {
    toast.error('Semua field harus diisi')
    return
  }
  
  isSaving.value = true
  try {
    const { useDokumentasiService } = await import('~/app/services/dokumentasiService')
    const dokumentasiService = useDokumentasiService()
    
    const formData = new FormData()
    formData.append('id', String(editForm.value.id))
    formData.append('tanggal_kegiatan', editForm.value.tanggal_kegiatan)
    formData.append('waktu_mulai', editForm.value.waktu_mulai + ':00')
    formData.append('waktu_selesai', editForm.value.waktu_selesai + ':00')
    formData.append('materi_kegiatan', editForm.value.materi_kegiatan)
    
    // Add new photos
    editForm.value.new_foto.forEach((file) => {
      formData.append('foto', file)
    })
    
    // Add photos to delete
    editForm.value.foto_to_delete.forEach((url) => {
      formData.append('foto_to_delete', url)
    })
    
    await dokumentasiService.updateKegiatan(formData)
    
    toast.success('Kegiatan berhasil diperbarui')
    closeEditModal()
    
    // Reload data
    await loadKegiatanData()
  } catch (error: any) {
    console.error('Error updating kegiatan:', error)
    toast.error(error.data?.error || 'Gagal memperbarui kegiatan')
  } finally {
    isSaving.value = false
  }
}

onMounted(async () => {
  const { useAuthService } = await import('~/app/services/authService')
  const authService = useAuthService()
  
  const authData = authService.getAuthData()
  if (authData && authData.user) {
    userName.value = authData.user.nama
    userPermissions.value = authData.permissions || []
  }

  await loadEkstrakurikulerList()
  await loadTahunPelajaranList()
})

useHead({
  title: 'Dokumentasi Kegiatan | SIEKSA',
  meta: [
    { name: 'description', content: 'Dokumentasi Kegiatan Ekstrakurikuler SIEKSA' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/title-sieksa.png' }
  ]
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
