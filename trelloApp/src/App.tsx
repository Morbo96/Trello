import { useState } from 'react'
import './App.css'
import { Layout } from '@consta/uikit/Layout'
import { Text } from '@consta/uikit/Text'
import { CanvasColumn } from './models/CanvasColumn'
import { Card } from '@consta/uikit/Card'
import { TextField } from '@consta/uikit/TextField'
import { DatePicker } from '@consta/uikit/DatePicker'
import { Checkbox } from '@consta/uikit/Checkbox'
import { getRandomColor } from './helpers/getRandomColor'

function App() {
  const [columns, setColumns] = useState<CanvasColumn[]>(
    [
      {
        id: 1,
        name: 'Запланировано',
        color: '#6cd4ac',
        order: 1,
        todos: [
          {id: 1, name: 'sasda', description: 'sdasda', complitionDate: new Date('11.11.2024'), status: false},
          {id: 2, name: 'sasda', description: 'sdasda', complitionDate: new Date('11.11.2024'), status: false},
          {id: 3, name: 'sasda', description: 'sdasda', complitionDate: new Date('11.11.2024'), status: false},
          {id: 4, name: 'sasda', description: 'sdasda', complitionDate: new Date('11.11.2024'), status: false},
        ]
      },
      {
        id: 2,
        name: 'В работе',
        color: '#92e8c7',
        order: 2,
        todos: [
          {id: 1, name: 'sasda', description: 'sdasda', complitionDate: new Date('11.11.2024'), status: false},
        ]
      },
      {
        id: 3,
        name: 'Завершено',
        color: '#e8dd92',
        order: 3,
        todos: [
          {id: 1, name: 'sasda', description: 'sdasda', complitionDate: new Date('11.11.2024'), status: false},
        ]
      }
    ]
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
   
  return (
    <>
      <Layout direction="row" style={{width: "100%", height: "100%"}}>
        {columns.map((column) => 
          <Layout key={column.id} flex={1} style={{backgroundColor: column.color}}>
            <Card style={{padding: 20}}> 
              <Text view="primary" size="m" lineHeight="m">
                { column.name }
              </Text>
              {column.todos.map((todo) =>
                <Card 
                  key={todo.id} 
                  verticalSpace="xl" 
                  horizontalSpace="xl" 
                  form="round" 
                  shadow={false} 
                  border={true}
                  style={{
                    marginBottom: 10, 
                    backgroundColor: getRandomColor()
                  }}
                >
                  <TextField 
                    label="Заголовок" 
                    labelPosition="top"
                    onChange={(value) => handleNameChange(value, todo.id)}
                    value={todo.name}
                    type="text"
                    placeholder="Заголовок"
                  />
                  <TextField
                    type="textarea"
                    placeholder="Описание"
                    rows={7}
                    cols={50}
                    value={todo.description}
                    onChange={(value) => handleDescriptionChange(value, todo.id)}
                  />
                  <Checkbox 
                    label="Выполнено" 
                    checked={todo.status}
                    onChange={(e) => handleStatusChange(e, todo.id)}
                  />
                  <DatePicker 
                    type="date"
                    value={todo.complitionDate}
                    onChange={(date) => handleDateChange(date, todo.id)} 
                  />
                </Card>
              )}
            </Card>
          </Layout>
        )}
          
      </Layout>
      {/* <Layout direction="row" style={{width: "100%", height: "100%"}}>
        {columns.map( (column) => 
          <Layout key={column.id} flex={1} style={{backgroundColor: column.color}}>
            <Card>
              <Text view="primary" size="m" lineHeight="m">
                { column.name }
              </Text>
              {column.todos.map( (todo) => 
                <Card key={todo.id} verticalSpace="xl" horizontalSpace="xl" form="round" shadow={false} border={true}>
                  <TextField 
                    label="Заголовок" 
                    labelPosition="top"
                    onChange={handleChange}
                    value={todo.name}
                    type="text"
                    placeholder="Заголовок"
                  />
                  <TextField
                    type="textarea"
                    placeholder="Описание"
                    rows={7}
                    cols={50}
                    value={todo.description}
                  />
                  <Switch 
                    label="Checked" 
                    checked={todo.status}
                    // onChange={}
                  />
                  <DatePicker 
                    type="date"
                    value={todo.complitionDate}
                    // onChange={setValue} 
                  />
                </Card>
              )}
            </Card>
          </Layout>
        )}
      </Layout> */}
    </>
  )
}

export default App
