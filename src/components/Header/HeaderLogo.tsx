import { BASE_PATH } from '../../libs/constants/urls.ts'
import logo from '../../assets/image/Vcontact-1.png'
import { Link } from 'react-router-dom'

export const HeaderLogo = () => {
  return (
    <Link to={BASE_PATH}>
      <img src={logo} width={200} height={30} alt="logo" />
    </Link>
  )
}
