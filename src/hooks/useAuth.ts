import { useState } from 'react'

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false)

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'Rochussenstraat') {
      setIsAdmin(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
  }

  return { isAdmin, login, logout }
}