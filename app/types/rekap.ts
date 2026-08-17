export interface SiswaPerEkskul {
  peserta_didik_rombel_id: number
  peserta_didik_id: number
  nama: string
  nis: string
  nisn: string
  rombel_id: number
  nama_rombel: string
  tanggal_daftar: string
}

export interface EkskulRekap {
  ekstrakurikuler_id: number
  nama_ekstrakurikuler: string
  kategori: 'wajib' | 'tidak wajib'
  total_siswa: number
  siswa: SiswaPerEkskul[]
}

export interface RekapPerEkskulResponse {
  tahun_pelajaran_id: number
  ekstrakurikuler: EkskulRekap[]
  total_ekstrakurikuler: number
  pagination: {
    limit: number
    offset: number
    page: number
    total: number
    total_pages: number
  }
}

export interface EkskulSiswaRombel {
  ekstrakurikuler_id: number
  nama_ekstrakurikuler: string
  kategori: 'wajib' | 'tidak wajib'
}

export interface SiswaPerRombel {
  peserta_didik_rombel_id: number
  peserta_didik_id: number
  nama: string
  nis: string
  nisn: string
  ekstrakurikuler: EkskulSiswaRombel[]
  total_ekskul: number
}

export interface RekapPerRombelResponse {
  rombel_id: number
  nama_rombel: string
  tahun_pelajaran_id: number
  siswa: SiswaPerRombel[]
  total_siswa: number
  pagination: {
    limit: number
    offset: number
    page: number
    total: number
    total_pages: number
  }
}

export interface RekapFilter {
  nama: string
  nis: string
  tahun_pelajaran_id: number | null
  rombel_id: number | null
  page: number
  limit: number
}
