import type {
  TahunPelajaran,
  Rombel,
  PemetaanRombel,
  Ekstrakurikuler,
  AllEkstrakurikulerSiswaResponse,
  RegisterEkstrakurikulerPayload,
  RegisterEkstrakurikulerResponse,
  ApiResponse
} from '~/app/types/pendaftaran'
import { handleAuthError } from '~/app/utils/authErrorHandler'

export class PendaftaranService {
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
   * Get daftar tahun pelajaran
   */
  async getTahunPelajaran(
    tahunPelajaran: string | null = null,
    status: string | null = null,
    limit: number = 50,
    page: number = 1
  ): Promise<ApiResponse<TahunPelajaran[]>> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<ApiResponse<TahunPelajaran[]>>(
        `${apiBase}/api/sieksa/tahun-pelajaran/get-tahun-pelajaran`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            search: {
              tahun_pelajaran: tahunPelajaran,
              status: status
            },
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
   * Get daftar rombel
   */
  async getRombel(
    name: string | null = null,
    status: string = 'active',
    kelasId: number | null = null,
    limit: number = 50,
    page: number = 1
  ): Promise<ApiResponse<Rombel[]>> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<ApiResponse<Rombel[]>>(
        `${apiBase}/api/sieksa/rombel/get-rombel`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            search: {
              name,
              status,
              kelas_id: kelasId
            },
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
   * Get daftar siswa by rombel dan tahun pelajaran
   */
  async getPemetaanRombel(
    rombelId: number,
    tahunPelajaranId: number,
    nama: string | null = null,
    status: string = 'active',
    limit: number = 50,
    page: number = 1
  ): Promise<ApiResponse<PemetaanRombel[]>> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<ApiResponse<PemetaanRombel[]>>(
        `${apiBase}/api/sieksa/peserta-didik/get-pemetaan-rombel`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            search: {
              nama,
              rombel_id: rombelId,
              tahun_pelajaran_id: tahunPelajaranId,
              status
            },
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
   * Get daftar ekstrakurikuler
   */
  async getEkstrakurikuler(
    name: string | null = null,
    kelasId: number | null = null,
    kategori: string | null = null,
    status: string = 'active',
    limit: number = 50,
    page: number = 1
  ): Promise<ApiResponse<Ekstrakurikuler[]>> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<ApiResponse<Ekstrakurikuler[]>>(
        `${apiBase}/api/sieksa/ekstrakurikuler/get-ekstrakurikuler`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            search: {
              name,
              kelas_id: kelasId,
              kategori,
              status
            },
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
   * Get ekstrakurikuler yang diikuti siswa
   */
  async getAllEkstrakurikulerSiswa(
    rombelId: number,
    tahunPelajaranId: number
  ): Promise<{ data: AllEkstrakurikulerSiswaResponse }> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<{ data: AllEkstrakurikulerSiswaResponse }>(
        `${apiBase}/api/sieksa/register-ekstrakurikuler/get-all-ekstrakurikuler-siswa`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            rombel_id: rombelId,
            tahun_pelajaran_id: tahunPelajaranId
          }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Register/update ekstrakurikuler siswa (bulk)
   */
  async registerAllEkstrakurikulerSiswa(
    payload: RegisterEkstrakurikulerPayload
  ): Promise<RegisterEkstrakurikulerResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<RegisterEkstrakurikulerResponse>(
        `${apiBase}/api/sieksa/register-ekstrakurikuler/register-all-ekstrakurikuler-siswa`,
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
}

// Singleton instance
let pendaftaranServiceInstance: PendaftaranService | null = null

export const usePendaftaranService = () => {
  if (!pendaftaranServiceInstance) {
    pendaftaranServiceInstance = new PendaftaranService()
  }
  return pendaftaranServiceInstance
}
