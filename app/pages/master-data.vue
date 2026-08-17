<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-purple-50 font-jakarta">
    <Navbar :user-name="userName" />

    <main class="flex-1 container mx-auto px-4 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
          <div class="flex items-center gap-3">
            <button
              @click="router.push('/dashboard')"
              class="text-purple-600 hover:text-purple-800 transition"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 class="text-3xl font-bold text-gray-800">Master Data</h1>
          </div>
          
          <!-- Dynamic Add Button - Desktop -->
          <button
            v-if="mainTab === 'ekstrakurikuler' && canCreate"
            @click="handleTambahEkskul"
            class="hidden sm:flex px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Ekstrakurikuler
          </button>
          
          <button
            v-if="mainTab === 'pelatih' && canCreatePelatih"
            @click="handleTambahPelatih"
            class="hidden sm:flex px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Pelatih
          </button>
        </div>
        <p class="text-gray-600 mb-3">Kelola data ekstrakurikuler dan pelatih</p>
        
        <!-- Dynamic Add Button - Mobile -->
        <button
          v-if="mainTab === 'ekstrakurikuler' && canCreate"
          @click="handleTambahEkskul"
          class="sm:hidden w-full px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Ekstrakurikuler
        </button>
        
        <button
          v-if="mainTab === 'pelatih' && canCreatePelatih"
          @click="handleTambahPelatih"
          class="sm:hidden w-full px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Pelatih
        </button>
      </div>

      <!-- Main Tabs -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
        <div class="border-b border-gray-200">
          <div class="flex">
            <button
              @click="mainTab = 'ekstrakurikuler'"
              :class="[
                'flex-1 px-6 py-4 text-sm font-bold transition',
                mainTab === 'ekstrakurikuler'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              Ekstrakurikuler
            </button>
            <button
              @click="mainTab = 'pelatih'"
              :class="[
                'flex-1 px-6 py-4 text-sm font-bold transition',
                mainTab === 'pelatih'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              Pelatih
            </button>
          </div>
        </div>

        <!-- Tab Content: Ekstrakurikuler -->
        <div v-if="mainTab === 'ekstrakurikuler'" class="p-6">
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
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
                <input
                  v-model="filter.name"
                  @keyup.enter="handleSearch"
                  type="text"
                  placeholder="Cari nama ekstrakurikuler..."
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Kelas</label>
                <select
                  v-model="filter.kelas_id"
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                >
                  <option :value="null">Semua</option>
                  <option v-for="kelas in kelasList" :key="kelas.id" :value="kelas.id">
                    {{ kelas.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                <select
                  v-model="filter.kategori"
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                >
                  <option value="">Semua</option>
                  <option value="wajib">Wajib</option>
                  <option value="tidak wajib">Tidak Wajib</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  v-model="filter.status"
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                >
                  <option value="">Semua</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div class="flex flex-wrap gap-3 mt-6">
              <button
                @click="handleSearch"
                class="flex-1 min-w-[120px] sm:flex-none px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Cari
              </button>
              <button
                @click="handleReset"
                class="flex-1 min-w-[120px] sm:flex-none px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
            </div>
          </div>

          <!-- Table Ekstrakurikuler -->
          <div v-if="isLoading" class="text-center py-12">
            <svg class="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-gray-600">Memuat data...</p>
          </div>

          <div v-else-if="ekskulData && ekskulData.data && ekskulData.data.length > 0">
            <div class="overflow-x-auto border-2 border-gray-200 rounded-lg shadow-sm">
              <table class="w-full">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">No</th>
                    <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Nama</th>
                    <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Kelas</th>
                    <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Kategori</th>
                    <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Status</th>
                    <th class="px-4 py-3 text-center text-sm font-bold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in ekskulData.data" :key="item.id" class="border-t hover:bg-purple-50 transition">
                    <td class="px-4 py-3 text-sm text-gray-700">{{ (pagination.page - 1) * pagination.limit + index + 1 }}</td>
                    <td class="px-4 py-3 text-sm font-semibold text-gray-800">{{ item.name }}</td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <div class="flex flex-wrap gap-1.5">
                        <span
                          v-for="kelas in item.kelas"
                          :key="kelas.id"
                          class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full"
                        >
                          {{ kelas.name }}
                        </span>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <span
                        :class="[
                          'px-3 py-1 rounded-full text-xs font-semibold',
                          item.kategori === 'wajib'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-green-100 text-green-700'
                        ]"
                      >
                        {{ item.kategori }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <span
                        :class="[
                          'px-3 py-1 rounded-full text-xs font-semibold',
                          item.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        ]"
                      >
                        {{ item.status }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-center">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          v-if="canEdit"
                          @click="handleEdit(item.id)"
                          class="p-2 bg-yellow-500 hover:bg-yellow-600 text-gray-800 rounded-lg transition-all shadow-sm hover:shadow-md"
                          title="Edit"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          v-if="canDelete"
                          @click="handleDelete(item.id, item.name)"
                          class="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-sm hover:shadow-md"
                          title="Delete"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <span v-if="!canEdit && !canDelete" class="text-sm text-gray-400 italic">
                          Tidak ada aksi
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div v-if="ekskulData.pagination" class="flex justify-between items-center mt-6">
              <p class="text-sm text-gray-600 font-semibold">
                Menampilkan {{ ((pagination.page - 1) * pagination.limit) + 1 }} - 
                {{ Math.min(pagination.page * pagination.limit, ekskulData.pagination.total) }} dari {{ ekskulData.pagination.total }} data
              </p>
              <div class="flex gap-2">
                <button
                  @click="changePage(pagination.page - 1)"
                  :disabled="pagination.page === 1"
                  class="px-5 py-2.5 bg-white hover:bg-purple-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 shadow-sm hover:shadow-md"
                >
                  Prev
                </button>
                <span class="px-5 py-2.5 bg-purple-100 text-purple-700 font-bold rounded-lg border-2 border-purple-300">
                  {{ pagination.page }} / {{ ekskulData.pagination.total_pages || 1 }}
                </span>
                <button
                  @click="changePage(pagination.page + 1)"
                  :disabled="pagination.page === (ekskulData.pagination.total_pages || 1)"
                  class="px-5 py-2.5 bg-white hover:bg-purple-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 shadow-sm hover:shadow-md"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div v-else-if="!isLoading" class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p class="text-gray-600 font-semibold">Tidak ada data ekstrakurikuler</p>
          </div>
        </div>

        <!-- Tab Content: Pelatih -->
        <div v-if="mainTab === 'pelatih'" class="p-6">
          <!-- Filter Section -->
          <div class="bg-white rounded-xl p-6 mb-6 border-2 border-gray-200 shadow-sm">
            <h3 class="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter Data
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
                <input
                  v-model="filterPelatih.nama"
                  @keyup.enter="handleSearchPelatih"
                  type="text"
                  placeholder="Cari nama pelatih..."
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Ekstrakurikuler</label>
                <select
                  v-model="filterPelatih.ekstrakurikuler_id"
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                >
                  <option :value="null">Semua</option>
                  <option v-for="ekskul in ekskulListForFilter" :key="ekskul.id" :value="ekskul.id">
                    {{ ekskul.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  v-model="filterPelatih.status"
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                >
                  <option value="">Semua</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div class="flex flex-wrap gap-3 mt-6">
              <button
                @click="handleSearchPelatih"
                class="flex-1 min-w-[120px] sm:flex-none px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Cari
              </button>
              <button
                @click="handleResetPelatih"
                class="flex-1 min-w-[120px] sm:flex-none px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
            </div>
          </div>

          <!-- Table Pelatih -->
          <div v-if="isLoadingPelatih" class="text-center py-12">
            <svg class="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-gray-600">Memuat data...</p>
          </div>

          <div v-else-if="pelatihData && pelatihData.data && pelatihData.data.length > 0">
            <div class="overflow-x-auto border-2 border-gray-200 rounded-lg shadow-sm">
              <table class="w-full">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">No</th>
                    <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Nama</th>
                    <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Telepon</th>
                    <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Foto</th>
                    <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Ekskul Diampu</th>
                    <th class="px-4 py-3 text-left text-sm font-bold text-gray-700">Status</th>
                    <th class="px-4 py-3 text-center text-sm font-bold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in pelatihData.data" :key="item.id" class="border-t hover:bg-purple-50 transition">
                    <td class="px-4 py-3 text-sm text-gray-700">{{ (paginationPelatih.page - 1) * paginationPelatih.limit + index + 1 }}</td>
                    <td class="px-4 py-3 text-sm font-semibold text-gray-800">{{ item.nama }}</td>
                    <td class="px-4 py-3 text-sm text-gray-700">{{ item.telepon }}</td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <div v-if="item.foto_profil" class="flex items-center gap-2">
                        <img :src="item.foto_profil" alt="Foto" class="w-16 h-16 rounded-full object-cover border-2 border-gray-200" />
                      </div>
                      <span v-else class="text-xs text-gray-400 italic">Tidak ada foto</span>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <div v-if="item.ekstrakurikuler && item.ekstrakurikuler.length > 0" class="flex flex-wrap gap-1.5">
                        <span
                          v-for="ekskul in item.ekstrakurikuler"
                          :key="ekskul.id"
                          class="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full"
                        >
                          {{ ekskul.name }}
                        </span>
                      </div>
                      <span v-else class="text-xs text-gray-400 italic">Belum mengampu</span>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <span
                        :class="[
                          'px-3 py-1 rounded-full text-xs font-semibold',
                          item.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        ]"
                      >
                        {{ item.status }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-center">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          v-if="canEditPelatih"
                          @click="handleEditPelatih(item.id)"
                          class="p-2 bg-yellow-500 hover:bg-yellow-600 text-gray-800 rounded-lg transition-all shadow-sm hover:shadow-md"
                          title="Edit"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          v-if="canDeletePelatih"
                          @click="handleDeletePelatih(item.id, item.nama)"
                          class="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-sm hover:shadow-md"
                          title="Delete"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <span v-if="!canEditPelatih && !canDeletePelatih" class="text-sm text-gray-400 italic">
                          Tidak ada aksi
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div v-if="pelatihData.pagination" class="flex justify-between items-center mt-6">
              <p class="text-sm text-gray-600 font-semibold">
                Menampilkan {{ ((paginationPelatih.page - 1) * paginationPelatih.limit) + 1 }} - 
                {{ Math.min(paginationPelatih.page * paginationPelatih.limit, pelatihData.pagination.total) }} dari {{ pelatihData.pagination.total }} data
              </p>
              <div class="flex gap-2">
                <button
                  @click="changePagePelatih(paginationPelatih.page - 1)"
                  :disabled="paginationPelatih.page === 1"
                  class="px-5 py-2.5 bg-white hover:bg-purple-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 shadow-sm hover:shadow-md"
                >
                  Prev
                </button>
                <span class="px-5 py-2.5 bg-purple-100 text-purple-700 font-bold rounded-lg border-2 border-purple-300">
                  {{ paginationPelatih.page }} / {{ pelatihData.pagination.total_pages || 1 }}
                </span>
                <button
                  @click="changePagePelatih(paginationPelatih.page + 1)"
                  :disabled="paginationPelatih.page === (pelatihData.pagination.total_pages || 1)"
                  class="px-5 py-2.5 bg-white hover:bg-purple-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 shadow-sm hover:shadow-md"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div v-else-if="!isLoadingPelatih" class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p class="text-gray-600 font-semibold">Tidak ada data pelatih</p>
          </div>
        </div>
      </div>
    </main>

    <Footer />

    <!-- Create Modal -->
    <Transition name="modal">
      <div
        v-if="showCreateModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeCreateModal"
      >
        <Transition name="modal-content">
          <div v-if="showCreateModal" class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <!-- Modal Header -->
            <div class="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 class="text-xl font-bold">Tambah Ekstrakurikuler</h3>
              <button
                @click="closeCreateModal"
                class="text-white hover:text-gray-200 transition"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6">
              <form @submit.prevent="handleSubmitCreate">
                <!-- Nama -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Ekstrakurikuler <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="createForm.name"
                    type="text"
                    required
                    placeholder="Masukkan nama ekstrakurikuler"
                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>

                <!-- Kelas -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Pilih Kelas <span class="text-red-500">*</span>
                  </label>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    <label
                      v-for="kelas in kelasList"
                      :key="kelas.id"
                      class="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        :value="kelas.id"
                        v-model="createForm.kelas_ids"
                        class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span class="ml-2 text-sm font-semibold text-gray-700">{{ kelas.name }}</span>
                    </label>
                  </div>
                  <p v-if="createForm.kelas_ids.length === 0" class="text-xs text-red-500 mt-2">
                    Pilih minimal 1 kelas
                  </p>
                </div>

                <!-- Kategori -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="createForm.kategori"
                    required
                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                  >
                    <option value="wajib">Wajib</option>
                    <option value="tidak wajib">Tidak Wajib</option>
                  </select>
                </div>

                <!-- Status Toggle -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Status
                  </label>
                  <div class="flex items-center gap-3">
                    <button
                      type="button"
                      @click="createForm.status = createForm.status === 'active' ? 'inactive' : 'active'"
                      :class="[
                        'relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                        createForm.status === 'active' ? 'bg-green-600' : 'bg-gray-300'
                      ]"
                    >
                      <span
                        :class="[
                          'inline-block h-6 w-6 transform rounded-full bg-white transition-transform',
                          createForm.status === 'active' ? 'translate-x-7' : 'translate-x-1'
                        ]"
                      />
                    </button>
                    <span
                      :class="[
                        'text-sm font-semibold',
                        createForm.status === 'active' ? 'text-green-600' : 'text-gray-600'
                      ]"
                    >
                      {{ createForm.status === 'active' ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 pt-4 border-t">
                  <button
                    type="button"
                    @click="closeCreateModal"
                    class="flex-1 px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    :disabled="isSaving || createForm.kelas_ids.length === 0"
                    class="flex-1 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg v-if="isSaving" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{{ isSaving ? 'Menyimpan...' : 'Simpan' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Create Pelatih Modal -->
    <Transition name="modal">
      <div
        v-if="showCreatePelatihModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeCreatePelatihModal"
      >
        <Transition name="modal-content">
          <div v-if="showCreatePelatihModal" class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <!-- Modal Header -->
            <div class="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 class="text-xl font-bold">Tambah Pelatih</h3>
              <button
                @click="closeCreatePelatihModal"
                class="text-white hover:text-gray-200 transition"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6">
              <form @submit.prevent="handleSubmitCreatePelatih">
                <!-- Nama (Full Width) -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Pelatih <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="createPelatihForm.nama"
                    type="text"
                    required
                    placeholder="Masukkan nama pelatih"
                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <!-- Telepon -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Telepon <span class="text-xs text-gray-500 font-normal">(Opsional)</span>
                    </label>
                    <input
                      v-model="createPelatihForm.telepon"
                      type="tel"
                      placeholder="08123456789"
                      class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  </div>

                  <!-- Alamat -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Alamat <span class="text-xs text-gray-500 font-normal">(Opsional)</span>
                    </label>
                    <input
                      v-model="createPelatihForm.alamat"
                      type="text"
                      placeholder="Masukkan alamat"
                      class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  </div>
                </div>

                <!-- Keahlian (Full Width) -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Keahlian <span class="text-xs text-gray-500 font-normal">(Opsional)</span>
                  </label>
                  <textarea
                    v-model="createPelatihForm.keahlian"
                    rows="3"
                    placeholder="Contoh: Pencak Silat, Bela Diri, Karate"
                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none"
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <!-- Username -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Username <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="createPelatihForm.username"
                      type="text"
                      required
                      placeholder="Masukkan username"
                      class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  </div>

                  <!-- Password -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Password <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <input
                        v-model="createPelatihForm.password"
                        :type="showPassword ? 'text' : 'password'"
                        required
                        placeholder="Masukkan password"
                        class="w-full px-4 py-2.5 pr-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                      />
                      <button
                        type="button"
                        @click="showPassword = !showPassword"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                      >
                        <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Konfirmasi Password -->
                  <div class="md:col-span-2">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Konfirmasi Password <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <input
                        v-model="createPelatihForm.konfirmasi_password"
                        :type="showKonfirmasiPassword ? 'text' : 'password'"
                        required
                        placeholder="Konfirmasi password"
                        class="w-full px-4 py-2.5 pr-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                      />
                      <button
                        type="button"
                        @click="showKonfirmasiPassword = !showKonfirmasiPassword"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                      >
                        <svg v-if="showKonfirmasiPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Role -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Pilih Role <span class="text-red-500">*</span>
                  </label>
                  <div class="space-y-3">
                    <label
                      v-for="role in rolesList"
                      :key="role.id"
                      class="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 cursor-pointer transition"
                      :class="{ 'border-purple-500 bg-purple-50': createPelatihForm.role_ids.includes(role.id) }"
                    >
                      <input
                        type="radio"
                        :value="role.id"
                        :checked="createPelatihForm.role_ids.includes(role.id)"
                        @change="createPelatihForm.role_ids = [role.id]"
                        class="mt-1 w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <div class="ml-3">
                        <span class="block text-sm font-semibold text-gray-800">{{ role.name }}</span>
                        <span class="block text-xs text-gray-600 mt-1">{{ role.description }}</span>
                      </div>
                    </label>
                  </div>
                  <p v-if="createPelatihForm.role_ids.length === 0" class="text-xs text-red-500 mt-2">
                    Pilih 1 role
                  </p>
                </div>

                <!-- Ekstrakurikuler -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Ekstrakurikuler yang Diampu <span class="text-red-500">*</span>
                  </label>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    <label
                      v-for="ekskul in ekskulListForFilter"
                      :key="ekskul.id"
                      class="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        :value="ekskul.id"
                        v-model="createPelatihForm.ekstrakurikuler_ids"
                        class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span class="ml-2 text-sm font-semibold text-gray-700">{{ ekskul.name }}</span>
                    </label>
                  </div>
                  <p v-if="createPelatihForm.ekstrakurikuler_ids.length === 0" class="text-xs text-red-500 mt-2">
                    Pilih minimal 1 ekstrakurikuler
                  </p>
                </div>

                <!-- Status Toggle -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Status
                  </label>
                  <div class="flex items-center gap-3">
                    <button
                      type="button"
                      @click="createPelatihForm.status = createPelatihForm.status === 'active' ? 'inactive' : 'active'"
                      :class="[
                        'relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                        createPelatihForm.status === 'active' ? 'bg-green-600' : 'bg-gray-300'
                      ]"
                    >
                      <span
                        :class="[
                          'inline-block h-6 w-6 transform rounded-full bg-white transition-transform',
                          createPelatihForm.status === 'active' ? 'translate-x-7' : 'translate-x-1'
                        ]"
                      />
                    </button>
                    <span
                      :class="[
                        'text-sm font-semibold',
                        createPelatihForm.status === 'active' ? 'text-green-600' : 'text-gray-600'
                      ]"
                    >
                      {{ createPelatihForm.status === 'active' ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 pt-6 mt-6 border-t">
                  <button
                    type="button"
                    @click="closeCreatePelatihModal"
                    class="flex-1 px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    :disabled="isSaving || createPelatihForm.ekstrakurikuler_ids.length === 0"
                    class="flex-1 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg v-if="isSaving" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{{ isSaving ? 'Menyimpan...' : 'Simpan' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Edit Modal -->
    <Transition name="modal">
      <div
        v-if="showEditModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeEditModal"
      >
        <Transition name="modal-content">
          <div v-if="showEditModal" class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <!-- Modal Header -->
            <div class="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 class="text-xl font-bold">Edit Ekstrakurikuler</h3>
              <button
                @click="closeEditModal"
                class="text-white hover:text-gray-200 transition"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Modal Body -->
            <div v-if="isLoadingEdit" class="p-8 text-center">
              <svg class="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-600">Memuat data...</p>
            </div>

            <div v-else class="p-6">
              <form @submit.prevent="handleSubmitEdit">
                <!-- Nama -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Ekstrakurikuler <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="editForm.name"
                    type="text"
                    required
                    placeholder="Masukkan nama ekstrakurikuler"
                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>

                <!-- Kelas -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Pilih Kelas <span class="text-red-500">*</span>
                  </label>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    <label
                      v-for="kelas in kelasList"
                      :key="kelas.id"
                      class="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        :value="kelas.id"
                        v-model="editForm.kelas_ids"
                        class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span class="ml-2 text-sm font-semibold text-gray-700">{{ kelas.name }}</span>
                    </label>
                  </div>
                  <p v-if="editForm.kelas_ids.length === 0" class="text-xs text-red-500 mt-2">
                    Pilih minimal 1 kelas
                  </p>
                </div>

                <!-- Kategori -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="editForm.kategori"
                    required
                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                  >
                    <option value="wajib">Wajib</option>
                    <option value="tidak wajib">Tidak Wajib</option>
                  </select>
                </div>

                <!-- Status Toggle -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Status
                  </label>
                  <div class="flex items-center gap-3">
                    <button
                      type="button"
                      @click="editForm.status = editForm.status === 'active' ? 'inactive' : 'active'"
                      :class="[
                        'relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                        editForm.status === 'active' ? 'bg-green-600' : 'bg-gray-300'
                      ]"
                    >
                      <span
                        :class="[
                          'inline-block h-6 w-6 transform rounded-full bg-white transition-transform',
                          editForm.status === 'active' ? 'translate-x-7' : 'translate-x-1'
                        ]"
                      />
                    </button>
                    <span
                      :class="[
                        'text-sm font-semibold',
                        editForm.status === 'active' ? 'text-green-600' : 'text-gray-600'
                      ]"
                    >
                      {{ editForm.status === 'active' ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 pt-4 border-t">
                  <button
                    type="button"
                    @click="closeEditModal"
                    class="flex-1 px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    :disabled="isSaving || editForm.kelas_ids.length === 0"
                    class="flex-1 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg v-if="isSaving" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{{ isSaving ? 'Menyimpan...' : 'Simpan' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Delete Confirmation Modal -->
    <Transition name="modal">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeDeleteModal"
      >
        <Transition name="modal-content">
          <div v-if="showDeleteModal" class="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <!-- Modal Header -->
            <div class="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 flex items-center gap-3 rounded-t-2xl">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 class="text-xl font-bold">Konfirmasi Hapus</h3>
            </div>

            <!-- Modal Body -->
            <div class="p-6">
              <p class="text-gray-700 mb-2">
                Apakah Anda yakin ingin menghapus ekstrakurikuler:
              </p>
              <p class="text-lg font-bold text-gray-900 mb-4">
                "{{ deleteTarget?.name }}"
              </p>
              <p class="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                <strong>Peringatan:</strong> Data yang sudah dihapus tidak dapat dikembalikan!
              </p>
            </div>

            <!-- Modal Footer -->
            <div class="flex gap-3 px-6 pb-6">
              <button
                type="button"
                @click="closeDeleteModal"
                :disabled="isDeleting"
                class="flex-1 px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              <button
                @click="confirmDelete"
                :disabled="isDeleting"
                class="flex-1 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg v-if="isDeleting" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>{{ isDeleting ? 'Menghapus...' : 'Ya, Hapus' }}</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Edit Pelatih Modal -->
    <Transition name="modal">
      <div
        v-if="showEditPelatihModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeEditPelatihModal"
      >
        <Transition name="modal-content">
          <div v-if="showEditPelatihModal" class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <!-- Modal Header -->
            <div class="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 class="text-xl font-bold">Edit Pelatih</h3>
              <button
                @click="closeEditPelatihModal"
                class="text-white hover:text-gray-200 transition"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Modal Body -->
            <div v-if="isLoadingEditPelatih" class="p-8 text-center">
              <svg class="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-600">Memuat data...</p>
            </div>

            <div v-else class="p-6">
              <form @submit.prevent="handleSubmitEditPelatih">
                <!-- Nama (Full Width) -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Pelatih <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="editPelatihForm.nama"
                    type="text"
                    required
                    placeholder="Masukkan nama pelatih"
                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <!-- Telepon -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Telepon <span class="text-xs text-gray-500 font-normal">(Opsional)</span>
                    </label>
                    <input
                      v-model="editPelatihForm.telepon"
                      type="tel"
                      placeholder="08123456789"
                      class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  </div>

                  <!-- Alamat -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Alamat <span class="text-xs text-gray-500 font-normal">(Opsional)</span>
                    </label>
                    <input
                      v-model="editPelatihForm.alamat"
                      type="text"
                      placeholder="Masukkan alamat"
                      class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  </div>
                </div>

                <!-- Keahlian (Full Width) -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Keahlian <span class="text-xs text-gray-500 font-normal">(Opsional)</span>
                  </label>
                  <textarea
                    v-model="editPelatihForm.keahlian"
                    rows="3"
                    placeholder="Contoh: Pencak Silat, Bela Diri, Karate"
                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none"
                  ></textarea>
                </div>

                <!-- Username (Full Width) -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Username <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="editPelatihForm.username"
                    type="text"
                    required
                    placeholder="Masukkan username"
                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>

                <!-- Foto Profil -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Foto Profil <span class="text-xs text-gray-500 font-normal">(Opsional, Max 2MB)</span>
                  </label>
                  <div v-if="editPelatihForm.foto_profil_url" class="mb-3">
                    <img :src="editPelatihForm.foto_profil_url" alt="Foto Profil" class="w-24 h-24 rounded-full object-cover border-2 border-gray-200" />
                    <p class="text-xs text-gray-500 mt-1">Foto saat ini</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleFotoProfilChange"
                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                  <p class="text-xs text-gray-500 mt-1">Upload foto baru untuk mengganti (Max 2MB)</p>
                </div>

                <!-- Sertifikat -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Sertifikat <span class="text-xs text-gray-500 font-normal">(Opsional, Max 5MB per file)</span>
                  </label>
                  
                  <!-- Existing Sertifikat -->
                  <div v-if="editPelatihForm.sertifikat_urls.length > 0" class="mb-3">
                    <p class="text-xs text-gray-600 mb-2 font-semibold">Sertifikat Saat Ini:</p>
                    <div class="space-y-2">
                      <div
                        v-for="(url, index) in editPelatihForm.sertifikat_urls"
                        :key="index"
                        class="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                      >
                        <span class="text-sm text-gray-700 truncate flex-1">
                          Sertifikat {{ index + 1 }}
                        </span>
                        <div class="flex items-center gap-2 ml-2">
                          <a
                            :href="url"
                            target="_blank"
                            class="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
                            title="Lihat Sertifikat"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </a>
                          <button
                            type="button"
                            @click="removeSertifikatUrl(url)"
                            class="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition"
                            title="Hapus"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- New Sertifikat Files -->
                  <div v-if="editPelatihForm.sertifikat_files.length > 0" class="mb-3">
                    <p class="text-xs text-gray-600 mb-2 font-semibold">File Baru yang Akan Diupload:</p>
                    <div class="space-y-2">
                      <div
                        v-for="(file, index) in editPelatihForm.sertifikat_files"
                        :key="index"
                        class="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <span class="text-sm text-gray-700 truncate flex-1">{{ file.name }}</span>
                        <button
                          type="button"
                          @click="removeSertifikatFile(index)"
                          class="ml-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition"
                          title="Hapus"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    multiple
                    @change="handleSertifikatChange"
                    class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                  <p class="text-xs text-gray-500 mt-1">Bisa pilih beberapa file sekaligus (Max 5MB per file)</p>
                </div>

                <!-- Role -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Pilih Role <span class="text-red-500">*</span>
                  </label>
                  <div class="space-y-3">
                    <label
                      v-for="role in rolesList"
                      :key="role.id"
                      class="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 cursor-pointer transition"
                      :class="{ 'border-purple-500 bg-purple-50': editPelatihForm.role_ids.includes(role.id) }"
                    >
                      <input
                        type="radio"
                        :value="role.id"
                        :checked="editPelatihForm.role_ids.includes(role.id)"
                        @change="editPelatihForm.role_ids = [role.id]"
                        class="mt-1 w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <div class="ml-3">
                        <span class="block text-sm font-semibold text-gray-800">{{ role.name }}</span>
                        <span class="block text-xs text-gray-600 mt-1">{{ role.description }}</span>
                      </div>
                    </label>
                  </div>
                  <p v-if="editPelatihForm.role_ids.length === 0" class="text-xs text-red-500 mt-2">
                    Pilih 1 role
                  </p>
                </div>

                <!-- Ekstrakurikuler -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Ekstrakurikuler yang Diampu <span class="text-red-500">*</span>
                  </label>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    <label
                      v-for="ekskul in ekskulListForFilter"
                      :key="ekskul.id"
                      class="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        :value="ekskul.id"
                        v-model="editPelatihForm.ekstrakurikuler_ids"
                        class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span class="ml-2 text-sm font-semibold text-gray-700">{{ ekskul.name }}</span>
                    </label>
                  </div>
                  <p v-if="editPelatihForm.ekstrakurikuler_ids.length === 0" class="text-xs text-red-500 mt-2">
                    Pilih minimal 1 ekstrakurikuler
                  </p>
                </div>

                <!-- Status Toggle -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Status
                  </label>
                  <div class="flex items-center gap-3">
                    <button
                      type="button"
                      @click="editPelatihForm.status = editPelatihForm.status === 'active' ? 'inactive' : 'active'"
                      :class="[
                        'relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                        editPelatihForm.status === 'active' ? 'bg-green-600' : 'bg-gray-300'
                      ]"
                    >
                      <span
                        :class="[
                          'inline-block h-6 w-6 transform rounded-full bg-white transition-transform',
                          editPelatihForm.status === 'active' ? 'translate-x-7' : 'translate-x-1'
                        ]"
                      />
                    </button>
                    <span
                      :class="[
                        'text-sm font-semibold',
                        editPelatihForm.status === 'active' ? 'text-green-600' : 'text-gray-600'
                      ]"
                    >
                      {{ editPelatihForm.status === 'active' ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 pt-6 mt-6 border-t">
                  <button
                    type="button"
                    @click="closeEditPelatihModal"
                    class="flex-1 px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    :disabled="isSaving || editPelatihForm.ekstrakurikuler_ids.length === 0"
                    class="flex-1 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg v-if="isSaving" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{{ isSaving ? 'Menyimpan...' : 'Update' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Delete Pelatih Confirmation Modal -->
    <Transition name="modal">
      <div
        v-if="showDeletePelatihModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeDeletePelatihModal"
      >
        <Transition name="modal-content">
          <div v-if="showDeletePelatihModal" class="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <!-- Modal Header -->
            <div class="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 flex items-center gap-3 rounded-t-2xl">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 class="text-xl font-bold">Konfirmasi Hapus</h3>
            </div>

            <!-- Modal Body -->
            <div class="p-6">
              <p class="text-gray-700 mb-2">
                Apakah Anda yakin ingin menghapus pelatih:
              </p>
              <p class="text-lg font-bold text-gray-900 mb-4">
                "{{ deletePelatihTarget?.nama }}"
              </p>
              <p class="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                <strong>Peringatan:</strong> Data yang sudah dihapus tidak dapat dikembalikan!
              </p>
            </div>

            <!-- Modal Footer -->
            <div class="flex gap-3 px-6 pb-6">
              <button
                type="button"
                @click="closeDeletePelatihModal"
                :disabled="isDeletingPelatih"
                class="flex-1 px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-all border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              <button
                @click="confirmDeletePelatih"
                :disabled="isDeletingPelatih"
                class="flex-1 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg v-if="isDeletingPelatih" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>{{ isDeletingPelatih ? 'Menghapus...' : 'Ya, Hapus' }}</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useMasterDataService } from '~/app/services/masterDataService'
import type { EkstrakurikulerListResponse, EkstrakurikulerSearchPayload, Kelas, EkstrakurikulerItem, PelatihListResponse, PelatihSearchPayload, RoleItem } from '~/app/types/master-data'

const router = useRouter()
const masterDataService = useMasterDataService()

definePageMeta({
  middleware: 'auth'
})

const userName = ref('Admin User')
const mainTab = ref<'ekstrakurikuler' | 'pelatih'>('ekstrakurikuler')
const userPermissions = ref<string[]>([])

// Data lists
const kelasList = ref<Kelas[]>([])
const ekskulListForFilter = ref<EkstrakurikulerItem[]>([])
const rolesList = ref<RoleItem[]>([])

// Filter
const filter = ref({
  name: '',
  kelas_id: null as number | null,
  kategori: '',
  status: ''
})

// Filter Pelatih
const filterPelatih = ref({
  nama: '',
  ekstrakurikuler_id: null as number | null,
  status: ''
})

// Pagination
const pagination = ref({
  page: 1,
  limit: 10
})

// Pagination Pelatih
const paginationPelatih = ref({
  page: 1,
  limit: 10
})

// Data
const ekskulData = ref<EkstrakurikulerListResponse | null>(null)
const pelatihData = ref<PelatihListResponse | null>(null)

// Loading states
const isLoading = ref(false)
const isLoadingPelatih = ref(false)
const isLoadingEdit = ref(false)
const isSaving = ref(false)

// Edit Modal
const showEditModal = ref(false)
const editForm = ref({
  id: 0,
  name: '',
  kelas_ids: [] as number[],
  kategori: 'tidak wajib',
  status: 'active'
})

// Create Modal
const showCreateModal = ref(false)
const createForm = ref({
  name: '',
  kelas_ids: [] as number[],
  kategori: 'tidak wajib',
  status: 'active'
})

// Create Pelatih Modal
const showCreatePelatihModal = ref(false)
const createPelatihForm = ref({
  nama: '',
  username: '',
  password: '',
  konfirmasi_password: '',
  telepon: '',
  alamat: '',
  keahlian: '',
  status: 'active',
  role_ids: [] as number[],
  ekstrakurikuler_ids: [] as number[]
})
const showPassword = ref(false)
const showKonfirmasiPassword = ref(false)

// Edit Pelatih Modal
const showEditPelatihModal = ref(false)
const isLoadingEditPelatih = ref(false)
const editPelatihForm = ref({
  id: 0,
  nama: '',
  username: '',
  telepon: '',
  alamat: '',
  keahlian: '',
  status: 'active',
  role_ids: [] as number[],
  ekstrakurikuler_ids: [] as number[],
  foto_profil: null as File | null,
  foto_profil_url: '' as string,
  sertifikat_files: [] as File[],
  sertifikat_urls: [] as string[],
  sertifikat_to_delete: [] as string[]
})

// Delete Confirmation Modal
const showDeleteModal = ref(false)
const deleteTarget = ref<{ id: number, name: string } | null>(null)
const isDeleting = ref(false)

// Delete Pelatih Confirmation Modal
const showDeletePelatihModal = ref(false)
const deletePelatihTarget = ref<{ id: number, nama: string } | null>(null)
const isDeletingPelatih = ref(false)

// Permission checks
const canCreate = computed(() => userPermissions.value.includes('CREATE_MASTER_DATA_EKSTRAKURIKULER'))
const canEdit = computed(() => userPermissions.value.includes('UPDATE_MASTER_DATA_EKSTRAKURIKULER'))
const canDelete = computed(() => userPermissions.value.includes('DELETE_MASTER_DATA_EKSTRAKURIKULER'))
const canCreatePelatih = computed(() => userPermissions.value.includes('CREATE_MASTER_DATA_EKSTRAKURIKULER'))
const canEditPelatih = computed(() => userPermissions.value.includes('UPDATE_MASTER_DATA_EKSTRAKURIKULER'))
const canDeletePelatih = computed(() => userPermissions.value.includes('DELETE_MASTER_DATA_EKSTRAKURIKULER'))

// Fetch kelas untuk dropdown
const fetchKelas = async () => {
  try {
    const response = await masterDataService.getKelasList()
    kelasList.value = response.data || []
  } catch (error) {
    console.error('Error fetching kelas:', error)
  }
}

// Fetch ekstrakurikuler active untuk dropdown filter pelatih
const fetchEkskulForFilter = async () => {
  try {
    const response = await masterDataService.getEkstrakurikulerActive()
    ekskulListForFilter.value = response.data || []
  } catch (error) {
    console.error('Error fetching ekstrakurikuler for filter:', error)
  }
}

// Fetch roles untuk radio button
const fetchRoles = async () => {
  try {
    const response = await masterDataService.getRolesList()
    rolesList.value = response.data || []
  } catch (error) {
    console.error('Error fetching roles:', error)
  }
}

// Fetch ekstrakurikuler data
const fetchEkstrakurikuler = async () => {
  isLoading.value = true
  try {
    const payload: EkstrakurikulerSearchPayload = {
      search: {
        name: filter.value.name || '',
        kelas_id: filter.value.kelas_id,
        kategori: filter.value.kategori || '',
        status: filter.value.status || ''
      },
      pagination: {
        limit: pagination.value.limit,
        page: pagination.value.page
      }
    }

    ekskulData.value = await masterDataService.getEkstrakurikulerList(payload)
  } catch (error) {
    console.error('Error fetching ekstrakurikuler:', error)
  } finally {
    isLoading.value = false
  }
}

// Fetch pelatih data
const fetchPelatih = async () => {
  isLoadingPelatih.value = true
  try {
    const payload: PelatihSearchPayload = {
      search: {
        nama: filterPelatih.value.nama || '',
        ekstrakurikuler_id: filterPelatih.value.ekstrakurikuler_id,
        status: filterPelatih.value.status || ''
      },
      pagination: {
        limit: paginationPelatih.value.limit,
        page: paginationPelatih.value.page
      }
    }

    pelatihData.value = await masterDataService.getPelatihList(payload)
  } catch (error) {
    console.error('Error fetching pelatih:', error)
  } finally {
    isLoadingPelatih.value = false
  }
}

// Handlers
const handleSearch = () => {
  pagination.value.page = 1
  fetchEkstrakurikuler()
}

const handleReset = () => {
  filter.value.name = ''
  filter.value.kelas_id = null
  filter.value.kategori = ''
  filter.value.status = ''
  pagination.value.page = 1
  fetchEkstrakurikuler()
}

const handleSearchPelatih = () => {
  paginationPelatih.value.page = 1
  fetchPelatih()
}

const handleResetPelatih = () => {
  filterPelatih.value.nama = ''
  filterPelatih.value.ekstrakurikuler_id = null
  filterPelatih.value.status = ''
  paginationPelatih.value.page = 1
  fetchPelatih()
}

const changePagePelatih = (page: number) => {
  paginationPelatih.value.page = page
  fetchPelatih()
}

const handleEditPelatih = async (id: number) => {
  showEditPelatihModal.value = true
  isLoadingEditPelatih.value = true

  try {
    const response = await masterDataService.getPelatihById(id)
    const data = response.data

    // Extract unique role_ids and ekstrakurikuler_ids to prevent duplicates
    const roleIds = data.roles?.map((r: any) => r.id) || []
    const ekskulIds = data.ekstrakurikuler?.map((e: any) => e.id) || []

    editPelatihForm.value = {
      id: data.id,
      nama: data.nama,
      username: data.username,
      telepon: data.telepon || '',
      alamat: data.alamat || '',
      keahlian: data.keahlian || '',
      status: data.status,
      role_ids: [...new Set(roleIds)], // Remove duplicates
      ekstrakurikuler_ids: [...new Set(ekskulIds)], // Remove duplicates
      foto_profil: null,
      foto_profil_url: data.foto_profil || '',
      sertifikat_files: [],
      sertifikat_urls: data.sertifikat || [],
      sertifikat_to_delete: []
    }
  } catch (error) {
    console.error('Error fetching pelatih detail:', error)
    const toast = useNuxtApp().$toast as any
    toast.error('Gagal memuat data pelatih')
    closeEditPelatihModal()
  } finally {
    isLoadingEditPelatih.value = false
  }
}

const closeEditPelatihModal = () => {
  showEditPelatihModal.value = false
  editPelatihForm.value = {
    id: 0,
    nama: '',
    username: '',
    telepon: '',
    alamat: '',
    keahlian: '',
    status: 'active',
    role_ids: [],
    ekstrakurikuler_ids: [],
    foto_profil: null,
    foto_profil_url: '',
    sertifikat_files: [],
    sertifikat_urls: [],
    sertifikat_to_delete: []
  }
}

const handleFotoProfilChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const toast = useNuxtApp().$toast as any
  
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const maxSize = 2 * 1024 * 1024 // 2MB in bytes
    
    if (file.size > maxSize) {
      toast.error('Ukuran foto profil maksimal 2MB')
      target.value = '' // Reset input
      return
    }
    
    editPelatihForm.value.foto_profil = file
  }
}

const handleSertifikatChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const toast = useNuxtApp().$toast as any
  
  if (target.files) {
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    const validFiles: File[] = []
    const invalidFiles: string[] = []
    
    Array.from(target.files).forEach((file) => {
      if (file.size > maxSize) {
        invalidFiles.push(file.name)
      } else {
        validFiles.push(file)
      }
    })
    
    if (invalidFiles.length > 0) {
      toast.error(`File berikut melebihi 5MB: ${invalidFiles.join(', ')}`)
    }
    
    if (validFiles.length > 0) {
      editPelatihForm.value.sertifikat_files.push(...validFiles)
      toast.success(`${validFiles.length} file berhasil ditambahkan`)
    }
    
    target.value = '' // Reset input for next selection
  }
}

const removeSertifikatFile = (index: number) => {
  editPelatihForm.value.sertifikat_files.splice(index, 1)
}

const removeSertifikatUrl = (url: string) => {
  // Remove from display list
  const index = editPelatihForm.value.sertifikat_urls.indexOf(url)
  if (index > -1) {
    editPelatihForm.value.sertifikat_urls.splice(index, 1)
  }
  // Add to delete list
  if (!editPelatihForm.value.sertifikat_to_delete.includes(url)) {
    editPelatihForm.value.sertifikat_to_delete.push(url)
  }
}

