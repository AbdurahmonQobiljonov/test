import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import rest from '../services/rest.ts'
import { API } from '../constants/api.ts'
import { User } from '../models/user.ts'
import { getPrefix } from '../utils/common.ts'
import { RootState } from '../store'
import Cookies from 'js-cookie'
import { TOKEN } from '../constants/cookie.ts'

const name = 'auth'

export interface AuthState {
  isLoading: boolean
  success: boolean
  errorMessage?: string
  user: User
}

const initialState: AuthState = {
  isLoading: false,
  success: false,
  errorMessage: '',
  user: {} as User,
}
type Response = { token: string }

type SignUpResponse = { data: User; token: string }

export const login = createAsyncThunk<Response, Partial<User>>(
  getPrefix(name, 'login'),
  async (data) => {
    const { email, password } = data
    const response = await rest.post(API.LOGIN, { email, password })
    return response.data
  }
)

export const signUp = createAsyncThunk<SignUpResponse, User>(
  getPrefix(name, 'signUp'),
  async (data) => {
    const response = await rest.post(API.USER_REGISTER, data)
    return response.data
  }
)

export const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.errorMessage = ''
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<Response>) => {
        state.isLoading = false
        state.success = true
        Cookies.set(TOKEN, action.payload.token)
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true
        state.errorMessage = ''
        state.success = false
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<SignUpResponse>) => {
        state.isLoading = false
        state.success = true
        state.user = action.payload.data
        Cookies.set(TOKEN, action.payload.token)
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false
        state.success = false
        let errorMessage = 'Something went wrong. Please try again later.'
        if (action.error.message?.includes('email') && action.error.message?.includes('unique')) {
          errorMessage = 'User with email id already exists.'
        }
        state.errorMessage = errorMessage
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.success = false
        state.errorMessage = action.error.message || 'Something went wrong. Please try again later.'
      })
  },
})

export const { logout } = authSlice.actions

export const selectIsAuthenticated = (state: RootState) => state.auth.success

export const selectAuthErrorMessage = (state: RootState) => state.auth.errorMessage

export const selectUserData = (state: RootState) => state.auth.user

export const selectIsHasUser = (state: RootState) => !!state.auth.user.email

export default authSlice.reducer
