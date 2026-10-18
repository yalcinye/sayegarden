import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Close } from './Icons.jsx'
import CartLines from './CartLines.jsx'
import { useCart, tl, FREE_SHIPPING } from '../cart.jsx'

export default function CartDrawer() {
  const { open, setOpen, items, subtotal } = useCart()
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])
  const left = Math.max(0, FREE_SHIPPING - subtotal)
  const pct = Math.min(100, (subtotal / FREE_SHIPPING) * 100)
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-ink/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} />
      <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`} role="dialog" aria-label="Sepet">
        <div className="flex items-center justify-between border-b border-moss/10 px-6 py-5">
          <h2 className="font-serif text-2xl">Sepetin</h2>
          <button onClick={() => setOpen(false)} aria-label="Sepeti kapat"><Close /></button>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-xl">Sepetin şimdilik boş.</p>
            <Link to="/bitkiler" onClick={() => setOpen(false)} className="btn-primary">Bitkilere göz at</Link>
          </div>
        ) : (
          <>
            <div className="px-6 pt-4">
              <p className="text-xs text-ink/70">{left > 0 ? <>Ücretsiz kargo için <b>{tl(left)}</b> kaldı</> : 'Ücretsiz kargo kazandın 🌱'}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand"><div className="h-full bg-moss transition-all" style={{ width: `${pct}%` }} /></div>
            </div>
            <div className="flex-1 overflow-y-auto px-6"><CartLines onNavigate={() => setOpen(false)} /></div>
            <div className="border-t border-moss/10 px-6 py-5">
              <div className="flex justify-between text-sm"><span>Ara toplam</span><span className="font-medium">{tl(subtotal)}</span></div>
              <Link to="/sepet" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">Sepete git</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
