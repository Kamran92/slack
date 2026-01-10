import { Link } from 'react-router-dom';
import notFound from '../assets/notFound.svg'
import HeaderComponent from '../components/Header';

const NotFoundPage = () => {
  return (

    <div className="d-flex flex-column h-100">
    <HeaderComponent />
    <div className="text-center">
      <img src={notFound} class="img-fluid h-25" alt="Страница не найдена" />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        Но вы можете перейти <Link to="/">на главную страницу</Link>
      </p>
    </div>
</div>
  );
};

export default NotFoundPage;
