import { FullHeader } from '../Header/Header.tsx'
import { Footer } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
import { LoginModal } from '../Modals/LogiinModal.tsx'

export const MainLayout = () => {
  return (
    <div className="layout">
      <FullHeader />
      <div className="layout__container">
        <div className="layout__content">
          <div className="layout__outlet">
            <Outlet />
          </div>
          <Footer className="layout__footer bg-indigo-900 ">
            <div className="text-white flex flex-col gap-4">
              <span>Contact details phone number:+998 99 611 57 31</span>
              <span>Contact details email: xonobod.n@gmail.com</span>
            </div>
          </Footer>
          <LoginModal />
        </div>
      </div>
    </div>
  )
}

export const AuthLayout = () => {
  return (
    <div className="layout bg-indigo-900">
      <div className="layout__container">
        <div className="layout__content">
          <div className="layout__outlet">
            <Outlet />
          </div>
          <Footer className="layout__footer bg-transparent">footer</Footer>
        </div>
      </div>
    </div>
  )
}
