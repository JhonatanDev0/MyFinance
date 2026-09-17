import type { Note } from '../types/note'
import { NoteItem } from './NoteItem'

interface NoteListProps {
  notes: Note[]
  onEdit: (note: Note) => void
  onRemove: (id: string) => void
}

export function NoteList({ notes, onEdit, onRemove }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="card">
        <p className="empty-state">Nenhuma nota ainda.</p>
      </div>
    )
  }

  return (
    <div className="card">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}
