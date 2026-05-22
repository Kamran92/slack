// In-memory хранилище данных
let users = [
  { id: 1, username: 'admin', password: 'admin123' },
]

let channels = [
  { id: 1, name: 'general', removable: false },
]

let messages = [
  { id: 1, channelId: 1, body: 'Welcome to the chat!', username: 'admin' },
]

let nextUserId = 2
let nextChannelId = 2
let nextMessageId = 2

export const getChannels = () => channels
export const getChannelById = (id) => channels.find(c => c.id === id)
export const addChannel = (name) => {
  const channel = { id: nextChannelId++, name, removable: true }
  channels.push(channel)
  return channel
}
export const removeChannel = (id) => {
  channels = channels.filter(c => c.id !== id)
}
export const renameChannel = (id, name) => {
  const channel = channels.find(c => c.id === id)
  if (channel) {
    channel.name = name
  }
  return channel
}

export const getMessages = () => messages
export const getMessagesByChannel = (channelId) => messages.filter(m => m.channelId === channelId)
export const addMessage = (message) => {
  const msg = { id: nextMessageId++, ...message }
  messages.push(msg)
  return msg
}

export const getUserByUsername = (username) => users.find(u => u.username === username)
export const createUser = (username, password) => {
  const user = { id: nextUserId++, username, password }
  users.push(user)
  return user
}
export const getUserById = (id) => users.find(u => u.id === id)