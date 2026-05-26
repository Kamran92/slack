import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { actions as channelsActions } from './Channels'

export interface Message {
  id: number
  channelId: number
  body: string
  username: string
}

export interface MessagesState {
  ids: number[]
  entities: Record<number, Message>
}

const messagesAdapter = createEntityAdapter<Message>()
const initialState: MessagesState = messagesAdapter.getInitialState()

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, action) => {
      const { payload } = action
      const update = Object.values(state.entities).filter(e => e.channelId !== payload)
      messagesAdapter.setAll(state, update)
    })
  },
})

export const { actions } = messages
export const selectors = messagesAdapter.getSelectors<{ messages: MessagesState }>(state => state.messages)
export default messages.reducer
