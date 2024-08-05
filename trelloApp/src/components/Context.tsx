import { createContext, DragEvent } from "react";
import { CanvasColumn } from "../models/CanvasColumn";
import { Todo } from "../models/Todo";

export interface ContextType {
  onDragStartTodoHandler: (column: CanvasColumn, todo: Todo) => void,
  onDragOverTodoHandler: (e: DragEvent<HTMLDivElement>) => void,
  onDropTodoHandler: (e: DragEvent<HTMLDivElement>, column: CanvasColumn, todo: Todo) => void,
  handleDateChange: (value: Date | null, id: number, isNewTodo: boolean) => void,
  handleDescriptionChange: (value: string | null, id: number, isNewTodo: boolean) => void,
  handleNameChange: (value: string | null, id: number, isNewTodo: boolean) => void,
  handleDeleteTodoButton: (todoId: number, isNewTodo: boolean) => void,
  handleStatusChange: (e: any, id: number, isNewTodo: boolean) => void,
  onDragStartColumnHandler: (column: CanvasColumn) => void,
  onDropColumnHandler: (column: CanvasColumn) => void,
  onDragOverColumnHandler: (e: DragEvent<HTMLDivElement>) => void,
  handleDeleteColumnButton: (columnId: number) => void
  onDropTodoToColumnHandler: (e: DragEvent<HTMLDivElement>, column: CanvasColumn) => void,
  handleAddTodoButton: (columnId: number) => void,
  handleSaveButton(): void,
  columnForm: CanvasColumn,
  setColumnForm: React.Dispatch<React.SetStateAction<CanvasColumn>>,
  handleAddColumnButton: () => void,
  newTodos: CanvasColumn,
}

const DataContext = createContext<ContextType | null>(null) 

export default DataContext