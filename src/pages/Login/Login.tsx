import { Button, Form, Input } from 'antd'
import { useAppSelector } from '../../libs/hooks/useAppSelector.ts'
import { login, selectAuthErrorMessage } from '../../libs/slices/authSlice.ts'
import { useAppDispatch } from '../../libs/hooks/useAppDispatch.ts'
import { Link } from 'react-router-dom'
import { SIGN_UP } from '../../libs/constants/urls.ts'

const { useForm } = Form
export const Login = () => {
  const [form] = useForm()
  const errorMessage = useAppSelector(selectAuthErrorMessage)
  const dispatch = useAppDispatch()
  const handleSummit = () => {
    form.validateFields().then((values) => dispatch(login(values)))
  }

  return (
    <div className="auth-login">
      <div className="auth-login__header">
        <h2 className="auth-login__title">Welcome!</h2>
        <h2 className="auth-login__subtitle">
          Use these awesome form to login or create a new account on VContact.
        </h2>
      </div>
      <div className="auth-login__form p-7">
        <Form form={form}>
          <label className="field__label">Email</label>
          <Form.Item className="field" name="email">
            <Input className="p-3" type="email" placeholder="Your email address" required />
          </Form.Item>
          <label className="field__label">Password</label>
          <Form.Item className="field" name="password">
            <Input className="p-3" type="password" placeholder="Your password" required />
          </Form.Item>
          {errorMessage && <div className="field__error">{errorMessage}</div>}
          <Button
            className="mt-4 w-full bg-indigo-900 p-5 flex items-center justify-center"
            type="primary"
            onClick={handleSummit}
          >
            Sign in
          </Button>
        </Form>
        <div className="text-center mt-5">
          if you do not have account yet please{' '}
          <Link className="text-blue-700" to={SIGN_UP}>
            register
          </Link>
        </div>
      </div>
    </div>
  )
}
