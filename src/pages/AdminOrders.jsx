import { useEffect, useState } from 'react'

export default function AdminOrders() {
  const [orders, setOrders] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
      headers: { 'X-API-Key': import.meta.env.VITE_ADMIN_API_KEY }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        return res.json()
      })
      .then(setOrders)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{
      maxWidth: 900, margin: '40px auto', padding: '0 24px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <a href="/" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 13, color: '#555', textDecoration: 'none',
        marginBottom: 16
      }}>
        ← Back to store
      </a>

      <h1 style={{ fontSize: 22, marginBottom: 20 }}>Order Admin</h1>

      {loading && <p style={{ color: '#888', fontSize: 13 }}>Loading orders…</p>}
      {error && <p style={{ color: '#B23A2C', fontSize: 13 }}>{error}</p>}

      {orders && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #111' }}>
              <th style={{ padding: '8px 6px' }}>Order ID</th>
              <th style={{ padding: '8px 6px' }}>Customer</th>
              <th style={{ padding: '8px 6px' }}>Status</th>
              <th style={{ padding: '8px 6px' }}>Total</th>
              <th style={{ padding: '8px 6px' }}>Placed</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr><td colSpan={5} style={{ padding: 16, color: '#888' }}>No orders yet.</td></tr>
            )}
            {orders.map(o => (
              <tr key={o.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 6px', fontFamily: 'monospace', fontSize: 11 }}>{o.id}</td>
                <td style={{ padding: '8px 6px' }}>
                  {o.customer?.name}<br />
                  <span style={{ color: '#888', fontSize: 11 }}>{o.customer?.email}</span>
                </td>
                <td style={{ padding: '8px 6px', textTransform: 'capitalize' }}>{o.status}</td>
                <td style={{ padding: '8px 6px' }}>{o.currency} {o.total?.toFixed(2)}</td>
                <td style={{ padding: '8px 6px' }}>
                  {o.createdAt ? new Date(o.createdAt).toLocaleString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}