import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { Note, NoteInput, NoteType } from '../types/note'

interface NoteFormProps {
  initialNote?: Note
  categories: string[]
  onSubmit: (input: NoteInput) => void
  onCancel?: () => void
}

interface FormErrors {
  value?: string
  description?: string
}

export function NoteForm({
  initialNote,
  categories,
  onSubmit,
  onCancel,
}: NoteFormProps) {
  const [type, setType] = useState<NoteType>(initialNote?.type ?? 'despesa')
  const [value, setValue] = useState(
    initialNote ? String(initialNote.value) : '',
  )
  const [description, setDescription] = useState(
    initialNote?.description ?? '',
  )
  const [category, setCategory] = useState(initialNote?.category ?? '')
  const [errors, setErrors] = useState<FormErrors>({})
  const [showSuggestions, setShowSuggestions] = useState(false)
  const hideSuggestionsTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  const suggestions = categories.filter(
    (option) =>
      option.toLowerCase() !== category.trim().toLowerCase() &&
      option.toLowerCase().includes(category.trim().toLowerCase()),
  )

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const numericValue = Number(value)
    const newErrors: FormErrors = {}
    if (!numericValue || numericValue <= 0) {
      newErrors.value = 'Informe um valor maior que zero.'
    }
    if (!description.trim()) {
      newErrors.description = 'Informe uma descrição.'
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

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
        <div className={`segmented-control__thumb ${type}`} aria-hidden="true" />
        <label className="segmented-control__option">
          <input
            type="radio"
            name="type"
            value="receita"
            checked={type === 'receita'}
            onChange={() => setType('receita')}
          />
          Receita
        </label>
        <label className="segmented-control__option">
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
            inputMode="decimal"
            min="0.01"
            step="0.01"
            placeholder="0,00"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        {errors.value && <p className="field-error">{errors.value}</p>}

        <div className="field-row">
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        {errors.description && (
          <p className="field-error">{errors.description}</p>
        )}

        <div className="field-row category-field">
          <input
            type="text"
            placeholder="Categoria"
            autoComplete="off"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            onFocus={() => {
              clearTimeout(hideSuggestionsTimeout.current)
              setShowSuggestions(true)
            }}
            onBlur={() => {
              hideSuggestionsTimeout.current = setTimeout(
                () => setShowSuggestions(false),
                100,
              )
            }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="category-suggestions">
              {suggestions.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setCategory(option)
                      setShowSuggestions(false)
                    }}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
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
