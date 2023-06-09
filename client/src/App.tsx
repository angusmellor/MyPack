import { apiService } from "./apiService"
import { SideBar } from "./components/sidebar"
import { NavBar } from "./components/navbar";
import { UserAllPacks } from "./components/userAllPacks";

function App() {

  const test = apiService.getAll('items');
  console.log(test);

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-12">
        <SideBar className="col-span-3 space-y-2"/>
        <UserAllPacks className='col-span-9'/>
        {/* <UserPack className="col-span-9"/> */}
      </div>
    </>
  )
}

export default App
