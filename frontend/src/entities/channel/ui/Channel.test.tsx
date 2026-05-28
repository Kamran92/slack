import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Channel from './Channel'

interface ChannelProps {
  id: number
  name: string
  removable?: boolean
}

const mockHandleChannel = vi.fn()
const mockRemove = vi.fn()
const mockRename = vi.fn()

const renderChannel = (channel: ChannelProps, currentChannel: ChannelProps | null = null) => {
  return {
    ...render(
      <Channel
        handleChannel={mockHandleChannel}
        channel={channel}
        currentChannel={currentChannel}
        remove={mockRemove}
        rename={mockRename}
      />,
    ),
    user: userEvent.setup(),
  }
}

describe('Channel', () => {
  it('renders non-removable channel as button', () => {
    renderChannel({ id: 1, name: 'general' })
    expect(screen.getByRole('button', { name: /general/i })).toBeInTheDocument()
  })

  it('applies btn-secondary class when channel is active', () => {
    renderChannel({ id: 1, name: 'general' }, { id: 1, name: 'general' })
    const button = screen.getByRole('button', { name: /general/i })
    expect(button).toHaveClass('btn-secondary')
  })

  it('calls handleChannel on click', async () => {
    const { user } = renderChannel({ id: 1, name: 'general' })
    const button = screen.getByRole('button', { name: /general/i })
    await user.click(button)
    expect(mockHandleChannel).toHaveBeenCalledWith(1)
  })

  it('renders ChannelDropdown for removable channel', () => {
    renderChannel({ id: 1, name: 'general', removable: true })
    expect(screen.getByRole('button', { name: /general/i })).toBeInTheDocument()
  })
})
