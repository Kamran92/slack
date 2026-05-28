import { screen, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Messages from './Messages'
import channelsReducer from '@app/store/slices/Channels'
import messagesReducer from '@app/store/slices/Messages'
import modalReducer from '@app/store/slices/Modals'

const renderWithStore = (preloadedState: unknown) => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      modal: modalReducer,
    },
    preloadedState: preloadedState as Parameters<typeof configureStore>[0]['preloadedState'],
  })

  return render(
    <Provider store={store}>
      <Messages />
    </Provider>,
  )
}

describe('Messages', () => {
  it('renders messages for current channel', () => {
    renderWithStore({
      channels: {
        ids: [1],
        entities: { 1: { id: 1, name: 'general' } },
        currentChannelId: 1,
      },
      messages: {
        ids: [1, 2],
        entities: {
          1: { id: 1, channelId: 1, body: 'Hello', username: 'user1' },
          2: { id: 2, channelId: 1, body: 'World', username: 'user2' },
        },
      },
      modal: { show: false, type: 'closed', id: null },
    })

    expect(screen.getByText('user1')).toBeInTheDocument()
    expect(screen.getByText(/Hello/)).toBeInTheDocument()
    expect(screen.getByText('user2')).toBeInTheDocument()
    expect(screen.getByText(/World/)).toBeInTheDocument()
  })

  it('filters messages by channelId', () => {
    renderWithStore({
      channels: {
        ids: [1, 2],
        entities: {
          1: { id: 1, name: 'general' },
          2: { id: 2, name: 'random' },
        },
        currentChannelId: 1,
      },
      messages: {
        ids: [1, 2, 3],
        entities: {
          1: { id: 1, channelId: 1, body: 'Msg in general', username: 'user1' },
          2: { id: 2, channelId: 2, body: 'Msg in random', username: 'user2' },
          3: { id: 3, channelId: 1, body: 'Another in general', username: 'user3' },
        },
      },
      modal: { show: false, type: 'closed', id: null },
    })

    expect(screen.getByText(/Msg in general/)).toBeInTheDocument()
    expect(screen.getByText(/Another in general/)).toBeInTheDocument()
    expect(screen.queryByText(/Msg in random/)).not.toBeInTheDocument()
  })
})
