import { I18nextProvider } from 'react-i18next'
import createI18n from './i18n'

const i18n = createI18n()

export const I18nProvider = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}