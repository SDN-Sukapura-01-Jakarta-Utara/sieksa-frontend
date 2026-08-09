import type { LoginRequest, LoginResponse } from '~/app/types/auth'

export class AuthServiceAlt {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('=== ALTERNATIVE LOGIN REQUEST ===')
      console.log('URL:', 'http://localhost:3000/api/sieksa/auth/login')
      console.log('Body:', JSON.stringify(credentials))
      
      const response = await fetch('http://localhost:3000/api/sieksa/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials),
        mode: 'cors',
        credentials: 'include'
      })
      
      console.log('Response status:', response.status)
      console.log('Response statusText:', response.statusText)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response body:', errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }
      
      const data = await response.json()
      console.log('Success response:', data)
      return data
    } catch (error: any) {
      console.error('=== ALTERNATIVE LOGIN ERROR ===')
      console.error('Error:', error)
      console.error('Error message:', error.message)
      throw error
    }
  }
}

export const authServiceAlt = new AuthServiceAlt()
