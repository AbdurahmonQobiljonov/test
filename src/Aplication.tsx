import { App } from './App.tsx'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { getPopupContainer } from './libs/utils'
import { store } from './libs/store'

export const Aplication = () => {
  return (
    <ConfigProvider getPopupContainer={getPopupContainer}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  )
}
