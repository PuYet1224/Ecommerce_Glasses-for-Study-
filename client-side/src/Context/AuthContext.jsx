import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const id = localStorage.getItem('clientId')
    const name = localStorage.getItem('clientName')
    if (id) setUser({ id, name })
  }, [])

  const login = ({ id, name }) => setUser({ id, name })

  const logout = () => {
    localStorage.removeItem('clientId')
    localStorage.removeItem('clientName')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
