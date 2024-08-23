import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import Cart from './Cart.jsx';
import Profile from './Profile.jsx';
import './index.css'
import Home from './Home.jsx';
import ErrorPage from './ErrorPage.jsx';
import SingleProductPage from './SingleRecipePage.jsx';
import appStore from './utils/store/appStore.js';
import { Provider } from 'react-redux'

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App></App>,
    children : [
      {
        path : "/",
        element : <Home></Home>
      },
      {
        path : "/cart",
        element : <Cart></Cart>
      },
      {
        path : "/profile",
        element : <Profile></Profile>
      },
      {
        path : "/recipe/:id",
        element : <SingleProductPage></SingleProductPage>
      }
    ],
    errorElement : <ErrorPage></ErrorPage>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
  <RouterProvider router={appRouter}></RouterProvider>
  </Provider>
)
