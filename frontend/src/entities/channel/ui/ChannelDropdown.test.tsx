import { screen, fireEvent, waitFor, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import ChannelDropdown from './ChannelDropdown'
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
  }
})

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
      <ChannelDropdown
        channel={{ id: 1, name: 'Test Channel' }}
        currentChannel={null}
        handleChannel={() => {}}
        remove={() => {}}
        rename={() => {}}
      />
    </Provider>,
  )
}

describe('ChannelDropdown', () => {
  it('renders dropdown toggle with channel name', () => {
    renderWithStore()

    const buttons = screen.getAllByRole('button')
    const mainButton = buttons[0]

    expect(mainButton).toBeInTheDocument()
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('Test Channel')).toBeInTheDocument()
  })

  it('opens dropdown menu on click', async () => {
    renderWithStore()

    const buttons = screen.getAllByRole('button')
    const toggleButton = buttons[1]
    if (toggleButton) {
      fireEvent.click(toggleButton)
    }

    await waitFor(() => {
      expect(screen.getByText('Удалить')).toBeInTheDocument()
      expect(screen.getByText('Переименовать')).toBeInTheDocument()
    })
  })
})
