import { useContext } from 'react'
import { CanvasColumn } from '../models/CanvasColumn'
import { Card } from '@consta/uikit/Card'
import { TextField } from '@consta/uikit/TextField'
import { DatePicker } from '@consta/uikit/DatePicker'
import { Checkbox } from '@consta/uikit/Checkbox'
import { IconClose } from '@consta/icons/IconClose'
import { Todo } from "../models/Todo"
import DataContext, { ContextType } from './Context'

interface Props {
  todo: Todo
  column: CanvasColumn
}

function TodoComponent (props: Props) {
  const context = useContext(DataContext) as ContextType
  return (
    <Card 
      draggable={true}
      onDrop={(e) => context.onDropTodoHandler(e, props.column, props.todo)}
      onDragStart={() => context.onDragStartTodoHandler(props.column, props.todo)}
      onDragOver={(e) => context.onDragOverTodoHandler(e)}
      key={props.todo.id} 
      verticalSpace="m" 
      horizontalSpace="m" 
      form="round" 
      shadow={false} 
      border={true}
      style={{
        width: 200,
        height: 200,
        marginBottom: 10, 
        backgroundColor: !props.todo.status ? "white" : "grey",
        display: 'flex',
        flexDirection: 'column',
      }} 
    >
      <IconClose 
        size='s' 
        style={{alignSelf: 'flex-end', marginBottom: 6}} 
        onClick={() => context.handleDeleteTodoButton(props.todo.id, false)}
      />
      <TextField 
        size='xs'
        onChange={(value) => context.handleNameChange(value, props.todo.id, false)}
        value={props.todo.name}
        type="text"
        placeholder="Заголовок"
        style={{marginBottom: 8}}
        disabled={props.todo.status}
      />
      <TextField
        size='xs'
        type="textarea"
        placeholder="Описание"
        rows={2}
        cols={30}
        value={props.todo.description}
        onChange={(value) => context.handleDescriptionChange(value, props.todo.id, false)}
        style={{marginBottom: 8}}
        disabled={props.todo.status}
      />
      <DatePicker 
        size='xs'
        type="date"
        value={props.todo.complitionDate}
        onChange={(date) => context.handleDateChange(date, props.todo.id, false)} 
        style={{marginBottom: 8}}
        disabled={props.todo.status}
      />
      <Checkbox 
        size='xs'
        label="Выполнено" 
        checked={props.todo.status}
        onChange={(e) => context.handleStatusChange(e, props.todo.id, false)}
      />
    </Card>
  )
}

export default TodoComponent
