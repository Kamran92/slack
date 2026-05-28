import messagesReducer, { actions, selectors, type Message, type MessagesState } from './Messages'
import { actions as channelsActions } from './Channels'

describe('messages slice', () => {
  const initialState: MessagesState = {
    ids: [1, 2, 3],
    entities: {
      1: { id: 1, channelId: 1, body: 'msg1', username: 'user1' },
      2: { id: 2, channelId: 1, body: 'msg2', username: 'user2' },
      3: { id: 3, channelId: 2, body: 'msg3', username: 'user3' },
    },
  }

  it('should add a single message', () => {
    const newMessage: Message = { id: 4, channelId: 1, body: 'msg4', username: 'user4' }
    const state = messagesReducer(initialState, actions.addMessage(newMessage))
    expect(state.ids).toContain(4)
    expect(state.entities[4]).toEqual(newMessage)
  })

  it('should add multiple messages', () => {
    const newMessages: Message[] = [
      { id: 4, channelId: 1, body: 'msg4', username: 'user4' },
      { id: 5, channelId: 2, body: 'msg5', username: 'user5' },
    ]
    const state = messagesReducer(initialState, actions.addMessages(newMessages))
    expect(state.ids).toContain(4)
    expect(state.ids).toContain(5)
  })

  it('should remove messages when channel is removed', () => {
    const state = messagesReducer(initialState, channelsActions.removeChannel(1))
    expect(state.ids).not.toContain(1)
    expect(state.ids).not.toContain(2)
    expect(state.ids).toContain(3)
  })

  it('selectAll selector should return all messages', () => {
    const result = selectors.selectAll({ messages: initialState })
    expect(result).toHaveLength(3)
  })
})
