import { apiService } from "./apiService"
import { SideBar } from "./components/sidebar"
import { NavBar } from "./components/navbar";
import { UserAllPacks } from "./components/userAllPacks";
import { FilterTable } from "./components/filterTable";
import { columns, Item } from "./components/Tables/itemsColumns";

function App() {

  const test = apiService.getAll('items');
  console.log(test);

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-12">
        <SideBar />
        {/* <UserAllPacks className='col-span-9'/> */}
        {/* <UserPack className="col-span-9"/> */}
        <div className="col-span-9">
          {/* <FilterTable columns={columns} data={itemTestData} /> */}
        </div>
      </div>
    </>
  )
}

export default App
