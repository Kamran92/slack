import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import AccessGuard from './AccessGuard'
import channelsReducer from '@app/store/slices/Channels'
import messagesReducer from '@app/store/slices/Messages'
import modalReducer from '@app/store/slices/Modals'

vi.mock('@app/providers/AuthProvider', () => {
  const mockContextValue = { user: null, logIn: vi.fn(), logOut: vi.fn(), getAuth: () => ({}) }

  return {
    default: React.createContext(mockContextValue),
  }
})

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

describe('AccessGuard', () => {
  it('redirects to login when user is null', () => {
    renderWithProviders(
      <AccessGuard>
        <div>Protected content</div>
      </AccessGuard>,
    )

    expect(screen.queryByText('Protected content')).not.toBeInTheDocument()
  })
})
