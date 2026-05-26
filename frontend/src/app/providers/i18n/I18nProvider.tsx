import { I18nextProvider } from 'react-i18next'
import createI18n from './i18n'
import { ReactNode } from 'react'

const i18n = createI18n()

interface I18nProviderProps {
  children: ReactNode
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}
