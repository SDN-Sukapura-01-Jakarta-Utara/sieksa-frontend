<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50 font-jakarta">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800">
      <!-- Animated Background Patterns -->
      <div class="absolute inset-0 overflow-hidden opacity-20">
        <div class="absolute top-0 left-0 w-full h-full">
          <div class="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-full blur-3xl animate-float"></div>
          <div class="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full blur-3xl animate-float-delayed"></div>
          <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-green-300 to-teal-400 rounded-full blur-3xl animate-float-slow"></div>
        </div>
      </div>

      <!-- Grid Pattern Overlay -->
      <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div class="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="text-white space-y-6 animate-fade-in-up">
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/30 shadow-lg">
              <span class="text-xl">🏫</span>
              <span>SDN Sukapura 01</span>
            </div>
            
            <h1 class="text-5xl lg:text-6xl font-extrabold leading-tight">
              Selamat Datang di
              <span class="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 animate-gradient"> SIEKSA</span>
            </h1>
            
            <div class="space-y-3">
              <p class="text-2xl font-bold text-yellow-200">
                Sistem Informasi Ekstrakurikuler Sukapura Satu
              </p>
              <p class="text-lg text-purple-100 leading-relaxed">
                Platform digital modern untuk mengelola seluruh kegiatan ekstrakurikuler dengan mudah, cepat, dan terorganisir
              </p>
            </div>

            <div class="flex flex-wrap gap-3 pt-3">
              <NuxtLink 
                to="/login"
                class="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 px-8 py-3.5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-yellow-300/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <span class="relative z-10">Login ke Sistem</span>
                <svg class="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div class="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </NuxtLink>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-3 gap-3 pt-6">
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div class="text-4xl font-black text-yellow-300 mb-0.5">450</div>
                <div class="text-sm text-purple-200 font-semibold">Total Siswa</div>
              </div>
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div class="text-4xl font-black text-yellow-300 mb-0.5">15</div>
                <div class="text-sm text-purple-200 font-semibold">Ekstrakurikuler</div>
              </div>
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div class="text-4xl font-black text-yellow-300 mb-0.5">68</div>
                <div class="text-sm text-purple-200 font-semibold">Prestasi</div>
              </div>
            </div>
          </div>

          <!-- Right Content - Logo -->
          <div class="hidden lg:block animate-fade-in-down">
            <div class="relative">
              <!-- Glow Effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-yellow-300/30 to-purple-400/30 rounded-full blur-3xl animate-pulse-slow"></div>
              
              <!-- Logo Container -->
              <div class="relative bg-white rounded-2xl p-12 border-2 border-purple-200 shadow-2xl hover:scale-105 transition-transform duration-500">
                <img src="/logo-sieksa.png" alt="Logo SIEKSA" class="w-full h-auto relative z-10 animate-float drop-shadow-lg">
              </div>
              
              <!-- Floating Decorative Elements -->
              <div class="absolute -top-3 -right-3 w-20 h-20 bg-yellow-300 rounded-xl blur-xl opacity-60 animate-float"></div>
              <div class="absolute -bottom-3 -left-3 w-24 h-24 bg-pink-400 rounded-xl blur-xl opacity-60 animate-float-delayed"></div>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div class="flex flex-col items-center gap-2 text-white/80">
            <span class="text-xs font-semibold uppercase tracking-wider">Scroll</span>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Tentang SIEKSA Section -->
    <section class="py-16 relative overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-white via-purple-50/50 to-indigo-50/50"></div>
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/40 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-indigo-200/40 to-transparent rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="max-w-7xl mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-14">
            <div class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-5 py-2 rounded-full text-xs font-bold mb-6 shadow-lg">
              <span class="text-lg">💡</span>
              <span>Tentang Sistem</span>
            </div>
            <h2 class="text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Apa itu <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600">SIEKSA</span>?
            </h2>
            <div class="flex justify-center gap-2 mb-4">
              <div class="w-20 h-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
              <div class="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
              <div class="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
            </div>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Platform digital yang dirancang khusus untuk transformasi pengelolaan ekstrakurikuler di SDN Sukapura 01
            </p>
          </div>

          <!-- Main Content Grid -->
          <div class="grid lg:grid-cols-2 gap-8 mb-12">
            <!-- Left Side - Main Info -->
            <div class="space-y-5">
              <!-- Primary Card -->
              <div class="group relative bg-gradient-to-br from-white to-purple-50 rounded-2xl p-7 shadow-xl border border-purple-100 hover:shadow-purple-200/50 transition-all duration-500 hover:-translate-y-1">
                <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-transparent rounded-bl-full"></div>
                <h3 class="text-2xl font-black text-gray-900 mb-3 relative z-10">
                  Sistem Informasi<br/>Ekstrakurikuler Sukapura Satu
                </h3>
                <p class="text-base text-gray-700 leading-relaxed relative z-10">
                  Platform digital yang dikembangkan khusus untuk <strong class="text-purple-600 font-bold">SDN Sukapura 01</strong> dalam mengelola seluruh kegiatan ekstrakurikuler secara terkomputerisasi, terintegrasi, dan modern.
                </p>
              </div>
              
              <!-- Secondary Card with Icon -->
              <div class="group relative bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 rounded-2xl p-7 shadow-xl text-white overflow-hidden hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105">
                <div class="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div class="absolute -left-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                
                <div class="relative z-10">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all">
                      <svg class="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <h4 class="text-xl font-black">Transformasi Digital</h4>
                  </div>
                  <p class="text-purple-100 text-base leading-relaxed">
                    Menggantikan sistem manual pencatatan data siswa, absensi, dokumentasi, hingga prestasi yang masih konvensional menjadi sistem digital yang efisien, cepat, dan mudah diakses kapan saja.
                  </p>
                </div>
              </div>
            </div>

            <!-- Right Side - Benefits Grid -->
            <div class="grid grid-cols-1 gap-4">
              <!-- Benefit Card 1 -->
              <div class="group bg-white rounded-xl p-5 shadow-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <div class="flex items-start gap-4">
                  <div class="w-11 h-11 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h5 class="font-black text-lg text-gray-900 mb-1">Pengelolaan Data Digital</h5>
                    <p class="text-base text-gray-600 leading-relaxed">Mempermudah pengelolaan data ekstrakurikuler secara digital dan terorganisir dengan baik</p>
                  </div>
                </div>
              </div>

              <!-- Benefit Card 2 -->
              <div class="group bg-white rounded-xl p-5 shadow-lg border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <div class="flex items-start gap-4">
                  <div class="w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h5 class="font-black text-lg text-gray-900 mb-1">Efisiensi Administrasi</h5>
                    <p class="text-base text-gray-600 leading-relaxed">Meningkatkan efisiensi administrasi kegiatan ekstrakurikuler secara signifikan</p>
                  </div>
                </div>
              </div>

              <!-- Benefit Card 3 -->
              <div class="group bg-white rounded-xl p-5 shadow-lg border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <div class="flex items-start gap-4">
                  <div class="w-11 h-11 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h5 class="font-black text-lg text-gray-900 mb-1">Monitoring Real-time</h5>
                    <p class="text-base text-gray-600 leading-relaxed">Memudahkan monitoring dan evaluasi kegiatan secara real-time dan akurat</p>
                  </div>
                </div>
              </div>

              <!-- Benefit Card 4 -->
              <div class="group bg-white rounded-xl p-5 shadow-lg border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <div class="flex items-start gap-4">
                  <div class="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h5 class="font-black text-lg text-gray-900 mb-1">Data Terintegrasi</h5>
                    <p class="text-base text-gray-600 leading-relaxed">Menyediakan data terintegrasi untuk pelaporan dan dokumentasi yang lengkap</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Fitur & Manfaat Section -->
    <section class="py-16 bg-white relative overflow-hidden">
      <!-- Decorative Background Elements -->
      <div class="absolute inset-0 bg-grid-white opacity-50"></div>
      <div class="absolute top-16 right-16 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-16 left-16 w-64 h-64 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-14">
          <div class="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-5 py-2 rounded-full text-xs font-bold mb-6 shadow-lg">
            <span class="text-lg">⚡</span>
            <span>Fitur Unggulan</span>
          </div>
          <h2 class="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Fitur & <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600">Manfaat</span>
          </h2>
          <div class="flex justify-center gap-2 mb-4">
            <div class="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
            <div class="w-20 h-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
            <div class="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
          </div>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Berbagai kemudahan dan kecanggihan yang ditawarkan untuk pengelolaan ekstrakurikuler modern
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <!-- Feature Card 1 - Monitoring Data -->
          <div class="group relative bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 hover:-rotate-1 overflow-hidden">
            <!-- Animated Background Pattern -->
            <div class="absolute inset-0 bg-grid-white opacity-10"></div>
            <div class="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            
            <div class="relative z-10">
              <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <svg class="w-7 h-7 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              
              <h3 class="text-xl font-black text-white mb-3">Monitoring Data</h3>
              <p class="text-purple-100 mb-4 leading-relaxed text-base">
                Dashboard interaktif yang menampilkan statistik lengkap kegiatan ekstrakurikuler secara real-time
              </p>
              
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-white text-base">
                  <div class="w-1.5 h-1.5 bg-yellow-300 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Data siswa aktif & non-aktif</span>
                </div>
                <div class="flex items-center gap-2 text-white text-base">
                  <div class="w-1.5 h-1.5 bg-yellow-300 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Grafik kehadiran dinamis</span>
                </div>
                <div class="flex items-center gap-2 text-white text-base">
                  <div class="w-1.5 h-1.5 bg-yellow-300 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Rekap prestasi terkini</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature Card 2 - Master Data -->
          <div class="group relative bg-white rounded-2xl p-6 shadow-xl border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-500 hover:scale-105 hover:rotate-1 overflow-hidden">
            <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-indigo-100 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div class="relative z-10">
              <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-lg">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              
              <h3 class="text-xl font-black text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">Master Data Terpusat</h3>
              <p class="text-gray-600 mb-4 leading-relaxed text-base">
                Semua data tersimpan dalam satu sistem yang terorganisir dan mudah diakses
              </p>
              
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-gray-700 text-base">
                  <div class="w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Data siswa lengkap</span>
                </div>
                <div class="flex items-center gap-2 text-gray-700 text-base">
                  <div class="w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Data ekstrakurikuler</span>
                </div>
                <div class="flex items-center gap-2 text-gray-700 text-base">
                  <div class="w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Data rombel per kelas</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature Card 3 - Pendaftaran Online -->
          <div class="group relative bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600 rounded-2xl p-6 shadow-xl hover:shadow-pink-500/50 transition-all duration-500 hover:scale-105 hover:-rotate-1 overflow-hidden">
            <div class="absolute inset-0 bg-grid-white opacity-10"></div>
            <div class="absolute -left-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            
            <div class="relative z-10">
              <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <svg class="w-7 h-7 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              <h3 class="text-xl font-black text-white mb-3">Pendaftaran Online</h3>
              <p class="text-pink-100 mb-4 leading-relaxed text-base">
                Proses pendaftaran ekstrakurikuler yang praktis dan paperless
              </p>
              
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-white text-base">
                  <div class="w-1.5 h-1.5 bg-yellow-300 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Form pendaftaran digital</span>
                </div>
                <div class="flex items-center gap-2 text-white text-base">
                  <div class="w-1.5 h-1.5 bg-yellow-300 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Verifikasi otomatis</span>
                </div>
                <div class="flex items-center gap-2 text-white text-base">
                  <div class="w-1.5 h-1.5 bg-yellow-300 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Notifikasi status real-time</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature Card 4 - Absensi Digital -->
          <div class="group relative bg-white rounded-2xl p-6 shadow-xl border-2 border-green-200 hover:border-green-400 hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-500 hover:scale-105 hover:rotate-1 overflow-hidden">
            <div class="absolute -left-6 -top-6 w-24 h-24 bg-gradient-to-br from-green-100 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div class="relative z-10">
              <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-lg">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              
              <h3 class="text-xl font-black text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Absensi Digital</h3>
              <p class="text-gray-600 mb-4 leading-relaxed text-base">
                Pencatatan kehadiran siswa yang akurat dan efisien
              </p>
              
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-gray-700 text-base">
                  <div class="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Input absensi cepat</span>
                </div>
                <div class="flex items-center gap-2 text-gray-700 text-base">
                  <div class="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Rekap otomatis harian</span>
                </div>
                <div class="flex items-center gap-2 text-gray-700 text-base">
                  <div class="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Laporan kehadiran detail</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature Card 5 - Penilaian Siswa -->
          <div class="group relative bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 hover:-rotate-1 overflow-hidden">
            <div class="absolute inset-0 bg-grid-white opacity-10"></div>
            <div class="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            
            <div class="relative z-10">
              <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <svg class="w-7 h-7 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              
              <h3 class="text-xl font-black text-white mb-3">Penilaian Siswa</h3>
              <p class="text-blue-100 mb-4 leading-relaxed text-base">
                Sistem penilaian terintegrasi untuk evaluasi hasil belajar ekstrakurikuler
              </p>
              
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-white text-base">
                  <div class="w-1.5 h-1.5 bg-yellow-300 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Input nilai praktik</span>
                </div>
                <div class="flex items-center gap-2 text-white text-base">
                  <div class="w-1.5 h-1.5 bg-yellow-300 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Penilaian sikap lengkap</span>
                </div>
                <div class="flex items-center gap-2 text-white text-base">
                  <div class="w-1.5 h-1.5 bg-yellow-300 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Cetak rapor ekskul</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature Card 6 - Pencatatan Prestasi -->
          <div class="group relative bg-white rounded-2xl p-6 shadow-xl border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-200/50 transition-all duration-500 hover:scale-105 hover:rotate-1 overflow-hidden">
            <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-yellow-100 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div class="relative z-10">
              <div class="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-lg">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              
              <h3 class="text-xl font-black text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">Pencatatan Prestasi</h3>
              <p class="text-gray-600 mb-4 leading-relaxed text-base">
                Dokumentasi lengkap prestasi siswa yang terdata rapi
              </p>
              
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-gray-700 text-base">
                  <div class="w-1.5 h-1.5 bg-yellow-500 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Database prestasi</span>
                </div>
                <div class="flex items-center gap-2 text-gray-700 text-base">
                  <div class="w-1.5 h-1.5 bg-yellow-500 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Upload sertifikat digital</span>
                </div>
                <div class="flex items-center gap-2 text-gray-700 text-base">
                  <div class="w-1.5 h-1.5 bg-yellow-500 rounded-full flex-shrink-0"></div>
                  <span class="font-semibold">Portfolio siswa otomatis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 relative overflow-hidden">
      <!-- Animated Gradient Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800"></div>
      <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <!-- Animated Circles -->
      <div class="absolute top-8 left-8 w-80 h-80 bg-gradient-to-br from-yellow-400/30 to-pink-500/30 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-8 right-8 w-64 h-64 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full blur-3xl animate-float-delayed"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
      
      <div class="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <div class="max-w-4xl mx-auto">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-xs font-bold text-white mb-6 border border-white/30 shadow-xl">
            <span class="text-lg">🚀</span>
            <span>Siap Memulai?</span>
          </div>
          
          <h2 class="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
            Akses Sistem <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 animate-gradient">SIEKSA</span>
          </h2>
          
          <p class="text-lg text-purple-100 mb-10 leading-relaxed">
            Login sekarang untuk mengakses sistem dan mulai mengelola kegiatan ekstrakurikuler dengan mudah dan modern
          </p>
          
          <NuxtLink 
            to="/login"
            class="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 px-10 py-4 rounded-xl font-black text-lg shadow-2xl hover:shadow-yellow-300/50 transition-all duration-300 hover:scale-110 overflow-hidden"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span class="relative z-10">Login ke Sistem</span>
            <svg class="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </NuxtLink>
          
          <!-- Additional Info -->
          <div class="mt-10 flex flex-wrap items-center justify-center gap-6 text-purple-200 text-sm">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="font-semibold">Akses 24/7</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="font-semibold">Aman & Terpercaya</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="font-semibold">Support Terbaik</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'SIEKSA - Sistem Informasi Ekstrakurikuler SDN Sukapura 01',
  meta: [
    { name: 'description', content: 'Sistem Informasi Ekstrakurikuler yang memudahkan pengelolaan data kegiatan ekstrakurikuler siswa SDN Sukapura 01' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/title-sieksa.png' }
  ]
})
</script>

<style scoped>
/* Grid Pattern */
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}

.bg-grid-white {
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
}

/* Floating Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  33% {
    transform: translateY(-30px) translateX(20px);
  }
  66% {
    transform: translateY(-15px) translateX(-20px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  33% {
    transform: translateY(25px) translateX(-25px) rotate(5deg);
  }
  66% {
    transform: translateY(-20px) translateX(15px) rotate(-5deg);
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0) translateX(0) scale(1);
  }
  50% {
    transform: translateY(-40px) translateX(30px) scale(1.1);
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
  animation-delay: 1s;
}

/* Pulse Animation */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

/* Gradient Animation */
@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Fade In Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}

.animate-fade-in-down {
  animation: fade-in-down 1s ease-out 0.3s both;
}

/* Shimmer Effect */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/* Glow Pulse */
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
  }
  50% {
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.4);
  }
}

/* Rotate Animation */
@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Scale Pulse */
@keyframes scale-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>