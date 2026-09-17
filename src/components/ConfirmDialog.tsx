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
  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <p className="modal-title">{title}</p>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button type="button" className="btn-text" onClick={onCancel}>
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
