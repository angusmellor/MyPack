return (
  <div className={className}>
    {categories.map((cat) => {
      return (
        <div key={cat.category}>
          <h4>{cat.category}</h4>
          <Table>
            <TableCaption className={cn(`${showAdd? 'block' : 'hidden'}`)}>
              <Popover>
                <PopoverTrigger>
                  <Button variant="outline" className="w-10 rounded-full p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='flex justify-start'>
                  <ItemForm categoryId={cat.id}/>
                </PopoverContent>
              </Popover>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Desription</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <Droppable droppableId="list">
              {(provided) => {
                return (
                  <TableBody
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {userItems.map((item,i) => {
                      return item.categoryId === cat.id ? (
                        <Draggable key ={item.name} draggableId={String(item.id)} index={i}>
                          {(provided) => (
                            <TableRow
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="bg-white"
                            >
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell>{item.description}</TableCell>
                              <TableCell>{item.weight}</TableCell>
                              <TableCell className="text-right">{item.cost}</TableCell>
                            </TableRow>
                          )} 
                        </Draggable>
                      ) : null;
                    })}
                    {provided.placeholder}
                  </TableBody>
                );
              }}
            </Droppable>
          </Table>
        </div>
      )
    })}
  </div>
)
}
