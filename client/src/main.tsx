import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home.tsx'
import { UserPack } from './components/userPack.tsx';
import { UserAllPacks } from './components/userAllPacks.tsx';
import { UserItems } from './components/userItems.tsx';
import { FilterTable } from './components/filterTable.tsx';
import { columns, itemTestData } from './components/Tables/itemsColumns.tsx';
import { GearSearch } from './components/gearSearch.tsx';

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
      {
        path: 'test',
        element: <GearSearch className=' col-span-9'/>
      }
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
