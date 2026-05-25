import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'

const ChannelDropdown = ({
  handleChannel,
  channel,
  currentChannel,
  remove,
  rename,
}) => (
  <Dropdown as={ButtonGroup} className="d-flex">
    <Button
      type="button"
      variant={channel.id === currentChannel.id && 'secondary'}
      onClick={() => handleChannel(channel.id)}
      className="w-100 rounded-0 text-start text-truncate"
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
    
    <Dropdown.Toggle
      split
      variant={channel.id === currentChannel.id && 'secondary'}
      id={`dropdown-split-basic-${channel.id}`}
    >
      <span className="visually-hidden">Управление каналом</span>
    </Dropdown.Toggle>
    
    <Dropdown.Menu>
      <Dropdown.Item
        href="#"
        onClick={() => remove(channel.id)}
        id={channel.id}
      >
        Удалить
      </Dropdown.Item>
      <Dropdown.Item
        href="#"
        onClick={() => rename(channel.id)}
        id={channel.id}
      >
        Переименовать
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default ChannelDropdown