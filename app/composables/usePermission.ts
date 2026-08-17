/**
 * Composable untuk mengecek permissions user
 * 
 * Digunakan untuk mengontrol akses ke fitur-fitur tertentu
 * berdasarkan permissions yang dimiliki user dari response login
 */

export const usePermission = () => {
  /**
   * Mengecek apakah user memiliki permission tertentu
   * @param permission - Nama permission yang ingin dicek
   * @returns boolean - true jika user memiliki permission
   */
  const hasPermission = (permission: string): boolean => {
    if (typeof window === 'undefined') return false
    
    const permissionsStr = localStorage.getItem('auth_permissions')
    if (!permissionsStr) return false
    
    try {
      const permissions: string[] = JSON.parse(permissionsStr)
      return permissions.includes(permission)
    } catch (error) {
      console.error('Error parsing permissions:', error)
      return false
    }
  }

  /**
   * Mengecek apakah user memiliki salah satu dari beberapa permissions
   * @param permissions - Array permission yang ingin dicek
   * @returns boolean - true jika user memiliki minimal 1 permission
   */
  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasPermission(permission))
  }

  /**
   * Mengecek apakah user memiliki semua permissions yang disebutkan
   * @param permissions - Array permission yang ingin dicek
   * @returns boolean - true jika user memiliki semua permission
   */
  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(permission => hasPermission(permission))
  }

  /**
   * Mendapatkan semua permissions user
   * @returns string[] - Array semua permissions user
   */
  const getUserPermissions = (): string[] => {
    if (typeof window === 'undefined') return []
    
    const permissionsStr = localStorage.getItem('auth_permissions')
    if (!permissionsStr) return []
    
    try {
      return JSON.parse(permissionsStr)
    } catch (error) {
      console.error('Error parsing permissions:', error)
      return []
    }
  }

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getUserPermissions
  }
}
