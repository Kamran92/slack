import { useSelector, useDispatch } from 'react-redux'
import { toast, type Id } from 'react-toastify'
import { actions } from '@app/store/slices/Modals'
import AddChannel from './AddModal'
import RemoveChannel from './RemoveModal'
import RenameChannel from './RenameModal'

interface ModalState {
  show: boolean
  type: 'closed' | 'add' | 'remove' | 'rename'
  id: number | null
}

const Modal = () => {
  const dispatch = useDispatch()
  const handleClose = () => dispatch(actions.closeModal())
  const modal = useSelector((state: { modal: ModalState }) => state.modal)
  const { type } = modal
  const toastMessage = (message: string, result: 'success' | 'error'): Id => {
    const toastLabel = result === 'success'
      ? toast.success(message, { toastId: `${message} success` })
      : toast.error(message, { toastId: `${message} error` })
    return toastLabel
  }

  const setModal = {
    add: <AddChannel handleClose={handleClose} toast={toastMessage} />,
    remove: <RemoveChannel handleClose={handleClose} toast={toastMessage} />,
    rename: <RenameChannel handleClose={handleClose} toast={toastMessage} />,
    closed: null,
  }

  return (
    <div>
      {setModal[type]}
    </div>
  )
}

export default Modal
