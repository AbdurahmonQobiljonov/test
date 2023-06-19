import { Form, Input, Modal, Select } from 'antd'
import {
  template,
  validateEmail,
  validateFullName,
  validateImageUrl,
  validatePhoneNumber,
  VALIDATION_MESSAGES,
} from '../../libs/validations/common.ts'
import { useAppSelector } from '../../libs/hooks/useAppSelector.ts'
import { hideModal, selectIsModalVisible } from '../../libs/slices/appSlice.ts'
import { ModalTypes } from '../../libs/models/modals.ts'
import { useAppDispatch } from '../../libs/hooks/useAppDispatch.ts'
import { useCallback } from 'react'
import { contentOptions } from '../../libs/constants/contacts.ts'
import { addContacts } from '../../libs/slices/contacsSliice.ts'

const { useForm, Item } = Form
const { Option } = Select

export const CreateContact = () => {
  const [form] = useForm()
  const isVisible = useAppSelector(selectIsModalVisible)(ModalTypes.createContact)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(hideModal(ModalTypes.createContact))
  }

  const afterClose = useCallback(() => {
    form.resetFields()
  }, [form])
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(addContacts(values))
      })
      .then(() => dispatch(hideModal(ModalTypes.contactUpdate)))
  }

  return (
    <Modal
      title={'Create contact'}
      open={isVisible}
      afterClose={afterClose}
      onCancel={handleClose}
      onOk={handleSubmit}
    >
      <Form form={form}>
        <label>Full Name</label>
        <Item
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
                  new Error(template(VALIDATION_MESSAGES.NOT_VALID, { fieldName: 'full name' }))
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
        </Item>
        <label className="field__label">Email</label>
        <Item
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
        </Item>
        <label className="field__label">Phone Number</label>
        <Item
          className="field mt-1"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: template(VALIDATION_MESSAGES.REQUIRED, { fieldName: 'phone number' }),
            },
            {
              validator(_, value) {
                if (!value || validatePhoneNumber(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Incomplete phone number'))
              },
            },
          ]}
        >
          <Input className="p-3 w-full" type="text" placeholder="Please write without spaces" />
        </Item>
        <label className="field__label">Image</label>
        <Item
          className="field mt-1"
          name="imageUrl"
          rules={[
            {
              required: true,
              message: template(VALIDATION_MESSAGES.REQUIRED, { fieldName: 'phone number' }),
            },
            {
              validator(_, value) {
                if (!value || validateImageUrl(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Incomplete image url'))
              },
            },
          ]}
        >
          <Input className="p-3 w-full" type="text" placeholder="Please write without spaces" />
        </Item>
        <Form.Item name="group" className="field">
          <Select placeholder="Select group" optionFilterProp="children" defaultValue={'Работа'}>
            {contentOptions.map(({ value, label }) => {
              return (
                <Option className="p-6" key={value} value={value}>
                  {label}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
