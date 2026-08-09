import type { LoginRequest, LoginResponse, LogoutResponse } from '~/app/types/auth'

export class AuthService {
  private getApiBase(): string {
    const config = useRuntimeConfig()
    return config.public.apiBase as string
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const apiBase = this.getApiBase()
      
      console.log('=== DEBUG LOGIN REQUEST ===')
      console.log('API URL:', `${apiBase}/api/sieksa/auth/login`)
      console.log('Credentials:', credentials)
      
      const response = await $fetch<LoginResponse>(`${apiBase}/api/sieksa/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      
      console.log('Response:', response)
      return response
    } catch (error: any) {
      console.error('=== LOGIN ERROR ===')
      console.error('Error:', error)
      console.error('Error data:', error.data)
      console.error('Error response:', error.response)
      throw error
    }
  }

  async logout(): Promise<LogoutResponse> {
    try {
      const apiBase = this.getApiBase()
      const token = this.getToken()
      
      console.log('=== DEBUG LOGOUT REQUEST ===')
      console.log('API URL:', `${apiBase}/api/sieksa/auth/logout`)
      console.log('Token:', token)
      
      const response = await $fetch<LogoutResponse>(`${apiBase}/api/sieksa/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      console.log('Logout Response:', response)
      return response
    } catch (error: any) {
      console.error('=== LOGOUT ERROR ===')
      console.error('Error:', error)
      throw error
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  }

  saveAuthData(data: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      localStorage.setItem('auth_permissions', JSON.stringify(data.permissions))
      localStorage.setItem('auth_expires_at', data.expires_at)
    }
  }

  getAuthData() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      const user = localStorage.getItem('auth_user')
      const permissions = localStorage.getItem('auth_permissions')
      const expiresAt = localStorage.getItem('auth_expires_at')

      if (token && user) {
        return {
          token,
          user: JSON.parse(user),
          permissions: permissions ? JSON.parse(permissions) : [],
          expiresAt
        }
      }
    }
    return null
  }

  clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_permissions')
      localStorage.removeItem('auth_expires_at')
    }
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('auth_token')
    }
    return false
  }
}

// Singleton instance
let authServiceInstance: AuthService | null = null

export const useAuthService = () => {
  if (!authServiceInstance) {
    authServiceInstance = new AuthService()
  }
  return authServiceInstance
}

// Export untuk backward compatibility
export const authService = {
  login: (credentials: LoginRequest) => useAuthService().login(credentials),
  logout: () => useAuthService().logout(),
  saveAuthData: (data: any) => useAuthService().saveAuthData(data),
  getAuthData: () => useAuthService().getAuthData(),
  clearAuthData: () => useAuthService().clearAuthData(),
  isAuthenticated: () => useAuthService().isAuthenticated(),
  getToken: () => useAuthService().getToken()
}
