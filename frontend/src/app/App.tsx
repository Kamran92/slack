import { Routes, Route } from 'react-router-dom'
import { NotFoundPage } from '@pages/not-found-page'
import { LoginPage } from '@pages/Login'
import { ChatPage } from '@pages/chat'
import { SignUpPage } from '@pages/Login'
import { AccessGuard } from '@features/auth'
import { AppProviders } from './providers/index.jsx'
import routes from './routes.js'

const App = () => {
  return (
    <AppProviders>
      <Routes>
        <Route
          path={routes.chat}
          element={(
            <AccessGuard>
              <ChatPage />
            </AccessGuard>
          )}
        />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.notFound} element={<NotFoundPage />} />
        <Route path={routes.signup} element={<SignUpPage />} />
      </Routes>
    </AppProviders>
  )
}

export default App
