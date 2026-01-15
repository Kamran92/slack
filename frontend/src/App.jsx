import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import routes from './pages/routes.js';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import store from './slices/StoreReducer';
import { Provider } from 'react-redux';
import { getCurrentChannel } from './slices/Channels.js';
import { io } from 'socket.io-client';
import { ChatProvider } from './contexts/chatContext.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import  AuthContext from './contexts/authContext.jsx';
import { useContext } from 'react';
import SignUpPage from './pages/SignUpPage.jsx';
import ru from './locales/ru';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: process.env.TOKEN_ROLLBAR,
  environment: 'testenv',
};

const Access = ({ children }) => {
  const auth = useContext(AuthContext)

  if (auth.user === null) {
    return <Navigate to={routes.login} />;
  }

  return children;
};


const App = () => {
  const socket = io();
  const i18n = i18next.createInstance();
  i18n.use(initReactI18next).init({
    resources: { ru },
    fallbackLng: 'ru',
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path={routes.chat}
                  element={(
                    <ChatProvider socket={socket}>
                      <Access>
                        <ChatPage getMainChannel={getCurrentChannel}/>
                      </Access>
                    </ChatProvider>
                  )}
                />
                <Route path={routes.login} element={<LoginPage />} />
                <Route path={routes.notFound} element={<NotFoundPage />} />
                <Route path={routes.signup} element={<SignUpPage />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  )
};

export default App;
