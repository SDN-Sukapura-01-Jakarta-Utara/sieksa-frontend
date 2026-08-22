<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-purple-50 font-jakarta">
    <Navbar :user-name="userName" />
    <main class="flex-1 container mx-auto px-4 lg:px-8 py-8">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <button @click="router.push('/absensi')" class="text-purple-600 hover:text-purple-800 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-3xl font-bold text-gray-800">Rekap Absensi Siswa</h1>
        </div>
        <p class="text-gray-600">Lihat laporan dan statistik kehadiran siswa ekstrakurikuler</p>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Ekstrakurikuler</label>
            <select v-model="filter.ekstrakurikuler_id" @change="onFilterChange" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
              <option value="">Semua Ekstrakurikuler</option>
              <option v-for="ekskul in ekstrakurikulerList" :key="ekskul.id" :value="ekskul.id">{{ ekskul.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tahun Pelajaran</label>
            <select v-model="filter.tahun_pelajaran_id" @change="onFilterChange" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
              <option value="">Pilih Tahun Pelajaran</option>
              <option v-for="tp in tahunPelajaranList" :key="tp.id" :value="tp.id">{{ tp.tahun_pelajaran }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Siswa</label>
            <input v-model="filter.nama" @input="onFilterChange" type="text" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" placeholder="Cari nama siswa..." />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Rombel</label>
            <select v-model="filter.rombel_id" @change="onFilterChange" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
              <option value="">Semua Rombel</option>
              <option v-for="rombel in rombelList" :key="rombel.id" :value="rombel.id">{{ rombel.name }}</option>
            </select>
          </div>
          <!-- Desktop: Excel Button -->
          <div v-if="filter.ekstrakurikuler_id && filter.tahun_pelajaran_id && !isLoading" class="hidden lg:block">
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
          <!-- Desktop: PDF Button -->
          <div v-if="filter.ekstrakurikuler_id && filter.tahun_pelajaran_id && !isLoading" class="hidden lg:block">
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
          <div v-if="filter.ekstrakurikuler_id && filter.tahun_pelajaran_id && !isLoading" class="md:col-span-2 lg:hidden">
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

        <div class="flex items-center justify-between mb-4">
          <button @click="previousMonth" class="p-2 hover:bg-gray-100 rounded-lg transition">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 class="text-xl font-bold text-gray-800">{{ currentMonthYear }}</h2>
          <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded-lg transition">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div v-if="isLoading" class="text-center py-8">
          <svg class="animate-spin h-8 w-8 mx-auto text-purple-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600 mt-2">Memuat data...</p>
        </div>

        <div v-else-if="!filter.ekstrakurikuler_id || !filter.tahun_pelajaran_id" class="text-center py-8">
          <p class="text-gray-500">Pilih ekstrakurikuler dan tahun pelajaran untuk melihat rekap absensi</p>
        </div>

        <div v-else-if="siswaAbsensiList.length === 0" class="text-center py-8">
          <p class="text-gray-500">Tidak ada data absensi</p>
        </div>

        <div v-else class="overflow-x-auto border border-gray-300 rounded-lg">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gradient-to-r from-purple-600 to-purple-700">
                <th rowspan="2" class="px-4 py-3 text-left text-xs font-bold text-white uppercase border-r border-purple-500 sticky left-0 bg-purple-600 z-20">No</th>
                <th rowspan="2" class="px-4 py-3 text-left text-xs font-bold text-white uppercase border-r border-purple-500 sticky left-12 bg-purple-600 z-20">Nama</th>
                <th rowspan="2" class="px-4 py-3 text-left text-xs font-bold text-white uppercase border-r border-purple-500 bg-purple-600">NIS</th>
                <th rowspan="2" class="px-4 py-3 text-left text-xs font-bold text-white uppercase border-r border-purple-500 bg-purple-600">Rombel</th>
                <th v-for="pertemuan in pertemuanList" :key="`p-${pertemuan.pertemuan}`" class="px-3 border-r border-purple-400 min-w-[70px] bg-purple-600 border-b border-purple-400">
                  <div class="py-2 text-xs font-bold text-white">P{{ pertemuan.pertemuan }}</div>
                </th>
              </tr>
              <tr class="bg-gradient-to-r from-purple-500 to-purple-600">
                <th v-for="pertemuan in pertemuanList" :key="`t-${pertemuan.pertemuan}`" class="px-3 py-2 text-center text-xs font-semibold text-purple-100 border-r border-purple-400 min-w-[70px]">
                  {{ pertemuan.tanggal ? pertemuan.tanggal : '-' }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(siswa, index) in siswaAbsensiList" :key="siswa.peserta_didik_rombel_id" class="hover:bg-purple-50 transition border-b border-gray-200">
                <td class="px-4 py-3 text-sm text-gray-700 border-r border-gray-300 sticky left-0 bg-white font-medium">{{ index + 1 }}</td>
                <td class="px-4 py-3 text-sm text-gray-900 font-semibold border-r border-gray-300 sticky left-12 bg-white">{{ siswa.nama }}</td>
                <td class="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">{{ siswa.nis }}</td>
                <td class="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">{{ siswa.nama_rombel }}</td>
                <td v-for="pertemuan in pertemuanList" :key="`absen-${pertemuan.pertemuan}`" :class="[
                  'text-center border-r border-gray-300 min-w-[70px]',
                  getAbsensiStatus(siswa.peserta_didik_rombel_id, pertemuan.tanggalKegiatan) ? 'cursor-pointer hover:opacity-80 transition' : '',
                  getAbsensiStatus(siswa.peserta_didik_rombel_id, pertemuan.tanggalKegiatan) === 'hadir' ? 'bg-green-100' :
                  getAbsensiStatus(siswa.peserta_didik_rombel_id, pertemuan.tanggalKegiatan) === 'sakit' ? 'bg-yellow-100' :
                  getAbsensiStatus(siswa.peserta_didik_rombel_id, pertemuan.tanggalKegiatan) === 'izin' ? 'bg-blue-100' :
                  getAbsensiStatus(siswa.peserta_didik_rombel_id, pertemuan.tanggalKegiatan) === 'alpa' ? 'bg-red-100' : 'bg-white'
                ]" @click="getAbsensiStatus(siswa.peserta_didik_rombel_id, pertemuan.tanggalKegiatan) ? openDetailAbsensi(siswa.peserta_didik_rombel_id, pertemuan.tanggalKegiatan) : null">
                  <div v-if="getAbsensiStatus(siswa.peserta_didik_rombel_id, pertemuan.tanggalKegiatan) === 'hadir'" class="flex items-center justify-center py-2">
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div v-else-if="getAbsensiStatus(siswa.peserta_didik_rombel_id, pertemuan.tanggalKegiatan) === 'sakit'" class="text-yellow-700 font-bold text-sm py-2">S</div>
                  <div v-else-if="getAbsensiStatus(siswa.peserta_didik_rombel_id, pertemuan.tanggalKegiatan) === 'izin'" class="text-blue-700 font-bold text-sm py-2">I</div>
                  <div v-else-if="getAbsensiStatus(siswa.peserta_didik_rombel_id, pertemuan.tanggalKegiatan) === 'alpa'" class="text-red-700 font-bold text-sm py-2">A</div>
                  <div v-else class="text-gray-300 text-sm py-2">-</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal Detail Absensi -->
      <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showDetailModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="backdrop-filter: blur(8px); background-color: rgba(0, 0, 0, 0.5);" @click.self="closeDetailModal">
          <transition
            enter-active-class="transition ease-out duration-300 transform"
            enter-from-class="opacity-0 scale-95 -translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition ease-in duration-200 transform"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-4"
          >
            <div v-if="showDetailModal" class="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden" style="height: 95vh; max-height: 95vh;">
                <!-- Header -->
                <div class="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 px-6 py-4 flex-shrink-0 rounded-t-2xl">
                  <div class="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                  <div class="relative flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 class="text-lg font-bold text-white">Detail Absensi</h3>
                        <p class="text-purple-100 text-xs">Informasi kehadiran siswa</p>
                      </div>
                    </div>
                    <button @click="closeDetailModal" class="text-white hover:bg-white/20 rounded-lg p-2 transition-all duration-200 hover:rotate-90">
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
                    <p class="text-gray-600 font-medium text-sm">Memuat detail absensi...</p>
                  </div>
                </div>

                <!-- Content -->
                <div v-else-if="detailAbsensi" class="overflow-y-auto flex-1 p-6 custom-scrollbar">
                  <div class="space-y-6">
                    <!-- Informasi Kegiatan -->
                    <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-200 shadow-sm">
                      <div class="flex items-center gap-2 mb-4">
                        <div class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <h4 class="text-sm font-bold text-gray-800">Informasi Kegiatan</h4>
                      </div>
                      <div class="space-y-3">
                        <div class="bg-white rounded-lg p-3 shadow-sm">
                          <div class="flex items-center gap-2 mb-2">
                            <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                            <label class="text-xs text-purple-600 font-bold uppercase">Ekstrakurikuler</label>
                          </div>
                          <p class="text-gray-900 font-bold text-sm">{{ detailAbsensi.nama_ekstrakurikuler }}</p>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                          <div class="bg-white rounded-lg p-3 shadow-sm">
                            <div class="flex items-center gap-2 mb-2">
                              <svg class="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                              </svg>
                              <label class="text-xs text-indigo-600 font-bold uppercase">Tahun Pelajaran</label>
                            </div>
                            <p class="text-gray-900 font-semibold text-xs">{{ detailAbsensi.tahun_pelajaran }}</p>
                          </div>
                          <div class="bg-white rounded-lg p-3 shadow-sm">
                            <div class="flex items-center gap-2 mb-2">
                              <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                              </svg>
                              <label class="text-xs text-blue-600 font-bold uppercase">Tanggal</label>
                            </div>
                            <p class="text-gray-900 font-semibold text-xs">{{ new Date(detailAbsensi.tanggal_kegiatan).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }}</p>
                          </div>
                        </div>
                        <div class="bg-white rounded-lg p-3 shadow-sm">
                          <div class="flex items-center gap-2 mb-2">
                            <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                            </svg>
                            <label class="text-xs text-green-600 font-bold uppercase">Waktu Kegiatan</label>
                          </div>
                          <p class="text-gray-900 font-semibold text-xs">{{ detailAbsensi.waktu_mulai.substring(0, 5) }} - {{ detailAbsensi.waktu_selesai.substring(0, 5) }} WIB</p>
                        </div>
                        <div class="bg-white rounded-lg p-3 shadow-sm">
                          <div class="flex items-center gap-2 mb-2">
                            <svg class="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                            </svg>
                            <label class="text-xs text-yellow-600 font-bold uppercase">Materi Kegiatan</label>
                          </div>
                          <p class="text-gray-900 text-xs leading-relaxed">{{ detailAbsensi.materi_kegiatan }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Data Siswa & Status -->
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200 shadow-sm">
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                          </div>
                          <h4 class="text-sm font-bold text-gray-800">Data Siswa & Status</h4>
                        </div>
                        <button v-if="!isEditMode" @click="enableEditMode" class="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-xs font-semibold rounded-lg transition-colors">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Kehadiran
                        </button>
                      </div>
                      
                      <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-3">
                          <div class="bg-white rounded-lg p-3 shadow-sm">
                            <div class="flex items-center gap-1.5 mb-2">
                              <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                              </svg>
                              <label class="text-xs text-gray-600 font-bold uppercase">Nama</label>
                            </div>
                            <p class="text-gray-900 font-bold text-xs leading-tight">{{ detailAbsensi.nama_siswa }}</p>
                          </div>
                          <div class="bg-white rounded-lg p-3 shadow-sm">
                            <div class="flex items-center gap-1.5 mb-2">
                              <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                              </svg>
                              <label class="text-xs text-gray-600 font-bold uppercase">NISN</label>
                            </div>
                            <p class="text-gray-900 font-semibold text-xs">{{ detailAbsensi.nisn }}</p>
                          </div>
                          <div class="bg-white rounded-lg p-3 shadow-sm">
                            <div class="flex items-center gap-1.5 mb-2">
                              <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                              </svg>
                              <label class="text-xs text-gray-600 font-bold uppercase">Rombel</label>
                            </div>
                            <p class="text-gray-900 font-semibold text-xs">{{ detailAbsensi.nama_rombel }}</p>
                          </div>
                        </div>

                        <!-- Status Kehadiran -->
                        <div class="bg-white rounded-lg p-3 shadow-sm">
                          <div class="flex items-center gap-1.5 mb-3">
                            <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                            </svg>
                            <label class="text-xs text-gray-600 font-bold uppercase">Status Kehadiran</label>
                          </div>
                          <div v-if="!isEditMode">
                            <span :class="[
                              'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold shadow-md',
                              detailAbsensi.status === 'hadir' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                              detailAbsensi.status === 'sakit' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white' :
                              detailAbsensi.status === 'izin' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
                              'bg-gradient-to-r from-red-500 to-red-600 text-white'
                            ]">
                              <svg v-if="detailAbsensi.status === 'hadir'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                              </svg>
                              <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                              </svg>
                              {{ detailAbsensi.status.charAt(0).toUpperCase() + detailAbsensi.status.slice(1) }}
                            </span>
                          </div>
                          <div v-else>
                            <select v-model="editForm.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                              <option value="hadir">Hadir</option>
                              <option value="sakit">Sakit</option>
                              <option value="izin">Izin</option>
                              <option value="alpa">Alpa</option>
                            </select>
                          </div>
                        </div>

                        <!-- Keterangan -->
                        <div class="bg-white rounded-lg p-3 shadow-sm">
                          <div class="flex items-center gap-1.5 mb-3">
                            <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                            </svg>
                            <label class="text-xs text-gray-600 font-bold uppercase">Keterangan</label>
                          </div>
                          <div v-if="!isEditMode">
                            <p v-if="detailAbsensi.keterangan" class="text-gray-900 text-xs leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">{{ detailAbsensi.keterangan }}</p>
                            <p v-else class="text-gray-400 text-xs italic">Tidak ada keterangan</p>
                          </div>
                          <div v-else>
                            <textarea v-model="editForm.keterangan" rows="3" maxlength="1000" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none" placeholder="Masukkan keterangan (opsional)"></textarea>
                            <p class="text-xs text-gray-500 mt-1 text-right">{{ editForm.keterangan.length }}/1000</p>
                          </div>
                        </div>

                        <!-- Button Actions -->
                        <div v-if="isEditMode" class="flex gap-2 pt-2">
                          <button @click="saveAbsensi" :disabled="isSaving" class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-lg transition-colors">
                            <svg v-if="!isSaving" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <svg v-else class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
                          </button>
                          <button @click="cancelEdit" :disabled="isSaving" class="px-4 py-2.5 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors">
                            Batal
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
import type { TahunPelajaran, Rombel, SiswaEkskul } from '~/app/types/absensi'

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
  tahun_pelajaran_id: '',
  nama: '',
  rombel_id: ''
})

const currentMonth = ref(new Date().getMonth() + 1)
const currentYear = ref(new Date().getFullYear())

const ekstrakurikulerList = ref<EkstrakurikulerItem[]>([])
const tahunPelajaranList = ref<TahunPelajaran[]>([])
const rombelList = ref<Rombel[]>([])
const siswaAbsensiList = ref<SiswaEkskul[]>([])
const absensiData = ref<any>(null)
const showDetailModal = ref(false)
const detailAbsensi = ref<any>(null)
const isLoadingDetail = ref(false)
const isEditMode = ref(false)
const editForm = ref({
  status: '',
  keterangan: ''
})
const isSaving = ref(false)

const currentMonthYear = computed(() => {
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  return `${monthNames[currentMonth.value - 1]} ${currentYear.value}`
})

// Menghitung pertemuan berdasarkan tanggal kegiatan yang ada
const pertemuanList = computed(() => {
  if (!absensiData.value || !absensiData.value.kegiatan) {
    return Array.from({ length: 5 }, (_, i) => ({ pertemuan: i + 1, tanggal: null, tanggalKegiatan: null }))
  }
  
  // Ambil semua tanggal kegiatan dan sort berdasarkan tanggal
  const sortedKegiatan = [...absensiData.value.kegiatan].sort((a, b) => {
    return new Date(a.tanggal_kegiatan).getTime() - new Date(b.tanggal_kegiatan).getTime()
  })
  
  // Buat array pertemuan dengan maksimal yang ada atau minimal 5
  const maxPertemuan = Math.max(5, sortedKegiatan.length)
  const pertemuanData = Array.from({ length: maxPertemuan }, (_, i) => {
    const kegiatan = sortedKegiatan[i]
    if (kegiatan) {
      const date = new Date(kegiatan.tanggal_kegiatan)
      return {
        pertemuan: i + 1,
        tanggal: date.getDate(),
        tanggalKegiatan: kegiatan.tanggal_kegiatan
      }
    }
    return {
      pertemuan: i + 1,
      tanggal: null,
      tanggalKegiatan: null
    }
  })
  
  return pertemuanData
})

onMounted(async () => {
  await loadUserData()
  await loadEkstrakurikuler()
  await loadTahunPelajaran()
  await loadRombel()
})

async function loadUserData() {
  const { useAuthService } = await import('~/app/services/authService')
  const authService = useAuthService()
  const authData = authService.getAuthData()
  if (authData && authData.user) {
    userName.value = authData.user.nama
  }
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
    const response = await absensiService.getTahunPelajaranAll()
    tahunPelajaranList.value = response.data
    
    // Set default ke tahun pelajaran yang active
    const activeTahunPelajaran = response.data.find((tp: TahunPelajaran) => tp.status === 'active')
    if (activeTahunPelajaran) {
      filter.value.tahun_pelajaran_id = String(activeTahunPelajaran.id)
    }
  } catch (error: any) {
    toast.error(error.data?.error || 'Gagal memuat data tahun pelajaran')
  }
}

