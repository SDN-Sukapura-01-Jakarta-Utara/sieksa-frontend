import type { LoginRequest, LoginResponse } from '~/app/types/auth'

export const useAuth = () => {
  const router = useRouter()

  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { useAuthService } = await import('~/app/services/authService')
    const authService = useAuthService()
    return await authService.login(credentials)
  }

  const logout = async () => {
    const { useAuthService } = await import('~/app/services/authService')
    const authService = useAuthService()
    authService.clearAuthData()
    router.push('/login')
  }

  const getStoredAuth = async () => {
    const { useAuthService } = await import('~/app/services/authService')
    const authService = useAuthService()
    return authService.getAuthData()
  }

  const setStoredAuth = async (data: any) => {
    const { useAuthService } = await import('~/app/services/authService')
    const authService = useAuthService()
    authService.saveAuthData(data)
  }

  const isAuthenticated = async () => {
    const { useAuthService } = await import('~/app/services/authService')
    const authService = useAuthService()
    return authService.isAuthenticated()
  }

  return {
    login,
    logout,
    getStoredAuth,
    setStoredAuth,
    isAuthenticated
  }
}
