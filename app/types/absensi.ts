// Types untuk Absensi

export interface TahunPelajaran {
  id: number
  tahun_pelajaran: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  created_by_id: number
  updated_by_id: number | null
}

export interface TahunPelajaranResponse {
  data: TahunPelajaran[]
  pagination: {
    limit: number
    offset: number
    page: number
    total: number
    total_pages: number
  }
}

export interface SiswaEkskul {
  peserta_didik_rombel_id: number
  peserta_didik_id: number
  nama: string
  nis: string
  nisn: string
  rombel_id: number
  nama_rombel: string
  tanggal_daftar: string
}

export interface RekapSiswaEkskul {
  ekstrakurikuler_id: number
  nama_ekstrakurikuler: string
  kategori: string
  total_siswa: number
  siswa: SiswaEkskul[]
}

export interface RekapSiswaResponse {
  data: {
    tahun_pelajaran_id: number
    ekstrakurikuler: RekapSiswaEkskul[]
    total_ekstrakurikuler: number
    pagination: {
      limit: number
      offset: number
      page: number
      total: number
      total_pages: number
    }
  }
}

export interface AbsensiSiswaForm {
  peserta_didik_rombel_id: number
  status: 'hadir' | 'izin' | 'sakit' | 'alpa'
  keterangan: string | null
}

export interface CreateAbsensiPayload {
  ekstrakurikuler_id: number
  tahun_pelajaran_id: number
  tanggal_kegiatan: string
  waktu_mulai: string
  waktu_selesai: string
  materi_kegiatan: string
  absensi_siswa: AbsensiSiswaForm[]
  absensi_pelatih: { pelatih_id: number }[]
}

export interface CreateAbsensiResponse {
  message: string
  data: {
    kegiatan_ekskul_id: number
    ekstrakurikuler_id: number
    tahun_pelajaran_id: number
    tanggal_kegiatan: string
    materi_kegiatan: string
    total_siswa_hadir: number
    total_siswa_sakit: number
    total_siswa_izin: number
    total_siswa_alpha: number
    total_pelatih_hadir: number
  }
}


// Types untuk Rombel
export interface Rombel {
  id: number
  name: string
  status: 'active' | 'inactive'
  kelas_id: number
  kelas: {
    id: number
    name: string
    status: string
  }
  created_at: string
  updated_at: string
  created_by_id: number
  updated_by_id: number | null
}

export interface RombelListResponse {
  data: Rombel[]
  pagination: {
    limit: number
    offset: number
    page: number
    total: number
    total_pages: number
  }
}

// Types untuk Rekap Absensi Siswa
export interface AbsensiSiswaDetail {
  id: number
  peserta_didik_rombel_id: number
  nama_siswa: string
  nisn: string
  nama_kelas: string
  nama_rombel: string
  status: 'hadir' | 'izin' | 'sakit' | 'alpa'
  keterangan: string | null
}

export interface KegiatanAbsensi {
  id: number
  tanggal_kegiatan: string
  waktu_mulai: string
  waktu_selesai: string
  materi_kegiatan: string
  foto_kegiatan: string | null
  absensi_siswa: AbsensiSiswaDetail[]
  absensi_pelatih: any[]
  total_siswa_hadir: number
  total_siswa_sakit: number
  total_siswa_izin: number
  total_siswa_alpha: number
  total_pelatih_hadir: number
}

export interface RekapAbsensiSiswaResponse {
  message: string
  data: {
    ekstrakurikuler_id: number
    nama_ekstrakurikuler: string
    tahun_pelajaran_id: number
    tahun_pelajaran: string
    total_kegiatan: number
    kegiatan: KegiatanAbsensi[]
  }
}


// Types untuk Detail Absensi Siswa
export interface DetailAbsensiSiswa {
  id: number
  kegiatan_ekskul_id: number
  peserta_didik_rombel_id: number
  nama_siswa: string
  nisn: string
  nama_kelas: string
  nama_rombel: string
  status: 'hadir' | 'izin' | 'sakit' | 'alpa'
  keterangan: string | null
  tanggal_kegiatan: string
  waktu_mulai: string
  waktu_selesai: string
  materi_kegiatan: string
  ekstrakurikuler_id: number
  nama_ekstrakurikuler: string
  tahun_pelajaran_id: number
  tahun_pelajaran: string
}

export interface DetailAbsensiSiswaResponse {
  message: string
  data: DetailAbsensiSiswa
}

// Types untuk Update Absensi Siswa
export interface UpdateAbsensiSiswaResponse {
  message: string
  data: DetailAbsensiSiswa
}
