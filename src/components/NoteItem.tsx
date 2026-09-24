import type { Note } from '../types/note'

interface NoteItemProps {
  note: Note
  onEdit: (note: Note) => void
  onRemove: (id: string) => void
  onTogglePaid: (id: string) => void
}

export function NoteItem({ note, onEdit, onRemove, onTogglePaid }: NoteItemProps) {
  const formattedValue = note.value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  const isPositive = note.type === 'receita'
  const sign = isPositive ? '+' : '-'
  const date = new Date(note.createdAt).toLocaleDateString('pt-BR')
  const isExpense = note.type === 'despesa'

  return (
    <div className={`list-row ${note.paid ? 'paid' : ''}`}>
      {isExpense ? (
        <button
          type="button"
          className={`note-item__checkbox ${note.paid ? 'checked' : ''}`}
          role="checkbox"
          aria-checked={note.paid}
          aria-label={
            note.paid
              ? `Marcar "${note.description}" como não paga`
              : `Marcar "${note.description}" como paga`
          }
          onClick={() => onTogglePaid(note.id)}
        >
          {note.paid && (
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      ) : (
        <div className="note-item__checkbox-spacer" aria-hidden="true" />
      )}
      <div className="note-item__main">
        <p className="note-item__description">{note.description}</p>
        <p className="note-item__meta">
          {note.category && (
            <span className="note-item__category">{note.category}</span>
          )}
          <span>{date}</span>
        </p>
      </div>
      <div className="note-item__side">
        <span
          className={`note-item__value ${isPositive ? 'positive' : 'negative'}`}
        >
          {sign}
          {formattedValue}
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
