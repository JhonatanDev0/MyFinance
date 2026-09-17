export type NoteType = 'receita' | 'despesa'

export interface Note {
  id: string
  value: number
  type: NoteType
  description: string
  category: string
  createdAt: number
}

export type NoteInput = Omit<Note, 'id' | 'createdAt'>
