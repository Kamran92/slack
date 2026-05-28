import { screen } from '@testing-library/react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

vi.mock('./providers/index.jsx', () => ({
  AppProviders: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('./routes.js', () => ({
  default: {
    chat: '/chat',
    login: '/login',
    notFound: '*',
    signup: '/signup',
  },
}))

vi.mock('@pages/not-found-page', () => ({
  NotFoundPage: () => <div>NotFoundPage</div>,
}))

vi.mock('@pages/Login', () => ({
  LoginPage: () => <div>LoginPage</div>,
  SignUpPage: () => <div>SignUpPage</div>,
}))

vi.mock('@pages/chat', () => ({
  ChatPage: () => <div>ChatPage</div>,
}))

vi.mock('@features/auth', () => ({
  AccessGuard: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('App', () => {
  it('renders login page by default', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText('LoginPage')).toBeInTheDocument()
  })
})
