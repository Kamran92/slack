import { screen } from '@testing-library/react'
import { render } from '@testing-library/react'
import { ChatProvider } from './ChatProvider'
import { useContext } from 'react'
import ChatContext from './ChatProvider'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import channelsReducer from '../store/slices/Channels'
import messagesReducer from '../store/slices/Messages'

const TestComponent = () => {
  const context = useContext(ChatContext)
  if (!context) return <div>No context</div>

  return (
    <div>
      <div data-testid="context">Has context</div>
    </div>
  )
}

const renderWithStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
    },
    preloadedState,
  })

  return render(
    <Provider store={store}>
      <ChatProvider>
        <TestComponent />
      </ChatProvider>
    </Provider>,
  )
}

vi.mock('socket.io-client', () => ({
  io: () => ({
    on: vi.fn(),
  }),
}))

vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { id: 1, name: 'new channel' } })),
    delete: vi.fn(() => Promise.resolve({})),
    patch: vi.fn(() => Promise.resolve({})),
  },
}))

describe('ChatProvider', () => {
  it('renders children and provides context', () => {
    renderWithStore()

    expect(screen.getByTestId('context')).toBeInTheDocument()
  })
})
