import { useEffect, useMemo, useState } from 'react'
import { loadNotes, saveNotes } from '../storage/notesStorage'
import type { Note, NoteInput } from '../types/note'

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes())

  useEffect(() => {
    saveNotes(notes)
  }, [notes])

  const total = useMemo(() => {
    return notes.reduce((sum, note) => {
      return note.type === 'receita' ? sum + note.value : sum - note.value
    }, 0)
  }, [notes])

  function addNote(input: NoteInput) {
    const note: Note = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    }
    setNotes((prev) => [note, ...prev])
  }

  function updateNote(id: string, input: NoteInput) {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...input } : note)),
    )
  }

  function removeNote(id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  const sortedNotes = useMemo(
    () => [...notes].sort((a, b) => b.createdAt - a.createdAt),
    [notes],
  )

  return { notes: sortedNotes, total, addNote, updateNote, removeNote }
}
