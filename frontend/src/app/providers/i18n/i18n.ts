import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './locales/ru.js'

const createI18n = () => {
  const i18n = i18next.createInstance()

  i18n.use(initReactI18next).init({
    resources: { ru },
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

  return i18n
}

export default createI18n
