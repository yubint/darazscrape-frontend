import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import ErrorPage from './error-page'
import Home from './routes/home'
import AddProduct from './routes/add-product'
import Login from './routes/login'
import Product from './routes/product'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { UserProvider } from './usercontext'
import { AuthorizationProvider } from './authorizationcontext'
import { AxiosProvider } from './axioscontext'
import Register from './routes/register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <AddProduct />
          },
          {
            path: "product/:productId",
            element: <Product />,
          }
        ]
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ]
  }
])

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    button: {
      textTransform: 'none',
      fontSize: '1.1rem'
    },
  },
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <AuthorizationProvider>
        <AxiosProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </AxiosProvider>
      </AuthorizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
