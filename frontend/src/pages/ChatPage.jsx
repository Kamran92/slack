import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions as channelsAction } from '../slices/Channels.js';
import HeaderComponent from '../components/Header.jsx';
import ChannelsComponent from '../components/Channels.jsx';
import { actions as messagesAction } from '../slices/Messages.js';
import authContext from '../contexts/authContext.jsx';

const ChatPage = () => {
  const auth = useContext(authContext)
  const dispatch = useDispatch();

  useEffect(() => {
    const getResponse = async () => {
      try {
        const channels = await axios.get('/api/v1/channels', {
          headers: auth.getAuth(),
        });
        const messages = await axios.get('/api/v1/messages', {
          headers: auth.getAuth(),
        })
        dispatch(channelsAction.addChannels(channels.data));
        dispatch(messagesAction.addMessages(messages.data));
        dispatch(channelsAction.setChannelId(channels.data[0].id));
      } catch(err) {
        console.log(err)
      }
    };
    getResponse();
  }, [auth, dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <HeaderComponent />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelsComponent />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