async function loadRombel() {
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    const response = await absensiService.getRombelActive()
    rombelList.value = response.data
  } catch (error: any) {
    toast.error(error.data?.error || 'Gagal memuat data rombel')
  }
}

async function loadAbsensiData() {
  if (!filter.value.ekstrakurikuler_id || !filter.value.tahun_pelajaran_id) {
    return
  }

  isLoading.value = true
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    
    const [siswaResponse, absensiResponse] = await Promise.all([
      absensiService.getSiswaByEkskul(Number(filter.value.ekstrakurikuler_id), Number(filter.value.tahun_pelajaran_id)),
      absensiService.getRekapAbsensiSiswa(
        Number(filter.value.ekstrakurikuler_id),
        Number(filter.value.tahun_pelajaran_id),
        filter.value.nama || null,
        filter.value.rombel_id ? Number(filter.value.rombel_id) : null,
        currentMonth.value,
        currentYear.value
      )
    ])

    if (siswaResponse.data.ekstrakurikuler.length > 0) {
      let siswaList = siswaResponse.data.ekstrakurikuler[0].siswa
      
      if (filter.value.nama) {
        siswaList = siswaList.filter(s => s.nama.toLowerCase().includes(filter.value.nama.toLowerCase()))
      }
      if (filter.value.rombel_id) {
        siswaList = siswaList.filter(s => s.rombel_id === Number(filter.value.rombel_id))
      }
      
      siswaAbsensiList.value = siswaList
    } else {
      siswaAbsensiList.value = []
    }
    
    absensiData.value = absensiResponse.data
  } catch (error: any) {
    toast.error(error.data?.error || 'Gagal memuat data absensi')
    siswaAbsensiList.value = []
    absensiData.value = null
  } finally {
    isLoading.value = false
  }
}

