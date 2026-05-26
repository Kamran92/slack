import { createSlice } from '@reduxjs/toolkit'

interface ModalState {
  show: boolean
  type: 'closed' | 'add' | 'remove' | 'rename'
  id: number | null
}

const initialState: ModalState = { show: false, type: 'closed', id: null }

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }: { payload: Partial<ModalState> }) => ({
      ...state,
      ...payload,
    }),
    closeModal: () => initialState,
  },
})

const { actions } = modalSlice
const selectors = (state: { modal: ModalState }) => state.modal
export { actions, selectors }
export default modalSlice.reducer
