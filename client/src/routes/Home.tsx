import { NavBar } from "../components/navbar";
import { SideBar } from "../components/sidebar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <NavBar />
      <div className="flex flex-row">
        <SideBar className="relative"/>
        <div className=" w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}