function getAbsensiStatus(pesertaDidikRombelId: number, tanggalKegiatan: string | null): string | null {
  if (!absensiData.value || !absensiData.value.kegiatan || !tanggalKegiatan) return null
  
  const kegiatan = absensiData.value.kegiatan.find((k: any) => k.tanggal_kegiatan === tanggalKegiatan)
  if (!kegiatan) return null
  
  const absensi = kegiatan.absensi_siswa.find((a: any) => a.peserta_didik_rombel_id === pesertaDidikRombelId)
  return absensi ? absensi.status : null
}

function getAbsensiId(pesertaDidikRombelId: number, tanggalKegiatan: string | null): number | null {
  if (!absensiData.value || !absensiData.value.kegiatan || !tanggalKegiatan) return null
  
  const kegiatan = absensiData.value.kegiatan.find((k: any) => k.tanggal_kegiatan === tanggalKegiatan)
  if (!kegiatan) return null
  
  const absensi = kegiatan.absensi_siswa.find((a: any) => a.peserta_didik_rombel_id === pesertaDidikRombelId)
  return absensi ? absensi.id : null
}

async function openDetailAbsensi(pesertaDidikRombelId: number, tanggalKegiatan: string | null) {
  const absensiId = getAbsensiId(pesertaDidikRombelId, tanggalKegiatan)
  if (!absensiId) return
  
  isLoadingDetail.value = true
  showDetailModal.value = true
  detailAbsensi.value = null
  isEditMode.value = false
  
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    const response = await absensiService.getDetailAbsensiSiswa(absensiId)
    detailAbsensi.value = response.data
    editForm.value = {
      status: response.data.status,
      keterangan: response.data.keterangan || ''
    }
  } catch (error: any) {
    toast.error(error.data?.error || 'Gagal memuat detail absensi')
    showDetailModal.value = false
  } finally {
    isLoadingDetail.value = false
  }
}

