import { getMessages, addMessage as addMessageToStore } from '../models/index.js'

// Global broadcast function (set by app.js)
let broadcastFn = () => {}

export const setBroadcast = (fn) => {
  broadcastFn = fn
}

export const getMessagesList = async () => {
  return getMessages()
}

export const createMessage = async (request, reply) => {
  const { body, channelId, username } = request.body
  const message = addMessageToStore({ body, channelId, username })
  broadcastFn('newMessage', message)
  return message
}