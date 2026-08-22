import type {
  TahunPelajaranResponse,
  RekapSiswaResponse,
  CreateAbsensiPayload,
  CreateAbsensiResponse
} from '~/app/types/absensi'
import type { EkstrakurikulerListResponse } from '~/app/types/master-data'
import type { PelatihListResponse } from '~/app/types/master-data'
import { handleAuthError } from '~/app/utils/authErrorHandler'

export class AbsensiService {
  private getApiBase(): string {
    const config = useRuntimeConfig()
    return config.public.apiBase as string
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  }

  private getHeaders() {
    const token = this.getAuthToken()
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  /**
   * Get list ekstrakurikuler active
   */
  async getEkstrakurikulerActive(): Promise<EkstrakurikulerListResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<EkstrakurikulerListResponse>(
        `${apiBase}/api/sieksa/ekstrakurikuler/get-ekstrakurikuler`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            search: {
              name: null,
              kelas_id: null,
              kategori: null,
              status: 'active'
            },
            pagination: {
              limit: 50,
              page: 1
            }
          }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Get list tahun pelajaran active
   */
  async getTahunPelajaranActive(): Promise<TahunPelajaranResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<TahunPelajaranResponse>(
        `${apiBase}/api/sieksa/tahun-pelajaran/get-tahun-pelajaran`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            search: {
              tahun_pelajaran: null,
              status: 'active'
            },
            pagination: {
              limit: 50,
              page: 1
            }
          }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Get pelatih by ekstrakurikuler
   */
  async getPelatihByEkskul(ekstrakurikulerId: number): Promise<PelatihListResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<PelatihListResponse>(
        `${apiBase}/api/sieksa/pelatih/get-pelatih`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            search: {
              nama: null,
              ekstrakurikuler_id: ekstrakurikulerId,
              status: 'active'
            },
            pagination: {
              limit: 50,
              page: 1
            }
          }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Get siswa by ekstrakurikuler and tahun pelajaran
   */
  async getSiswaByEkskul(
    ekstrakurikulerId: number,
    tahunPelajaranId: number
  ): Promise<RekapSiswaResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<RekapSiswaResponse>(
        `${apiBase}/api/sieksa/rekapitulasi-ekstrakurikuler/rekapitulasi-data-per-ekskul`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            ekstrakurikuler_id: ekstrakurikulerId,
            search: {
              tahun_pelajaran_id: tahunPelajaranId,
              nama: null,
              nis: null,
              rombel_id: null
            },
            pagination: {
              limit: 1000,
              page: 1
            }
          }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Create absensi
   */
  async createAbsensi(payload: CreateAbsensiPayload): Promise<CreateAbsensiResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<CreateAbsensiResponse>(
        `${apiBase}/api/sieksa/absensi-ekstrakurikuler/create-absensi`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: payload
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Get list rombel active
   */
  async getRombelActive(): Promise<import('~/app/types/absensi').RombelListResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<import('~/app/types/absensi').RombelListResponse>(
        `${apiBase}/api/sieksa/rombel/get-rombel`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            search: {
              name: null,
              status: 'active',
              kelas_id: null
            },
            pagination: {
              limit: 50,
              page: 1
            }
          }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Get tahun pelajaran all (including inactive)
   */
  async getTahunPelajaranAll(): Promise<import('~/app/types/absensi').TahunPelajaranResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<import('~/app/types/absensi').TahunPelajaranResponse>(
        `${apiBase}/api/sieksa/tahun-pelajaran/get-tahun-pelajaran`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            search: {
              tahun_pelajaran: null,
              status: null
            },
            pagination: {
              limit: 50,
              page: 1
            }
          }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Get rekap absensi siswa
   */
  async getRekapAbsensiSiswa(
    ekstrakurikulerId: number,
    tahunPelajaranId: number,
    nama: string | null,
    rombelId: number | null,
    bulan: number,
    tahun: number
  ): Promise<import('~/app/types/absensi').RekapAbsensiSiswaResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<import('~/app/types/absensi').RekapAbsensiSiswaResponse>(
        `${apiBase}/api/sieksa/absensi-ekstrakurikuler/get-absensi-siswa`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            ekstrakurikuler_id: ekstrakurikulerId,
            tahun_pelajaran_id: tahunPelajaranId,
            nama: nama,
            rombel_id: rombelId,
            bulan: bulan,
            tahun: tahun
          }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Get detail absensi siswa by id
   */
  async getDetailAbsensiSiswa(id: number): Promise<import('~/app/types/absensi').DetailAbsensiSiswaResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<import('~/app/types/absensi').DetailAbsensiSiswaResponse>(
        `${apiBase}/api/sieksa/absensi-ekstrakurikuler/get-absensi-siswa-by-id`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            id: id
          }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Update absensi siswa (supports both update and insert)
   */
  async updateAbsensiSiswa(
    id: number | null, 
    status: string, 
    keterangan: string,
    kegiatanEkskulId?: number,
    pesertaDidikRombelId?: number
  ): Promise<import('~/app/types/absensi').UpdateAbsensiSiswaResponse> {
    const apiBase = this.getApiBase()
    
    try {
      const body: any = {
        id: id,
        status: status,
        keterangan: keterangan
      }
      
      // Jika insert data baru (id === null), tambahkan parameter wajib
      if (id === null && kegiatanEkskulId && pesertaDidikRombelId) {
        body.kegiatan_ekskul_id = kegiatanEkskulId
        body.peserta_didik_rombel_id = pesertaDidikRombelId
      }
      
      return await $fetch<import('~/app/types/absensi').UpdateAbsensiSiswaResponse>(
        `${apiBase}/api/sieksa/absensi-ekstrakurikuler/update-absensi-siswa`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: body
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Get pelatih by ekstrakurikuler (for filter)
   */
  async getPelatihForFilter(ekstrakurikulerId: number | null): Promise<PelatihListResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<PelatihListResponse>(
        `${apiBase}/api/sieksa/pelatih/get-pelatih`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            search: {
              nama: null,
              ekstrakurikuler_id: ekstrakurikulerId,
              status: 'active'
            },
            pagination: {
              limit: 100,
              page: 1
            }
          }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Get rekap absensi pelatih
   */
  async getRekapAbsensiPelatih(
    pelatihId: number,
    tahunPelajaranId: number,
    ekstrakurikulerId: number,
    bulan: number,
    tahun: number
  ): Promise<import('~/app/types/absensi').RekapAbsensiPelatihResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<import('~/app/types/absensi').RekapAbsensiPelatihResponse>(
        `${apiBase}/api/sieksa/absensi-ekstrakurikuler/get-absensi-pelatih`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            pelatih_id: pelatihId,
            tahun_pelajaran_id: tahunPelajaranId,
            ekstrakurikuler_id: ekstrakurikulerId,
            bulan: bulan,
            tahun: tahun
          }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Get kegiatan ekstrakurikuler
   */
  async getKegiatanEkskul(
    ekstrakurikulerId: number,
    tahunPelajaranId: number,
    bulan: number,
    tahun: number
  ): Promise<import('~/app/types/absensi').KegiatanEkskulResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<import('~/app/types/absensi').KegiatanEkskulResponse>(
        `${apiBase}/api/sieksa/absensi-ekstrakurikuler/get-kegiatan-ekskul`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            ekstrakurikuler_id: ekstrakurikulerId,
            tahun_pelajaran_id: tahunPelajaranId,
            bulan: bulan,
            tahun: tahun
          }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Update absensi pelatih
   */
  async updateAbsensiPelatih(
    kegiatanEkskulId: number,
    pelatihId: number,
    status: boolean
  ): Promise<import('~/app/types/absensi').UpdateAbsensiPelatihResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<import('~/app/types/absensi').UpdateAbsensiPelatihResponse>(
        `${apiBase}/api/sieksa/absensi-ekstrakurikuler/update-absensi-pelatih`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            kegiatan_ekskul_id: kegiatanEkskulId,
            pelatih_id: pelatihId,
            status: status
          }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Download excel absensi siswa
   */
  async downloadExcelAbsensiSiswa(
    ekstrakurikulerId: number,
    tahunPelajaranId: number,
    bulan: number,
    tahun: number
  ): Promise<Blob> {
    const apiBase = this.getApiBase()
    const token = this.getAuthToken()
    
    try {
      const response = await fetch(
        `${apiBase}/api/sieksa/absensi-ekstrakurikuler/download-excel-absensi-siswa`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ekstrakurikuler_id: ekstrakurikulerId,
            tahun_pelajaran_id: tahunPelajaranId,
            bulan: bulan,
            tahun: tahun
          })
        }
      )
      
      if (!response.ok) {
        const errorData = await response.json()
        throw errorData
      }
      
      return await response.blob()
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Download PDF absensi siswa
   */
  async downloadPdfAbsensiSiswa(
    ekstrakurikulerId: number,
    tahunPelajaranId: number,
    bulan: number,
    tahun: number
  ): Promise<Blob> {
    const apiBase = this.getApiBase()
    const token = this.getAuthToken()
    
    try {
      const response = await fetch(
        `${apiBase}/api/sieksa/absensi-ekstrakurikuler/download-pdf-absensi-siswa`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ekstrakurikuler_id: ekstrakurikulerId,
            tahun_pelajaran_id: tahunPelajaranId,
            bulan: bulan,
            tahun: tahun
          })
        }
      )
      
      if (!response.ok) {
        const errorData = await response.json()
        throw errorData
      }
      
      return await response.blob()
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Download excel absensi pelatih
   */
  async downloadExcelAbsensiPelatih(
    tahunPelajaranId: number,
    ekstrakurikulerId: number,
    pelatihId: number,
    bulan: number,
    tahun: number
  ): Promise<Blob> {
    const apiBase = this.getApiBase()
    const token = this.getAuthToken()
    
    try {
      const response = await fetch(
        `${apiBase}/api/sieksa/absensi-ekstrakurikuler/download-excel-absensi-pelatih`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            tahun_pelajaran_id: tahunPelajaranId,
            ekstrakurikuler_id: ekstrakurikulerId,
            pelatih_id: pelatihId,
            bulan: bulan,
            tahun: tahun
          })
        }
      )
      
      if (!response.ok) {
        const errorData = await response.json()
        throw errorData
      }
      
      return await response.blob()
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Download PDF absensi pelatih
   */
  async downloadPdfAbsensiPelatih(
    tahunPelajaranId: number,
    ekstrakurikulerId: number,
    pelatihId: number,
    bulan: number,
    tahun: number
  ): Promise<Blob> {
    const apiBase = this.getApiBase()
    const token = this.getAuthToken()
    
    try {
      const response = await fetch(
        `${apiBase}/api/sieksa/absensi-ekstrakurikuler/download-pdf-absensi-pelatih`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            tahun_pelajaran_id: tahunPelajaranId,
            ekstrakurikuler_id: ekstrakurikulerId,
            pelatih_id: pelatihId,
            bulan: bulan,
            tahun: tahun
          })
        }
      )
      
      if (!response.ok) {
        const errorData = await response.json()
        throw errorData
      }
      
      return await response.blob()
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }
}

// Singleton instance
let absensiServiceInstance: AbsensiService | null = null

export const useAbsensiService = () => {
  if (!absensiServiceInstance) {
    absensiServiceInstance = new AbsensiService()
  }
  return absensiServiceInstance
}
