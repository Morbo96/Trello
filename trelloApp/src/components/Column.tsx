import { CanvasColumn } from "../models/CanvasColumn"
import { Layout } from '@consta/uikit/Layout'
import { Text } from '@consta/uikit/Text'
import { Card } from '@consta/uikit/Card'
import { Button } from '@consta/uikit/Button'
import { IconClose } from '@consta/icons/IconClose'
import { IconHamburger } from '@consta/icons/IconHamburger'
import TodoComponent from './Todo'
import DataContext, { ContextType } from "./Context"
import { useContext } from "react"

interface Props {
  column: CanvasColumn
}

function ColumnComponent(props: Props) {
  const context = useContext(DataContext) as ContextType
  return (
    <Layout 
      key={props.column.id} 
      flex={1} 
      style={{backgroundColor: props.column.color}} 
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
        onDragStart={() => context.onDragStartColumnHandler(props.column)}
        onDrop={() => context.onDropColumnHandler(props.column)}
        onDragOver={(e) => context.onDragOverColumnHandler(e)}
      >
        <Layout style={{justifyContent: 'flex-end'}}>
          <IconHamburger size='m' style={{ marginBottom: 6, marginRight: 70}}/>
          <IconClose 
            size='s' 
            style={{ marginBottom: 6} } 
            onClick={() => context.handleDeleteColumnButton(props.column.id)}
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
        onDrop={(e) => context.onDropTodoToColumnHandler(e, props.column)}
        onDragOver={(e) => context.onDragOverTodoHandler(e)}
      > 
        <Text view="primary" size="m" lineHeight="m" style={{textAlign: 'center', marginBottom: 10}}>
          { props.column.name }
        </Text>
        {props.column.todos.map((todo) =>
          <TodoComponent todo={todo} column={props.column}/>
        )}
        <Button label="Добавить задачу" onClick={() => context.handleAddTodoButton(props.column.id)}/>
      </Card>
    </Layout>
  )
}

export default ColumnComponent