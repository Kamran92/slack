import {
  getChannels,
  addChannel as addChannelToStore,
  removeChannel as removeChannelFromStore,
  renameChannel as renameChannelInStore,
} from '../models/index.js'

// Global broadcast function (set by app.js)
let broadcastFn = () => {}

export const setBroadcast = (fn) => {
  broadcastFn = fn
}

export const getChannelsList = async () => {
  return getChannels()
}

export const createChannel = async (request, reply) => {
  const { name } = request.body
  const channel = addChannelToStore(name)
  broadcastFn('newChannel', channel)
  return channel
}

export const deleteChannel = async (request, reply) => {
  const { id } = request.params
  removeChannelFromStore(parseInt(id))
  broadcastFn('removeChannel', { id: parseInt(id) })
  return { id: parseInt(id) }
}

export const updateChannel = async (request, reply) => {
  const { id } = request.params
  const { name } = request.body
  renameChannelInStore(parseInt(id), name)
  // updateOne expects { id, changes } where changes contains only the fields to update
  broadcastFn('renameChannel', { id: parseInt(id), name })
  return { id: parseInt(id), name }
}