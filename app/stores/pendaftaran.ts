import { defineStore } from 'pinia'
import type {
  TahunPelajaran,
  Rombel,
  PemetaanRombel,
  Ekstrakurikuler,
  AllEkstrakurikulerSiswaResponse,
  CheckboxState,
  RegisterEkstrakurikulerPayload
} from '~/app/types/pendaftaran'

interface PendaftaranState {
  // Filter state
  selectedTahunPelajaran: number | string
  selectedRombel: number | string
  
  // Data lists
  tahunPelajaranList: TahunPelajaran[]
  rombelList: Rombel[]
  siswaList: PemetaanRombel[]
  ekskulList: Ekstrakurikuler[]
  ekskulSiswaData: AllEkstrakurikulerSiswaResponse | null
  
  // Checkbox tracking
  checkboxStates: CheckboxState
  
  // Loading states
  isLoading: boolean
  isSaving: boolean
}

export const usePendaftaranStore = defineStore('pendaftaran', {
  state: (): PendaftaranState => ({
    selectedTahunPelajaran: '',
    selectedRombel: '',
    tahunPelajaranList: [],
    rombelList: [],
    siswaList: [],
    ekskulList: [],
    ekskulSiswaData: null,
    checkboxStates: {},
    isLoading: false,
    isSaving: false
  }),

  getters: {
    /**
     * Get ekstrakurikuler tidak wajib yang sesuai dengan kelas rombel
     */
    ekskulTidakWajib: (state): Ekstrakurikuler[] => {
      if (!state.selectedRombel || !state.rombelList.length) return []
      
      const rombel = state.rombelList.find(r => r.id === state.selectedRombel)
      if (!rombel) return []
      
      const kelasId = rombel.kelas_id
      
      return state.ekskulList
        .filter(ekskul => {
          if (ekskul.kategori !== 'tidak wajib') return false
          if (!ekskul.kelas_ids || ekskul.kelas_ids.length === 0) return true
          return ekskul.kelas_ids.includes(kelasId)
        })
        .sort((a, b) => a.name.localeCompare(b.name))
    },

    /**
     * Get ekstrakurikuler wajib yang sesuai dengan kelas rombel
     */
    ekskulWajib: (state): Ekstrakurikuler[] => {
      if (!state.selectedRombel || !state.rombelList.length) return []
      
      const rombel = state.rombelList.find(r => r.id === state.selectedRombel)
      if (!rombel) return []
      
      const kelasId = rombel.kelas_id
      
      return state.ekskulList
        .filter(ekskul => {
          if (ekskul.kategori !== 'wajib') return false
          if (!ekskul.kelas_ids || ekskul.kelas_ids.length === 0) return true
          return ekskul.kelas_ids.includes(kelasId)
        })
        .sort((a, b) => a.name.localeCompare(b.name))
    },

    /**
     * Check if filter is ready
     */
    isFilterReady: (state): boolean => {
      return !!(state.selectedTahunPelajaran && state.selectedRombel)
    }
  },

  actions: {
    /**
     * Set selected tahun pelajaran
     */
    setTahunPelajaran(id: number | string) {
      this.selectedTahunPelajaran = id
    },

    /**
     * Set selected rombel
     */
    setRombel(id: number | string) {
      this.selectedRombel = id
    },

    /**
     * Set tahun pelajaran list
     */
    setTahunPelajaranList(list: TahunPelajaran[]) {
      this.tahunPelajaranList = list
      
      // Auto-select active tahun pelajaran
      const active = list.find(tp => tp.status === 'active')
      if (active && !this.selectedTahunPelajaran) {
        this.selectedTahunPelajaran = active.id
      }
    },

    /**
     * Set rombel list
     */
    setRombelList(list: Rombel[]) {
      this.rombelList = list
    },

    /**
     * Set siswa list
     */
    setSiswaList(list: PemetaanRombel[]) {
      this.siswaList = list
    },

    /**
     * Set ekstrakurikuler list
     */
    setEkskulList(list: Ekstrakurikuler[]) {
      this.ekskulList = list
    },

    /**
     * Set ekstrakurikuler siswa data
     */
    setEkskulSiswaData(data: AllEkstrakurikulerSiswaResponse | null) {
      this.ekskulSiswaData = data
    },

    /**
     * Initialize checkbox states from API data
     */
    initializeCheckboxStates() {
      this.checkboxStates = {}
      
      if (!this.ekskulSiswaData || !this.ekskulSiswaData.siswa) return
      
      this.ekskulSiswaData.siswa.forEach(siswa => {
        siswa.ekstrakurikuler.forEach(ekskul => {
          const key = `${siswa.peserta_didik_id}-${ekskul.ekstrakurikuler_id}`
          this.checkboxStates[key] = true
        })
      })
    },

    /**
     * Update checkbox state
     */
    updateCheckboxState(pesertaDidikId: number, ekskulId: number, checked: boolean) {
      const key = `${pesertaDidikId}-${ekskulId}`
      this.checkboxStates[key] = checked
    },

    /**
     * Check if ekstrakurikuler is checked for siswa
     */
    isEkskulChecked(pesertaDidikId: number, ekskulId: number): boolean {
      const key = `${pesertaDidikId}-${ekskulId}`
      
      // Check tracked state first
      if (key in this.checkboxStates) {
        return this.checkboxStates[key]
      }
      
      // Otherwise check from API data
      if (!this.ekskulSiswaData || !this.ekskulSiswaData.siswa) {
        return false
      }
      
      const siswaData = this.ekskulSiswaData.siswa.find(
        s => s.peserta_didik_id === pesertaDidikId
      )
      
      if (!siswaData || !siswaData.ekstrakurikuler) {
        return false
      }
      
      return siswaData.ekstrakurikuler.some(
        e => e.ekstrakurikuler_id === ekskulId
      )
    },

    /**
     * Build payload for saving
     */
    buildSavePayload(): RegisterEkstrakurikulerPayload {
      return {
        siswa: this.siswaList.map(siswa => {
          const ekskulIds: number[] = []
          
          // Collect checked ekstrakurikuler (tidak wajib)
          this.ekskulTidakWajib.forEach(ekskul => {
            if (this.isEkskulChecked(siswa.peserta_didik_id, ekskul.id)) {
              ekskulIds.push(ekskul.id)
            }
          })
          
          // Collect checked ekstrakurikuler (wajib)
          this.ekskulWajib.forEach(ekskul => {
            if (this.isEkskulChecked(siswa.peserta_didik_id, ekskul.id)) {
              ekskulIds.push(ekskul.id)
            }
          })
          
          return {
            peserta_didik_rombel_id: siswa.id,
            ekstrakurikuler_ids: ekskulIds
          }
        })
      }
    },

    /**
     * Reset filter
     */
    resetFilter() {
      this.selectedTahunPelajaran = ''
      this.selectedRombel = ''
      this.siswaList = []
      this.ekskulSiswaData = null
      this.checkboxStates = {}
    },

    /**
     * Reset all state
     */
    reset() {
      this.$reset()
    }
  }
})
