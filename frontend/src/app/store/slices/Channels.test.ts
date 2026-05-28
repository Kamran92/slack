import channelsReducer, { actions, selectors, type Channel, type ChannelsState } from './Channels'

describe('channels slice', () => {
  const initialState: ChannelsState = {
    ids: [1, 2],
    entities: {
      1: { id: 1, name: 'general' },
      2: { id: 2, name: 'random' },
    },
    currentChannelId: 1,
  }

  it('should add a single channel', () => {
    const newChannel: Channel = { id: 3, name: 'new' }
    const state = channelsReducer(initialState, actions.addChannel(newChannel))
    expect(state.ids).toContain(3)
    expect(state.entities[3]).toEqual(newChannel)
  })

  it('should add multiple channels', () => {
    const newChannels: Channel[] = [
      { id: 3, name: 'channel3' },
      { id: 4, name: 'channel4' },
    ]
    const state = channelsReducer(initialState, actions.addChannels(newChannels))
    expect(state.ids).toContain(3)
    expect(state.ids).toContain(4)
  })

  it('should remove a channel', () => {
    const state = channelsReducer(initialState, actions.removeChannel(1))
    expect(state.ids).not.toContain(1)
    expect(state.entities[1]).toBeUndefined()
  })

  it('should rename a channel', () => {
    const state = channelsReducer(initialState, actions.renameChannel({
      id: 1,
      changes: { name: 'renamed' },
    }))
    expect(state.entities[1]?.name).toBe('renamed')
  })

  it('should set current channel id', () => {
    const state = channelsReducer(initialState, actions.setChannelId(2))
    expect(state.currentChannelId).toBe(2)
  })

  it('selectAll selector should return all channels', () => {
    const result = selectors.selectAll({ channels: initialState })
    expect(result).toHaveLength(2)
    expect(result.map(c => c.id)).toEqual([1, 2])
  })
})
