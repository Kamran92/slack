import {
  createContext, useEffect, useMemo, useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import { actions as messagesActions } from '../slices/Messages.js';
import { actions as channelsActions } from '../slices/Channels.js';
import axios from 'axios';

const ChatContext = createContext({});

const ChatProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
    });

    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload.id));
    });

    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.renameChannel({ id: payload.id, changes: payload }));
    });
  }, [dispatch, socket]);

  const values = {
    sendNewMessage: async (message, auth) => await axios.post('/api/v1/messages', message, { headers: auth }),
    createChannel: async (name, auth) => {
      const {data} =  await axios.post('/api/v1/channels', name, { headers: auth })

      dispatch(channelsActions.addChannel(data))
      dispatch(channelsActions.setChannelId(data.id))
    },
    removeChannel: async (id, auth) =>  await axios.delete(`/api/v1/channels/${id}`, { headers: auth }),
    renameChannel: async (message, auth) =>  await axios.patch(`/api/v1/channels/${message.id}`, message, { headers: auth }),
  }

  return (
    <ChatContext.Provider value={values}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider };
export default ChatContext;
