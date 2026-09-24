import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import type { Note } from '../types/note'

interface BackupControlsProps {
  notes: Note[]
  onRequestImport: (notes: Note[]) => void
}

function isNote(value: unknown): value is Note {
  if (!value || typeof value !== 'object') return false
  const note = value as Record<string, unknown>

  return (
    typeof note.id === 'string' &&
    typeof note.value === 'number' &&
    (note.type === 'receita' || note.type === 'despesa') &&
    typeof note.description === 'string' &&
    typeof note.category === 'string' &&
    typeof note.createdAt === 'number'
  )
}

export function BackupControls({ notes, onRequestImport }: BackupControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleExport() {
    const blob = new Blob([JSON.stringify(notes, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const date = new Date().toISOString().slice(0, 10)

    const link = document.createElement('a')
    link.href = url
    link.download = `myfinance-backup-${date}.json`
    link.click()

    URL.revokeObjectURL(url)
  }

  async function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      const parsed = JSON.parse(await file.text())
      if (!Array.isArray(parsed)) {
        window.alert('Arquivo de backup inválido.')
        return
      }
      const normalized = parsed.map((note) => ({ paid: false, ...note }))
      if (!normalized.every(isNote)) {
        window.alert('Arquivo de backup inválido.')
        return
      }
      onRequestImport(normalized)
    } catch {
      window.alert('Não foi possível ler o arquivo de backup.')
    }
  }

  return (
    <div className="card backup-actions">
      <button type="button" className="btn-text" onClick={handleExport}>
        Exportar backup
      </button>
      <button
        type="button"
        className="btn-text"
        onClick={() => fileInputRef.current?.click()}
      >
        Importar backup
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleFileSelected}
        style={{ display: 'none' }}
      />
    </div>
  )
}
