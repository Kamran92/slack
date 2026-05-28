import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Chat from './Chat'
import channelsReducer from '@app/store/slices/Channels'
import messagesReducer from '@app/store/slices/Messages'
import modalReducer from '@app/store/slices/Modals'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock('@entities/channel', () => ({
  Channel: ({ channel }: { channel: { id: number, name: string } }) => (
    <div data-testid={`channel-${channel.id}`}>{channel.name}</div>
  ),
}))

vi.mock('@features/send-message', () => ({
  SendMessage: () => <div data-testid="send-message">Send Message</div>,
}))

vi.mock('@entities/messages', () => ({
  Messages: () => <div data-testid="messages">Messages</div>,
}))

const renderWithProviders = (preloadedState: {
  channels: { ids: number[], entities: Record<string, { id: number, name: string }> }
} = {
  channels: { ids: [], entities: {} },
}) => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      modal: modalReducer,
    },
    preloadedState: {
      channels: {
        ...preloadedState.channels,
        currentChannelId: 1,
      },
      messages: { ids: [], entities: {} },
      modal: { show: false, type: 'closed', id: null },
    } as Parameters<typeof configureStore>[0]['preloadedState'],
  })

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Chat />
      </MemoryRouter>
    </Provider>,
  )
}

describe('Chat', () => {
  it('renders channels list', () => {
    const preloadedState = {
      channels: {
        ids: [1, 2],
        entities: {
          1: { id: 1, name: 'Channel 1' },
          2: { id: 2, name: 'Channel 2' },
        },
      },
    }

    renderWithProviders(preloadedState)

    expect(screen.getByTestId('channel-1')).toBeInTheDocument()
    expect(screen.getByTestId('channel-2')).toBeInTheDocument()
  })

  it('renders messages and send message components', () => {
    renderWithProviders()

    expect(screen.getByTestId('messages')).toBeInTheDocument()
    expect(screen.getByTestId('send-message')).toBeInTheDocument()
  })
})
