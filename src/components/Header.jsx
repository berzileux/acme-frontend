export default function Header({ cartCount, onCartClick }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'var(--cream)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 32px', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: 'var(--black)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 4
          }}>
            <span style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>A</span>
          </div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700 }}>ACME</span>
          <span style={{ fontSize: 11, color: 'var(--mid)', letterSpacing: 3, textTransform: 'uppercase' }}>Fashion</span>
        </div>

        <nav style={{ display: 'flex', gap: 32 }}>
          {['New In', 'Women', 'Men', 'Sale'].map(item => (
            <button key={item} style={{
              background: 'none', border: 'none', padding: 0,
              fontSize: 13, color: 'var(--mid)',
              letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer'
            }}>{item}</button>
          ))}
        </nav>

        <button onClick={onCartClick} style={{
          background: 'none', border: '1px solid var(--border)',
          borderRadius: 100, padding: '8px 20px',
          display: 'flex', alignItems: 'center', gap: 8,
          cursor: 'pointer', fontSize: 13, color: 'var(--black)',
          transition: 'all 0.2s'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Bag
          {cartCount > 0 && (
            <span style={{
              background: 'var(--accent)', color: 'var(--white)',
              borderRadius: '50%', width: 18, height: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 600
            }}>{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}
