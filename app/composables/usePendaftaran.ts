import { usePendaftaranStore } from '~/app/stores/pendaftaran'
import { usePendaftaranService } from '~/app/services/pendaftaranService'
import type { RegisterEkstrakurikulerResponse } from '~/app/types/pendaftaran'

export const usePendaftaran = () => {
  const store = usePendaftaranStore()
  const service = usePendaftaranService()
  const toast = useNuxtApp().$toast as any

  /**
   * Fetch tahun pelajaran list
   */
  const fetchTahunPelajaran = async () => {
    try {
      const response = await service.getTahunPelajaran()
      store.setTahunPelajaranList(response.data || [])
    } catch (error: any) {
      console.error('Error fetching tahun pelajaran:', error)
      // Error already handled in service with handleAuthError
      // Only show toast if it's not an auth error
      const { handleAuthError } = await import('~/app/utils/authErrorHandler')
      const wasAuthError = await handleAuthError(error)
      if (!wasAuthError) {
        toast.error('Gagal memuat tahun pelajaran')
      }
      throw error
    }
  }

  /**
   * Fetch rombel list
   */
  const fetchRombel = async () => {
    try {
      const response = await service.getRombel()
      store.setRombelList(response.data || [])
    } catch (error: any) {
      console.error('Error fetching rombel:', error)
      // Error already handled in service
      const { handleAuthError } = await import('~/app/utils/authErrorHandler')
      const wasAuthError = await handleAuthError(error)
      if (!wasAuthError) {
        toast.error('Gagal memuat data rombel')
      }
      throw error
    }
  }

  /**
   * Fetch ekstrakurikuler list
   */
  const fetchEkstrakurikuler = async () => {
    try {
      const response = await service.getEkstrakurikuler()
      store.setEkskulList(response.data || [])
    } catch (error: any) {
      console.error('Error fetching ekstrakurikuler:', error)
      // Error already handled in service
      const { handleAuthError } = await import('~/app/utils/authErrorHandler')
      const wasAuthError = await handleAuthError(error)
      if (!wasAuthError) {
        toast.error('Gagal memuat data ekstrakurikuler')
      }
      throw error
    }
  }

  /**
   * Fetch siswa by rombel and tahun pelajaran
   */
  const fetchSiswa = async () => {
    if (!store.selectedTahunPelajaran || !store.selectedRombel) {
      return
    }

    store.isLoading = true
    try {
      const response = await service.getPemetaanRombel(
        Number(store.selectedRombel),
        Number(store.selectedTahunPelajaran)
      )
      store.setSiswaList(response.data || [])
    } catch (error: any) {
      console.error('Error fetching siswa:', error)
      // Error already handled in service
      const { handleAuthError } = await import('~/app/utils/authErrorHandler')
      const wasAuthError = await handleAuthError(error)
      if (!wasAuthError) {
        toast.error('Gagal memuat data siswa')
      }
      throw error
    } finally {
      store.isLoading = false
    }
  }

  /**
   * Fetch ekstrakurikuler siswa
   */
  const fetchEkskulSiswa = async () => {
    if (!store.selectedTahunPelajaran || !store.selectedRombel) {
      return
    }

    try {
      const response = await service.getAllEkstrakurikulerSiswa(
        Number(store.selectedRombel),
        Number(store.selectedTahunPelajaran)
      )
      
      store.setEkskulSiswaData(response.data || null)
      
      console.log('Ekskul Siswa Data:', response.data)
      
      if (response.data && response.data.siswa) {
        console.log('Total siswa with ekskul:', response.data.siswa.length)
        response.data.siswa.forEach(s => {
          console.log(`Siswa ${s.nama_lengkap} (ID: ${s.peserta_didik_id}) - ${s.total_ekskul} ekskul`)
        })
      }
    } catch (error: any) {
      console.error('Error fetching ekskul siswa:', error)
      // Error already handled in service
      const { handleAuthError } = await import('~/app/utils/authErrorHandler')
      const wasAuthError = await handleAuthError(error)
      if (!wasAuthError) {
        toast.error('Gagal memuat data ekstrakurikuler siswa')
      }
      throw error
    }
  }

  /**
   * Load initial data
   */
  const loadInitialData = async () => {
    await Promise.all([
      fetchTahunPelajaran(),
      fetchRombel(),
      fetchEkstrakurikuler()
    ])
  }

  /**
   * Handle filter change
   */
  const handleFilterChange = async () => {
    if (store.isFilterReady) {
      await fetchSiswa()
      await fetchEkskulSiswa()
      store.initializeCheckboxStates()
    }
  }

  /**
   * Handle checkbox change
   */
  const handleCheckboxChange = (pesertaDidikId: number, ekskulId: number, event: Event) => {
    const target = event.target as HTMLInputElement
    store.updateCheckboxState(pesertaDidikId, ekskulId, target.checked)
  }

  /**
   * Save perubahan
   */
  const simpanPerubahan = async (): Promise<RegisterEkstrakurikulerResponse> => {
    if (!store.isFilterReady) {
      toast.error('Pilih tahun pelajaran dan rombel terlebih dahulu')
      throw new Error('Filter not ready')
    }

    if (store.siswaList.length === 0) {
      toast.error('Tidak ada data siswa untuk disimpan')
      throw new Error('No siswa data')
    }

    store.isSaving = true

    try {
      const payload = store.buildSavePayload()
      console.log('Saving payload:', payload)

      const response = await service.registerAllEkstrakurikulerSiswa(payload)
      console.log('Save response:', response)

      // Check for failures
      if (response.summary && response.summary.failed_count > 0) {
        const failedDetails = response.details.filter(d => d.status === 'failed')
        
        if (failedDetails.length > 0) {
          const errorMessages = failedDetails
            .map(d => `Siswa ID ${d.peserta_didik_rombel_id}: ${d.error}`)
            .join('\n')
          
          toast.error(`Gagal menyimpan beberapa data:\n${errorMessages}`, {
            timeout: 5000
          })
        }
      } else {
        // All success
        const summary = response.summary
        toast.success(
          `Berhasil menyimpan! Ditambahkan: ${summary.total_added}, Dihapus: ${summary.total_removed}, Dipertahankan: ${summary.total_kept}`,
          { timeout: 4000 }
        )

        // Reload data
        await fetchEkskulSiswa()
        store.initializeCheckboxStates()
      }

      return response
    } catch (error: any) {
      console.error('Error saving ekstrakurikuler:', error)
      // Error already handled in service
      const { handleAuthError } = await import('~/app/utils/authErrorHandler')
      const wasAuthError = await handleAuthError(error)
      if (!wasAuthError) {
        toast.error(error.data?.message || 'Gagal menyimpan perubahan')
      }
      throw error
    } finally {
      store.isSaving = false
    }
  }

  return {
    // Store state
    store,
    
    // Methods
    fetchTahunPelajaran,
    fetchRombel,
    fetchEkstrakurikuler,
    fetchSiswa,
    fetchEkskulSiswa,
    loadInitialData,
    handleFilterChange,
    handleCheckboxChange,
    simpanPerubahan
  }
}
