import { Routes, Route } from 'react-router-dom'
import routes from './routes.js'
import NotFoundPage from '../pages/not-found-page/ui/NotFoundPage.jsx'
import LoginPage from '../pages/Login/ui/LoginPage.jsx'
import ChatPage from '../pages/chat/ui/ChatPage.jsx'
import SignUpPage from '../pages/Login/ui/SignUpPage.jsx'
import { AppProviders } from './providers/index.jsx'
import { AccessGuard } from '../features/auth/ui/AccessGuard.jsx'

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
