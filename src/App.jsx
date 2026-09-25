import { useState } from 'react'
import Header from './components/Header.jsx'
import Catalog from './pages/Catalog.jsx'
import Cart from './components/Cart.jsx'

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  function addToCart(product, size) {
    setCart(prev => {
      const key = product._id + '-' + size
      const existing = prev.find(i => i.key === key)
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, size, key, qty: 1 }]
    })
  }

  function removeFromCart(key) {
    setCart(prev => prev.filter(i => i.key !== key))
  }

  function updateQty(key, qty) {
    if (qty < 1) return removeFromCart(key)
    setCart(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />
      <Catalog onAddToCart={addToCart} />
      {cartOpen && (
        <Cart
          items={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
        />
      )}
    </div>
  )
}
