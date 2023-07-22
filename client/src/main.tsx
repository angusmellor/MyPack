import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home.tsx'
import { UserPack } from './views/PackDashboard/userPack.tsx';
import { UserAllPacks } from './views/UserPacks/userAllPacks.tsx';
import { GearSearch } from './components/gearSearch.tsx';
import { AllUserItems } from './views/UserItems/allUserItems.tsx';
import { CommunityGear } from './views/CommunityItems/communityGear.tsx';
import { CommunityPacks } from './views/CommunityPacks/communityPacks.tsx';

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
        element: <CommunityGear/>
      },
      {
        path: 'pack/:packId',
        element: <UserPack />,
      },
      {
        path: 'packs/community',
        element: <CommunityPacks/>
      }
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
