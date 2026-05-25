import cn from 'classnames'
import ChannelDropdown from './ChannelDropdown'

const Channel = ({
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
          <ChannelDropdown
            handleChannel={handleChannel}
            channel={channel}
            currentChannel={currentChannel}
            remove={remove}
            rename={rename}
          />
        )}
  </li>
)

export default Channel
