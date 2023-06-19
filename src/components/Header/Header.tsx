import { Header } from 'antd/lib/layout/layout'
import { HeaderLogo } from './HeaderLogo.tsx'
import { HeaderAccount } from './HeaderAccount.tsx'
import { HeaderNav } from './HeaderNav.tsx'

export const FullHeader = () => {
  return (
    <Header className="flex items-center h-[80px] justify-between layout__header">
      <HeaderLogo />
      <div className="flex w-3/4 justify-between items-center">
        <HeaderNav />
        <HeaderAccount />
      </div>
    </Header>
  )
}
