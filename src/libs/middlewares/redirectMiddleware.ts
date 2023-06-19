import { Middleware } from '@reduxjs/toolkit'
import { login, signUp } from '../slices/authSlice.ts'
import { history } from '../utils/history.ts'
import { CONTACTS, LOGIN } from '../constants/urls.ts'
import { EMAIL, PASSWORD } from '../constants/cookie.ts'

export const redirectMiddleware: Middleware = (_store) => (next) => (action) => {
  if (action.type === signUp.fulfilled.type) {
    localStorage.setItem(EMAIL, action.payload.email)
    localStorage.setItem(PASSWORD, action.payload.password)
    history.push(CONTACTS)
    next(action)
    return
  }
  if (action.type === signUp.rejected.type) {
    history.push(LOGIN)
    next(action)
    return
  }
  if (action.type === login.fulfilled.type) {
    history.push(CONTACTS)
    localStorage.setItem(EMAIL, action.payload.email)
    localStorage.setItem(PASSWORD, action.payload.password)
    next(action)
    return
  }
  next(action)
}
