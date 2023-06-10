import { apiService } from "./apiService"
import { SideBar } from "./components/sidebar"
import { NavBar } from "./components/navbar";
import { UserAllPacks } from "./components/userAllPacks";
import { FilterTable } from "./components/filterTable";
import { columns, Item } from "./components/Tables/itemsColumns";

function App() {

  const test = apiService.getAll('items');
  console.log(test);

  const itemTestData: Item[] = [
    {
      id: 1,
      name: 'Tent',
      description: 'Zpacks Duplex',
      weight: 0.5,
      cost: 500
    },
    {
      id: 2,
      name: 'Backpack',
      description: 'ULA Ohm 2.0',
      weight: 0.5,
      cost: 150
    },
    {
      id: 3,
      name: 'Shoes',
      description: 'Hoka Speedgoat 5',
      weight: 0.5,
      cost: 200
    }
  ]

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-12">
        <SideBar className="col-span-3 space-y-2"/>
        {/* <UserAllPacks className='col-span-9'/> */}
        {/* <UserPack className="col-span-9"/> */}
        <div className="col-span-9">
          <FilterTable columns={columns} data={itemTestData} />
        </div>
      </div>
    </>
  )
}

export default App
