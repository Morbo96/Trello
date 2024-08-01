import { Todo } from "./Todo"

export interface CanvasColumn {
  id: number | null
  name: string | null
  color: string 
  order: number | null
  todos: Todo[] 
}