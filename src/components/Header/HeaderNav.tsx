import { Link } from 'react-router-dom'
import { ABOUT, CONTACTS } from '../../libs/constants/urls.ts'

export const HeaderNav = () => {
  return (
    <nav className="flex gap-9 items-center">
      <Link to={CONTACTS} className="text-white text-xl cursor-pointer">
        Contacts
      </Link>
      <Link to={ABOUT} className="text-white text-xl cursor-pointer">
        About
      </Link>
    </nav>
  )
}
