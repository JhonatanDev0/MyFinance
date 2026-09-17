import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Note, NoteInput, NoteType } from '../types/note'

interface NoteFormProps {
  initialNote?: Note
  onSubmit: (input: NoteInput) => void
  onCancel?: () => void
}

export function NoteForm({ initialNote, onSubmit, onCancel }: NoteFormProps) {
  const [type, setType] = useState<NoteType>(initialNote?.type ?? 'despesa')
  const [value, setValue] = useState(
    initialNote ? String(initialNote.value) : '',
  )
  const [description, setDescription] = useState(
    initialNote?.description ?? '',
  )
  const [category, setCategory] = useState(initialNote?.category ?? '')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const numericValue = Number(value)
    if (!numericValue || numericValue <= 0) return
    if (!description.trim()) return

    onSubmit({
      type,
      value: numericValue,
      description: description.trim(),
      category: category.trim(),
    })

    if (!initialNote) {
      setType('despesa')
      setValue('')
      setDescription('')
      setCategory('')
    }
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="segmented-control">
        <label
          className={`segmented-control__option ${type === 'receita' ? 'active' : ''}`}
        >
          <input
            type="radio"
            name="type"
            value="receita"
            checked={type === 'receita'}
            onChange={() => setType('receita')}
          />
          Receita
        </label>
        <label
          className={`segmented-control__option ${type === 'despesa' ? 'active' : ''}`}
        >
          <input
            type="radio"
            name="type"
            value="despesa"
            checked={type === 'despesa'}
            onChange={() => setType('despesa')}
          />
          Despesa
        </label>
      </div>

      <div className="card field-card">
        <div className="field-row">
          <span className="field-row__prefix">R$</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0,00"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            required
          />
        </div>
        <div className="field-row">
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>
        <div className="field-row">
          <input
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {initialNote ? 'Salvar' : 'Adicionar'}
        </button>
        {initialNote && onCancel && (
          <button type="button" className="btn-text" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
