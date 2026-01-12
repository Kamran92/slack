import { useState, useRef, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { getCurrentChannel } from '../slices/Channels.js';
import ChatContext from '../contexts/chatContext.jsx';
import authContext from '../contexts/authContext.jsx';
import { useTranslation } from 'react-i18next';

const Messages = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const ref = useRef();
  const currentChannel = useSelector(getCurrentChannel);
  const auth = useContext(authContext)
  const chatContext = useContext(ChatContext);
  const { sendNewMessage } = chatContext;

  const sendMessage = async () => {
    const message = {
      body: text,
      channelId: currentChannel.id,
      username: auth.user.username,
    };

    await sendNewMessage(message, auth.getAuth());

    setText('');
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        className="py-1 border rounded-2"
        noValidate=""
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <InputGroup className="has-validation">
          <Form.Control
            name="body"
            placeholder="Введите сообщение..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Новое сообщение"
            className="border-0 p-0 ps-2"
            noValidate=""
            ref={ref}
          />
          <Button variant="group-vertical btn-light" type="submit" disabled={text === ''}>
            <ArrowRightSquare width="20" height="20" />
            <span className="visually-hidden">
              {t('charPage.chat.send')}
            </span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default Messages;
