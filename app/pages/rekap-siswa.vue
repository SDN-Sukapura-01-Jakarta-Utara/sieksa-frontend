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
          <h1 class="text-3xl font-bold text-gray-800">Rekap Siswa Ekstrakurikuler</h1>
        </div>
        <p class="text-gray-600">Rekapitulasi data siswa per ekstrakurikuler dan per rombel</p>
      </div>

      <!-- Main Tabs -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
        <div class="border-b border-gray-200">
          <div class="flex">
            <button
              @click="mainTab = 'ekskul'"
              :class="[
                'flex-1 px-6 py-4 text-sm font-bold transition',
                mainTab === 'ekskul'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              Data Per Ekstrakurikuler
            </button>
            <button
              @click="mainTab = 'rombel'"
              :class="[
                'flex-1 px-6 py-4 text-sm font-bold transition',
                mainTab === 'rombel'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              Data Per Rombel
            </button>
          </div>
        </div>

        <!-- Tab Content: Per Ekskul -->
        <div v-if="mainTab === 'ekskul'" class="p-6">
          <!-- Sub Tabs: Ekstrakurikuler -->
          <div class="mb-6">
            <!-- Ekstrakurikuler Tabs Container -->
            <div class="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-6 border-2 border-purple-200">
              <h3 class="text-sm font-bold text-gray-700 mb-3">Pilih Ekstrakurikuler:</h3>
              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="ekskul in ekskulList"
                  :key="ekskul.id"
                  @click="selectedEkskul = ekskul.id; fetchRekapEkskul()"
                  :class="[
                    'px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 border-2',
                    selectedEkskul === ekskul.id
                      ? 'bg-purple-600 text-white shadow-lg border-purple-600 scale-105'
                      : 'bg-white text-gray-700 hover:bg-purple-50 border-gray-300 hover:border-purple-400 hover:shadow-md'
                  ]"
                >
                  {{ ekskul.name }}
                </button>
              </div>
            </div>

            <!-- Filter Section -->
            <div class="bg-white rounded-xl p-6 mb-6 border-2 border-gray-200 shadow-sm">
              <h3 class="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter Data
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Tahun Pelajaran</label>
                  <select
                    v-model="filterEkskul.tahun_pelajaran_id"
                    class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                  >
                    <option :value="null">Semua</option>
                    <option v-for="tp in tahunPelajaranList" :key="tp.id" :value="tp.id">
                      {{ tp.tahun_pelajaran }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
                  <input
                    v-model="filterEkskul.nama"
                    @keyup.enter="handleSearchEkskul"
                    type="text"
                    placeholder="Cari nama siswa..."
                    class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">NIS</label>
                  <input
                    v-model="filterEkskul.nis"
                    @keyup.enter="handleSearchEkskul"
                    type="text"
                    placeholder="Cari NIS..."
                    class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Rombel</label>
                  <select
                    v-model="filterEkskul.rombel_id"
                    class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                  >
                    <option :value="null">Semua</option>
                    <option v-for="rombel in rombelList" :key="rombel.id" :value="rombel.id">
                      {{ rombel.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="flex flex-wrap gap-3 mt-6">
                <button
                  @click="handleSearchEkskul"
                  class="flex-1 min-w-[120px] sm:flex-none px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Cari
                </button>
                <button
                  @click="handleResetEkskul"
                  class="flex-1 min-w-[120px] sm:flex-none px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
                <button
                  @click="handleDownloadExcelEkskul"
                  :disabled="isDownloadingExcelEkskul || !selectedEkskul || !filterEkskul.tahun_pelajaran_id"
                  class="flex-1 min-w-[120px] sm:flex-none px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg v-if="isDownloadingExcelEkskul" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {{ isDownloadingExcelEkskul ? 'Mengunduh...' : 'Excel' }}
                </button>
              </div>
            </div>

            <!-- Table Per Ekskul -->
            <div v-if="isLoadingEkskul" class="text-center py-12">
              <svg class="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-600">Memuat data...</p>
            </div>

            <div v-else-if="selectedEkskulData && selectedEkskulData.siswa && selectedEkskulData.siswa.length > 0">
              <div class="mb-8">
                <div class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-t-lg">
                  <h4 class="font-bold">{{ selectedEkskulData.nama_ekstrakurikuler }} ({{ selectedEkskulData.total_siswa }} siswa)</h4>
                </div>
                
                <div class="overflow-x-auto border-2 border-gray-200 rounded-b-lg shadow-sm">
                  <table class="w-full">
                    <thead class="bg-gray-100">
                      <tr>
                        <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">No</th>
                        <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Nama</th>
                        <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">NIS</th>
                        <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Rombel</th>
                        <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Tanggal Daftar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(siswa, index) in selectedEkskulData.siswa" :key="siswa.peserta_didik_id" class="border-t hover:bg-purple-50 transition">
                        <td class="px-4 py-3 text-sm text-gray-700">{{ (filterEkskul.page - 1) * filterEkskul.limit + index + 1 }}</td>
                        <td class="px-4 py-3 text-sm font-semibold text-gray-800">{{ siswa.nama }}</td>
                        <td class="px-4 py-3 text-sm text-gray-700">{{ siswa.nis }}</td>
                        <td class="px-4 py-3 text-sm text-gray-700">{{ siswa.nama_rombel }}</td>
                        <td class="px-4 py-3 text-sm text-gray-700">{{ formatDate(siswa.tanggal_daftar) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Pagination -->
              <div v-if="rekapEkskulData && rekapEkskulData.pagination" class="flex justify-between items-center mt-6">
                <p class="text-sm text-gray-600 font-semibold">
                  Menampilkan {{ ((filterEkskul.page - 1) * filterEkskul.limit) + 1 }} - 
                  {{ Math.min(filterEkskul.page * filterEkskul.limit, rekapEkskulData.pagination.total) }} dari {{ rekapEkskulData.pagination.total }} data
                </p>
                <div class="flex gap-2">
                  <button
                    @click="changePage('ekskul', filterEkskul.page - 1)"
                    :disabled="filterEkskul.page === 1"
                    class="px-5 py-2.5 bg-white hover:bg-purple-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 shadow-sm hover:shadow-md"
                  >
                    Prev
                  </button>
                  <span class="px-5 py-2.5 bg-purple-100 text-purple-700 font-bold rounded-lg border-2 border-purple-300">
                    {{ filterEkskul.page }} / {{ rekapEkskulData.pagination.total_pages || 1 }}
                  </span>
                  <button
                    @click="changePage('ekskul', filterEkskul.page + 1)"
                    :disabled="filterEkskul.page === (rekapEkskulData.pagination.total_pages || 1)"
                    class="px-5 py-2.5 bg-white hover:bg-purple-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 shadow-sm hover:shadow-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div v-else-if="!isLoadingEkskul" class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p class="text-gray-600 font-semibold">Tidak ada data siswa untuk ekstrakurikuler ini</p>
            </div>
          </div>
        </div>

        <!-- Tab Content: Per Rombel -->
        <div v-if="mainTab === 'rombel'" class="p-6">
          <!-- Sub Tabs: Rombel -->
          <div class="mb-6">
            <!-- Rombel Tabs Container -->
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6 border-2 border-indigo-200">
              <h3 class="text-sm font-bold text-gray-700 mb-3">Pilih Rombel:</h3>
              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="rombel in rombelList"
                  :key="rombel.id"
                  @click="selectedRombel = rombel.id; fetchRekapRombel()"
                  :class="[
                    'px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 border-2',
                    selectedRombel === rombel.id
                      ? 'bg-indigo-600 text-white shadow-lg border-indigo-600 scale-105'
                      : 'bg-white text-gray-700 hover:bg-indigo-50 border-gray-300 hover:border-indigo-400 hover:shadow-md'
                  ]"
                >
                  {{ rombel.name }}
                </button>
              </div>
            </div>

            <!-- Filter Section -->
            <div class="bg-white rounded-xl p-6 mb-6 border-2 border-gray-200 shadow-sm">
              <h3 class="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter Data
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Tahun Pelajaran</label>
                  <select
                    v-model="filterRombel.tahun_pelajaran_id"
                    class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
                  >
                    <option :value="null">Semua</option>
                    <option v-for="tp in tahunPelajaranList" :key="tp.id" :value="tp.id">
                      {{ tp.tahun_pelajaran }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
                  <input
                    v-model="filterRombel.nama"
                    @keyup.enter="handleSearchRombel"
                    type="text"
                    placeholder="Cari nama siswa..."
                    class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">NIS</label>
                  <input
                    v-model="filterRombel.nis"
                    @keyup.enter="handleSearchRombel"
                    type="text"
                    placeholder="Cari NIS..."
                    class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div class="flex flex-wrap gap-3 mt-6">
                <button
                  @click="handleSearchRombel"
                  class="flex-1 min-w-[120px] sm:flex-none px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Cari
                </button>
                <button
                  @click="handleResetRombel"
                  class="flex-1 min-w-[120px] sm:flex-none px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
                <button
                  @click="handleDownloadExcelRombel"
                  :disabled="isDownloadingExcelRombel || !selectedRombel || !filterRombel.tahun_pelajaran_id"
                  class="flex-1 min-w-[120px] sm:flex-none px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg v-if="isDownloadingExcelRombel" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {{ isDownloadingExcelRombel ? 'Mengunduh...' : 'Excel' }}
                </button>
              </div>
            </div>

            <!-- Table Per Rombel -->
            <div v-if="isLoadingRombel" class="text-center py-12">
              <svg class="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-600">Memuat data...</p>
            </div>

            <div v-else-if="rekapRombelData && rekapRombelData.siswa && rekapRombelData.siswa.length > 0">
              <div class="overflow-x-auto border-2 border-gray-200 rounded-lg shadow-sm">
                <table class="w-full">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">No</th>
                      <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Nama</th>
                      <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">NIS</th>
                      <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Ekstrakurikuler</th>
                      <th class="px-4 py-3 text-center text-sm font-bold text-gray-700">Total Ekskul</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(siswa, index) in rekapRombelData.siswa" :key="siswa.peserta_didik_id" class="border-t hover:bg-indigo-50 transition">
                      <td class="px-4 py-3 text-sm text-gray-700">{{ (filterRombel.page - 1) * filterRombel.limit + index + 1 }}</td>
                      <td class="px-4 py-3 text-sm font-semibold text-gray-800">{{ siswa.nama }}</td>
                      <td class="px-4 py-3 text-sm text-gray-700">{{ siswa.nis }}</td>
                      <td class="px-4 py-3 text-sm text-gray-700">
                        <div v-if="siswa.ekstrakurikuler && siswa.ekstrakurikuler.length > 0" class="flex flex-wrap gap-1.5">
                          <span
                            v-for="ekskul in siswa.ekstrakurikuler"
                            :key="ekskul.ekstrakurikuler_id"
                            class="px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full"
                          >
                            {{ ekskul.nama_ekstrakurikuler }}
                          </span>
                        </div>
                        <span v-else class="text-gray-400 italic">Belum ikut ekskul</span>
                      </td>
                      <td class="px-4 py-3 text-sm text-center">
                        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold">
                          {{ siswa.total_ekskul }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Pagination -->
              <div v-if="rekapRombelData.pagination" class="flex justify-between items-center mt-6">
                <p class="text-sm text-gray-600 font-semibold">
                  Menampilkan {{ ((filterRombel.page - 1) * filterRombel.limit) + 1 }} - 
                  {{ Math.min(filterRombel.page * filterRombel.limit, rekapRombelData.pagination.total) }} dari {{ rekapRombelData.pagination.total }} data
                </p>
                <div class="flex gap-2">
                  <button
                    @click="changePage('rombel', filterRombel.page - 1)"
                    :disabled="filterRombel.page === 1"
                    class="px-5 py-2.5 bg-white hover:bg-indigo-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 shadow-sm hover:shadow-md"
                  >
                    Prev
                  </button>
                  <span class="px-5 py-2.5 bg-indigo-100 text-indigo-700 font-bold rounded-lg border-2 border-indigo-300">
                    {{ filterRombel.page }} / {{ rekapRombelData.pagination.total_pages || 1 }}
                  </span>
                  <button
                    @click="changePage('rombel', filterRombel.page + 1)"
                    :disabled="filterRombel.page === (rekapRombelData.pagination.total_pages || 1)"
                    class="px-5 py-2.5 bg-white hover:bg-indigo-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 shadow-sm hover:shadow-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div v-else-if="!isLoadingRombel" class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p class="text-gray-600 font-semibold">Tidak ada data siswa untuk rombel ini</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useRekapService } from '~/app/services/rekapService'
import { usePendaftaranService } from '~/app/services/pendaftaranService'
import type { TahunPelajaran, Rombel, Ekstrakurikuler } from '~/app/types/pendaftaran'
import type { RekapPerEkskulResponse, RekapPerRombelResponse } from '~/app/types/rekap'

const router = useRouter()
const rekapService = useRekapService()
const pendaftaranService = usePendaftaranService()

definePageMeta({
  middleware: 'auth'
})

const userName = ref('Admin User')
const mainTab = ref<'ekskul' | 'rombel'>('ekskul')

// Data lists
const tahunPelajaranList = ref<TahunPelajaran[]>([])
const rombelList = ref<Rombel[]>([])
const ekskulList = ref<Ekstrakurikuler[]>([])

// Selected tabs
const selectedEkskul = ref<number | null>(null)
const selectedRombel = ref<number | null>(null)

// Filters
const filterEkskul = ref({
  nama: '',
  nis: '',
  tahun_pelajaran_id: null as number | null,
  rombel_id: null as number | null,
  page: 1,
  limit: 10
})

const filterRombel = ref({
  nama: '',
  nis: '',
  tahun_pelajaran_id: null as number | null,
  page: 1,
  limit: 10
})

// Data
const rekapEkskulData = ref<RekapPerEkskulResponse | null>(null)
const rekapRombelData = ref<RekapPerRombelResponse | null>(null)

// Loading states
const isLoadingEkskul = ref(false)
const isLoadingRombel = ref(false)
const isDownloadingExcelEkskul = ref(false)
const isDownloadingExcelRombel = ref(false)

// Computed untuk ekstrakurikuler yang dipilih saja
const selectedEkskulData = computed(() => {
  if (!rekapEkskulData.value || !selectedEkskul.value) return null
  if (!rekapEkskulData.value.ekstrakurikuler) return null
  return rekapEkskulData.value.ekstrakurikuler.find(
    ekskul => ekskul.ekstrakurikuler_id === selectedEkskul.value
  )
})

// Fetch initial data
const fetchTahunPelajaran = async () => {
  try {
    const response = await pendaftaranService.getTahunPelajaran()
    tahunPelajaranList.value = response.data || []
    
    const active = tahunPelajaranList.value.find(tp => tp.status === 'active')
    if (active) {
      filterEkskul.value.tahun_pelajaran_id = active.id
      filterRombel.value.tahun_pelajaran_id = active.id
    }
  } catch (error) {
    console.error('Error fetching tahun pelajaran:', error)
    // Error already handled by service
  }
}

const fetchRombel = async () => {
  try {
    const response = await pendaftaranService.getRombel()
    rombelList.value = response.data || []
    
    if (rombelList.value.length > 0) {
      selectedRombel.value = rombelList.value[0].id
    }
  } catch (error) {
    console.error('Error fetching rombel:', error)
    // Error already handled by service
  }
}

const fetchEkskul = async () => {
  try {
    const response = await pendaftaranService.getEkstrakurikuler()
    ekskulList.value = response.data || []
    
    if (ekskulList.value.length > 0) {
      selectedEkskul.value = ekskulList.value[0].id
    }
  } catch (error) {
    console.error('Error fetching ekstrakurikuler:', error)
    // Error already handled by service
  }
}

// Fetch rekap data
const fetchRekapEkskul = async () => {
  if (!selectedEkskul.value || !filterEkskul.value.tahun_pelajaran_id) return
  
  isLoadingEkskul.value = true
  try {
    const response = await rekapService.getRekapPerEkskul(
      selectedEkskul.value,
      Number(filterEkskul.value.tahun_pelajaran_id),
      filterEkskul.value.nama || null,
      filterEkskul.value.nis || null,
      filterEkskul.value.rombel_id ? Number(filterEkskul.value.rombel_id) : null,
      filterEkskul.value.page,
      filterEkskul.value.limit
    )
    rekapEkskulData.value = response.data
  } catch (error) {
    console.error('Error fetching rekap ekskul:', error)
    // Error already handled by service
  } finally {
    isLoadingEkskul.value = false
  }
}

const fetchRekapRombel = async () => {
  if (!selectedRombel.value || !filterRombel.value.tahun_pelajaran_id) return
  
  isLoadingRombel.value = true
  try {
    const response = await rekapService.getRekapPerRombel(
      selectedRombel.value,
      Number(filterRombel.value.tahun_pelajaran_id),
      filterRombel.value.nama || null,
      filterRombel.value.nis || null,
      filterRombel.value.page,
      filterRombel.value.limit
    )
    rekapRombelData.value = response.data
  } catch (error) {
    console.error('Error fetching rekap rombel:', error)
    // Error already handled by service
  } finally {
    isLoadingRombel.value = false
  }
}

// Handlers
const handleSearchEkskul = () => {
  filterEkskul.value.page = 1
  fetchRekapEkskul()
}

const handleResetEkskul = () => {
  filterEkskul.value.nama = ''
  filterEkskul.value.nis = ''
  filterEkskul.value.rombel_id = null
  filterEkskul.value.page = 1
  fetchRekapEkskul()
}

const handleSearchRombel = () => {
  filterRombel.value.page = 1
  fetchRekapRombel()
}

const handleResetRombel = () => {
  filterRombel.value.nama = ''
  filterRombel.value.nis = ''
  filterRombel.value.page = 1
  fetchRekapRombel()
}

const handleDownloadExcelEkskul = async () => {
  if (!selectedEkskul.value || !filterEkskul.value.tahun_pelajaran_id) {
    const toast = useNuxtApp().$toast as any
    toast.error('Pilih ekstrakurikuler dan tahun pelajaran terlebih dahulu')
    return
  }

  isDownloadingExcelEkskul.value = true
  const toast = useNuxtApp().$toast as any

  try {
    console.log('Starting download excel per ekskul...')
    console.log('Params:', {
      ekskulId: selectedEkskul.value,
      tahunPelajaranId: filterEkskul.value.tahun_pelajaran_id,
      nama: filterEkskul.value.nama,
      nis: filterEkskul.value.nis,
      rombelId: filterEkskul.value.rombel_id
    })

    const blob = await rekapService.downloadExcelPerEkskul(
      selectedEkskul.value,
      Number(filterEkskul.value.tahun_pelajaran_id),
      filterEkskul.value.nama || null,
      filterEkskul.value.nis || null,
      filterEkskul.value.rombel_id ? Number(filterEkskul.value.rombel_id) : null,
      filterEkskul.value.page,
      filterEkskul.value.limit
    )

    console.log('Blob received:', blob)
    console.log('Blob size:', blob.size)
    console.log('Blob type:', blob.type)

    if (blob.size === 0) {
      toast.error('File kosong, tidak ada data untuk diunduh')
      return
    }

    // Create download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    // Get ekstrakurikuler name for filename
    const ekskulName = ekskulList.value.find(e => e.id === selectedEkskul.value)?.name || 'Ekstrakurikuler'
    const fileName = `Rekap_${ekskulName.replace(/\s+/g, '_')}_${new Date().getTime()}.xlsx`
    
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    
    // Cleanup
    setTimeout(() => {
      link.remove()
      window.URL.revokeObjectURL(url)
    }, 100)
    
    toast.success('File Excel berhasil diunduh')
  } catch (error: any) {
    console.error('Error downloading excel:', error)
    toast.error(error.message || 'Gagal mengunduh file Excel')
  } finally {
    isDownloadingExcelEkskul.value = false
  }
}

const handleDownloadExcelRombel = async () => {
  if (!selectedRombel.value || !filterRombel.value.tahun_pelajaran_id) {
    const toast = useNuxtApp().$toast as any
    toast.error('Pilih rombel dan tahun pelajaran terlebih dahulu')
    return
  }

  isDownloadingExcelRombel.value = true
  const toast = useNuxtApp().$toast as any

  try {
    console.log('Starting download excel per rombel...')
    console.log('Params:', {
      rombelId: selectedRombel.value,
      tahunPelajaranId: filterRombel.value.tahun_pelajaran_id,
      nama: filterRombel.value.nama,
      nis: filterRombel.value.nis
    })

    const blob = await rekapService.downloadExcelPerRombel(
      selectedRombel.value,
      Number(filterRombel.value.tahun_pelajaran_id),
      filterRombel.value.nama || null,
      filterRombel.value.nis || null,
      filterRombel.value.page,
      filterRombel.value.limit
    )

    console.log('Blob received:', blob)
    console.log('Blob size:', blob.size)
    console.log('Blob type:', blob.type)

    if (blob.size === 0) {
      toast.error('File kosong, tidak ada data untuk diunduh')
      return
    }

    // Create download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    // Get rombel name for filename
    const rombelName = rombelList.value.find(r => r.id === selectedRombel.value)?.name || 'Rombel'
    const fileName = `Rekap_${rombelName.replace(/\s+/g, '_')}_${new Date().getTime()}.xlsx`
    
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    
    // Cleanup
    setTimeout(() => {
      link.remove()
      window.URL.revokeObjectURL(url)
    }, 100)
    
    toast.success('File Excel berhasil diunduh')
  } catch (error: any) {
    console.error('Error downloading excel:', error)
    toast.error(error.message || 'Gagal mengunduh file Excel')
  } finally {
    isDownloadingExcelRombel.value = false
  }
}

const changePage = (type: 'ekskul' | 'rombel', page: number) => {
  if (type === 'ekskul') {
    filterEkskul.value.page = page
    fetchRekapEkskul()
  } else {
    filterRombel.value.page = page
    fetchRekapRombel()
  }
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

// Watch tab changes
watch(() => mainTab.value, (newTab) => {
  if (newTab === 'ekskul' && selectedEkskul.value) {
    fetchRekapEkskul()
  } else if (newTab === 'rombel' && selectedRombel.value) {
    fetchRekapRombel()
  }
})

watch(() => selectedEkskul.value, () => {
  if (selectedEkskul.value) {
    filterEkskul.value.page = 1
  }
})

watch(() => selectedRombel.value, () => {
  if (selectedRombel.value) {
    filterRombel.value.page = 1
  }
})

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
    fetchEkskul()
  ])
  
  // Auto fetch first ekskul data
  if (selectedEkskul.value) {
    await fetchRekapEkskul()
  }
})

useHead({
  title: 'Rekap Siswa | SIEKSA',
  meta: [
    { name: 'description', content: 'Rekapitulasi Siswa Ekstrakurikuler SIEKSA' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/title-sieksa.png' }
  ]
})
</script>
