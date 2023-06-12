import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { Pack } from '../lib/types';
import { apiService } from '../apiService';

const packFormSchema = z.object({
  name: z.string({required_error: "Name is required",
    invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "Must be 3 or more characters long" }),
  trail: z.string({required_error:"Trail is required",
    invalid_type_error: "Trail must be a string",
    })
    .min(3, { message: "Must be 3 or more characters long" }),
  isWinter: z.optional(z.boolean()),
  isSummer: z.optional(z.boolean()),
  isSolo: z.optional(z.boolean()),
  isGroup: z.optional(z.boolean()),
  isFemale: z.optional(z.boolean())
})

type PackFormProps = {
  className?: string
  setUserPacks:  React.Dispatch<React.SetStateAction<Pack[]>>;
  userPacks: Pack[], 
  userId: number,
  setShowForm: React.Dispatch<any>,
  showForm: boolean
}

export function PackForm ({
  className, 
  setUserPacks, 
  userPacks, 
  userId, 
  setShowForm,
  showForm
}: PackFormProps) {

  const form = useForm<z.infer<typeof packFormSchema>>({
    resolver: zodResolver(packFormSchema),
    defaultValues: {
      name: '',
      trail: '',
      isWinter: false,
      isSummer: false,
      isGroup: false,
      isFemale: false,
      isSolo: false
    }
  })

  function onSubmit(pack: z.infer<typeof packFormSchema>) {
    const setPack = async (pack: z.infer<typeof packFormSchema>) => {
      const newPack = {...pack, userId: userId }
      const addedPack = await apiService.addPack(newPack);
      setUserPacks([...userPacks, addedPack])
    }
    setPack(pack);
    setShowForm (() => showForm? false : true)
    form.reset();
  }

  return (
    <div className={cn(className)}>
      <Form {...form}>
          <form className='' onSubmit={form.handleSubmit(onSubmit)}>
            <div className=''>
              <FormField
                control={form.control}
                name= 'name'
                render = {({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className='' placeholder='e.g Scotland 2024' {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name= 'trail'
                render = {({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Trail</FormLabel>
                    <FormControl>
                      <Input className='w-max' placeholder='e.g West Highland Way' {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <Button type='submit' className='mt-2'>Add</Button>
            </div>
          </form>
      </Form>
    </div>
  )
}