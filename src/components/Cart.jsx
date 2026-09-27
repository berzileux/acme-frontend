import { useState } from 'react'

export default function Cart({ items, onClose, onRemove, onUpdateQty }) {
  const [view, setView] = useState('cart') // 'cart' | 'details' | 'success'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [orderResult, setOrderResult] = useState(null)

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal > 200 ? 0 : 9.99
  const total = subtotal + shipping

  const canSubmit = name.trim().length > 0 && /\S+@\S+\.\S+/.test(email)

  const handlePlaceOrder = async () => {
    if (!canSubmit) return
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name: name.trim(), email: email.trim() },
          items: items.map(i => ({
            sku: i._id,
            name: i.name,
            size: i.size,
            qty: i.qty,
            price: i.price
          })),
          total
        })
      })

      if (!res.ok) throw new Error(`Order failed (${res.status})`)

      const saved = await res.json()
      setOrderResult(saved)
      setView('success')
    } catch (err) {
      setError('Something went wrong placing your order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 12px', marginBottom: 14,
    border: '1px solid var(--border)', borderRadius: 8,
    fontSize: 13, background: 'var(--white)'
  }

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
        zIndex: 200, animation: 'fadeIn 0.2s ease'
      }} />

      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '100%', maxWidth: 420,
        background: 'var(--cream)', zIndex: 201,
        display: 'flex', flexDirection: 'column',
        animation: 'slideIn 0.3s ease',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20 }}>
            {view === 'cart' && 'Your Bag'}
            {view === 'details' && 'Checkout Details'}
            {view === 'success' && 'Order Placed'}
          </h2>
          <button onClick={onClose} style={{
            background: 'none', border: '1px solid var(--border)',
            borderRadius: '50%', width: 34, height: 34,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 18, color: 'var(--mid)'
          }}>×</button>
        </div>

        {/* CART VIEW */}
        {view === 'cart' && (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
              {items.length === 0 && (
                <div style={{ textAlign: 'center', paddingTop: 60 }}>
                  <p style={{ fontSize: 28, marginBottom: 12 }}>🛍</p>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, marginBottom: 6 }}>Your bag is empty</p>
                  <p style={{ color: 'var(--mid)', fontSize: 12 }}>Add some pieces to get started.</p>
                </div>
              )}

              {items.map(item => (
                <div key={item.key} style={{
                  display: 'flex', gap: 12, marginBottom: 18,
                  paddingBottom: 18, borderBottom: '1px solid var(--border)'
                }}>
                  <img src={item.image} alt={item.name} style={{
                    width: 64, height: 80, objectFit: 'cover',
                    borderRadius: 8, flexShrink: 0, background: '#F0EDE8'
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{item.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--mid)', marginBottom: 8 }}>{item.color} · Size {item.size}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        border: '1px solid var(--border)', borderRadius: 6, padding: '2px 8px'
                      }}>
                        <button onClick={() => onUpdateQty(item.key, item.qty - 1)} style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: 'var(--mid)', fontSize: 16, lineHeight: 1, padding: '0 2px'
                        }}>−</button>
                        <span style={{ fontSize: 13, minWidth: 14, textAlign: 'center' }}>{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.key, item.qty + 1)} style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: 'var(--mid)', fontSize: 16, lineHeight: 1, padding: '0 2px'
                        }}>+</button>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>£{(item.price * item.qty).toFixed(2)}</span>
                        <button onClick={() => onRemove(item.key)} style={{
                          background: 'none', border: 'none',
                          cursor: 'pointer', color: 'var(--mid)', fontSize: 11
                        }}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div style={{ padding: '18px 24px', borderTop: '1px solid var(--border)', background: 'var(--white)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 13, color: 'var(--mid)' }}>
                  <span>Subtotal</span><span>£{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontSize: 13, color: 'var(--mid)' }}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
                  <span>Total</span><span>£{total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => setView('details')}
                  style={{
                    width: '100%', height: 46,
                    background: 'var(--black)', color: 'var(--white)',
                    border: 'none', borderRadius: 10,
                    fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
                    fontWeight: 500, cursor: 'pointer'
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {/* DETAILS VIEW */}
        {view === 'details' && (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              <p style={{ fontSize: 12, color: 'var(--mid)', marginBottom: 18 }}>
                {items.length} item{items.length !== 1 ? 's' : ''} · £{total.toFixed(2)} total
              </p>

              <label style={{ fontSize: 11, color: 'var(--mid)', display: 'block', marginBottom: 6 }}>
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Doe"
                style={inputStyle}
              />

              <label style={{ fontSize: 11, color: 'var(--mid)', display: 'block', marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jane@example.com"
                style={inputStyle}
              />

              {error && (
                <p style={{ fontSize: 12, color: '#B23A2C', marginTop: 4 }}>{error}</p>
              )}
            </div>

            <div style={{ padding: '18px 24px', borderTop: '1px solid var(--border)', background: 'var(--white)' }}>
              <button
                onClick={handlePlaceOrder}
                disabled={!canSubmit || submitting}
                style={{
                  width: '100%', height: 46,
                  background: 'var(--black)', color: 'var(--white)',
                  border: 'none', borderRadius: 10,
                  fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
                  fontWeight: 500,
                  cursor: (!canSubmit || submitting) ? 'default' : 'pointer',
                  opacity: (!canSubmit || submitting) ? 0.5 : 1,
                  marginBottom: 10
                }}
              >
                {submitting ? 'Placing Order…' : `Place Order · £${total.toFixed(2)}`}
              </button>
              <button
                onClick={() => setView('cart')}
                disabled={submitting}
                style={{
                  width: '100%', height: 40,
                  background: 'none', color: 'var(--mid)',
                  border: 'none', fontSize: 12, cursor: 'pointer'
                }}
              >
                ← Back to bag
              </button>
            </div>
          </>
        )}

        {/* SUCCESS VIEW */}
        {view === 'success' && (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', padding: 24, textAlign: 'center', overflowY: 'auto'
          }}>
            <p style={{ fontSize: 32, marginTop: 20, marginBottom: 14 }}>✓</p>
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, marginBottom: 20 }}>
              Thank you, {name.trim()}
            </p>

            {orderResult && (
              <div style={{
                width: '100%', textAlign: 'left', background: 'var(--white)',
                border: '1px solid var(--border)', borderRadius: 10,
                padding: 16, marginBottom: 24, fontSize: 12
              }}>
                <p style={{ color: 'var(--mid)', marginBottom: 6 }}>Order ID</p>
                <p style={{ fontFamily: 'monospace', marginBottom: 14, wordBreak: 'break-all' }}>
                  {orderResult.id}
                </p>

                <p style={{ color: 'var(--mid)', marginBottom: 6 }}>Status</p>
                <p style={{ marginBottom: 14, textTransform: 'capitalize' }}>
                  {orderResult.status}
                </p>

                <p style={{ color: 'var(--mid)', marginBottom: 6 }}>Placed at</p>
                <p style={{ marginBottom: 14 }}>
                  {orderResult.createdAt
                    ? new Date(orderResult.createdAt).toLocaleString()
                    : '—'}
                </p>

                <p style={{ color: 'var(--mid)', marginBottom: 6 }}>Total</p>
                <p style={{ fontWeight: 600 }}>
                  {orderResult.currency ? `${orderResult.currency} ` : '£'}
                  {orderResult.total?.toFixed(2)}
                </p>
              </div>
            )}

            <button
              onClick={onClose}
              style={{
                background: 'var(--black)', color: 'var(--white)',
                border: 'none', borderRadius: 10, padding: '12px 28px',
                fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
                fontWeight: 500, cursor: 'pointer'
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}