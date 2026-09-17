import { useState } from 'react'
import { BackupControls } from './components/BackupControls'
import { ConfirmDialog } from './components/ConfirmDialog'
import { NoteForm } from './components/NoteForm'
import { NoteList } from './components/NoteList'
import { TotalCard } from './components/TotalCard'
import { useNotes } from './hooks/useNotes'
import type { Note, NoteInput } from './types/note'

interface ConfirmState {
  title: string
  message: string
  confirmLabel: string
  destructive?: boolean
  onConfirm: () => void
}

function App() {
  const { notes, total, categories, addNote, updateNote, removeNote, replaceNotes } =
    useNotes()
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null)

  function handleSubmit(input: NoteInput) {
    if (editingNote) {
      updateNote(editingNote.id, input)
      setEditingNote(null)
    } else {
      addNote(input)
    }
  }

  function handleRemove(id: string) {
    const note = notes.find((item) => item.id === id)
    if (!note) return

    setConfirmState({
      title: 'Excluir nota',
      message: `Excluir "${note.description}"? Essa ação não pode ser desfeita.`,
      confirmLabel: 'Excluir',
      destructive: true,
      onConfirm: () => {
        removeNote(id)
        if (editingNote?.id === id) setEditingNote(null)
        setConfirmState(null)
      },
    })
  }

  function handleRequestImport(importedNotes: Note[]) {
    setConfirmState({
      title: 'Importar backup',
      message: `Isso vai substituir suas ${notes.length} notas atuais pelas ${importedNotes.length} do arquivo. Essa ação não pode ser desfeita.`,
      confirmLabel: 'Importar',
      destructive: true,
      onConfirm: () => {
        replaceNotes(importedNotes)
        setEditingNote(null)
        setConfirmState(null)
      },
    })
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
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={editingNote ? () => setEditingNote(null) : undefined}
        />
      </section>

      <NoteList notes={notes} onEdit={setEditingNote} onRemove={handleRemove} />

      <section className="section">
        <p className="section-label">Backup</p>
        <BackupControls notes={notes} onRequestImport={handleRequestImport} />
      </section>

      <ConfirmDialog
        open={confirmState !== null}
        title={confirmState?.title ?? ''}
        message={confirmState?.message ?? ''}
        confirmLabel={confirmState?.confirmLabel ?? ''}
        destructive={confirmState?.destructive}
        onConfirm={() => confirmState?.onConfirm()}
        onCancel={() => setConfirmState(null)}
      />
    </main>
  )
}

export default App
