# SIEKSA Frontend

Project frontend SIEKSA menggunakan Nuxt.js, Tailwind CSS, dan Pinia.

## Struktur Project

```
sieksa-frontend/
├── app/
│   ├── assets/         # CSS, images, fonts
│   ├── components/     # Vue components
│   ├── composables/    # Composable functions
│   ├── interfaces/     # TypeScript interfaces
│   ├── layouts/        # Layout components
│   ├── middleware/     # Route middleware
│   ├── pages/          # Page components (auto-routing)
│   ├── plugins/        # Nuxt plugins
│   ├── services/       # API services
│   ├── stores/         # Pinia stores
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── public/             # Static files
├── .env                # Environment variables
├── .env.local          # Local environment variables
├── .env.example        # Example environment variables
└── app.vue             # Root component
```

## Setup

Install dependencies:

```bash
npm install
```

## Development Server

Jalankan development server di `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build aplikasi untuk production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Deploy dengan PM2:

```bash
npm run build
pm2 start ecosystem.config.cjs
```

## Environment Variables

Copy `.env.example` ke `.env` dan sesuaikan dengan konfigurasi:

```bash
cp .env.example .env
```

## Tech Stack

- **Nuxt.js 3** - Framework Vue.js
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management untuk Vue
- **TypeScript** - Type safety

## Permission System

SIEKSA menggunakan permission-based access control untuk mengatur akses user ke menu-menu tertentu.

### Cara Kerja

1. **Login**: User login dan mendapat token + permissions dari backend
2. **Storage**: Permissions disimpan di localStorage
3. **Filter**: Menu di dashboard difilter berdasarkan permissions user
4. **Display**: Hanya menu dengan permission yang sesuai yang ditampilkan

### Penggunaan

Gunakan composable `usePermission` untuk mengecek permission:

```typescript
const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission()

// Cek single permission
if (hasPermission('READ_MONITORING_EKSTRAKURIKULER')) {
  // User punya akses
}

// Cek multiple (salah satu)
if (hasAnyPermission(['READ_MASTER_DATA_EKSTRAKURIKULER', 'UPDATE_MASTER_DATA_EKSTRAKURIKULER'])) {
  // User punya minimal 1 permission
}

// Cek multiple (semua)
if (hasAllPermissions(['READ_MASTER_DATA_EKSTRAKURIKULER', 'CREATE_MASTER_DATA_EKSTRAKURIKULER'])) {
  // User punya semua permission
}
```

## Arsitektur Aplikasi

### Layer Architecture

SIEKSA menggunakan layered architecture untuk separation of concerns yang baik:

**1. Types Layer** (`app/types/`)
- Mendefinisikan TypeScript interfaces
- Type safety untuk semua data structures
- Shared types across application

**2. Service Layer** (`app/services/`)
- HTTP API calls ke backend
- Data transformation
- Error handling
- Singleton pattern

**3. Store Layer** (`app/stores/`)
- Centralized state management (Pinia)
- Getters untuk computed values
- Actions untuk mutations
- State persistence

**4. Composable Layer** (`app/composables/`)
- Business logic
- Orchestrate services & stores
- Reusable functions
- Side effects handling

**5. Component/Page Layer**
- UI presentation
- User interactions
- Minimal logic

### Contoh Implementasi: Pendaftaran Ekstrakurikuler

#### 1. Types (`app/types/pendaftaran.ts`)
```typescript
export interface Ekstrakurikuler {
  id: number
  name: string
  kategori: 'wajib' | 'tidak wajib'
}
```

#### 2. Service (`app/services/pendaftaranService.ts`)
```typescript
export class PendaftaranService {
  async getEkstrakurikuler() {
    return await $fetch('/api/ekstrakurikuler', {
      headers: this.getHeaders()
    })
  }
}
```

#### 3. Store (`app/stores/pendaftaran.ts`)
```typescript
export const usePendaftaranStore = defineStore('pendaftaran', {
  state: () => ({ ekskulList: [] }),
  actions: {
    setEkskulList(list) {
      this.ekskulList = list
    }
  }
})
```

#### 4. Composable (`app/composables/usePendaftaran.ts`)
```typescript
export const usePendaftaran = () => {
  const store = usePendaftaranStore()
  const service = usePendaftaranService()
  
  const fetchEkskul = async () => {
    const response = await service.getEkstrakurikuler()
    store.setEkskulList(response.data)
  }
  
  return { fetchEkskul }
}
```

#### 5. Page Component (`app/pages/pendaftaran.vue`)
```vue
<script setup>
const { store, fetchEkskul } = usePendaftaran()

onMounted(() => fetchEkskul())
</script>

<template>
  <div v-for="ekskul in store.ekskulList">
    {{ ekskul.name }}
  </div>
</template>
```

### Best Practices

1. **Separation of Concerns**: Setiap layer punya tanggung jawab spesifik
2. **Type Safety**: Gunakan TypeScript untuk semua data structures
3. **Reusability**: Composables dan services dapat digunakan di multiple components
4. **Testability**: Setiap layer dapat di-test secara terpisah
5. **Maintainability**: Perubahan di satu layer minimal impact ke layer lain
