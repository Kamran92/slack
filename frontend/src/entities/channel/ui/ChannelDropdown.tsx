import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'

interface Channel {
  id: number
  name: string
}

interface ChannelDropdownProps {
  handleChannel: (id: number) => void
  channel: Channel
  currentChannel: Channel | null
  remove: (id: number) => void
  rename: (id: number) => void
}

const ChannelDropdown = ({
  handleChannel,
  channel,
  currentChannel,
  remove,
  rename,
}: ChannelDropdownProps) => (
  <Dropdown as={ButtonGroup} className="d-flex">
    <Button
      type="button"
      variant={channel.id === currentChannel?.id ? 'secondary' : undefined}
      onClick={() => handleChannel(channel.id)}
      className="w-100 rounded-0 text-start text-truncate"
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>

    <Dropdown.Toggle
      split
      variant={channel.id === currentChannel?.id ? 'secondary' : undefined}
      id={`dropdown-split-basic-${channel.id}`}
    >
      <span className="visually-hidden">Управление каналом</span>
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item
        href="#"
        onClick={() => remove(channel.id)}
        id={`remove-${channel.id}`}
      >
        Удалить
      </Dropdown.Item>
      <Dropdown.Item
        href="#"
        onClick={() => rename(channel.id)}
        id={`rename-${channel.id}`}
      >
        Переименовать
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default ChannelDropdown
