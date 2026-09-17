interface TotalCardProps {
  total: number
}

export function TotalCard({ total }: TotalCardProps) {
  const formatted = total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <div className="card total-card">
      <p className="total-card__label">Total</p>
      <strong
        className={`total-card__value ${total < 0 ? 'negative' : 'positive'}`}
      >
        {formatted}
      </strong>
    </div>
  )
}
