import { Fragment } from 'react'

import { useAppSelector } from '../../libs/hooks/useAppSelector'
import { selectIsAuthenticated } from '../../libs/slices/authSlice.ts'
import { useAppDispatch } from '../../libs/hooks/useAppDispatch.ts'
import { showModal } from '../../libs/slices/appSlice.ts'
import { ModalTypes } from '../../libs/models/modals.ts'

type Props = {
  isDisabled?: boolean
  element: JSX.Element
}

export const ProtectedRoute = ({ element, isDisabled }: Props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()

  if (!isAuthenticated) {
    dispatch(showModal(ModalTypes.login))
  }

  if (isDisabled) {
    return <Fragment />
  }

  return isAuthenticated ? element : null
}
