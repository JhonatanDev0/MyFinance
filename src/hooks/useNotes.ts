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
      paid: false,
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

  function togglePaid(id: string) {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, paid: !note.paid } : note)),
    )
  }

  function replaceNotes(newNotes: Note[]) {
    setNotes(newNotes)
  }

  const sortedNotes = useMemo(
    () => [...notes].sort((a, b) => b.createdAt - a.createdAt),
    [notes],
  )

  const categories = useMemo(() => {
    const distinct = new Set(
      notes.map((note) => note.category).filter((category) => category !== ''),
    )
    return Array.from(distinct).sort((a, b) => a.localeCompare(b, 'pt-BR'))
  }, [notes])

  return {
    notes: sortedNotes,
    total,
    categories,
    addNote,
    updateNote,
    removeNote,
    replaceNotes,
    togglePaid,
  }
}
