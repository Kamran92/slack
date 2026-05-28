import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import ChatPage from './ChatPage'
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
    user: { token: 'test-token' },
    logIn: vi.fn(),
    logOut: vi.fn(),
    getAuth: () => ({ Authorization: 'Bearer test-token' }),
  }),
}))

vi.mock('@providers/ChatProvider', () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))

vi.mock('socket.io-client', () => ({
  io: () => ({
    on: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn(),
  }),
}))

vi.mock('@widgets/header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}))

vi.mock('@widgets/chat', () => ({
  Chat: () => <div data-testid="chat-widget">Chat Widget</div>,
}))

vi.mock('@entities/modal', () => ({
  Modal: () => <div data-testid="modal">Modal</div>,
}))

vi.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container">Toast</div>,
  toast: {
    error: vi.fn(),
  },
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

describe('ChatPage', () => {
  it('renders chat page with header and chat widget', () => {
    renderWithProviders(<ChatPage />)

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('chat-widget')).toBeInTheDocument()
  })
})
