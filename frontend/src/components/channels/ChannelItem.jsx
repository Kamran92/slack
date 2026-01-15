import cn from 'classnames'
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'

const ChannelItem = ({
  handleChannel,
  channel,
  currentChannel,
  remove,
  rename,
}) => (
  <li className="nav-item w-100" key={channel.id}>
    { !channel.removable
      ? (
          <button
            type="button"
            onClick={() => handleChannel(channel.id)}
            className={cn('w-100', 'rounded-0', 'text-start', 'btn', {
              'btn-secondary': channel.id === currentChannel.id,
            })}
          >
            <span>#</span>
            {' '}
            {channel.name}
          </button>
        )
      : (
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
        )}
  </li>
)

export default ChannelItem
