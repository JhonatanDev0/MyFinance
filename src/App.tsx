import { useState } from 'react'
import { NoteForm } from './components/NoteForm'
import { NoteList } from './components/NoteList'
import { TotalCard } from './components/TotalCard'
import { useNotes } from './hooks/useNotes'
import type { Note, NoteInput } from './types/note'

function App() {
  const { notes, total, addNote, updateNote, removeNote } = useNotes()
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  function handleSubmit(input: NoteInput) {
    if (editingNote) {
      updateNote(editingNote.id, input)
      setEditingNote(null)
    } else {
      addNote(input)
    }
  }

  function handleRemove(id: string) {
    removeNote(id)
    if (editingNote?.id === id) setEditingNote(null)
  }

  return (
    <main className="page">
      <h1 className="large-title">MyFinance</h1>

      <section className="section">
        <TotalCard total={total} />
      </section>

      <section className="section">
        <p className="section-label">
          {editingNote ? 'Editar nota' : 'Nova nota'}
        </p>
        <NoteForm
          key={editingNote?.id ?? 'new'}
          initialNote={editingNote ?? undefined}
          onSubmit={handleSubmit}
          onCancel={editingNote ? () => setEditingNote(null) : undefined}
        />
      </section>

      <section className="section">
        <p className="section-label">Notas</p>
        <NoteList notes={notes} onEdit={setEditingNote} onRemove={handleRemove} />
      </section>
    </main>
  )
}

export default App
