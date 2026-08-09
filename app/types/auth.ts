export interface User {
  id: number
  nama: string
  username: string
  status: string
  roles: Role[]
  token?: string
  created_at: string
}

export interface Role {
  id: number
  name: string
  description: string
  system_id: number
  system: System
  status: string
  permissions: string[] | null
  created_at: string
  updated_at: string
  created_by_id: number | null
  updated_by_id: number | null
}

export interface System {
  id: number
  nama: string
  description: string
  status: string
  created_at: string
  updated_at: string
  created_by_id: number | null
  updated_by_id: number | null
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  data: {
    token: string
    user: User
    permissions: string[]
    expires_at: string
  }
  status: string
}

export interface LogoutResponse {
  message: string
  status: string
  user_id: number
}

export interface AuthState {
  token: string | null
  user: User | null
  permissions: string[]
  expiresAt: string | null
}
