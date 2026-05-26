import { useRef, useEffect, useContext } from 'react'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import ChatContext from '@app/providers/ChatProvider'
import { ChannelsState, selectors } from '@app/store/slices/Channels'
import AuthContext from '@app/providers/AuthProvider'
import { useTranslation } from 'react-i18next'
import { channelsNameSchema } from '../lib/channelsNameSchema'

interface RenameModalProps {
  handleClose: () => void
  toast: (message: string, result: 'success' | 'error') => string | number
}

interface RenameModalValues {
  channelName: string
}

const RenameModal = ({ handleClose, toast }: RenameModalProps) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContext = useContext(ChatContext)
  const auth = useContext(AuthContext)
  const { renameChannel } = chatContext!
  const id = useSelector((state: { modal: { id: number | null } }) => state.modal.id)
  const channel = useSelector((state: { channels: ChannelsState }) => selectors.selectById(state, id!))?.name ?? ''
  const channelsName = useSelector(selectors.selectAll).map(chanel => chanel.name)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const onSubmit = async (values: RenameModalValues) => {
    try {
      await renameChannel({ id: id!, name: values.channelName }, auth!.getAuth())
      handleClose()
      toast('Канал переименован', 'success')
    }
    catch {
      toast('Ошибка', 'error')
    }
  }

  const formik = useFormik({
    initialValues: {
      channelName: channel,
    },
    onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: channelsNameSchema(channelsName),
  })

  useEffect(() => {
    inputRef.current?.select()
  }, [])

  return (
    <>
      <div className="fade modal-backdrop show">
        <div />
      </div>
      <div role="dialog" aria-modal="true" style={{ display: 'block' }} className="fade modal show" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('modal.rename')}</div>
              <button onClick={handleClose} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
            </div>
            <div className="modal-body">
              <Form onSubmit={formik.handleSubmit}>
                <fieldset disabled={formik.isSubmitting}>
                  <div>
                    <Form.Control
                      className="mb-2"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.channelName}
                      name="channelName"
                      id="channelName"
                      autoComplete="off"
                      isInvalid={!!(formik.errors.channelName && formik.touched.channelName)}
                      required
                      ref={inputRef}
                    />
                    <label className="visually-hidden" htmlFor="channelName">{t('chatPage.channels.name')}</label>
                    {formik.errors.channelName && formik.touched.channelName && (
                      <div className="invalid-feedback">{formik.errors.channelName}</div>
                    )}

                    <div className="d-flex justify-content-end">
                      <Button onClick={handleClose} type="button" variant="secondary me-2" disabled={formik.isSubmitting}>{t('modal.cancel')}</Button>
                      <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('modal.send')}</Button>
                    </div>
                  </div>
                </fieldset>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RenameModal
