import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products } from './data/products.js'

const CartContext = createContext(null)
const KEY = 'filiz-cart'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* yoksay */ }
  }, [items])

  const add = (id, potColor, qty = 1) => {
    setItems((prev) => {
      const key = `${id}:${potColor}`
      const found = prev.find((i) => i.key === key)
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      return [...prev, { key, id, potColor, qty }]
    })
    setOpen(true)
  }
  const setQty = (key, qty) =>
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty } : i))))
  const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key))
  const clear = () => setItems([])

  const detailed = useMemo(
    () => items.map((i) => ({ ...i, product: products.find((p) => p.id === i.id) })).filter((i) => i.product),
    [items]
  )
  const count = detailed.reduce((s, i) => s + i.qty, 0)
  const subtotal = detailed.reduce((s, i) => s + i.qty * i.product.price, 0)
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : 89

  return (
    <CartContext.Provider value={{ items: detailed, add, setQty, remove, clear, count, subtotal, shipping, open, setOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export const FREE_SHIPPING = 1500
export const useCart = () => useContext(CartContext)
export const tl = (n) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n)
