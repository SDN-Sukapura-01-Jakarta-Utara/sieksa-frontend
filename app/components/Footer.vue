<template>
  <footer class="bg-gradient-to-br from-gray-900 to-black text-white mt-auto">
    <div class="container mx-auto px-4 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <!-- About Section -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <img src="/logo-sieksa.png" alt="Logo SIEKSA" class="h-12 w-12 object-contain bg-white rounded-full p-2">
            <div>
              <h3 class="text-xl font-bold">SIEKSA</h3>
              <p class="text-sm text-purple-200">SDN Sukapura 01</p>
            </div>
          </div>
          <p class="text-sm text-gray-300 leading-relaxed">
            Sistem Informasi Ekstrakurikuler yang memudahkan pengelolaan data kegiatan ekstrakurikuler siswa.
          </p>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Kontak Kami
          </h3>
          <div class="space-y-3 text-sm text-gray-300">
            <p class="flex items-start gap-3">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>Jl. Beo No.15, Komp.Walikota No.2, RT.12/RW.6, Sukapura, Kec. Cilincing, Jakarta Utara, DKI Jakarta 14140</span>
            </p>
            <p class="flex items-center gap-3 hover:text-purple-300 transition cursor-pointer">
              <svg class="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>021-4411729</span>
            </p>
            <p class="flex items-center gap-3 hover:text-purple-300 transition cursor-pointer">
              <svg class="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>sdnsukapuraa01@gmail.com</span>
            </p>
          </div>
        </div>

        <!-- Social Media -->
        <div>
          <h3 class="text-lg font-bold mb-4">Ikuti Kami</h3>
          <div class="flex flex-wrap gap-3">
            <a href="#" class="group bg-white/10 hover:bg-purple-500 p-3 rounded-xl transition-all hover:scale-110 hover:shadow-lg">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </a>
            <a href="#" class="group bg-white/10 hover:bg-red-500 p-3 rounded-xl transition-all hover:scale-110 hover:shadow-lg">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
              </svg>
            </a>
            <a href="#" class="group bg-white/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 p-3 rounded-xl transition-all hover:scale-110 hover:shadow-lg">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
            </a>
            <a href="#" class="group bg-white/10 hover:bg-black p-3 rounded-xl transition-all hover:scale-110 hover:shadow-lg">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="border-t border-white/10 pt-6 space-y-3">
        <p class="text-sm text-center text-gray-300">
          © 2026 SIEKSA - SDN Sukapura 01. All rights reserved.
        </p>
        <p class="text-xs text-center text-gray-400 flex items-center justify-center gap-1.5">
          Handcrafted and made with
          <svg class="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          by
          <span class="font-semibold text-purple-300">Syahira Isnaeni Dewi</span>
        </p>
      </div>
    </div>
  </footer>
</template>
