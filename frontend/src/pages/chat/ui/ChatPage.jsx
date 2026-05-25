import axios from 'axios'
import { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { actions as channelsAction } from '@app/store/slices/Channels.js'
import { Header } from '@widgets/header'
import { Chat } from '@widgets/chat'
import { actions as messagesAction } from '@app/store/slices/Messages.js'
import authContext from '@app/providers/AuthProvider.jsx'
import { Modal } from '@entities/modal'
import { toast, ToastContainer } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const ChatPage = () => {
  const { t } = useTranslation()
  const auth = useContext(authContext)
  const dispatch = useDispatch()

  useEffect(() => {
    const getResponse = async () => {
      try {
        const channels = await axios.get('/api/v1/channels', {
          headers: auth.getAuth(),
        })
        const messages = await axios.get('/api/v1/messages', {
          headers: auth.getAuth(),
        })
        dispatch(channelsAction.addChannels(channels.data))
        dispatch(messagesAction.addMessages(messages.data))
        dispatch(channelsAction.setChannelId(channels.data[0].id))
      }
      catch {
        auth.logOut()
        toast.error(t('toast.networkError'), { toastId: `${t('toast.networkError')} error` })
      }
    }
    getResponse()
  }, [auth, dispatch, t])

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />

        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Chat />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal />
    </>
  )
}

export default ChatPage
