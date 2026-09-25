import { useState } from 'react'

export default function ProductCard({ product, onAddToCart, addedKeys }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [hovered, setHovered] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  const key = product._id + '-' + selectedSize
  const justAdded = addedKeys[key]

  function handleAdd() {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 1500)
      return
    }
    onAddToCart(product, selectedSize)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--white)', borderRadius: 12,
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 8px 40px rgba(0,0,0,0.12)'
          : '0 2px 20px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        border: '1px solid var(--border)'
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 300, overflow: 'hidden', background: '#F0EDE8' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <div style={{
          position: 'absolute', top: 10, left: 10,
          background: 'var(--white)', borderRadius: 100,
          padding: '3px 10px', fontSize: 10,
          letterSpacing: 1, textTransform: 'uppercase', color: 'var(--mid)'
        }}>
          {product.category}
        </div>
        {product.stock <= 8 && (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            background: 'var(--accent)', borderRadius: 100,
            padding: '3px 10px', fontSize: 10,
            color: 'var(--white)', fontWeight: 600
          }}>
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '18px 18px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 16, fontWeight: 700, color: 'var(--black)', lineHeight: 1.3
          }}>{product.name}</h3>
          <span style={{ fontSize: 15, fontWeight: 500, whiteSpace: 'nowrap', marginLeft: 8 }}>
            £{product.price.toFixed(2)}
          </span>
        </div>
        <p style={{ fontSize: 11, color: 'var(--mid)', marginBottom: 3 }}>{product.color}</p>
        <p style={{ fontSize: 11, color: 'var(--mid)', lineHeight: 1.5, marginBottom: 14 }}>{product.description}</p>

        {/* Sizes */}
        <div style={{ marginBottom: 12 }}>
          <p style={{
            fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
            color: sizeError ? 'var(--error)' : 'var(--mid)', marginBottom: 7
          }}>
            {sizeError ? 'Please select a size' : 'Select size'}
          </p>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {product.sizes.map(size => (
              <button key={size} onClick={() => { setSelectedSize(size); setSizeError(false) }} style={{
                width: 36, height: 36,
                border: '1px solid',
                borderColor: selectedSize === size ? 'var(--black)' : sizeError ? 'var(--error)' : 'var(--border)',
                borderRadius: 6,
                background: selectedSize === size ? 'var(--black)' : 'transparent',
                color: selectedSize === size ? 'var(--white)' : 'var(--charcoal)',
                fontSize: 11, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s'
              }}>{size}</button>
            ))}
          </div>
        </div>

        {/* Add to Bag */}
        <button onClick={handleAdd} style={{
          width: '100%', height: 42,
          background: justAdded ? 'var(--success)' : 'var(--black)',
          color: 'var(--white)', border: 'none', borderRadius: 8,
          fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
          fontWeight: 500, cursor: 'pointer', transition: 'background 0.3s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
          {justAdded ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Added
            </>
          ) : 'Add to Bag'}
        </button>
      </div>
    </div>
  )
}
