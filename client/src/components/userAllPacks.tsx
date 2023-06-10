import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Compass, Plus } from 'lucide-react';
import { Popover , PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { Button } from './ui/button'
import { PackForm } from './packForm';
import { PackImage } from './packImage';
import { ItemForm } from './itemForm';

const testPacks = [
  {
    id: 1,
    user_id: 1,
    trail: 'Te Araroa',
    isSummer:true,
    name: 'The Dream'
  },
  {
    id: 2,
    user_id:1,
    name: 'PCT 2024',
    trail: 'Pacific Crest Trail',
    isWinter: true
  }
]
type UserPackProps = {
  className: string
}

const categories = ['Big Four', 'Cook System', 'Clothing', 'Electronics', 'Miscellaneous']

export function UserAllPacks ({className}: UserPackProps) {

  return (
    <div className={className}>
      <div  className='flex flex-row space-x-5 items centre'>
        {testPacks.map((pack) => {
          return (
            <div className='flex flex-col items-center max-w-max'>
            <PackImage/>
              <h4 className='font-bold'>{pack.name}</h4>
              <div className="flex justify-start items-center">
                <Compass className=" h-4"/>
                <div className=" text-sm">{pack.trail}</div>
              </div>
            </div>
          )})
        }
        <div>
          <Popover>
            <PopoverTrigger>
              <Button variant="outline" className="w-10 rounded-full p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PackForm/>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}