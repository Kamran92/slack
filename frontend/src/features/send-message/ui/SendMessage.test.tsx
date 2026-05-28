import { screen, fireEvent, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import SendMessage from './SendMessage'
import channelsReducer from '@app/store/slices/Channels'
import messagesReducer from '@app/store/slices/Messages'
import modalReducer from '@app/store/slices/Modals'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => vi.fn(),
    useSelector: () => [],
  }
})

vi.mock('socket.io-client', () => ({
  io: () => ({
    on: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn(),
  }),
}))

const renderWithStore = () => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      modal: modalReducer,
    },
  })

  return render(
    <Provider store={store}>
      <SendMessage />
    </Provider>,
  )
}

describe('SendMessage', () => {
  it('renders message input form', () => {
    renderWithStore()

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'charPage.chat.send' })).toBeInTheDocument()
  })

  it('allows user to enter message text', () => {
    renderWithStore()

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Hello world' } })

    expect(input).toHaveValue('Hello world')
  })

  it('submit button is disabled when input is empty', () => {
    renderWithStore()

    const button = screen.getByRole('button', { name: 'charPage.chat.send' })
    expect(button).toBeDisabled()
  })
})