function closeDetailModal() {
  showDetailModal.value = false
  detailAbsensi.value = null
  isEditMode.value = false
}

function enableEditMode() {
  isEditMode.value = true
  editForm.value = {
    status: detailAbsensi.value.status,
    keterangan: detailAbsensi.value.keterangan || ''
  }
}

function cancelEdit() {
  isEditMode.value = false
  editForm.value = {
    status: detailAbsensi.value.status,
    keterangan: detailAbsensi.value.keterangan || ''
  }
}

async function saveAbsensi() {
  if (!editForm.value.status) {
    toast.error('Status kehadiran harus diisi')
    return
  }

  isSaving.value = true
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    const response = await absensiService.updateAbsensiSiswa(
      detailAbsensi.value.id,
      editForm.value.status,
      editForm.value.keterangan
    )
    
    toast.success('Absensi berhasil diperbarui')
    
    // Reload absensi data
    await loadAbsensiData()
    
    // Close modal
    closeDetailModal()
  } catch (error: any) {
    toast.error(error.data?.error || 'Gagal memperbarui absensi')
  } finally {
    isSaving.value = false
  }
}

function onFilterChange() {
  loadAbsensiData()
}

function previousMonth() {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
  loadAbsensiData()
}

function nextMonth() {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
  loadAbsensiData()
}

