import { createContext, useEffect, ReactNode } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { io } from 'socket.io-client'
import { actions as messagesActions } from '../store/slices/Messages'
import { actions as channelsActions } from '../store/slices/Channels'

interface Message {
  id: number
  channelId: number
  body: string
  username: string
}

interface Channel {
  id: number
  name: string
}

interface ChatContextValue {
  sendNewMessage: (message: Message, auth: Record<string, string>) => Promise<void>
  createChannel: (name: { name: string }, auth: Record<string, string>) => Promise<void>
  removeChannel: (id: number, auth: Record<string, string>) => Promise<void>
  renameChannel: (message: { id: number, name: string }, auth: Record<string, string>) => Promise<void>
}

const ChatContext = createContext<ChatContextValue | null>(null)

interface ChatProviderProps {
  children: ReactNode
}

const ChatProvider = ({ children }: ChatProviderProps) => {
  const dispatch = useDispatch()

  const socket = io()

  useEffect(() => {
    socket.on('newMessage', (message: Message) => {
      dispatch(messagesActions.addMessage(message))
    })

    socket.on('newChannel', (channel: Channel) => {
      dispatch(channelsActions.addChannel(channel))
    })

    socket.on('removeChannel', (payload: { id: number }) => {
      dispatch(channelsActions.removeChannel(payload.id))
    })

    socket.on('renameChannel', (payload: { id: number, name: string }) => {
      dispatch(channelsActions.renameChannel({ id: payload.id, changes: { name: payload.name } }))
    })
  }, [dispatch, socket])

  const values: ChatContextValue = {
    sendNewMessage: async (message, auth) => await axios.post('/api/v1/messages', message, { headers: auth }),
    createChannel: async (name, auth) => {
      const { data } = await axios.post('/api/v1/channels', name, { headers: auth })

      dispatch(channelsActions.addChannel(data))
      dispatch(channelsActions.setChannelId(data.id))
    },
    removeChannel: async (id, auth) => await axios.delete(`/api/v1/channels/${id}`, { headers: auth }),
    renameChannel: async (message, auth) => await axios.patch(`/api/v1/channels/${message.id}`, message, { headers: auth }),
  }

  return (
    <ChatContext.Provider value={values}>
      {children}
    </ChatContext.Provider>
  )
}

export { ChatProvider }
export default ChatContext
