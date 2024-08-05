import { DragEvent, useState } from 'react'
import { Layout } from '@consta/uikit/Layout'
import { CanvasColumn } from './../models/CanvasColumn'
import { Todo } from './../models/Todo'
import { JSONData, normalizeDate } from './../helpers/normalizeDate'
import DataContext from './Context'
import ColumnComponent from './Column'
import ControlPanel from './ControlPanel'

function AppLayout() {
  const data : JSONData[] = JSON.parse(localStorage.getItem("data") || '""')
  
  let normalizedData : CanvasColumn[] = []
  if (data) {
    normalizedData = normalizeDate(data)
  }
  
  const [columns, setColumns] = useState<CanvasColumn[]>(normalizedData)

  const [newTodos, setNewTodos] = useState<CanvasColumn>({
    id: 0,
    color: 'white',
    name: 'default',
    order: 0,
    todos: [],
  })

  const [currentTodo, setCurrentTodo] = useState<Todo>({
    complitionDate: new Date, 
    description: '',
    id: 0,
    name: '',
    status: false,
  })

  const [currentColumn, setCurrentColumn] = useState<CanvasColumn>({
    color: '',
    id: 0,
    name: '',
    order: 0,
    todos: [],
  })

  const [columnForm, setColumnForm] = useState<CanvasColumn>({
    id: 0,
    color: '#d6bef4',
    name: '',
    order: 0,
    todos: [],
  })

  const [isDragTodo, setIsDragTodo] = useState<boolean>(false)
  const [isDragColumn, setIsDragColumn] = useState<boolean>(false)

  const handleAddColumnButton = () => {
    const newArray = columns
    newArray.push({...columnForm, id: Date.now(), order: newArray.length + 1, todos: []})
    setColumns(newArray)
    setColumns(columns.map((c) => {
      return c
    }))
  }

  const handleDeleteColumnButton = (columnId: number) => {
    setColumns(columns.filter((column) => column.id !== columnId))
  }

  const handleAddTodoButton = (columnId: number) => {
    if (columnId === 0) {
      const updatedColumn = newTodos
      updatedColumn.todos.push({
        id: Date.now(),
        complitionDate: new Date(),
        description: '',
        name: '',
        status: false,
      })
      setNewTodos(updatedColumn)
      const updatedTodos = newTodos.todos.map((c) => {
        return c
      })
      setNewTodos({
        ...newTodos,
        todos: updatedTodos,
      })
    } else {
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
  }

  const handleDeleteTodoButton = (todoId: number, isNewTodo: boolean) => {
    if (isNewTodo) {
      const todoArray = newTodos.todos.filter((todo) => todo.id !== todoId)
      setNewTodos({
        ...newTodos,
        todos: todoArray,
      })
    }
    setColumns(
      columns.map((column) => {
        const todoArray = column.todos.filter((todo) => todo.id !== todoId)
        return {
          ...column,
          todos: todoArray,
        }
      })
    )
  }

  const handleNameChange = (value: string|null, id: number, isNewTodo: boolean) => {
    if (isNewTodo) {
      setNewTodos({
        ...newTodos,
        todos: newTodos.todos.map((todo) => {
          (id === todo.id) ? todo.name = value : todo.name
          return todo
        }),
      })
    }
    setColumns(
      columns.map((column) => {
        return {
          ...column,
          todos: column.todos.map((todo) => {
            (id === todo.id) ? todo.name = value : todo.name
            return todo
          }),
        }
      })
    )
  }

  const handleDescriptionChange = (value: string|null, id: number, isNewTodo: boolean) => {
    if (isNewTodo) {
      setNewTodos({
        ...newTodos,
        todos: newTodos.todos.map((todo) => {
          (id === todo.id) ? todo.description = value : todo.description
          return todo
        }),
      })
    }
    setColumns(
      columns.map((column) => {
        return {
          ...column,
          todos: column.todos.map((todo) => {
            (id === todo.id) ? todo.description = value : todo.description
            return todo
          }),
        }
      })
    )
  }

  const handleStatusChange = (e: any, id: number, isNewTodo: boolean) => {
    if (isNewTodo) {
      setNewTodos({
        ...newTodos,
        todos: newTodos.todos.map((todo) => {
          (id === todo.id) ? todo.status = e.target.checked : todo.status
          return todo
        }),
      })
    }
    setColumns(
      columns.map((column) => {
        return {
          ...column,
          todos: column.todos.map((todo) => {
            (id === todo.id) ? todo.status = e.target.checked : todo.status
            return todo
          }),
        }
      })
    )
  }
  
  const handleDateChange = (value: Date | null, id: number, isNewTodo: boolean) => {
    if (isNewTodo) {
      setNewTodos({
        ...newTodos,
        todos: newTodos.todos.map((todo) => {
          (id === todo.id && value) ? todo.complitionDate = value : todo.complitionDate
          return todo
        }),
      })
    }
    setColumns(
      columns.map((column) => {
        return {
          ...column,
          todos: column.todos.map((todo) => {
            (id === todo.id && value) ? todo.complitionDate = value : todo.complitionDate
            return todo
          }),
        }
      })
    )
  }
   
  function onDragStartColumnHandler(column: CanvasColumn) {
    setCurrentColumn(column)
    setIsDragColumn(true)
    setIsDragTodo(false)
  }

  function onDragOverColumnHandler(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault()
  }

  function onDropColumnHandler(column: CanvasColumn): void {
    if (isDragColumn) {
      const currentIndex = columns.indexOf(currentColumn)
      const dropIndex = columns.indexOf(column)
      columns.splice(dropIndex, 1, currentColumn)
      columns.splice(currentIndex, 1, column)
      setColumns(columns.map((c) => {
        return c
      }))
    }
  }
  
  function onDragStartTodoHandler(column: CanvasColumn, todo: Todo): void {
    setCurrentColumn(column)
    setCurrentTodo(todo)
    setIsDragTodo(true)
    setIsDragColumn(false)
  }

  function onDragOverTodoHandler(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault()
  }
 
  function onDropTodoHandler(e: DragEvent<HTMLDivElement>, column: CanvasColumn, todo: Todo): void {
    e.preventDefault()
    e.stopPropagation()
    if (isDragTodo) {
      const currentIndex = currentColumn.todos.indexOf(currentTodo)
      const dropIndex = column.todos.indexOf(todo)
      column.todos.splice(dropIndex, 1, currentTodo)
      currentColumn.todos.splice(currentIndex, 1, todo)
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
  }

  function onDropTodoToColumnHandler(e: DragEvent<HTMLDivElement>, column: CanvasColumn) : void {
    e.preventDefault()
    if (isDragTodo) {
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
  }

  function handleSaveButton(): void {
    localStorage.setItem('data', JSON.stringify(columns))
  }

  const value = {
    onDragStartTodoHandler,
    onDragOverTodoHandler,
    onDropTodoHandler,
    handleDateChange,
    handleDescriptionChange,
    handleNameChange,
    handleDeleteTodoButton,
    handleStatusChange,
    onDragStartColumnHandler,
    onDropColumnHandler,
    onDragOverColumnHandler,
    handleDeleteColumnButton,
    onDropTodoToColumnHandler,
    handleAddTodoButton,
    handleSaveButton,
    columnForm,
    setColumnForm,
    handleAddColumnButton,
    newTodos
  }

  return (
    <DataContext.Provider value={value}>
      <Layout direction="row" style={{marginLeft: 10}}>
        {columns.map((column) => 
          <ColumnComponent column={column}/>
        )}    
        <ControlPanel />
      </Layout>
    </DataContext.Provider>
  )
}

export default AppLayout