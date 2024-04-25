import React from 'react'
import {  cilFastfood, cilLan, cilRestaurant, cilUser } from '@coreui/icons'

const Menu = React.lazy(() => import('./views/menu/Menu'))
const Orders = React.lazy(() => import('./views/orders/orders'))
const Profile = React.lazy(() => import('./views/profile/profile'))
const Restaurant = React.lazy(() => import('./views/restaurants/restaurant'))
const Users = React.lazy(() => import('./views/users/Users'))
const Dashboard = React.lazy(() => import('./views/Dashboard/ADashboard'))

const routes = [
  { path: '/dashboard', exact: true, icon: cilRestaurant, name: 'Dashboard', element: Dashboard, role: ["admin", "owner"] },
  { path: '/menu', exact: true, icon: cilFastfood, name: 'Menu', element: Menu, role: ["owner"] },
  { path: '/orders', exact: true, icon: cilLan, name: 'Orders', element: Orders, role: ["owner"] },
  { path: '/profile', exact: true, icon: cilUser, name: 'Profile', element: Profile, role: ["all"] },
  { path: '/restaurants', exact: true, icon: cilRestaurant, name: 'Restaurants', element: Restaurant, role: ["admin"] },
  { path: '/users', exact: true, icon: cilRestaurant, name: 'Customers', element: Users, role: ["admin"] },
  
]


export default routes
