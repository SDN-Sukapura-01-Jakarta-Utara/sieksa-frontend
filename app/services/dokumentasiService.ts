import type { KegiatanDokumentasiResponse } from '~/app/types/absensi'
import { handleAuthError } from '~/app/utils/authErrorHandler'

export class DokumentasiService {
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
   * Get kegiatan ekstrakurikuler with pelatih info
   */
  async getKegiatanEkskul(
    ekstrakurikulerId: number,
    tahunPelajaranId: number,
    bulan: number,
    tahun: number
  ): Promise<KegiatanDokumentasiResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<KegiatanDokumentasiResponse>(
        `${apiBase}/api/sieksa/kegiatan-ekstrakurikuler/get-kegiatan-ekskul`,
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
   * Get kegiatan by ID
   */
  async getKegiatanById(id: number): Promise<import('~/app/types/absensi').KegiatanByIdResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<import('~/app/types/absensi').KegiatanByIdResponse>(
        `${apiBase}/api/sieksa/kegiatan-ekstrakurikuler/get-kegiatan-ekskul-by-id`,
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
   * Update kegiatan
   */
  async updateKegiatan(formData: FormData): Promise<import('~/app/types/absensi').UpdateKegiatanResponse> {
    const apiBase = this.getApiBase()
    const token = this.getAuthToken()
    
    try {
      return await $fetch<import('~/app/types/absensi').UpdateKegiatanResponse>(
        `${apiBase}/api/sieksa/kegiatan-ekstrakurikuler/update-kegiatan-ekskul`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }
}

// Singleton instance
let dokumentasiServiceInstance: DokumentasiService | null = null

export const useDokumentasiService = () => {
  if (!dokumentasiServiceInstance) {
    dokumentasiServiceInstance = new DokumentasiService()
  }
  return dokumentasiServiceInstance
}
