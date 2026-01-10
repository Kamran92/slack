import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import routes from './pages/routes.js';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import useAuth from './contexts/auth-provider/useAuth.js';
import ChatPage from './pages/ChatPage.jsx';
import AuthProvider from './contexts/auth-provider/authProvider.jsx';

const Access = ({ children }) => {
  const auth = useAuth();

  if (auth.user === null) {
    return <Navigate to={routes.login} />;
  }

  return children;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.chat}
          element={(
            <Access>
              <ChatPage />
            </Access>
          )}
        />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.notFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
