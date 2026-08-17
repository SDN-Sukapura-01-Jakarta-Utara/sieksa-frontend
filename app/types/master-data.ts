// Types untuk Master Data Ekstrakurikuler

export interface Kelas {
  id: number
  name: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  created_by_id: number
  updated_by_id: number | null
}

export interface KelasListResponse {
  data: Kelas[]
  pagination: {
    limit: number
    offset: number
    page: number
    total: number
    total_pages: number
  }
}

export interface EkstrakurikulerItem {
  id: number
  name: string
  kelas_ids: number[]
  kelas: Kelas[]
  kategori: 'wajib' | 'tidak wajib'
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  created_by_id: number
  updated_by_id: number | null
}

export interface EkstrakurikulerListResponse {
  data: EkstrakurikulerItem[]
  pagination: {
    limit: number
    offset: number
    page: number
    total: number
    total_pages: number
  }
}

export interface EkstrakurikulerSearchFilter {
  name: string
  kelas_id: number | null
  kategori: string
  status: string
}

export interface EkstrakurikulerSearchPayload {
  search: EkstrakurikulerSearchFilter
  pagination: {
    limit: number
    page: number
  }
}

// Types untuk Pelatih

export interface PelatihEkstrakurikuler {
  id: number
  name: string
  kategori: 'wajib' | 'tidak wajib'
  status: 'active' | 'inactive'
}

export interface PelatihItem {
  id: number
  nama: string
  username: string
  telepon: string
  alamat: string
  foto_profil: string | null
  keahlian: string
  sertifikat: string[] | null
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  ekstrakurikuler: PelatihEkstrakurikuler[]
}

export interface PelatihListResponse {
  data: PelatihItem[]
  pagination: {
    limit: number
    offset: number
    page: number
    total: number
    total_pages: number
  }
}

export interface PelatihSearchFilter {
  nama: string
  ekstrakurikuler_id: number | null
  status: string
}

export interface PelatihSearchPayload {
  search: PelatihSearchFilter
  pagination: {
    limit: number
    page: number
  }
}

// Types untuk Roles

export interface RoleItem {
  id: number
  name: string
  description: string
  system_id: number
  status: 'active' | 'inactive'
}

export interface RolesListResponse {
  data: RoleItem[]
  pagination: {
    limit: number
    offset: number
    page: number
    total: number
    total_pages: number
  }
}
