import { CustomRouter } from './components/CustomRouter'
import { Routing } from './components/Routing'
import { history } from './libs/utils/history'
import { useAppDispatch } from './libs/hooks/useAppDispatch.ts'
import { useEffect } from 'react'
import { fetchContacts } from './libs/slices/contacsSliice.ts'

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchContacts())
  }, [])

  return (
    <CustomRouter history={history}>
      <Routing />
    </CustomRouter>
  )
}
