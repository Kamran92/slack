import { useState, useCallback, createContext } from 'react'

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  const logIn = useCallback((data) => {
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }, [])

  const logOut = useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
  }, [])

  const getAuth = useCallback(() => {
    if (user?.token) {
      return { Authorization: `Bearer ${user.token}` }
    }
    return {}
  }, [user])

  const value = {
    user,
    logIn,
    logOut,
    getAuth,
  }

  return (
    <AuthContext value={value}>
      {children}
    </AuthContext>
  )
}

export { AuthProvider }
export default AuthContext
