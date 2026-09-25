export default function Cart({ items, onClose, onRemove, onUpdateQty }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal > 200 ? 0 : 9.99
  const total = subtotal + shipping

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
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20 }}>Your Bag</h2>
          <button onClick={onClose} style={{
            background: 'none', border: '1px solid var(--border)',
            borderRadius: '50%', width: 34, height: 34,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 18, color: 'var(--mid)'
          }}>×</button>
        </div>

        {/* Items */}
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

        {/* Footer */}
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
            <button style={{
              width: '100%', height: 46,
              background: 'var(--black)', color: 'var(--white)',
              border: 'none', borderRadius: 10,
              fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
              fontWeight: 500, cursor: 'pointer'
            }}>
              Proceed to Checkout
            </button>
            <p style={{ fontSize: 11, color: 'var(--mid)', textAlign: 'center', marginTop: 10 }}>
              Backend coming soon — orders will save to MongoDB Atlas
            </p>
          </div>
        )}
      </div>
    </>
  )
}