const handleSubmitEditPelatih = async () => {
  const toast = useNuxtApp().$toast as any

  // Validasi
  if (!editPelatihForm.value.nama || !editPelatihForm.value.username) {
    toast.error('Nama dan username harus diisi')
    return
  }

  if (editPelatihForm.value.role_ids.length === 0) {
    toast.error('Pilih role untuk pelatih')
    return
  }

  if (editPelatihForm.value.ekstrakurikuler_ids.length === 0) {
    toast.error('Pilih minimal 1 ekstrakurikuler')
    return
  }

  isSaving.value = true

  try {
    // Remove duplicates from arrays
    const uniqueRoleIds = [...new Set(editPelatihForm.value.role_ids)]
    const uniqueEkskulIds = [...new Set(editPelatihForm.value.ekstrakurikuler_ids)]

    await masterDataService.updatePelatih({
      id: editPelatihForm.value.id,
      nama: editPelatihForm.value.nama,
      username: editPelatihForm.value.username,
      telepon: editPelatihForm.value.telepon,
      alamat: editPelatihForm.value.alamat,
      keahlian: editPelatihForm.value.keahlian,
      status: editPelatihForm.value.status,
      role_ids: uniqueRoleIds,
      ekstrakurikuler_ids: uniqueEkskulIds,
      foto_profil: editPelatihForm.value.foto_profil,
      sertifikat: editPelatihForm.value.sertifikat_files,
      sertifikat_to_delete: editPelatihForm.value.sertifikat_to_delete
    })

    toast.success('Pelatih berhasil diperbarui')
    closeEditPelatihModal()
    
    // Refresh table
    await fetchPelatih()
  } catch (error: any) {
    console.error('Error updating pelatih:', error)
    toast.error(error.message || 'Gagal memperbarui pelatih')
  } finally {
    isSaving.value = false
  }
}

