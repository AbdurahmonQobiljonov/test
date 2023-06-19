import { ABOUT, AUTH, BASE_PATH, CONTACTS, LOGIN, SIGN_UP } from './urls.ts'
import { AuthLayout, MainLayout } from '../../components/Layout'
import { SignUp } from '../../pages/SignUp'
import { Login } from '../../pages/Login/Login.tsx'
import { Overview } from '../../pages/Overview/Overview.tsx'
import { Contacts } from '../../pages/Contacts'
import AboutPage from '../../pages/About/AboutPage.tsx'
import { ProtectedRoute } from '../../components/ProtectedRoute/ProtectedRouter.tsx'

export const routes = [
  {
    path: BASE_PATH,
    index: true,
    element: <Overview />,
  },
  {
    path: BASE_PATH,
    element: <MainLayout />,
    children: [
      {
        path: ABOUT,
        element: <AboutPage />,
      },
      {
        path: CONTACTS,
        element: <ProtectedRoute element={<Contacts />} />,
      },
    ],
  },
  {
    path: AUTH,
    element: <AuthLayout />,
    children: [
      {
        path: SIGN_UP,
        element: <SignUp />,
      },
      {
        path: LOGIN,
        element: <Login />,
      },
    ],
  },
]
