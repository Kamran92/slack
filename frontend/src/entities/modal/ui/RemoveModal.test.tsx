import { screen, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import RemoveModal from './RemoveModal'
import channelsReducer from '@app/store/slices/Channels'
import messagesReducer from '@app/store/slices/Messages'
import modalReducer from '@app/store/slices/Modals'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock('@app/providers/AuthProvider', () => ({
  default: React.createContext({
    user: { token: 'test-token' },
    logIn: vi.fn(),
    logOut: vi.fn(),
    getAuth: () => ({ Authorization: 'Bearer test-token' }),
  }),
}))

vi.mock('@app/providers/ChatProvider', () => ({
  default: React.createContext({
    createChannel: vi.fn(),
    removeChannel: vi.fn(),
    renameChannel: vi.fn(),
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
      <RemoveModal handleClose={() => {}} toast={() => '1'} />
    </Provider>,
  )
}

describe('RemoveModal', () => {
  it('renders modal with title and confirmation text', () => {
    renderWithStore()

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('modal.remove')).toBeInTheDocument()
    expect(screen.getByText('modal.confirm')).toBeInTheDocument()
  })

  it('renders cancel and remove buttons', () => {
    renderWithStore()

    expect(screen.getByRole('button', { name: 'modal.cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'modal.removeSend' })).toBeInTheDocument()
  })
})