const handleDeletePelatih = (id: number, nama: string) => {
  deletePelatihTarget.value = { id, nama }
  showDeletePelatihModal.value = true
}

const closeDeletePelatihModal = () => {
  showDeletePelatihModal.value = false
  deletePelatihTarget.value = null
}

const confirmDeletePelatih = async () => {
  if (!deletePelatihTarget.value) return

  isDeletingPelatih.value = true
  const toast = useNuxtApp().$toast as any

  try {
    await masterDataService.deletePelatih(deletePelatihTarget.value.id)
    toast.success(`Pelatih "${deletePelatihTarget.value.nama}" berhasil dihapus`)
    
    closeDeletePelatihModal()
    
    // Refresh table
    await fetchPelatih()
  } catch (error: any) {
    console.error('Error deleting pelatih:', error)
    toast.error(error.message || 'Gagal menghapus pelatih')
  } finally {
    isDeletingPelatih.value = false
  }
}

const handleTambahEkskul = () => {
  showCreateModal.value = true
}

const handleTambahPelatih = () => {
  showCreatePelatihModal.value = true
}

const closeCreatePelatihModal = () => {
  showCreatePelatihModal.value = false
  showPassword.value = false
  showKonfirmasiPassword.value = false
  createPelatihForm.value = {
    nama: '',
    username: '',
    password: '',
    konfirmasi_password: '',
    telepon: '',
    alamat: '',
    keahlian: '',
    status: 'active',
    role_ids: [],
    ekstrakurikuler_ids: []
  }
}

