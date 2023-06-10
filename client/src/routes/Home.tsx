import { NavBar } from "../components/navbar";
import { SideBar } from "../components/sidebar";
import { UserAllPacks } from "../components/userAllPacks";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-12">
        <SideBar />
        <Outlet />
        {/* <UserAllPacks className='col-span-9'/> */}
        {/* <UserPack className="col-span-9"/> */}
        {/* <div className="col-span-9">
          <FilterTable columns={columns} data={itemTestData} />
        </div> */}
      </div>
    </>
  );
}