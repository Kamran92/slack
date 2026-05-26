import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

export interface Channel {
  id: number
  name: string
}

export interface ChannelsState {
  ids: number[]
  entities: Record<number, Channel>
  currentChannelId: number
}

const channelsAdapter = createEntityAdapter<Channel>()
const initialState: ChannelsState = channelsAdapter.getInitialState({ currentChannelId: 1 })

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
    setChannelId: (state, { payload }: { payload: number }) => ({ ...state, currentChannelId: payload }),
  },
})

const { actions } = channelsSlice
export const selectors = channelsAdapter.getSelectors<{ channels: ChannelsState }>(state => state.channels)
const getCurrentChannel = (state: { channels: ChannelsState }) => {
  const { currentChannelId } = state.channels
  const channelsMass = Object.values(state.channels.entities)
  return channelsMass.find(channel => channel?.id === currentChannelId)
}
export { actions, getCurrentChannel }
export default channelsSlice.reducer
