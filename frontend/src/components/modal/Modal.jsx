import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { actions } from '../../slices/Modals.js'
import AddChannel from './AddModal.jsx'
import RemoveChannel from './RemoveModal.jsx'
import RenameChannel from './RenameModal.jsx'

const Modal = () => {
  const dispatch = useDispatch()
  const handleClose = () => dispatch(actions.closeModal())
  const modal = useSelector(state => state.modal)
  const { show, type } = modal
  const toastMessage = (message, result) => {
    const toastLabel = result === 'success'
      ? toast.success(message, { toastId: `${message} success` })
      : toast.error(message, { toastId: `${message} error` })
    return toastLabel
  }

  const setModal = {
    add: <AddChannel show={show} handleClose={handleClose} toast={toastMessage} />,
    remove: <RemoveChannel show={show} handleClose={handleClose} toast={toastMessage} />,
    rename: <RenameChannel show={show} handleClose={handleClose} toast={toastMessage} />,
    closed: null,
  }

  return (
    <div>
      {setModal[type]}
    </div>
  )
}

export default Modal
