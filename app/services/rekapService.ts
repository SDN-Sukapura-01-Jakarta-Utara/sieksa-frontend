import type {
  RekapPerEkskulResponse,
  RekapPerRombelResponse
} from '~/app/types/rekap'
import { handleAuthError } from '~/app/utils/authErrorHandler'

export class RekapService {
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
   * Get rekapitulasi data per ekstrakurikuler
   */
  async getRekapPerEkskul(
    ekskulId: number,
    tahunPelajaranId: number,
    nama: string | null = null,
    nis: string | null = null,
    rombelId: number | null = null,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: RekapPerEkskulResponse }> {
    const apiBase = this.getApiBase()
    
    const searchPayload: any = {
      tahun_pelajaran_id: tahunPelajaranId,
      nama: nama || '',
      nis: nis || '',
      rombel_id: rombelId || 0
    }
    
    try {
      return await $fetch<{ data: RekapPerEkskulResponse }>(
        `${apiBase}/api/sieksa/rekapitulasi-ekstrakurikuler/rekapitulasi-data-per-ekskul`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            ekstrakurikuler_id: ekskulId,
            search: searchPayload,
            pagination: {
              limit,
              page
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
   * Get rekapitulasi data per rombel
   */
  async getRekapPerRombel(
    rombelId: number,
    tahunPelajaranId: number,
    nama: string | null = null,
    nis: string | null = null,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: RekapPerRombelResponse }> {
    const apiBase = this.getApiBase()
    
    const searchPayload: any = {
      nama: nama || '',
      nis: nis || ''
    }
    
    try {
      return await $fetch<{ data: RekapPerRombelResponse }>(
        `${apiBase}/api/sieksa/rekapitulasi-ekstrakurikuler/rekapitulasi-data-per-rombel`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            rombel_id: rombelId,
            tahun_pelajaran_id: tahunPelajaranId,
            search: searchPayload,
            pagination: {
              limit,
              page
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
   * Download Excel data per ekstrakurikuler
   */
  async downloadExcelPerEkskul(
    ekskulId: number,
    tahunPelajaranId: number,
    nama: string | null = null,
    nis: string | null = null,
    rombelId: number | null = null,
    page: number = 1,
    limit: number = 10
  ): Promise<Blob> {
    const apiBase = this.getApiBase()
    const token = this.getAuthToken()
    
    const searchPayload: any = {
      nama: nama || '',
      nis: nis || '',
      rombel_id: rombelId || 0
    }
    
    try {
      const response = await fetch(
        `${apiBase}/api/sieksa/rekapitulasi-ekstrakurikuler/download-excel-data-per-ekskul`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ekstrakurikuler_id: ekskulId,
            tahun_pelajaran_id: tahunPelajaranId,
            search: searchPayload,
            pagination: {
              limit,
              page
            }
          })
        }
      )
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error: any = new Error('Download failed')
        error.data = errorData
        error.statusCode = response.status
        throw error
      }
      
      return await response.blob()
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Download Excel data per rombel
   */
  async downloadExcelPerRombel(
    rombelId: number,
    tahunPelajaranId: number,
    nama: string | null = null,
    nis: string | null = null,
    page: number = 1,
    limit: number = 10
  ): Promise<Blob> {
    const apiBase = this.getApiBase()
    const token = this.getAuthToken()
    
    const searchPayload: any = {
      nama: nama || '',
      nis: nis || ''
    }
    
    try {
      const response = await fetch(
        `${apiBase}/api/sieksa/rekapitulasi-ekstrakurikuler/download-excel-data-per-rombel`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            rombel_id: rombelId,
            tahun_pelajaran_id: tahunPelajaranId,
            search: searchPayload,
            pagination: {
              limit,
              page
            }
          })
        }
      )
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error: any = new Error('Download failed')
        error.data = errorData
        error.statusCode = response.status
        throw error
      }
      
      return await response.blob()
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }
}

// Singleton instance
let rekapServiceInstance: RekapService | null = null

export const useRekapService = () => {
  if (!rekapServiceInstance) {
    rekapServiceInstance = new RekapService()
  }
  return rekapServiceInstance
}
