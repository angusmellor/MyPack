import { apiService } from "./apiService"
import { SideBar } from "./components/sidebar"
import { UserPack } from "./components/userPack"

function App() {

  const test = apiService.getAll('items');
  console.log(test);

  return (
    <>
      <div className="grid grid-cols-12">
        <SideBar className="col-span-3"/>
        <UserPack className="col-span-9"/>
      </div>
    </>
  )
}

export default App