const handleSubmitCreatePelatih = async () => {
  const toast = useNuxtApp().$toast as any

  // Validasi
  if (!createPelatihForm.value.nama || !createPelatihForm.value.username || !createPelatihForm.value.password) {
    toast.error('Nama, username, dan password harus diisi')
    return
  }

  if (createPelatihForm.value.password !== createPelatihForm.value.konfirmasi_password) {
    toast.error('Password dan konfirmasi password tidak cocok')
    return
  }

  if (createPelatihForm.value.role_ids.length === 0) {
    toast.error('Pilih role untuk pelatih')
    return
  }

  if (createPelatihForm.value.ekstrakurikuler_ids.length === 0) {
    toast.error('Pilih minimal 1 ekstrakurikuler')
    return
  }

  isSaving.value = true

  try {
    await masterDataService.createPelatih({
      nama: createPelatihForm.value.nama,
      username: createPelatihForm.value.username,
      password: createPelatihForm.value.password,
      telepon: createPelatihForm.value.telepon,
      alamat: createPelatihForm.value.alamat,
      keahlian: createPelatihForm.value.keahlian,
      status: createPelatihForm.value.status,
      role_ids: createPelatihForm.value.role_ids,
      ekstrakurikuler_ids: createPelatihForm.value.ekstrakurikuler_ids
    })

    toast.success('Pelatih berhasil ditambahkan')
    closeCreatePelatihModal()
    
    // Refresh table
    await fetchPelatih()
  } catch (error: any) {
    console.error('Error creating pelatih:', error)
    toast.error(error.message || 'Gagal menambahkan pelatih')
  } finally {
    isSaving.value = false
  }
}

