import { NavBar } from "../components/navbar";
import { SideBar } from "../components/sidebar";
import { Outlet } from "react-router-dom";
import { userContext } from '../userContext'

export default function Root() {

  return (
    <>
      <userContext.Provider value={1} >
        <NavBar />
        <div className="flex flex-row">
          <SideBar className="relative"/>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </userContext.Provider>
    </>
  );
}