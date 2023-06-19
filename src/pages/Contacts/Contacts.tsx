import { useAppSelector } from '../../libs/hooks/useAppSelector.ts'
import { deleteCard, selectContactsData } from '../../libs/slices/contacsSliice.ts'
import { ContactCard } from '../../components/Contact'
import { Button, Col, Input, Row } from 'antd'
import { useAppDispatch } from '../../libs/hooks/useAppDispatch.ts'
import { setModalData, showModal } from '../../libs/slices/appSlice.ts'
import { ModalTypes } from '../../libs/models/modals.ts'
import { Contacts as ContactsProps } from '../../libs/models/contacts.ts'
import { ContactUpdateModal } from '../../components/Modals/ContactUpdateModal.tsx'
import { CreateContact } from '../../components/Modals/CreateContact.tsx'
import { useCallback, useState } from 'react'

export const Contacts = () => {
  const contacts = useAppSelector(selectContactsData)
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchItems, setSearchItems] = useState<ContactsProps[]>([])

  const isEmptySearchResult = Boolean(!searchItems.length)
  const isSearching = Boolean(searchTerm.length)
  const showEmptySearchResult = isSearching && isEmptySearchResult
  const showSearchContent = isSearching && !isEmptySearchResult

  const searchContacts = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchTermText = e.target.value
      setSearchTerm(searchTermText)
      const filteredContacts = contacts.filter(
        (contact) =>
          contact.fullName?.toLowerCase().includes(searchTermText.toLowerCase()) ||
          contact.email?.toLowerCase().includes(searchTermText.toLowerCase()) ||
          contact.group?.toLowerCase().includes(searchTermText.toLowerCase()) ||
          contact.phoneNumber.toLowerCase().includes(searchTermText.toLowerCase())
      )
      setSearchItems(filteredContacts)
    },
    [contacts]
  )

  const deleteContactCard = (contactId: number) => () => {
    dispatch(deleteCard(String(contactId)))
  }

  const updateContact = (data: ContactsProps) => () => {
    dispatch(showModal(ModalTypes.contactUpdate))
    dispatch(
      setModalData({
        type: ModalTypes.contactUpdate,
        modalData: {
          data,
        },
      })
    )
  }

  const handleAddContact = () => {
    dispatch(showModal(ModalTypes.createContact))
  }

  return (
    <div>
      <h2 className="mx-6 text-4xl">Catalog</h2>
      <div className="flex justify-between mx-6 my-6">
        <Input
          className=" p-3 w-96"
          placeholder="Search"
          value={searchTerm}
          onChange={searchContacts}
        />
        <Button onClick={handleAddContact} className="p-6 flex items-center justify-center">
          Add Contact
        </Button>
      </div>
      {showEmptySearchResult && (
        <div className="text-center">
          <h2 className="text-4xl">Ничего не найдено</h2>
        </div>
      )}
      <Row gutter={[24, 24]} className="my-10 px-6 ">
        {showSearchContent &&
          searchItems?.map((item) => (
            <Col
              key={item.id}
              span={24}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
              xxl={{ span: 6 }}
            >
              <ContactCard
                {...item}
                deleteContactCard={deleteContactCard(item.id)}
                updateContact={updateContact(item)}
              />
            </Col>
          ))}
        {!isSearching &&
          contacts?.map((item) => (
            <Col
              key={item.id}
              span={24}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
              xxl={{ span: 6 }}
            >
              <ContactCard
                {...item}
                deleteContactCard={deleteContactCard(item.id)}
                updateContact={updateContact(item)}
              />
            </Col>
          ))}
      </Row>
      <ContactUpdateModal />
      <CreateContact />
    </div>
  )
}
