import { useAppSelector } from '../../libs/hooks/useAppSelector.ts'
import { login, selectAuthErrorMessage } from '../../libs/slices/authSlice.ts'
import { useAppDispatch } from '../../libs/hooks/useAppDispatch.ts'
import { Button, Form, Input, Modal } from 'antd'
import { hideModal, selectIsModalVisible } from '../../libs/slices/appSlice.ts'
import { ModalTypes } from '../../libs/models/modals.ts'
import { useCallback } from 'react'

const { useForm } = Form
export const LoginModal = () => {
  const [form] = useForm()
  const errorMessage = useAppSelector(selectAuthErrorMessage)
  const dispatch = useAppDispatch()
  const isVisible = useAppSelector(selectIsModalVisible)(ModalTypes.login)

  const handleClose = () => {
    dispatch(hideModal(ModalTypes.login))
  }
  const handleSummit = () => {
    form
      .validateFields()
      .then((values) => dispatch(login(values)))
      .then(() => handleClose())
  }

  const afterClose = useCallback(() => {
    form.resetFields()
  }, [form])

  return (
    <Modal
      title={'Login'}
      open={isVisible}
      onCancel={handleClose}
      afterClose={afterClose}
      footer={null}
    >
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
    </Modal>
  )
}
