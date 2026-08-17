import type {
  EkstrakurikulerListResponse,
  EkstrakurikulerSearchPayload,
  KelasListResponse,
  PelatihListResponse,
  PelatihSearchPayload,
  RolesListResponse
} from '~/app/types/master-data'
import { handleAuthError } from '~/app/utils/authErrorHandler'

export class MasterDataService {
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
   * Get list kelas
   */
  async getKelasList(): Promise<KelasListResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<KelasListResponse>(
        `${apiBase}/api/sieksa/kelas/get-kelas`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            search: {
              name: '',
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
   * Get list ekstrakurikuler dengan filter dan pagination
   */
  async getEkstrakurikulerList(
    payload: EkstrakurikulerSearchPayload
  ): Promise<EkstrakurikulerListResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<EkstrakurikulerListResponse>(
        `${apiBase}/api/sieksa/ekstrakurikuler/get-ekstrakurikuler`,
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
   * Get list ekstrakurikuler active (untuk dropdown)
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
              name: '',
              kelas_id: null,
              kategori: '',
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
   * Get list pelatih dengan filter dan pagination
   */
  async getPelatihList(
    payload: PelatihSearchPayload
  ): Promise<PelatihListResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<PelatihListResponse>(
        `${apiBase}/api/sieksa/pelatih/get-pelatih`,
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
   * Create pelatih
   */
  async createPelatih(payload: {
    nama: string
    username: string
    password: string
    telepon: string
    alamat: string
    keahlian: string
    status: string
    role_ids: number[]
    ekstrakurikuler_ids: number[]
  }): Promise<{ data: any }> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<{ data: any }>(
        `${apiBase}/api/sieksa/pelatih/create-pelatih`,
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
   * Get pelatih by ID
   */
  async getPelatihById(id: number): Promise<{ data: any }> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<{ data: any }>(
        `${apiBase}/api/sieksa/pelatih/get-pelatih-by-id`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: { id }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Update pelatih with FormData
   */
  async updatePelatih(payload: {
    id: number
    nama: string
    username: string
    telepon: string
    alamat: string
    keahlian: string
    status: string
    role_ids: number[]
    ekstrakurikuler_ids: number[]
    foto_profil: File | null
    sertifikat: File[]
    sertifikat_to_delete: string[]
  }): Promise<{ data: any }> {
    const apiBase = this.getApiBase()
    const token = this.getAuthToken()
    
    try {
      // Build FormData
      const formData = new FormData()
      formData.append('id', payload.id.toString())
      formData.append('nama', payload.nama)
      formData.append('username', payload.username)
      formData.append('telepon', payload.telepon)
      formData.append('alamat', payload.alamat)
      formData.append('keahlian', payload.keahlian)
      formData.append('status', payload.status)
      
      // Append role_ids as JSON string array
      formData.append('role_ids', JSON.stringify(payload.role_ids))
      
      // Append ekstrakurikuler_ids as JSON string array
      formData.append('ekstrakurikuler_ids', JSON.stringify(payload.ekstrakurikuler_ids))
      
      // Append foto_profil if exists
      if (payload.foto_profil) {
        formData.append('foto_profil', payload.foto_profil)
      }
      
      // Append multiple sertifikat files
      payload.sertifikat.forEach((file) => {
        formData.append('sertifikat', file)
      })
      
      // Append sertifikat_to_delete as JSON string
      if (payload.sertifikat_to_delete.length > 0) {
        formData.append('sertifikat_to_delete', JSON.stringify(payload.sertifikat_to_delete))
      }

      return await $fetch<{ data: any }>(
        `${apiBase}/api/sieksa/pelatih/update-pelatih`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
            // Don't set Content-Type, browser will set it automatically with boundary
          },
          body: formData
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Delete pelatih
   */
  async deletePelatih(id: number): Promise<{ message: string }> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<{ message: string }>(
        `${apiBase}/api/sieksa/pelatih/delete-pelatih`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: { id }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Get list roles
   */
  async getRolesList(): Promise<RolesListResponse> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<RolesListResponse>(
        `${apiBase}/api/sieksa/roles/get-roles`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: {
            search: {},
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
   * Create ekstrakurikuler
   */
  async createEkstrakurikuler(payload: {
    name: string
    kelas_ids: number[]
    kategori: string
    status: string
  }): Promise<{ data: any }> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<{ data: any }>(
        `${apiBase}/api/sieksa/ekstrakurikuler/create-ekstrakurikuler`,
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
   * Get ekstrakurikuler by ID
   */
  async getEkstrakurikulerById(id: number): Promise<{ data: any }> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<{ data: any }>(
        `${apiBase}/api/sieksa/ekstrakurikuler/get-ekstrakurikuler-by-id`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: { id }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }

  /**
   * Update ekstrakurikuler
   */
  async updateEkstrakurikuler(payload: {
    id: number
    name: string
    kelas_ids: number[]
    kategori: string
    status: string
  }): Promise<{ data: any }> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<{ data: any }>(
        `${apiBase}/api/sieksa/ekstrakurikuler/update-ekstrakurikuler`,
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
   * Delete ekstrakurikuler
   */
  async deleteEkstrakurikuler(id: number): Promise<{ message: string }> {
    const apiBase = this.getApiBase()
    
    try {
      return await $fetch<{ message: string }>(
        `${apiBase}/api/sieksa/ekstrakurikuler/delete-ekstrakurikuler`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: { id }
        }
      )
    } catch (error: any) {
      await handleAuthError(error)
      throw error
    }
  }
}

// Singleton instance
let masterDataServiceInstance: MasterDataService | null = null

export const useMasterDataService = () => {
  if (!masterDataServiceInstance) {
    masterDataServiceInstance = new MasterDataService()
  }
  return masterDataServiceInstance
}
