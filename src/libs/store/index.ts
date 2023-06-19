import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import appSlice from '../slices/appSlice'
import authSlice from '../slices/authSlice'
import contactSlice from '../slices/contacsSliice'
import { redirectMiddleware } from '../middlewares/redirectMiddleware.ts'

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    contact: contactSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend([redirectMiddleware]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
