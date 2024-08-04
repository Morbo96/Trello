export interface Todo {
  id: number
  name: string | null
  description: string | null
  status: boolean | undefined
  complitionDate: Date
}