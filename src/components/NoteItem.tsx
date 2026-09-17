import type { Note } from '../types/note'

interface NoteItemProps {
  note: Note
  onEdit: (note: Note) => void
  onRemove: (id: string) => void
}

export function NoteItem({ note, onEdit, onRemove }: NoteItemProps) {
  const formattedValue = note.value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  const isPositive = note.type === 'receita'
  const sign = isPositive ? '+' : '-'
  const date = new Date(note.createdAt).toLocaleDateString('pt-BR')

  return (
    <div className="list-row">
      <div className="note-item__main">
        <p className="note-item__description">{note.description}</p>
        <p className="note-item__meta">
          {note.category ? `${note.category} · ` : ''}
          {date}
        </p>
      </div>
      <div className="note-item__side">
        <span
          className={`note-item__value ${isPositive ? 'positive' : 'negative'}`}
        >
          {sign} {formattedValue}
        </span>
        <div className="note-item__actions">
          <button type="button" className="btn-text" onClick={() => onEdit(note)}>
            Editar
          </button>
          <button
            type="button"
            className="btn-text destructive"
            onClick={() => onRemove(note.id)}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
