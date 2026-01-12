import { Button } from 'react-bootstrap';
import routes from '../pages/routes.js';
import AuthContext from '../contexts/authContext.jsx';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

const HeaderComponent = () => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext)
  const loggedIn = auth.user !== null;

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href={routes.chat}>{t('header.title')}</a>
        {loggedIn
          ? <Button onClick={auth.logOut}>{t('header.exit')}</Button>
          : null}
      </div>
    </nav>
  );
};

export default HeaderComponent;
