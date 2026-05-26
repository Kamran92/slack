import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { actions, selectors } from '@app/store/slices/Channels'
import ChatContext from '@app/providers/ChatProvider'
import AuthContext from '@app/providers/AuthProvider'
import { useTranslation } from 'react-i18next'

interface RemoveModalProps {
  handleClose: (result?: boolean) => void
  toast: (message: string, result: 'success' | 'error') => string | number
}

const RemoveModal = ({ handleClose, toast }: RemoveModalProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(selectors.selectAll)
  const chatContext = useContext(ChatContext)
  const { removeChannel } = chatContext!
  const auth = useContext(AuthContext)
  const handleClick = () => {
    handleClose(true)
  }
  const id = useSelector((state: { modal: { id: number | null } }) => state.modal.id)

  const remove = async () => {
    try {
      if (channels.length > 0 && channels[0]) {
        dispatch(actions.setChannelId(channels[0].id))
      }
      await removeChannel(id!, auth!.getAuth())
      handleClose(true)
      toast('Канал удалён', 'success')
    }
    catch {
      toast('Ошибка', 'error')
    }
  }

  return (
    <>
      <div className="fade modal-backdrop show">
        <div />
      </div>
      <div role="dialog" aria-modal="true" style={{ display: 'block' }} className="fade modal show" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('modal.remove')}</div>
              <button onClick={handleClick} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
            </div>
            <div className="modal-body">
              <p className="lead">{t('modal.confirm')}</p>
              <div className="d-flex justify-content-end">
                <Button onClick={handleClick} type="button" variant="secondary me-2">{t('modal.cancel')}</Button>
                <Button onClick={() => remove()} type="button" variant="primary btn-danger">{t('modal.removeSend')}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RemoveModal
