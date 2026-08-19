<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 font-jakarta">
    <Navbar :user-name="userName" />
    <main class="flex-1 container mx-auto px-4 lg:px-8 py-8">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <button @click="router.push('/absensi')" class="text-blue-600 hover:text-blue-800 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-3xl font-bold text-gray-800">Buat Absensi</h1>
        </div>
        <p class="text-gray-600">Catat kehadiran siswa dan pelatih pada kegiatan ekstrakurikuler</p>
      </div>
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <form @submit.prevent="handleSubmit">
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Ekstrakurikuler <span class="text-red-500">*</span></label>
            <select v-model="form.ekstrakurikuler_id" @change="onEkstrakurikulerChange" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" required>
              <option value="">Pilih Ekstrakurikuler</option>
              <option v-for="ekskul in ekstrakurikulerList" :key="ekskul.id" :value="ekskul.id">{{ ekskul.name }}</option>
            </select>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tahun Pelajaran <span class="text-red-500">*</span></label>
            <select v-model="form.tahun_pelajaran_id" @change="onTahunPelajaranChange" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" required>
              <option value="">Pilih Tahun Pelajaran</option>
              <option v-for="tp in tahunPelajaranList" :key="tp.id" :value="tp.id">{{ tp.tahun_pelajaran }}</option>
            </select>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tanggal Kegiatan <span class="text-red-500">*</span></label>
            <input v-model="form.tanggal_kegiatan" type="date" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" required />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Waktu Mulai <span class="text-red-500">*</span></label>
              <input v-model="form.waktu_mulai" type="time" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" required />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Waktu Selesai <span class="text-red-500">*</span></label>
              <input v-model="form.waktu_selesai" type="time" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" required />
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Materi Kegiatan <span class="text-red-500">*</span></label>
            <textarea v-model="form.materi_kegiatan" rows="3" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none" placeholder="Masukkan materi kegiatan..." required></textarea>
          </div>
          <div class="mb-6" v-if="pelatihList.length > 0">
            <label class="block text-sm font-semibold text-gray-700 mb-3">Pelatih Hadir <span class="text-red-500">*</span></label>
            <div class="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-4">
              <label v-for="pelatih in pelatihList" :key="pelatih.id" class="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                <input type="checkbox" :value="pelatih.id" v-model="selectedPelatih" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span class="text-sm text-gray-700">{{ pelatih.nama }}</span>
              </label>
            </div>
          </div>
          <div v-if="siswaList.length > 0" class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Daftar Hadir Siswa</h3>
            <div class="overflow-x-auto border border-gray-200 rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">No</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Nama Siswa</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">NIS</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Rombel</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Keterangan</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(siswa, index) in siswaList" :key="siswa.peserta_didik_rombel_id" class="hover:bg-gray-50 transition">
                    <td class="px-4 py-3 text-sm text-gray-700">{{ index + 1 }}</td>
                    <td class="px-4 py-3 text-sm text-gray-900 font-medium">{{ siswa.nama }}</td>
                    <td class="px-4 py-3 text-sm text-gray-700">{{ siswa.nis }}</td>
                    <td class="px-4 py-3 text-sm text-gray-700">{{ siswa.nama_rombel }}</td>
                    <td class="px-4 py-3">
                      <select v-model="siswaAbsensi[siswa.peserta_didik_rombel_id].status" class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="hadir">Hadir</option>
                        <option value="izin">Izin</option>
                        <option value="sakit">Sakit</option>
                        <option value="alpa">Alpa</option>
                      </select>
                    </td>
                    <td class="px-4 py-3">
                      <input v-model="siswaAbsensi[siswa.peserta_didik_rombel_id].keterangan" type="text" class="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Keterangan (opsional)" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex justify-end gap-3">
            <button type="button" @click="router.push('/absensi')" class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">Batal</button>
            <button 
              v-if="hasPermission('CREATE_ABSENSI_EKSTRAKURIKULER')"
              type="submit" 
              :disabled="isSubmitting || siswaList.length === 0" 
              class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg v-if="isSubmitting" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSubmitting ? 'Menyimpan...' : 'Simpan Absensi' }}
            </button>
          </div>
        </form>
      </div>
    </main>
    <Footer />
  </div>
</template>


<script setup lang="ts">
import type { TahunPelajaran, SiswaEkskul, AbsensiSiswaForm, CreateAbsensiPayload } from '~/app/types/absensi'
import type { EkstrakurikulerItem, PelatihItem } from '~/app/types/master-data'

const router = useRouter()
const toast = useNuxtApp().$toast as any

definePageMeta({
  middleware: 'auth'
})

