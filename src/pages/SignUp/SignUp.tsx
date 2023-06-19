import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { LOGIN } from '../../libs/constants/urls.ts'
import { useAppSelector } from '../../libs/hooks/useAppSelector.ts'
import { selectAuthErrorMessage, signUp } from '../../libs/slices/authSlice.ts'
import {
  template,
  validateEmail,
  validateFullName,
  validatePassword,
  VALIDATION_MESSAGES,
} from '../../libs/validations/common.ts'
import { useAppDispatch } from '../../libs/hooks/useAppDispatch.ts'
import { User } from '../../libs/models/user.ts'

const { useForm } = Form
export const SignUp = () => {
  const [form] = useForm()
  const errorMessage = useAppSelector(selectAuthErrorMessage)
  const dispatch = useAppDispatch()

  const handleSummit = () => {
    form.validateFields().then(({ fullName, email, password }: User) => {
      const data = {
        email,
        fullName,
        password,
      }
      dispatch(signUp(data))
    })
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
          <label>Full Name</label>
          <Form.Item
            className="field mt-1"
            name="fullName"
            rules={[
              {
                required: true,
                message: template(VALIDATION_MESSAGES.REQUIRED, { fieldName: 'fullName' }),
              },
              {
                validator(_, value) {
                  if (!value || validateFullName(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(template(VALIDATION_MESSAGES.NOT_VALID, { fieldName: 'name' }))
                  )
                },
              },
              {
                min: 2,
                max: 40,
                message: template(VALIDATION_MESSAGES.MIN_MAX, {
                  fieldName: 'name',
                  min: 2,
                  max: 40,
                }),
              },
            ]}
          >
            <Input className="p-3" autoFocus placeholder="Your full name" />
          </Form.Item>
          <label className="field__label">Email</label>
          <Form.Item
            className="field mt-1"
            name="email"
            rules={[
              {
                required: true,
                message: template(VALIDATION_MESSAGES.REQUIRED, { fieldName: 'email' }),
              },
              {
                validator(_, value) {
                  if (!value || validateEmail(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Incomplete email address'))
                },
              },
              {
                min: 5,
                max: 256,
                message: template(VALIDATION_MESSAGES.MIN_MAX, {
                  fieldName: 'email',
                  min: 5,
                  max: 256,
                }),
              },
            ]}
          >
            <Input className="p-3" type="email" placeholder="Your email address" />
          </Form.Item>

          <label className="field__label">Password</label>
          <Form.Item
            className="field mt-1"
            name="password"
            rules={[
              {
                required: true,
                message: template(VALIDATION_MESSAGES.REQUIRED, { fieldName: 'password' }),
              },
              {
                validator(_, value) {
                  if (!value || validatePassword(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The password not valid'))
                },
              },
              {
                min: 5,
                max: 50,
                message: template(VALIDATION_MESSAGES.MIN_MAX, {
                  fieldName: 'password',
                  min: 6,
                  max: 50,
                }),
              },
            ]}
          >
            <Input className="p-3" type="password" placeholder="Your password" required />
          </Form.Item>
          <label className="field__label">Repeat password</label>
          <Form.Item
            className="field mt-1"
            name="repeatPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!')
                  )
                },
              }),
            ]}
          >
            <Input className="p-3" type="password" placeholder="Confirm password" />
          </Form.Item>
          {errorMessage && <div className="field__error">{errorMessage}</div>}
          <Button
            className="mt-8 w-full bg-indigo-900 p-5 flex items-center justify-center"
            type="primary"
            onClick={handleSummit}
          >
            Sign up
          </Button>
        </Form>
        <div className="text-center mt-8">
          Already have an account?{' '}
          <Link to={LOGIN} className="text-blue-800">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
