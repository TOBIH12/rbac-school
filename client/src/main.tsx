import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import {UserProvider} from './context/UserContext.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Logout from './pages/Logout.tsx'
import Unauthorized from './pages/Unauthorized.tsx'
import CreateUser from './pages/CreateUser.tsx'
import CreateCourse from './pages/CreateCourse.tsx'
import CreateAnnouncements from './pages/CreateAnnouncements.tsx'
import Announcements from './pages/Announcements.tsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage/>,
    children: [
     {index: true, element: <Home />},
     {path: 'login', element: <Login />},
     {path: 'logout', element: <Logout />},
     {path: 'unauthorized', element: <Unauthorized />},
     {path: 'create_user', element: <CreateUser /> },
     {path: 'create_course', element: <CreateCourse /> },
     {path: 'create_announcement', element: <CreateAnnouncements /> },
     {path: 'announcements', element: <Announcements /> },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