const userName = ref('Admin User')
const isSubmitting = ref(false)
const userPermissions = ref<string[]>([])
const form = ref({
  ekstrakurikuler_id: '',
  tahun_pelajaran_id: '',
  tanggal_kegiatan: new Date().toISOString().split('T')[0],
  waktu_mulai: '',
  waktu_selesai: '',
  materi_kegiatan: ''
})
const ekstrakurikulerList = ref<EkstrakurikulerItem[]>([])
const tahunPelajaranList = ref<TahunPelajaran[]>([])
const pelatihList = ref<PelatihItem[]>([])
const siswaList = ref<SiswaEkskul[]>([])
const selectedPelatih = ref<number[]>([])
const siswaAbsensi = ref<Record<number, { status: string; keterangan: string }>>({})

onMounted(async () => {
  await loadUserData()
  await loadEkstrakurikuler()
  await loadTahunPelajaran()
})

async function loadUserData() {
  const { useAuthService } = await import('~/app/services/authService')
  const authService = useAuthService()
  const authData = authService.getAuthData()
  if (authData && authData.user) {
    userName.value = authData.user.nama
    userPermissions.value = authData.permissions || []
  }
}

const hasPermission = (permission: string): boolean => {
  return userPermissions.value.includes(permission)
}

async function loadEkstrakurikuler() {
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    const response = await absensiService.getEkstrakurikulerActive()
    ekstrakurikulerList.value = response.data
  } catch (error: any) {
    toast.error(error.data?.error || 'Gagal memuat data ekstrakurikuler')
  }
}

async function loadTahunPelajaran() {
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    const response = await absensiService.getTahunPelajaranActive()
    tahunPelajaranList.value = response.data
  } catch (error: any) {
    toast.error(error.data?.error || 'Gagal memuat data tahun pelajaran')
  }
}

async function onEkstrakurikulerChange() {
  if (!form.value.ekstrakurikuler_id) {
    pelatihList.value = []
    siswaList.value = []
    return
  }
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    const response = await absensiService.getPelatihByEkskul(Number(form.value.ekstrakurikuler_id))
    pelatihList.value = response.data
  } catch (error: any) {
    toast.error(error.data?.error || 'Gagal memuat data pelatih')
  }
  if (form.value.tahun_pelajaran_id) {
    await loadSiswa()
  }
}

async function onTahunPelajaranChange() {
  if (form.value.ekstrakurikuler_id && form.value.tahun_pelajaran_id) {
    await loadSiswa()
  }
}

async function loadSiswa() {
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    const response = await absensiService.getSiswaByEkskul(Number(form.value.ekstrakurikuler_id), Number(form.value.tahun_pelajaran_id))
    if (response.data.ekstrakurikuler.length > 0) {
      siswaList.value = response.data.ekstrakurikuler[0].siswa
      siswaAbsensi.value = {}
      siswaList.value.forEach(siswa => {
        siswaAbsensi.value[siswa.peserta_didik_rombel_id] = { status: 'hadir', keterangan: '' }
      })
    } else {
      siswaList.value = []
      siswaAbsensi.value = {}
    }
  } catch (error: any) {
    toast.error(error.data?.error || 'Gagal memuat data siswa')
    siswaList.value = []
    siswaAbsensi.value = {}
  }
}

async function handleSubmit() {
  if (selectedPelatih.value.length === 0) {
    toast.error('Pilih minimal 1 pelatih yang hadir')
    return
  }
  if (siswaList.value.length === 0) {
    toast.error('Tidak ada data siswa')
    return
  }
  isSubmitting.value = true
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    const absensiSiswaData: AbsensiSiswaForm[] = siswaList.value.map(siswa => ({
      peserta_didik_rombel_id: siswa.peserta_didik_rombel_id,
      status: siswaAbsensi.value[siswa.peserta_didik_rombel_id].status as any,
      keterangan: siswaAbsensi.value[siswa.peserta_didik_rombel_id].keterangan || null
    }))
    const absensiPelatihData = selectedPelatih.value.map(id => ({ pelatih_id: id }))
    const payload: CreateAbsensiPayload = {
      ekstrakurikuler_id: Number(form.value.ekstrakurikuler_id),
      tahun_pelajaran_id: Number(form.value.tahun_pelajaran_id),
      tanggal_kegiatan: new Date(form.value.tanggal_kegiatan).toISOString(),
      waktu_mulai: form.value.waktu_mulai + ':00',
      waktu_selesai: form.value.waktu_selesai + ':00',
      materi_kegiatan: form.value.materi_kegiatan,
      absensi_siswa: absensiSiswaData,
      absensi_pelatih: absensiPelatihData
    }
    const response = await absensiService.createAbsensi(payload)
    toast.success(response.message || 'Absensi berhasil disimpan')
    router.push('/absensi')
  } catch (error: any) {
    console.error('Error creating absensi:', error)
    toast.error(error.data?.error || 'Gagal menyimpan absensi')
  } finally {
    isSubmitting.value = false
  }
}

useHead({
  title: 'Buat Absensi | SIEKSA',
  meta: [{ name: 'description', content: 'Buat Absensi Ekstrakurikuler SIEKSA' }],
  link: [{ rel: 'icon', type: 'image/png', href: '/title-sieksa.png' }]
})
</script>
