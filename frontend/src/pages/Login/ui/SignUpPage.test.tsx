import { screen, fireEvent, waitFor, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import SignUpPage from './SignUpPage'
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
    get: vi.fn(),
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

describe('SignUpPage', () => {
  it('renders signup form with all required fields', () => {
    renderWithProviders(<SignUpPage />)

    expect(screen.getByLabelText('placeholder.username')).toBeInTheDocument()
    expect(screen.getByLabelText('placeholder.password')).toBeInTheDocument()
    expect(screen.getByLabelText('placeholder.confirmPassword')).toBeInTheDocument()
  })

  it('allows user to enter registration data', async () => {
    renderWithProviders(<SignUpPage />)

    const usernameInput = screen.getByLabelText('placeholder.username')
    const passwordInput = screen.getByLabelText('placeholder.password')
    const confirmPasswordInput = screen.getByLabelText('placeholder.confirmPassword')

    fireEvent.change(usernameInput, { target: { value: 'newuser' } })
    fireEvent.change(passwordInput, { target: { value: 'newpass' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'newpass' } })

    await waitFor(() => {
      expect(usernameInput).toHaveValue('newuser')
      expect(passwordInput).toHaveValue('newpass')
      expect(confirmPasswordInput).toHaveValue('newpass')
    })
  })
})
