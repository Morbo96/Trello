import { parseISO } from "date-fns/parseISO"
import { CanvasColumn } from "../models/CanvasColumn"

export interface JSONData {
  id: number
  name: string | null
  color: string 
  order: number | null
  todos: Todo[] 
}

interface Todo {
  id: number
  name: string | null
  description: string | null
  status: boolean 
  complitionDate: string
}

export function normalizeDate (data: JSONData[]) : CanvasColumn[] {
  const newData = data.map( (col) => {
    const todos = col.todos.map( todo => {
      return {...todo, complitionDate: parseISO(todo.complitionDate)}
    })
    return {
      ...col,
      todos: todos,
    }
  })
  return newData
}
  