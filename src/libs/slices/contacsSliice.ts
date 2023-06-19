import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPrefix } from '../utils/common.ts'
import rest from '../services/rest.ts'
import { API } from '../constants/api.ts'
import { Contacts } from '../models/contacts.ts'
import { RootState } from '../store'
import { generatePath } from 'react-router-dom'

const name = 'contacts'
interface ContactsSlice {
  contacts: Contacts[]
}

const initialState: ContactsSlice = {
  contacts: [] as Contacts[],
}

export const fetchContacts = createAsyncThunk(getPrefix(name, 'fetchContacts'), async () => {
  const response = await rest.get(API.CONTACTS)
  return response.data
})

export const addContacts = createAsyncThunk<Contacts[], Contacts>(
  getPrefix(name, 'addContacts'),
  async (data, thunkAPI) => {
    const response = await rest.post(API.CONTACTS, data)
    thunkAPI.dispatch(fetchContacts())
    return response.data
  }
)

export const deleteCard = createAsyncThunk<Contacts[], string>(
  getPrefix(name, 'deleteCard'),
  async (contactId, thunkAPI) => {
    const response = await rest.delete(generatePath(API.CONTACTS_ID, { contactId }))
    thunkAPI.dispatch(fetchContacts())
    return response.data
  }
)

export const updateCard = createAsyncThunk<string, Contacts>(
  getPrefix(name, 'updateCard'),
  async (data, thunkAPI) => {
    const response = await rest.patch(generatePath(API.CONTACTS_ID, { contactId: data.id }), data)
    thunkAPI.dispatch(fetchContacts())
    return response.data
  }
)
export const contactSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload
    })
  },
})

export const selectContactsData = (state: RootState) => state.contact.contacts

export default contactSlice.reducer
