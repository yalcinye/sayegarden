import { useState } from 'react'
import { Link } from 'react-router-dom'
import CartLines from '../components/CartLines.jsx'
import { useCart, tl } from '../cart.jsx'

export default function Cart() {
  const { items, subtotal, shipping, clear } = useCart()
  const [note, setNote] = useState('')
  const [placed, setPlaced] = useState(false)

  if (placed) {
    return (
      <section className="container-x py-24 text-center">
        <h1 className="h-display text-5xl text-moss">Teşekkürler!</h1>
        <p className="mx-auto mt-4 max-w-md text-ink/70">Bu bir demo; gerçek ödeme alınmadı. Ödeme entegrasyonunu (ör. iyzico, Stripe) buraya bağlayabilirsin.</p>
        <Link to="/bitkiler" className="btn-primary mt-8">Alışverişe devam et</Link>
      </section>
    )
  }

  return (
    <section className="container-x py-12">
      <h1 className="h-display text-5xl text-moss">Sepet</h1>
      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl text-ink/60">Sepetin boş.</p>
          <Link to="/bitkiler" className="btn-primary mt-6">Bitkilere göz at</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div><CartLines /></div>
          <aside className="h-fit rounded-2xl bg-sand/60 p-6">
            <h2 className="font-serif text-xl">Sipariş özeti</h2>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between"><dt>Ara toplam</dt><dd>{tl(subtotal)}</dd></div>
              <div className="flex justify-between"><dt>Kargo</dt><dd>{shipping === 0 ? 'Ücretsiz' : tl(shipping)}</dd></div>
              <div className="flex justify-between border-t border-moss/15 pt-3 text-base font-medium"><dt>Toplam</dt><dd>{tl(subtotal + shipping)}</dd></div>
            </dl>
            <label className="mt-6 block text-sm">
              <span className="text-ink/70">Hediye notu (isteğe bağlı)</span>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} maxLength={200} className="mt-2 w-full rounded-xl border border-moss/20 bg-cream p-3 focus:border-moss focus:outline-none" placeholder="İyi ki varsın..." />
            </label>
            <button className="btn-accent mt-5 w-full" onClick={() => { clear(); setPlaced(true) }}>Siparişi tamamla</button>
            <p className="mt-3 text-center text-xs text-ink/50">Demo — ödeme alınmaz.</p>
          </aside>
        </div>
      )}
    </section>
  )
}
