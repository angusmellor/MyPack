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
    trail: 'Pacific Crest Trail,',
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
      {testPacks.map((pack) => {
        return (
          <PackImage/>
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
  )
}