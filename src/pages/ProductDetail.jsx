import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products, potColors, categories } from '../data/products.js'
import { useCart, tl, FREE_SHIPPING } from '../cart.jsx'
import Stars from '../components/Stars.jsx'
import QtyPicker from '../components/QtyPicker.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { Sun, Drop, Leaf, Truck, Shield } from '../components/Icons.jsx'
import NotFound from './NotFound.jsx'

export default function ProductDetail() {
  const { slug } = useParams()
  const p = products.find((x) => x.slug === slug)
  const { add } = useCart()
  const [pot, setPot] = useState(potColors[0].id)
  const [qty, setQty] = useState(1)
  const [active, setActive] = useState(0)
  const [tab, setTab] = useState('bakim')
  if (!p) return <NotFound />
  const related = products.filter((x) => x.id !== p.id && x.categories.some((c) => p.categories.includes(c))).slice(0, 4)

  return (
    <>
      <section className="container-x py-10">
        <nav className="text-xs text-ink/55"><Link to="/" className="hover:text-clay">Ana sayfa</Link> / <Link to="/bitkiler" className="hover:text-clay">Bitkiler</Link> / <span>{p.name}</span></nav>
        <div className="mt-6 grid gap-10 md:grid-cols-2 lg:gap-16">
          <div>
            <img key={active} src={p.gallery[active]} alt={p.name} className="aspect-[4/5] w-full rounded-[2rem] bg-sand object-cover" />
            <div className="mt-3 grid grid-cols-3 gap-3">
              {p.gallery.map((g, i) => (
                <button key={g} onClick={() => setActive(i)} className={`overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-cream ${i === active ? 'ring-moss' : 'ring-transparent'}`} aria-label={`Görsel ${i + 1}`}>
                  <img src={g} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            {p.badge && <span className="rounded-full bg-sand px-3 py-1 text-xs text-moss">{p.badge}</span>}
            <h1 className="h-display mt-3 text-4xl text-moss sm:text-5xl">{p.name}</h1>
            <p className="mt-1 italic text-ink/55">{p.latin}</p>
            <div className="mt-3 flex items-center gap-4"><Stars rating={p.rating} reviews={p.reviews} /><span className="text-xs text-ink/50">{p.categories.map((c) => categories.find((x) => x.id === c)?.name).join(' · ')}</span></div>
            <p className="mt-5 text-2xl">{tl(p.price)}</p>
            <p className="mt-4 text-ink/75">{p.blurb} Kendi kendini sulayan saksısında, toprağı ve bakım kartıyla hazır gelir.</p>

            <div className="mt-8">
              <p className="text-sm font-medium">Saksı rengi: <span className="font-normal text-ink/60">{potColors.find((c) => c.id === pot).name}</span></p>
              <div className="mt-3 flex gap-3">
                {potColors.map((c) => (
                  <button key={c.id} onClick={() => setPot(c.id)} aria-label={c.name} aria-pressed={pot === c.id} className={`h-10 w-10 rounded-full border border-ink/10 ring-2 ring-offset-2 ring-offset-cream transition ${pot === c.id ? 'ring-moss' : 'ring-transparent hover:ring-moss/30'}`} style={{ background: c.hex }} />
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <QtyPicker value={qty} onChange={(q) => setQty(Math.max(1, q))} />
              <button className="btn-primary flex-1" onClick={() => add(p.id, pot, qty)}>Sepete ekle · {tl(p.price * qty)}</button>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-ink/70">
              <li className="flex items-center gap-2"><Truck width={18} height={18} /> {tl(FREE_SHIPPING)} üzeri ücretsiz kargo</li>
              <li className="flex items-center gap-2"><Shield width={18} height={18} /> 30 gün sağlıklı bitki garantisi</li>
            </ul>

            <div className="mt-10 border-t border-moss/10">
              <div className="flex gap-6 border-b border-moss/10 text-sm">
                {[['bakim', 'Bakım'], ['icerik', 'Kutuda ne var?']].map(([k, v]) => (
                  <button key={k} onClick={() => setTab(k)} className={`-mb-px border-b-2 py-3 ${tab === k ? 'border-moss text-moss' : 'border-transparent text-ink/55'}`}>{v}</button>
                ))}
              </div>
              {tab === 'bakim' ? (
                <dl className="grid grid-cols-3 gap-4 py-6 text-sm">
                  {[[Sun, 'Işık', p.light], [Drop, 'Su', p.water], [Leaf, 'Boyut', p.size]].map(([I, t, v]) => (
                    <div key={t}><dt className="flex items-center gap-1.5 text-ink/55"><I width={16} height={16} /> {t}</dt><dd className="mt-1 font-medium">{v}</dd></div>
                  ))}
                </dl>
              ) : (
                <ul className="list-disc space-y-1.5 py-6 pl-5 text-sm text-ink/75">
                  <li>{p.name} (dikilmiş, sulanmış)</li>
                  <li>Su seviyesi göstergeli, kendi kendini sulayan saksı</li>
                  <li>Bitkiye özel bakım kartı</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x py-16">
          <h2 className="h-display text-3xl text-moss">Bunları da sevebilirsin</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {related.map((r) => <ProductCard key={r.id} product={r} />)}
          </div>
        </section>
      )}
    </>
  )
}
