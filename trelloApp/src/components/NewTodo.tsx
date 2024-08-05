import { useContext } from 'react'
import { Card } from '@consta/uikit/Card'
import { TextField } from '@consta/uikit/TextField'
import { DatePicker } from '@consta/uikit/DatePicker'
import { Checkbox } from '@consta/uikit/Checkbox'
import { IconClose } from '@consta/icons/IconClose'
import DataContext, { ContextType } from './Context'
import { Todo } from '../models/Todo'

interface Props {
  newTodo: Todo
}

function NewTodo (props: Props) {
  const context = useContext(DataContext) as ContextType
  return (
    <Card 
      draggable={true}
      onDragStart={() => context.onDragStartTodoHandler(context.newTodos, props.newTodo)}
      key={props.newTodo.id} 
      verticalSpace="m" 
      horizontalSpace="m" 
      form="round" 
      shadow={false} 
      border={true}
      style={{
        width: 200,
        height: 200,
        marginBottom: 10, 
        backgroundColor: !props.newTodo.status ? "white" : "grey",
        display: 'flex',
        flexDirection: 'column',
      }} 
    >
      <IconClose 
        size='s' 
        style={{alignSelf: 'flex-end', marginBottom: 6}} 
        onClick={() => context.handleDeleteTodoButton(props.newTodo.id, true)}
      />
      <TextField 
        size='xs'
        onChange={(value) => context.handleNameChange(value, props.newTodo.id, true)}
        value={props.newTodo.name}
        type="text"
        placeholder="Заголовок"
        style={{marginBottom: 8}}
        disabled={props.newTodo.status}
      />
      <TextField
        size='xs'
        type="textarea"
        placeholder="Описание"
        rows={2}
        cols={30}
        value={props.newTodo.description}
        onChange={(value) => context.handleDescriptionChange(value, props.newTodo.id, true)}
        style={{marginBottom: 8}}
        disabled={props.newTodo.status}
      />
      <DatePicker 
        size='xs'
        type="date"
        value={props.newTodo.complitionDate}
        onChange={(date) => context.handleDateChange(date, props.newTodo.id, true)} 
        style={{marginBottom: 8}}
        disabled={props.newTodo.status}
      />
      <Checkbox 
        size='xs'
        label="Выполнено" 
        checked={props.newTodo.status}
        onChange={(e) => context.handleStatusChange(e, props.newTodo.id, true)}
      />
    </Card>
  )
}

export default NewTodo