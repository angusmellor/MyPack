import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from '@radix-ui/react-label';

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

export function PackForm () {

  const form = useForm<z.infer<typeof packFormSchema>>({
    resolver: zodResolver(packFormSchema),
    defaultValues: {
      name: '',
      trail: '',
      isWinter: false,
      isSummer: false,
      isGroup: false,
      isFemale: false
    }
  })

  function onSubmit(item: z.infer<typeof packFormSchema>) {
    console.log(item)
    form.reset();
  }

  return (
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
              {/* <FormField
                control={form.control}
                name= 'isWinter'
                render = {({ field }) => (
                  <FormItem className='flex flex-col items-center'>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <input
                        type='checkbox'
                        {...register()}
                        />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
                /> */
                }
            <Button type='submit'>Add</Button>
          </div>
        </form>
    </Form>
  )
}