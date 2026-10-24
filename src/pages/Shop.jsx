import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { categories } from '../data/products.js'
import { useProducts } from '../products.jsx'

const sizes = ['Küçük', 'Orta', 'Büyük']
const sorts = { onerilen: 'Önerilen', artan: 'Fiyat: düşükten yükseğe', azalan: 'Fiyat: yüksekten düşüğe', puan: 'En yüksek puan' }

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const { products, loading } = useProducts()
  const cat = params.get('kategori') || ''
  const [size, setSize] = useState('')
  const [sort, setSort] = useState('onerilen')

  const list = useMemo(() => {
    let r = products.filter((p) => (!cat || p.categories.includes(cat)) && (!size || p.size === size))
    if (sort === 'artan') r = [...r].sort((a, b) => a.price - b.price)
    if (sort === 'azalan') r = [...r].sort((a, b) => b.price - a.price)
    if (sort === 'puan') r = [...r].sort((a, b) => b.rating - a.rating)
    return r
  }, [products, cat, size, sort])

  const title = categories.find((c) => c.id === cat)?.name || 'Tüm Bitkiler'
  const setCat = (id) => (id ? setParams({ kategori: id }) : setParams({}))
  const chip = (active) => `rounded-md border px-4 py-2 text-sm font-medium transition-colors ${active ? 'border-moss bg-moss text-cream' : 'border-moss/25 text-moss hover:border-moss'}`

  return (
    <section className="container-x py-12">
      <p className="eyebrow">Mağaza</p>
      <h1 className="h-display mt-2 text-4xl uppercase text-ink sm:text-5xl">{title}</h1>

      <div className="mt-8 flex flex-wrap gap-2">
        <button className={chip(!cat)} onClick={() => setCat('')}>Tümü</button>
        {categories.map((c) => <button key={c.id} className={chip(cat === c.id)} onClick={() => setCat(c.id)}>{c.name}</button>)}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-moss/10 py-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-ink/60">Boyut:</span>
          {['', ...sizes].map((s) => (
            <button key={s || 'all'} onClick={() => setSize(s)} className={`rounded-md px-3 py-1 ${size === s ? 'bg-sand text-moss' : 'text-ink/70 hover:text-moss'}`}>{s || 'Hepsi'}</button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-ink/60">Sırala:</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-md border border-ink/20 bg-white px-3 py-1.5 focus:outline-none">
            {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
      </div>

      <p className="mt-6 text-sm text-ink/55">{list.length} bitki</p>
      {loading ? (
        <p className="py-20 text-center text-ink/50">Bitkiler yükleniyor…</p>
      ) : list.length === 0 ? (
        <p className="py-20 text-center font-serif text-2xl text-ink/60">Bu filtrelere uyan bitki yok.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  )
}
