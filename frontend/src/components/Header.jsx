import { Button } from 'react-bootstrap';
import routes from '../pages/routes.js';
import AuthContext from '../contexts/authContext.jsx';
import { useContext } from 'react';

const HeaderComponent = () => {
  const auth = useContext(AuthContext)
  const loggedIn = auth.user !== null;

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href={routes.chat}>Hexlet Chat</a>
        {loggedIn
          ? <Button onClick={auth.logOut}>Выйти</Button>
          : null}
      </div>
    </nav>
  );
};

export default HeaderComponent;
