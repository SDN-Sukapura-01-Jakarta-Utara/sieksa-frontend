import { defineStore } from 'pinia'
import type { User, AuthState } from '~/app/types/auth'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
    permissions: [],
    expiresAt: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getPermissions: (state) => state.permissions,
    hasPermission: (state) => (permission: string) => {
      return state.permissions.includes(permission)
    }
  },

  actions: {
    setAuth(data: any) {
      this.token = data.token
      this.user = data.user
      this.permissions = data.permissions
      this.expiresAt = data.expires_at

      // Simpan ke localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('auth_user', JSON.stringify(data.user))
        localStorage.setItem('auth_permissions', JSON.stringify(data.permissions))
        localStorage.setItem('auth_expires_at', data.expires_at)
      }
    },

    loadAuth() {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token')
        const user = localStorage.getItem('auth_user')
        const permissions = localStorage.getItem('auth_permissions')
        const expiresAt = localStorage.getItem('auth_expires_at')

        if (token && user) {
          this.token = token
          this.user = JSON.parse(user)
          this.permissions = permissions ? JSON.parse(permissions) : []
          this.expiresAt = expiresAt
        }
      }
    },

    clearAuth() {
      this.token = null
      this.user = null
      this.permissions = []
      this.expiresAt = null

      // Hapus dari localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        localStorage.removeItem('auth_permissions')
        localStorage.removeItem('auth_expires_at')
      }
    },

    async login(username: string, password: string) {
      const config = useRuntimeConfig()
      const response = await $fetch(`${config.public.apiBase}/api/sieksa/auth/login`, {
        method: 'POST',
        body: {
          username,
          password
        }
      })

      return response
    },

    logout() {
      this.clearAuth()
    }
  }
})
