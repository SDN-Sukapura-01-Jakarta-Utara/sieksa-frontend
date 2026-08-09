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
