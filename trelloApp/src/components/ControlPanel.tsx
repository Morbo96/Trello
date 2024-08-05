import { useContext } from 'react'
import { Layout } from '@consta/uikit/Layout'
import { Text } from '@consta/uikit/Text'
import { Card } from '@consta/uikit/Card'
import { TextField } from '@consta/uikit/TextField'
import { Button } from '@consta/uikit/Button'
import DataContext, { ContextType } from './Context'
import NewTodo from './NewTodo'

function ControlPanel() {
  const context = useContext(DataContext) as ContextType
  return (
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
          onChange={(value) => context.setColumnForm({...context.columnForm, name: value})}
          value={context.columnForm.name}
          type="text"
          placeholder="Новая стадия"
          style={{marginBottom: 8}}
        />
        <Text style={{marginBottom: 8, alignSelf: 'start'}}>Выбирете цвет</Text>
        <input 
          style={{marginBottom: 8, width: 220}}
          type="color"
          value={context.columnForm.color} 
          onChange={(e) => context.setColumnForm({...context.columnForm, color: e.target.value})} 
        />
        <Button style={{marginBottom: 8}} label="Добавить стадию" onClick={() => context.handleAddColumnButton()}/>
        {context.newTodos.todos.map((newTodo) => 
          <NewTodo newTodo={newTodo} />
        )}
        <Button 
          label="Добавить задачу" 
          onClick={() => context.handleAddTodoButton(context.newTodos.id)}
        />
        <Button style={{marginTop: 8}} label="Сохранить" onClick={() => context.handleSaveButton()}/>
      </Layout>
    </Card>
  )
}

export default ControlPanel