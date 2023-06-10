import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home.tsx'
import { UserPack } from './components/userPack.tsx';
import { UserAllPacks } from './components/userAllPacks.tsx';
import { UserItems } from './components/userItems.tsx';
import { FilterTable } from './components/filterTable.tsx';
import {Item, columns } from './components/Tables/itemsColumns.tsx';


const itemTestData: Item[] = [
  {
    id: 1,
    name: 'Tent',
    description: 'Zpacks Duplex',
    weight: 0.5,
    cost: 500
  },
  {
    id: 2,
    name: 'Backpack',
    description: 'ULA Ohm 2.0',
    weight: 0.5,
    cost: 150
  },
  {
    id: 3,
    name: 'Shoes',
    description: 'Hoka Speedgoat 5',
    weight: 0.5,
    cost: 200
  }
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'packs',
        element: <UserAllPacks className=' col-span-9 ' />

      },
      {
        path: 'gear/user',
        element: <UserItems className=' col-span-9 ' />

      },
      {
        path: 'gear/community',
        element: <FilterTable className=' col-span-9 ' columns={columns} data={itemTestData} />
      },
      {
        path: 'packs/:packId',
        element: <UserPack className=' col-span-9 '/>,
      },
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
