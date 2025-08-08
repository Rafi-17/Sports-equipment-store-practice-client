import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Users from './components/Users.jsx'
import Update from './components/Update.jsx'
import Main from './components/Main.jsx'
import Home from './components/Home.jsx'
import AuthProvider from './firebase/AuthProvider.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import AddEquipment from './components/AddEquipment.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AllEquipment from './components/AllEquipment.jsx'
import EquipmentDetails from './components/EquipmentDetails.jsx'
import MyEquipment from './components/MyEquipment.jsx'
import UpdateEquipment from './components/UpdateEquipment.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children:[
      {
        path:'/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/users',
        element: <Users></Users>,
        loader: ()=>fetch('http://localhost:5000/users')
      },
      {
        path:'/update/:id',
        element:<Update></Update>,
        loader:({params})=>fetch(`http://localhost:5000/users/${params.id}`)
      },
      {
        path: '/addEquipment',
        element:<PrivateRoute><AddEquipment></AddEquipment></PrivateRoute>
      },
      {
        path: '/allEquipment',
        element:<AllEquipment></AllEquipment>,
        loader:()=>fetch('http://localhost:5000/equipments')
      },
      {
        path: '/equipments/:id',
        element: <PrivateRoute><EquipmentDetails></EquipmentDetails></PrivateRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/equipments/${params.id}`)
      },
      {
        path:'/myEquipments/:email',
        element:<PrivateRoute><MyEquipment></MyEquipment></PrivateRoute>,
        loader:({params})=>fetch(`http://localhost:5000/myEquipments/${params.email}`)
      },
      {
        path: '/myEquipments/updateEquipment/:id',
        element: <PrivateRoute><UpdateEquipment></UpdateEquipment></PrivateRoute>,
        loader:({params})=>fetch(`http://localhost:5000/equipments/${params.id}`)
      }
    ]
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router}></RouterProvider></AuthProvider>
  </StrictMode>,
)
