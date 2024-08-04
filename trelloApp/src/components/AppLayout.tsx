import { DragEvent, useState } from 'react'
import { Layout } from '@consta/uikit/Layout'
import { Text } from '@consta/uikit/Text'
import { CanvasColumn } from './../models/CanvasColumn'
import { Card } from '@consta/uikit/Card'
import { TextField } from '@consta/uikit/TextField'
import { DatePicker } from '@consta/uikit/DatePicker'
import { Checkbox } from '@consta/uikit/Checkbox'
import { Button } from '@consta/uikit/Button'
import { IconClose } from '@consta/icons/IconClose'
import { IconHamburger } from '@consta/icons/IconHamburger'
import { Todo } from './../models/Todo'
import { JSONData, normalizeDate } from './../helpers/normalizeDate'

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

  return (
    <Layout direction="row" style={{marginLeft: 10}}>
      {columns.map((column) => 
        <Layout 
          key={column.id} 
          flex={1} 
          style={{backgroundColor: column.color}} 
          direction='column'
        >
          <Card
            style={{
              padding: 20, 
              display: 'flex',
              flexDirection: 'column',
              width: 240,
              height: 54,
            }}
            draggable={true}
            onDragStart={() => onDragStartColumnHandler(column)}
            onDrop={() => onDropColumnHandler(column)}
            onDragOver={(e) => onDragOverColumnHandler(e)}
          >
            <Layout style={{justifyContent: 'flex-end'}}>
              <IconHamburger size='m' style={{ marginBottom: 6, marginRight: 70}}/>
              <IconClose 
                size='s' 
                style={{ marginBottom: 6} } 
                onClick={() => handleDeleteColumnButton(column.id)}
              />
            </Layout>
          </Card>
          <Card 
            style={{
              padding: 20, 
              display: 'flex',
              flexDirection: 'column',
              width: 240,
              height: 896,
            }}
            onDrop={(e) => onDropTodoToColumnHandler(e, column)}
            onDragOver={(e) => onDragOverTodoHandler(e)}
          > 
            <Text view="primary" size="m" lineHeight="m" style={{textAlign: 'center', marginBottom: 10}}>
              { column.name }
            </Text>
            {column.todos.map((todo) =>
              <Card 
                draggable={true}
                onDrop={(e) => onDropTodoHandler(e, column, todo)}
                onDragStart={() => onDragStartTodoHandler(column, todo)}
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
                <IconClose 
                  size='s' 
                  style={{alignSelf: 'flex-end', marginBottom: 6}} 
                  onClick={() => handleDeleteTodoButton(todo.id, false)}
                />
                <TextField 
                  size='xs'
                  onChange={(value) => handleNameChange(value, todo.id, false)}
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
                  onChange={(value) => handleDescriptionChange(value, todo.id, false)}
                  style={{marginBottom: 8}}
                  disabled={todo.status}
                />
                <DatePicker 
                  size='xs'
                  type="date"
                  value={todo.complitionDate}
                  onChange={(date) => handleDateChange(date, todo.id, false)} 
                  style={{marginBottom: 8}}
                  disabled={todo.status}
                />
                <Checkbox 
                  size='xs'
                  label="Выполнено" 
                  checked={todo.status}
                  onChange={(e) => handleStatusChange(e, todo.id, false)}
                />
              </Card>
            )}
            <Button label="Добавить задачу" onClick={() => handleAddTodoButton(column.id)}/>
          </Card>
        </Layout>
      )}    
      <Card 
        style={{
          padding: 20, 
          display: 'flex',
          flexDirection: 'column',
          width: 240,
          height: 950,
        }}
        verticalSpace="m" 
        horizontalSpace="m" >
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
          <Button style={{marginBottom: 8}} label="Добавить стадию" onClick={() => handleAddColumnButton()}/>
          {newTodos.todos.map( (newTodo) => 
            <Card 
              draggable={true}
              onDragStart={() => onDragStartTodoHandler(newTodos, newTodo)}
              key={newTodo.id} 
              verticalSpace="m" 
              horizontalSpace="m" 
              form="round" 
              shadow={false} 
              border={true}
              style={{
                width: 200,
                height: 200,
                marginBottom: 10, 
                backgroundColor: !newTodo.status ? "white" : "grey",
                display: 'flex',
                flexDirection: 'column',
              }} 
            >
              <IconClose 
                size='s' 
                style={{alignSelf: 'flex-end', marginBottom: 6}} 
                onClick={() => handleDeleteTodoButton(newTodo.id, true)}
              />
              <TextField 
                size='xs'
                onChange={(value) => handleNameChange(value, newTodo.id, true)}
                value={newTodo.name}
                type="text"
                placeholder="Заголовок"
                style={{marginBottom: 8}}
                disabled={newTodo.status}
              />
              <TextField
                size='xs'
                type="textarea"
                placeholder="Описание"
                rows={2}
                cols={30}
                value={newTodo.description}
                onChange={(value) => handleDescriptionChange(value, newTodo.id, true)}
                style={{marginBottom: 8}}
                disabled={newTodo.status}
              />
              <DatePicker 
                size='xs'
                type="date"
                value={newTodo.complitionDate}
                onChange={(date) => handleDateChange(date, newTodo.id, true)} 
                style={{marginBottom: 8}}
                disabled={newTodo.status}
              />
              <Checkbox 
                size='xs'
                label="Выполнено" 
                checked={newTodo.status}
                onChange={(e) => handleStatusChange(e, newTodo.id, true)}
              />
            </Card>
          )}
          <Button 
            label="Добавить задачу" 
            onClick={() => handleAddTodoButton(newTodos.id)}
          />
          <Button style={{marginTop: 8}} label="Сохранить" onClick={() => handleSaveButton()}/>
        </Layout>
      </Card>
    </Layout>
  )
}

export default AppLayout