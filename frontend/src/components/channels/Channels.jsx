import { useSelector, useDispatch } from 'react-redux'
import { PlusSquare } from 'react-bootstrap-icons'
import { selectors, actions, getCurrentChannel } from '../../slices/Channels.js'
import { selectors as messagesSelect } from '../../slices/Messages.js'
import Messages from '../Messages.jsx'
import RenderMessage from '../RenderMessages.jsx'
import { actions as modalAction } from '../../slices/Modals.js'
import { useTranslation } from 'react-i18next'
import ChannelItem from './ChannelItem.jsx'

const ChannelsComponent = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(selectors.selectAll)
  const currentChannel = useSelector(getCurrentChannel)
  const handleChannel = (id) => {
    dispatch(actions.setChannelId(id))
  }
  const messagesMass = useSelector(messagesSelect.selectAll)
  const currentMessages = messagesMass.filter(message => message.channelId === currentChannel.id)
  const currentChannelName = useSelector(selectors.selectAll)
    .find(({ id }) => id === currentChannel.id)
    ?.name

  const addChannel = () => {
    dispatch(modalAction.openModal({ type: 'add' }))
  }
  const removeChannel = (id) => {
    dispatch(modalAction.openModal({ type: 'remove', id }))
  }
  const renameChannel = (id) => {
    dispatch(modalAction.openModal({ type: 'rename', id }))
  }

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('chatPage.channels.title')}</b>
          <button onClick={addChannel} type="button" className="p-0 text-primary btn btn-group-vertical">
            <PlusSquare height="20" width="20" />
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {channels.map(channel => (
            <ChannelItem
              handleChannel={handleChannel}
              key={channel.id}
              channel={channel}
              currentChannel={currentChannel}
              remove={removeChannel}
              rename={renameChannel}
              t={t}
            />
          ))}
        </ul>
      </div>
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b>
                {`# ${currentChannelName}`}
              </b>
            </p>
            <span className="text-muted">{t('chatPage.chat.message', { count: currentMessages.length })}</span>
          </div>
          <RenderMessage />
          <Messages />
        </div>
      </div>
    </>
  )
}

export default ChannelsComponent
