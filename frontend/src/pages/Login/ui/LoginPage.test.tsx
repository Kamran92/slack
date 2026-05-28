import { screen, fireEvent, waitFor, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import LoginPage from './LoginPage'
import channelsReducer from '@app/store/slices/Channels'
import messagesReducer from '@app/store/slices/Messages'
import modalReducer from '@app/store/slices/Modals'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock('@providers/AuthProvider', () => ({
  default: React.createContext({
    user: null,
    logIn: vi.fn(),
    logOut: vi.fn(),
    getAuth: () => ({}),
  }),
}))

vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
  },
}))

vi.mock('@widgets/header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}))

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      modal: modalReducer,
    },
  })

  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>,
  )
}

describe('LoginPage', () => {
  it('renders login form with username and password fields', () => {
    renderWithProviders(<LoginPage />)

    expect(screen.getByLabelText('placeholder.login')).toBeInTheDocument()
    expect(screen.getByLabelText('placeholder.password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'logIn.title' })).toBeInTheDocument()
  })

  it('renders signup link', () => {
    renderWithProviders(<LoginPage />)

    expect(screen.getByText('signUp.title')).toBeInTheDocument()
    expect(screen.getByText('signUp.title').closest('a')).toHaveAttribute('href', '/signup')
  })

  it('allows user to enter username and password', async () => {
    renderWithProviders(<LoginPage />)

    const usernameInput = screen.getByLabelText('placeholder.login')
    const passwordInput = screen.getByLabelText('placeholder.password')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })

    await waitFor(() => {
      expect(usernameInput).toHaveValue('testuser')
      expect(passwordInput).toHaveValue('testpass')
    })
  })
})
