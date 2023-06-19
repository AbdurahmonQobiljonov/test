import { Avatar, Button } from 'antd'
import { useAppSelector } from '../../libs/hooks/useAppSelector.ts'
import { selectIsAuthenticated } from '../../libs/slices/authSlice.ts'
import { useNavigate } from 'react-router-dom'
import { LOGIN, SIGN_UP } from '../../libs/constants/urls.ts'

export const HeaderAccount = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate(LOGIN)
  }
  const handleSignUpClick = () => {
    navigate(SIGN_UP)
  }
  return (
    <div className="flex gap-4">
      {isAuthenticated ? (
        <Avatar size={50} />
      ) : (
        <>
          <Button onClick={handleLoginClick} className="text-white">
            Login
          </Button>
          <Button onClick={handleSignUpClick} className=" text-white ">
            SignUp
          </Button>
        </>
      )}
    </div>
  )
}
