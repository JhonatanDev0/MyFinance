import { useEffect, useRef, useState } from 'react'

const CLOSE_DURATION = 150

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  destructive?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  destructive,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const [prevOpen, setPrevOpen] = useState(open)
  const [closing, setClosing] = useState(false)

  if (open !== prevOpen) {
    setPrevOpen(open)
    setClosing(!open)
  }

  useEffect(() => {
    if (!closing) return
    const timeout = setTimeout(() => setClosing(false), CLOSE_DURATION)
    return () => clearTimeout(timeout)
  }, [closing])

  useEffect(() => {
    if (!open) return
    cancelButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onCancel])

  if (!open && !closing) return null

  return (
    <div
      className={`modal-overlay ${closing ? 'closing' : ''}`}
      onClick={onCancel}
    >
      <div
        className={`modal-card ${closing ? 'closing' : ''}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-message"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="modal-title" id="modal-title">
          {title}
        </p>
        <p className="modal-message" id="modal-message">
          {message}
        </p>
        <div className="modal-actions">
          <button
            type="button"
            className="btn-text"
            ref={cancelButtonRef}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={`btn-text ${destructive ? 'destructive' : ''}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
