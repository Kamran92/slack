import { useState, useCallback, createContext, ReactNode } from 'react'

interface User {
  token?: string
  [key: string]: unknown
}

interface AuthContextValue {
  user: User | null
  logIn: (data: User) => void
  logOut: () => void
  getAuth: () => Record<string, string>
}

const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  const logIn = useCallback((data: User) => {
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }, [])

  const logOut = useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
  }, [])

  const getAuth = useCallback((): Record<string, string> => {
    if (user?.token) {
      return { Authorization: `Bearer ${user.token}` }
    }
    return {}
  }, [user])

  const value: AuthContextValue = {
    user,
    logIn,
    logOut,
    getAuth,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }

export default AuthContext
