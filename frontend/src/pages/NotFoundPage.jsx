import { Link } from 'react-router-dom'
import notFound from '../assets/notFound.svg'
import HeaderComponent from '../components/Header'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="d-flex flex-column h-100">
      <HeaderComponent />
      <div className="text-center">
        <img src={notFound} className="img-fluid h-25" alt="Страница не найдена" />
        <h1 className="h4 text-muted">{t('notFound.title')}</h1>
        <p className="text-muted">
          {t('notFound.feedback')}
          {' '}
          <Link to="/">{t('notFound.link')}</Link>
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
