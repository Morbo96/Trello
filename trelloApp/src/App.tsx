import { DragEvent, useState } from 'react'
import './App.css'
import { Layout } from '@consta/uikit/Layout'
import { Text } from '@consta/uikit/Text'
import { CanvasColumn } from './models/CanvasColumn'
import { Card } from '@consta/uikit/Card'
import { TextField } from '@consta/uikit/TextField'
import { DatePicker } from '@consta/uikit/DatePicker'
import { Checkbox } from '@consta/uikit/Checkbox'
// import { getRandomColor } from './helpers/getRandomColor'
import { Button } from '@consta/uikit/Button'
import { IconClose } from '@consta/icons/IconClose'
import { Todo } from './models/Todo'

function App() {
  const [columns, setColumns] = useState<CanvasColumn[]>(
    [
      {
        id: 1,
        name: 'Запланировано',
        color: '#6cd4ac',
        order: 1,
        todos: [
          {id: 1, name: '1', description: 'sdasda', complitionDate: new Date('11.11.2024'), status: false},
          {id: 2, name: '2', description: 'sdasda', complitionDate: new Date('11.11.2024'), status: false},
          {id: 3, name: '3', description: 'sdasda', complitionDate: new Date('11.11.2024'), status: false},
          {id: 4, name: '4', description: 'sdasda', complitionDate: new Date('11.11.2024'), status: false},
        ]
      },
      {
        id: 2,
        name: 'В работе',
        color: '#92e8c7',
        order: 2,
        todos: [
          {id: 5, name: '5', description: 'sdasda', complitionDate: new Date('11.11.2024'), status: false},
        ]
      },
      {
        id: 3,
        name: 'Завершено',
        color: '#e8dd92',
        order: 3,
        todos: [
          {id: 6, name: '6', description: 'sdasda', complitionDate: new Date('11.11.2024'), status: false},
        ]
      }
    ]
  )
  const [currentTodo, setCurrentTodo] = useState<Todo>(
    {
      complitionDate: new Date, 
      description: '',
      id: 0,
      name: '',
      status: false,
    }
  )
  const [currentColumn, setCurrentColumn] = useState<CanvasColumn>(
    {
      color: '',
      id: 0,
      name: '',
      order: 0,
      todos: []
    }
  )

  const [columnForm, setColumnForm] = useState<CanvasColumn>({
    id: 0,
    color: '#e66465',
    name: '',
    order: 0,
    todos: [],
  })

  const handleAddColumnButton = () => {
    const newArray = columns
    newArray.push(columnForm)
    console.log(columns);
    setColumns(newArray)
    setColumns(columns.map((c) => {
      return c
    }))
  }

  const handleDeleteColumnButton = (e: any, columnId: number) => {
    setColumns(
      columns.filter((column) => column.id !== columnId)
    )
  }

  const handleAddTodoButton = (columnId: number) => {
    const foundColumn = columns.find( (column) => columnId === column.id  )
    setColumns(
      columns.map((column) => {
        const todoArray = column.todos
        if (column.id === foundColumn?.id) {
          todoArray.push({
            id: Date.now(),
            complitionDate: new Date(),
            description: '',
            name: '',
            status: false,
          })
        }
        return {
          ...column,
          todos: todoArray,
        }
      })
    )
  }

  const handleDeleteTodoButton = (todoId: number) => setColumns(
    columns.map( (column) => {
      const todoArray = column.todos.filter((todo) => todo.id !== todoId)
      return {
        ...column,
        todos: todoArray
      }
    })
  )

  const handleNameChange = (value: string|null, id: number) => setColumns(
    columns.map( (column) => {
      return {
        ...column,
        todos: column.todos.map((todo) => {
          (id === todo.id) ? todo.name = value : todo.name
          return todo
        })
      }
    })
  )

  const handleDescriptionChange = (value: string|null, id: number) => setColumns(
    columns.map( (column) => {
      return {
        ...column,
        todos: column.todos.map((todo) => {
          (id === todo.id) ? todo.description = value : todo.description
          return todo
        })
      }
    })
  )

  const handleStatusChange = (e: any, id: number) => setColumns(
    columns.map( (column) => {
      return {
        ...column,
        todos: column.todos.map((todo) => {
          (id === todo.id) ? todo.status = e.target.checked : todo.status
          return todo
        })
      }
    })
  )
  
  const handleDateChange = (value: Date|null, id: number) => setColumns(
    columns.map( (column) => {
      return {
        ...column,
        todos: column.todos.map((todo) => {
          (id === todo.id) ? todo.complitionDate = value : todo.complitionDate
          return todo
        })
      }
    })
  )
   
  function onDragOverTodoHandler(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault()
  }
  
  function onDragStartTodoHandler(e: DragEvent<HTMLDivElement>, column: CanvasColumn, todo: Todo): void {
    setCurrentColumn(column)
    setCurrentTodo(todo)
    console.log(todo);
  }
 
  function onDropTodoHandler(e: DragEvent<HTMLDivElement>, column: CanvasColumn, todo: Todo): void {
    console.log('drop on todo');
    e.preventDefault()
    e.stopPropagation()
    const currentIndex = currentColumn.todos.indexOf(currentTodo)
    currentColumn.todos.splice(currentIndex, 1)
    const dropIndex = column.todos.indexOf(todo)
    column.todos.splice(dropIndex + 1, 0, currentTodo)
    setColumns(columns.map((c) => {
      if (c.id === column.id) {
        return column
      }
      if (c.id === currentColumn.id) {
        return currentColumn
      }
      return c
    }))
    console.log(todo);
  }

  function onDropTodoToColumnHandler(e: DragEvent<HTMLDivElement>, column: CanvasColumn) : void {
    console.log('drop on column');
    e.preventDefault()
    column.todos.push(currentTodo)
    const currentIndex = currentColumn.todos.indexOf(currentTodo)
    currentColumn.todos.splice(currentIndex, 1)
    setColumns(columns.map((c) => {
      if (c.id === column.id) {
        return column
      }
      if (c.id === currentColumn.id) {
        return currentColumn
      }
      return c
    }))
  }

  return (
    <>
      <Layout 
        // direction="row" 
        style={{}}
      >
        {columns.map((column) => 
          <Layout key={column.id} flex={1} style={{backgroundColor: column.color}}>
            <Card 
              style={{
                padding: 20, 
                display: 'flex',
                flexDirection: 'column',
                width: 240,
                height: 950,
              }}
              onDrop={(e) => onDropTodoToColumnHandler(e, column)}
              onDragOver={(e) => onDragOverTodoHandler(e)}
            > 
              <IconClose style={{alignSelf: 'flex-end', marginBottom: 6}} onClick={(e) => handleDeleteColumnButton(e, column.id)}/>
              <Text view="primary" size="m" lineHeight="m" style={{textAlign: 'center', marginBottom: 10}}>
                { column.name }
              </Text>
              {column.todos.map((todo) =>
                <Card 
                  draggable={true}
                  onDrop={(e) => onDropTodoHandler(e, column, todo)}
                  onDragStart={(e) => onDragStartTodoHandler(e, column, todo)}
                  onDragOver={(e) => onDragOverTodoHandler(e)}
                  key={todo.id} 
                  verticalSpace="m" 
                  horizontalSpace="m" 
                  form="round" 
                  shadow={false} 
                  border={true}
                  style={{
                    width: 200,
                    height: 200,
                    marginBottom: 10, 
                    backgroundColor: !todo.status ? "white" : "grey",
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  
                >
                  <IconClose size='s' style={{alignSelf: 'flex-end', marginBottom: 6}} onClick={() => handleDeleteTodoButton(todo.id)}/>
                  <TextField 
                    size='xs'
                    onChange={(value) => handleNameChange(value, todo.id)}
                    value={todo.name}
                    type="text"
                    placeholder="Заголовок"
                    style={{marginBottom: 8}}
                    disabled={todo.status}
                  />
                  <TextField
                    size='xs'
                    type="textarea"
                    placeholder="Описание"
                    rows={2}
                    cols={30}
                    value={todo.description}
                    onChange={(value) => handleDescriptionChange(value, todo.id)}
                    style={{marginBottom: 8}}
                    disabled={todo.status}
                  />
                  <DatePicker 
                    size='xs'
                    type="date"
                    value={todo.complitionDate}
                    onChange={(date) => handleDateChange(date, todo.id)} 
                    style={{marginBottom: 8}}
                    disabled={todo.status}
                  />
                  <Checkbox 
                    size='xs'
                    label="Выполнено" 
                    checked={todo.status}
                    onChange={(e) => handleStatusChange(e, todo.id)}
                  />
                </Card>
              )}
              <Button label="Добавить задачу" onClick={() => handleAddTodoButton(column.id)}/>
            </Card>
          </Layout>
        )}    
        <Card verticalSpace="m" horizontalSpace="m" >
          <Layout direction='column' style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text size="xl" style={{marginBottom: 8}}>Создание стадии</Text>
            <Text style={{marginBottom: 8, alignSelf: 'start'}}>Название стадии</Text>
            <TextField 
              size='s'
              onChange={(value) => setColumnForm({...columnForm, name: value})}
              value={columnForm.name}
              type="text"
              placeholder="Новая стадия"
              style={{marginBottom: 8}}
            />
            <Text style={{marginBottom: 8, alignSelf: 'start'}}>Выбирете цвет</Text>
            <input 
              style={{marginBottom: 8, width: 220}}
              type="color"
              value={columnForm.color} 
              onChange={(e) => setColumnForm({...columnForm, color: e.target.value})} 
            />
            <Button label="Добавить стадию" onClick={() => handleAddColumnButton()}/>
          </Layout>
        </Card>
      </Layout>
      
    </>
  )
}

export default App