const closeCreateModal = () => {
  showCreateModal.value = false
  createForm.value = {
    name: '',
    kelas_ids: [],
    kategori: 'tidak wajib',
    status: 'active'
  }
}

const handleSubmitCreate = async () => {
  if (createForm.value.kelas_ids.length === 0) {
    const toast = useNuxtApp().$toast as any
    toast.error('Pilih minimal 1 kelas')
    return
  }

  isSaving.value = true
  const toast = useNuxtApp().$toast as any

  try {
    await masterDataService.createEkstrakurikuler({
      name: createForm.value.name,
      kelas_ids: createForm.value.kelas_ids,
      kategori: createForm.value.kategori,
      status: createForm.value.status
    })

    toast.success('Ekstrakurikuler berhasil ditambahkan')
    closeCreateModal()
    
    // Refresh table
    await fetchEkstrakurikuler()
  } catch (error: any) {
    console.error('Error creating ekstrakurikuler:', error)
    toast.error(error.message || 'Gagal menambahkan ekstrakurikuler')
  } finally {
    isSaving.value = false
  }
}

const changePage = (page: number) => {
  pagination.value.page = page
  fetchEkstrakurikuler()
}

const handleEdit = async (id: number) => {
  showEditModal.value = true
  isLoadingEdit.value = true

  try {
    const response = await masterDataService.getEkstrakurikulerById(id)
    const data = response.data

    editForm.value = {
      id: data.id,
      name: data.name,
      kelas_ids: data.kelas_ids || [],
      kategori: data.kategori,
      status: data.status
    }
  } catch (error) {
    console.error('Error fetching ekstrakurikuler detail:', error)
    const toast = useNuxtApp().$toast as any
    toast.error('Gagal memuat data ekstrakurikuler')
    closeEditModal()
  } finally {
    isLoadingEdit.value = false
  }
}

