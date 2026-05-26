import { useContext, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '@app/providers/AuthProvider'
import routes from '@app/routes'

interface AccessGuardProps {
  children: ReactNode
}

const AccessGuard = ({ children }: AccessGuardProps) => {
  const auth = useContext(AuthContext)

  if (auth?.user === null) {
    return <Navigate to={routes.login} />
  }

  return children
}

export default AccessGuard
