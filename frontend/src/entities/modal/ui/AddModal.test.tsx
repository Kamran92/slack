import { screen, fireEvent, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import AddModal from './AddModal'
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

vi.mock('leo-profanity', () => ({
  default: {
    clean: (text: string) => text,
  },
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
      <AddModal handleClose={() => {}} toast={() => '1'} />
    </Provider>,
  )
}

describe('AddModal', () => {
  it('renders modal with title and input', () => {
    renderWithStore()

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('modal.add')).toBeInTheDocument()
    expect(screen.getByLabelText('chatPage.channels.name')).toBeInTheDocument()
  })

  it('renders cancel and submit buttons', () => {
    renderWithStore()

    expect(screen.getByRole('button', { name: 'modal.cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'modal.send' })).toBeInTheDocument()
  })

  it('allows user to enter channel name', () => {
    renderWithStore()

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'New Channel' } })

    expect(input).toHaveValue('New Channel')
  })
})
