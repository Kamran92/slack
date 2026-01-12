import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { actions, selectors } from '../../slices/Channels.js';
import ChatContext from '../../contexts/chatContext';
import AuthContext from '../../contexts/authContext.jsx';
import { useTranslation } from 'react-i18next';

const RemoveModal = ({ handleClose, toast }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  const chatContext = useContext(ChatContext);
  const { removeChannel } = chatContext;
  const auth = useContext(AuthContext)
  const handleClick = () => {
    handleClose(true);
  };
  const id = useSelector((state) => state.modal.id);

  const remove = async () => {
    try {
      dispatch(actions.setChannelId(channels[0].id));
      await removeChannel(id, auth.getAuth());
      handleClose(true);
      toast('Канал удалён', 'success');
    } catch {
      toast('Ошибка', 'error');
    }
  };

  return (
    <>
      <div className="fade modal-backdrop show">
        <div />
      </div>
      <div role="dialog" aria-modal="true" style={{ display: 'block' }} className="fade modal show" tabIndex="-1">
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
                <Button onClick={() => remove()} type="button" value="submit" variant="primary btn-danger">{t('modal.removeSend')}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveModal;
