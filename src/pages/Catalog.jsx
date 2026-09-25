import { useState } from 'react'
import { PRODUCTS, CATEGORIES } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Catalog({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [addedKeys, setAddedKeys] = useState({})

  const filtered = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory)

  function handleAdd(product, size) {
    onAddToCart(product, size)
    const key = product._id + '-' + size
    setAddedKeys(prev => ({ ...prev, [key]: true }))
    setTimeout(() => setAddedKeys(prev => {
      const n = { ...prev }; delete n[key]; return n
    }), 1500)
  }

  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 32px' }}>

      {/* Hero */}
      <div className="fade-up" style={{ marginBottom: 48, borderBottom: '1px solid var(--border)', paddingBottom: 40 }}>
        <p style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--mid)', marginBottom: 10 }}>
          Spring / Summer Collection
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 900, lineHeight: 1.05,
          color: 'var(--black)', marginBottom: 14
        }}>
          Refined Essentials<br />
          <em style={{ fontWeight: 400, color: 'var(--accent)' }}>for the modern wardrobe.</em>
        </h1>
        <p style={{ fontSize: 14, color: 'var(--mid)', maxWidth: 420, lineHeight: 1.7 }}>
          Thoughtfully sourced fabrics. Timeless silhouettes. Each piece designed to earn its place in your collection.
        </p>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap', alignItems: 'center' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '8px 20px', borderRadius: 100,
            border: '1px solid',
            borderColor: activeCategory === cat ? 'var(--black)' : 'var(--border)',
            background: activeCategory === cat ? 'var(--black)' : 'transparent',
            color: activeCategory === cat ? 'var(--white)' : 'var(--mid)',
            fontSize: 12, letterSpacing: 1, textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.2s'
          }}>{cat}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--mid)' }}>
          {filtered.length} pieces
        </span>
      </div>

      {/* Product Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 28
      }}>
        {filtered.map((product, i) => (
          <div key={product._id} className="fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
            <ProductCard
              product={product}
              onAddToCart={handleAdd}
              addedKeys={addedKeys}
            />
          </div>
        ))}
      </div>

      {/* MongoDB Banner */}
      <div style={{
        marginTop: 72,
        background: 'var(--mongo)',
        borderRadius: 14, padding: '28px 36px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 20, flexWrap: 'wrap'
      }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--green)', marginBottom: 6 }}>
            Powered by MongoDB Atlas
          </p>
          <p style={{ color: 'var(--white)', fontSize: 15, fontFamily: 'Playfair Display, serif' }}>
            Every order stored as a single document. No JOINs. No batch jobs.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {['products', 'orders', 'navigation_logs'].map(col => (
            <div key={col} style={{ textAlign: 'center' }}>
              <div style={{ width: 8, height: 8, background: 'var(--green)', borderRadius: '50%', margin: '0 auto 6px' }} />
              <p style={{ fontSize: 10, color: 'var(--green)', letterSpacing: 1 }}>{col}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
