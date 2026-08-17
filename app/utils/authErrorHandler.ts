export const handleAuthError = async (error: any) => {
  const router = useRouter()
  const toast = useNuxtApp().$toast as any
  
  // Check if error is token related
  if (error?.data?.error === 'invalid or expired token' || 
      error?.statusCode === 401 ||
      error?.status === 401) {
    
    // Clear auth data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_permissions')
    }
    
    // Show toast error
    toast.error('Sesi Anda telah berakhir. Silakan login kembali.', {
      timeout: 3000
    })
    
    // Redirect to login
    await router.push('/login')
    
    return true // Indicates auth error was handled
  }
  
  return false // Not an auth error
}

export const wrapApiCall = async <T>(
  apiCall: () => Promise<T>,
  errorMessage?: string
): Promise<T> => {
  try {
    return await apiCall()
  } catch (error: any) {
    const wasAuthError = await handleAuthError(error)
    
    if (!wasAuthError && errorMessage) {
      const toast = useNuxtApp().$toast as any
      toast.error(errorMessage)
    }
    
    throw error
  }
}
