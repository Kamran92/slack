import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import routes from './pages/routes.js';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

const App = () => (
    <BrowserRouter>
      <Routes>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.notFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
);

export default App;
