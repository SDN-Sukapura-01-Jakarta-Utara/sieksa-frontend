export interface TahunPelajaran {
  id: number
  tahun_pelajaran: string
  status: string
  created_at: string
  updated_at: string
  created_by_id: number | null
  updated_by_id: number | null
}

export interface Kelas {
  id: number
  name: string
  status: string
  created_at?: string
  updated_at?: string
}

export interface Rombel {
  id: number
  name: string
  status: string
  kelas_id: number
  kelas: Kelas
  created_at?: string
  updated_at?: string
}

export interface PesertaDidik {
  id: number
  nama: string
  nis: string
  jenis_kelamin: string
  nisn: string
  tempat_lahir: string
  tanggal_lahir: string
  nik?: string
  agama?: string
  alamat?: string
  rt?: string
  rw?: string
  kelurahan?: string
  kecamatan?: string
  kode_pos?: string
  nama_ayah?: string
  nama_ibu?: string
  status: string
  username?: string
  photo?: string
  barcode?: string
  barcode_generated_at?: string
  roles?: any[]
  created_at?: string
  updated_at?: string
  created_by_id?: number | null
  updated_by_id?: number | null
}

export interface PemetaanRombel {
  id: number
  peserta_didik_id: number
  peserta_didik: PesertaDidik
  rombel_id: number
  rombel?: Rombel
  tahun_pelajaran_id: number
  tahun_pelajaran?: TahunPelajaran
  status: string
  created_at?: string
  updated_at?: string
  created_by_id?: number | null
  updated_by_id?: number | null
}

export interface Ekstrakurikuler {
  id: number
  name: string
  kelas_ids: number[] | null
  kelas: Kelas[] | null
  kategori: 'wajib' | 'tidak wajib'
  status: string
  created_at?: string
  updated_at?: string
  created_by_id?: number | null
  updated_by_id?: number | null
}

export interface EkstrakurikulerSiswaDetail {
  id: number
  name: string
  kelas_ids: number[] | null
  kelas: Kelas[] | null
  kategori: 'wajib' | 'tidak wajib'
  status: string
  created_at?: string
  updated_at?: string
  created_by_id?: number | null
  updated_by_id?: number | null
}

export interface EkstrakurikulerSiswaItem {
  id: number
  peserta_didik_rombel_id: number
  ekstrakurikuler_id: number
  ekstrakurikuler?: EkstrakurikulerSiswaDetail
  created_at?: string
  updated_at?: string
}

export interface SiswaEkstrakurikuler {
  peserta_didik_rombel_id: number
  peserta_didik_id: number
  nama_lengkap: string
  nisn: string
  ekstrakurikuler: EkstrakurikulerSiswaItem[]
  total_ekskul: number
}

export interface AllEkstrakurikulerSiswaResponse {
  rombel_id: number
  tahun_pelajaran_id: number
  siswa: SiswaEkstrakurikuler[]
  total_siswa: number
}

export interface RegisterEkstrakurikulerPayload {
  siswa: {
    peserta_didik_rombel_id: number
    ekstrakurikuler_ids: number[]
  }[]
}

export interface RegisterEkstrakurikulerDetail {
  peserta_didik_rombel_id: number
  status: 'success' | 'failed'
  added: number
  removed: number
  kept: number
  error?: string
}

export interface RegisterEkstrakurikulerResponse {
  message: string
  summary: {
    total_siswa: number
    total_added: number
    total_removed: number
    total_kept: number
    success_count: number
    failed_count: number
  }
  details: RegisterEkstrakurikulerDetail[]
}

export interface ApiResponse<T> {
  data: T
  pagination?: {
    limit: number
    offset: number
    page: number
    total: number
    total_pages: number
  }
}

export interface CheckboxState {
  [key: string]: boolean
}
