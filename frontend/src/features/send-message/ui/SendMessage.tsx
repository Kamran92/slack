import { useState, useRef, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { InputGroup, Form, Button } from 'react-bootstrap'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import { getCurrentChannel } from '@app/store/slices/Channels'
import ChatContext from '@app/providers/ChatProvider'
import authContext from '@app/providers/AuthProvider'
import { useTranslation } from 'react-i18next'

const SendMessages = () => {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  const currentChannel = useSelector(getCurrentChannel)
  const auth = useContext(authContext)
  const chat = useContext(ChatContext)

  const sendMessage = async () => {
    if (!currentChannel || !auth) return
    const message = {
      id: Date.now(),
      body: text,
      channelId: currentChannel.id,
      username: (auth.user?.username as string) ?? '',
    }

    await chat?.sendNewMessage?.(message, auth.getAuth())

    setText('')
  }

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        className="py-1 border rounded-2"
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage()
        }}
      >
        <InputGroup className="has-validation">
          <Form.Control
            name="body"
            placeholder="Введите сообщение..."
            value={text}
            onChange={e => setText(e.target.value)}
            aria-label="Новое сообщение"
            className="border-0 p-0 ps-2"
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
  )
}

export default SendMessages