async function downloadExcel() {
  if (!filter.value.ekstrakurikuler_id || !filter.value.tahun_pelajaran_id) {
    toast.error('Pilih ekstrakurikuler dan tahun pelajaran terlebih dahulu')
    return
  }

  isDownloading.value = true
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    
    const blob = await absensiService.downloadExcelAbsensiSiswa(
      Number(filter.value.ekstrakurikuler_id),
      Number(filter.value.tahun_pelajaran_id),
      currentMonth.value,
      currentYear.value
    )
    
    // Create download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    // Generate filename
    const ekskulName = ekstrakurikulerList.value.find(e => e.id === Number(filter.value.ekstrakurikuler_id))?.name || 'Ekskul'
    const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][currentMonth.value - 1]
    link.download = `Absensi_${ekskulName}_${monthName}_${currentYear.value}.xlsx`
    
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

async function downloadPdf() {
  if (!filter.value.ekstrakurikuler_id || !filter.value.tahun_pelajaran_id) {
    toast.error('Pilih ekstrakurikuler dan tahun pelajaran terlebih dahulu')
    return
  }

  isDownloadingPdf.value = true
  try {
    const { useAbsensiService } = await import('~/app/services/absensiService')
    const absensiService = useAbsensiService()
    
    const blob = await absensiService.downloadPdfAbsensiSiswa(
      Number(filter.value.ekstrakurikuler_id),
      Number(filter.value.tahun_pelajaran_id),
      currentMonth.value,
      currentYear.value
    )
    
    // Create download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    // Generate filename
    const ekskulName = ekstrakurikulerList.value.find(e => e.id === Number(filter.value.ekstrakurikuler_id))?.name || 'Ekskul'
    const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][currentMonth.value - 1]
    link.download = `Absensi_${ekskulName}_${monthName}_${currentYear.value}.pdf`
    
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

useHead({
  title: 'Rekap Absensi Siswa | SIEKSA',
  meta: [{ name: 'description', content: 'Rekap Absensi Siswa Ekstrakurikuler SIEKSA' }],
  link: [{ rel: 'icon', type: 'image/png', href: '/title-sieksa.png' }]
})
</script>


<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #9333ea;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #7e22ce;
}

/* Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #9333ea #f1f1f1;
}
</style>
