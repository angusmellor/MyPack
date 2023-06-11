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
        element: <UserAllPacks />
      },
      {
        path: 'gear/user',
        element: <UserItems />

      },
      {
        path: 'gear/community',
        element: <FilterTable columns={columns} data={itemTestData} />
      },
      {
        path: 'packs/:packId',
        element: <UserPack />,
      },
      {
        path: 'test',
        element: <GearSearch />
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
