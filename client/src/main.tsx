import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home.tsx'
import { UserPack } from './components/userPack.tsx';
import { UserAllPacks } from './components/userAllPacks.tsx';
import { AllUserItems } from './components/allUserItems.tsx';
import { FilterTable } from './components/filterTable.tsx';
import { columns, itemTestData } from './components/Tables/itemsColumns.tsx';
import { GearSearch } from './components/gearSearch.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'packs/:userId',
        element: <UserAllPacks />
      },
      {
        path: 'gear/:userId',
        element: <AllUserItems />

      },
      {
        path: 'gear/community',
        element: <FilterTable columns={columns} data={itemTestData} />
      },
      {
        path: 'pack/:packId',
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
