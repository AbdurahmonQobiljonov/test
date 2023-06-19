import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalTypes } from '../models/modals.ts'
import { RootState } from '../store'

const name = 'app'

const initialState = {
  activeModals: [] as ModalTypes[],
  modalData: {} as Record<ModalTypes, Record<string, unknown>>,
}

export const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalTypes>) => {
      state.activeModals = [...state.activeModals, action.payload]
    },
    setModalData: (
      state,
      action: PayloadAction<{ type: ModalTypes; modalData: Record<string, unknown> }>
    ) => {
      state.modalData = { ...state.modalData, [action.payload.type]: action.payload.modalData }
    },
    hideModal: (state, action: PayloadAction<ModalTypes>) => {
      state.activeModals = state.activeModals.filter((modalType) => modalType !== action.payload)

      // @ts-ignore
      delete state.modalData[action.payload]
    },
  },
})

export const { showModal, setModalData, hideModal } = appSlice.actions

export const selectModalData = (state: RootState) => state.app.modalData

export const selectActiveModals = (state: RootState) => state.app.activeModals

export const selectIsModalVisible = createSelector(
  selectActiveModals,
  (modals) => (modalType: ModalTypes) => modals.includes(modalType)
)

export const selectModalDataByType = createSelector(
  selectModalData,
  (modalData) => (modalType: ModalTypes) => modalData[modalType] || {}
)

export default appSlice.reducer
