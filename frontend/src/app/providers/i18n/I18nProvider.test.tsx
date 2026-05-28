import { screen } from '@testing-library/react'
import { render } from '@testing-library/react'
import { I18nProvider } from './I18nProvider'

vi.mock('i18next', () => ({
  default: {
    createInstance: () => ({
      use: () => ({ init: () => Promise.resolve() }),
    }),
  },
}))

vi.mock('react-i18next', () => ({
  initReactI18next: { type: '3d' },
  I18nextProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock('./locales/ru.js', () => ({
  default: {
    translation: {},
  },
}))

describe('I18nProvider', () => {
  it('renders children', () => {
    render(
      <I18nProvider>
        <div>Test child</div>
      </I18nProvider>,
    )

    expect(screen.getByText('Test child')).toBeInTheDocument()
  })
})
