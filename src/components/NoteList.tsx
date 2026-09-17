import type { Note } from '../types/note'
import { NoteItem } from './NoteItem'

interface NoteListProps {
  notes: Note[]
  onEdit: (note: Note) => void
  onRemove: (id: string) => void
}

interface MonthGroup {
  key: string
  label: string
  notes: Note[]
  subtotal: number
}

function monthKey(timestamp: number) {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${date.getMonth()}`
}

function monthLabel(timestamp: number) {
  const label = new Date(timestamp).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

function groupByMonth(notes: Note[]): MonthGroup[] {
  const groups: MonthGroup[] = []

  for (const note of notes) {
    const key = monthKey(note.createdAt)
    let group = groups.at(-1)?.key === key ? groups.at(-1) : undefined

    if (!group) {
      group = { key, label: monthLabel(note.createdAt), notes: [], subtotal: 0 }
      groups.push(group)
    }

    group.notes.push(note)
    group.subtotal += note.type === 'receita' ? note.value : -note.value
  }

  return groups
}

export function NoteList({ notes, onEdit, onRemove }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <section className="section">
        <p className="section-label">Notas</p>
        <div className="card">
          <p className="empty-state">Nenhuma nota ainda.</p>
        </div>
      </section>
    )
  }

  const groups = groupByMonth(notes)

  return (
    <>
      {groups.map((group) => {
        const formattedSubtotal = group.subtotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        return (
          <section className="section" key={group.key}>
            <div className="month-header">
              <p className="section-label">{group.label}</p>
              <span
                className={`month-header__subtotal ${group.subtotal < 0 ? 'negative' : 'positive'}`}
              >
                {formattedSubtotal}
              </span>
            </div>
            <div className="card">
              {group.notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onEdit={onEdit}
                  onRemove={onRemove}
                />
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
