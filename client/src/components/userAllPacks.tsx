import { Compass, Plus, X } from 'lucide-react';
import { Popover , PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { Button } from './ui/button'
import { PackForm } from './packForm';
import { PackImage } from './packImage';
import { Card, CardContent } from './ui/card';
import { useState } from 'react';
import { cn } from '../lib/utils';

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
  },
  // {
  //   id: 3,
  //   user_id:1,
  //   name: 'PCT 2024',
  //   trail: 'Pacific Crest Trail',
  //   isWinter: true
  // },
  {
    id: 4,
    user_id:1,
    name: 'PCT 2024',
    trail: 'Pacific Crest Trail',
    isWinter: true
  }
]
type UserPacksProps = {
  className?: string
}

const categories = ['Big Four', 'Cook System', 'Clothing', 'Electronics', 'Miscellaneous']

export function UserAllPacks ({className}: UserPacksProps) {

  const [ showForm, setShowForm ] = useState(false);
  
  const handleClick = () => {
    setShowForm (() => showForm? false : true)
  }

  return (
    <div className={className}>
      <div  className='flex flex-row flex-wrap '>
        {testPacks.map((pack) => {
          return (
            <div className='w-1/3 flex justify-center mb-5'>
              <div className='w-fit flex flex-col justify-center max-w-max'>
                <a href={`/packs/${pack.id}`}>
                  <PackImage/>
                  <h4 className='font-bold'>{pack.name}</h4>
                  <div className="flex justify-start items-center">
                    <Compass className=" h-4"/>
                    <div className=" text-sm">{pack.trail}</div>
                  </div>
                </a>
              </div>
            </div>
          )})
        }
        <div className='w-1/3 flex justify-center items-center h-40'>
          <div className={cn(`${showForm? 'hidden' : 'block'}`)}>
            <Button variant="outline" className="w-10 rounded-full p-0" onClick={handleClick}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className={cn(`${showForm? 'block' : 'hidden'}`)}>
            <Card className=' p-2'>
              <CardContent className='flex-col first:ml-max'>
                <div className='flex justify-end'>
                  <Button className=' max-w-min' size='sm' variant='secondary' onClick={handleClick}>
                    <X className='min-w-min'/>
                  </Button>
                </div>
                <PackForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}