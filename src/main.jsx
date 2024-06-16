import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import * as Comp from './Components/index.js'
import store from './store/auth.js'
import authservices from './Appwrite/auth.js'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path:'',
        element:<Comp.Home />
      },
      {
        path:'/login',
        element: <Comp.Login />
      },
      {
        path:'/sign-up',
        element: <Comp.SignUp />
      },
      {
        path:'/all-posts',
        element: <Comp.AllPosts />
      },
      {
        path:'/add-post',
        element: <Comp.AddPost />
      },
      {
        path:'/post/:slug',
        element:<Comp.Post />
      },
      {
        path: '/edit-post/:slug',
        element:<Comp.EditPost />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <RouterProvider router={router} /> 
  
    </Provider>

)
