import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import routes from './pages/routes.js';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import useAuth from './contexts/auth-provider/useAuth.js';
import ChatPage from './pages/ChatPage.jsx';
import AuthProvider from './contexts/auth-provider/authProvider.jsx';
import store from './slices/StoreReducer';
import { Provider } from 'react-redux';
import { getCurrentChannel } from './slices/Channels.js';

const Access = ({ children }) => {
  const auth = useAuth();

  if (auth.user === null) {
    return <Navigate to={routes.login} />;
  }

  return children;
};

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={routes.chat}
            element={(
              <Access>
                <ChatPage getMainChannel={getCurrentChannel}/>
              </Access>
            )}
          />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.notFound} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);

export default App;