const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = {
    id: 0,
    name: '',
    kelas_ids: [],
    kategori: 'tidak wajib',
    status: 'active'
  }
}

const handleSubmitEdit = async () => {
  if (editForm.value.kelas_ids.length === 0) {
    const toast = useNuxtApp().$toast as any
    toast.error('Pilih minimal 1 kelas')
    return
  }

  isSaving.value = true
  const toast = useNuxtApp().$toast as any

  try {
    await masterDataService.updateEkstrakurikuler({
      id: editForm.value.id,
      name: editForm.value.name,
      kelas_ids: editForm.value.kelas_ids,
      kategori: editForm.value.kategori,
      status: editForm.value.status
    })

    toast.success('Ekstrakurikuler berhasil diperbarui')
    closeEditModal()
    
    // Refresh table
    await fetchEkstrakurikuler()
  } catch (error: any) {
    console.error('Error updating ekstrakurikuler:', error)
    toast.error(error.message || 'Gagal memperbarui ekstrakurikuler')
  } finally {
    isSaving.value = false
  }
}

const handleDelete = (id: number, name: string) => {
  deleteTarget.value = { id, name }
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deleteTarget.value = null
}

const confirmDelete = async () => {
  if (!deleteTarget.value) return

  isDeleting.value = true
  const toast = useNuxtApp().$toast as any

  try {
    await masterDataService.deleteEkstrakurikuler(deleteTarget.value.id)
    toast.success(`Ekstrakurikuler "${deleteTarget.value.name}" berhasil dihapus`)
    
    closeDeleteModal()
    
    // Refresh table
    await fetchEkstrakurikuler()
  } catch (error: any) {
    console.error('Error deleting ekstrakurikuler:', error)
    toast.error(error.message || 'Gagal menghapus ekstrakurikuler')
  } finally {
    isDeleting.value = false
  }
}

// Watch tab changes
watch(() => mainTab.value, (newTab) => {
  if (newTab === 'ekstrakurikuler') {
    fetchEkstrakurikuler()
  } else if (newTab === 'pelatih') {
    fetchPelatih()
  }
})

onMounted(async () => {
  const { useAuthService } = await import('~/app/services/authService')
  const authService = useAuthService()
  
  const authData = authService.getAuthData()
  if (authData && authData.user) {
    userName.value = authData.user.nama
    userPermissions.value = authData.permissions || []
    
    console.log('User permissions:', userPermissions.value)
  }
  
  // Load initial data
  await fetchKelas()
  await fetchEkskulForFilter()
  await fetchRoles()
  await fetchEkstrakurikuler()
})

useHead({
  title: 'Master Data | SIEKSA',
  meta: [
    { name: 'description', content: 'Master Data Ekstrakurikuler dan Pelatih SIEKSA' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/title-sieksa.png' }
  ]
})
</script>

<style scoped>
/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-content-enter-active {
  transition: all 0.3s ease-out;
}

.modal-content-leave-active {
  transition: all 0.2s ease-in;
}

.modal-content-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
