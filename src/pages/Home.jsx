import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { products, testimonials, categories, faqs, img } from '../data/products.js'
import { Drop, Truck, Shield, Return, ChevronLeft, ChevronRight, Plus, Minus } from '../components/Icons.jsx'
import Stars from '../components/Stars.jsx'

const slides = [
  { image: 'hero', kicker: 'Yeni sezon', title: 'Sulamayı unut,', title2: 'bitkin unutmasın.', text: 'Kendi kendini sulayan saksısında, bakım kartıyla kapına gelir.', cta: 'Hemen alışverişe başla', to: '/bitkiler' },
  { image: 'gift', kicker: 'Hediye', title: 'Çiçekten uzun ömürlü', title2: 'bir hediye.', text: 'Kişisel notunla, fiyat etiketi olmadan, özel kutusunda.', cta: 'Hediyelik bitkiler', to: '/bitkiler?kategori=hediye' },
  { image: 'how', kicker: 'Bakımı kolay', title: 'İlk bitkin için', title2: 'en affedici türler.', text: 'Az ışıkta bile yeşil kalan, unutulmayı seven bitkiler.', cta: 'Bakımı kolay bitkiler', to: '/bitkiler?kategori=kolay' },
]

function HeroSlider() {
  const [i, setI] = useState(0)
  const go = (n) => setI((n + slides.length) % slides.length)
  useEffect(() => {
    const t = setTimeout(() => go(i + 1), 6000)
    return () => clearTimeout(t)
  }, [i])
  return (
    <section className="relative overflow-hidden bg-sand" aria-roledescription="carousel" aria-label="Kampanyalar">
      <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
        {slides.map((s, n) => (
          <div key={s.image} className="relative h-[420px] w-full shrink-0 sm:h-[480px] lg:h-[540px]" aria-hidden={n !== i}>
            <img src={img(s.image, 1800, 900)} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
            <div className="container-x relative flex h-full items-center sm:px-20">
              <div className="max-w-lg">
                <span className="inline-block bg-mint px-3 py-1 text-xs font-semibold uppercase tracking-wider text-moss-dark">{s.kicker}</span>
                <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-moss-dark sm:text-5xl lg:text-6xl">
                  {s.title}<br /><span className="font-semibold text-ink">{s.title2}</span>
                </h1>
                <p className="mt-4 max-w-sm text-base text-ink/75 sm:text-lg">{s.text}</p>
                <Link to={s.to} tabIndex={n === i ? 0 : -1} className="btn-primary mt-7 rounded-full px-8 py-3.5">{s.cta} <ChevronRight width={16} height={16} /></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => go(i - 1)} className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center border border-ink/70 bg-white/80 text-ink hover:bg-white sm:grid" aria-label="Önceki"><ChevronLeft /></button>
      <button onClick={() => go(i + 1)} className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center border border-ink/70 bg-white/80 text-ink hover:bg-white sm:grid" aria-label="Sonraki"><ChevronRight /></button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, n) => (
          <button key={s.image} onClick={() => go(n)} aria-label={`Slayt ${n + 1}`} className={`h-1.5 rounded-full transition-all ${n === i ? 'w-8 bg-moss' : 'w-2 bg-ink/30'}`} />
        ))}
      </div>
    </section>
  )
}

function ProductRow({ title, items, to }) {
  const ref = useRef(null)
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <section className="container-x py-14">
      <h2 className="section-title">{title}</h2>
      <div className="relative mt-8">
        <div ref={ref} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {items.map((p) => (
            <div key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[calc(25%-12px)]"><ProductCard product={p} /></div>
          ))}
        </div>
        <button onClick={() => scroll(-1)} className="absolute -left-4 top-[30%] hidden h-10 w-10 place-items-center bg-white text-ink shadow-md hover:text-moss lg:grid" aria-label="Geri kaydır"><ChevronLeft /></button>
        <button onClick={() => scroll(1)} className="absolute -right-4 top-[30%] hidden h-10 w-10 place-items-center bg-white text-ink shadow-md hover:text-moss lg:grid" aria-label="İleri kaydır"><ChevronRight /></button>
      </div>
      <div className="mt-8 text-center"><Link to={to} className="btn-ghost">Tümünü gör</Link></div>
    </section>
  )
}

function HomeFaq() {
  const [open, setOpen] = useState(-1)
  return (
    <section className="container-x max-w-4xl py-14">
      <h2 className="text-center text-2xl font-semibold text-ink sm:text-3xl">Sıkça Sorulan Sorular</h2>
      <div className="mt-8 space-y-2.5">
        {faqs.map((f, n) => (
          <div key={f.q} className="overflow-hidden rounded-full bg-moss-dark text-white data-[open=true]:rounded-2xl" data-open={open === n}>
            <button onClick={() => setOpen(open === n ? -1 : n)} className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm sm:text-[15px]" aria-expanded={open === n}>
              <span className="shrink-0">{open === n ? <Minus width={14} height={14} /> : <Plus width={14} height={14} />}</span>
              <span>{f.q}</span>
            </button>
            {open === n && <p className="px-12 pb-4 text-sm text-white/80">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  const best = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8)
  const fresh = [...products].reverse().slice(0, 8)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return (
    <>
      <HeroSlider />

      {/* Tanıtım */}
      <section className="container-x py-14 text-center">
        <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">#SeradanSaksına</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-ink/75 sm:text-lg">
          Her bitki serada kontrol edilir, kendi kendini sulayan saksısına dikilir ve özel paketinde, fotoğrafta gördüğün gibi kapına gelir.
        </p>
      </section>

      {/* Yuvarlak kategoriler */}
      <section className="container-x pb-6">
        <div className="no-scrollbar flex justify-start gap-6 overflow-x-auto pb-2 sm:justify-center sm:gap-10">
          {categories.map((c) => (
            <Link key={c.id} to={`/bitkiler?kategori=${c.id}`} className="group flex w-28 shrink-0 flex-col items-center gap-3 sm:w-36">
              <span className="block aspect-square w-full overflow-hidden rounded-full bg-sand ring-1 ring-ink/5 transition group-hover:ring-4 group-hover:ring-mint">
                <img src={img(`cat-${c.id}`, 300, 300)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </span>
              <span className="text-center text-sm font-medium text-ink group-hover:text-moss">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Güven şeridi */}
      <section className="border-y border-ink/5">
        <div className="container-x grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {[[Truck, 'Hızlı teslimat', '1–3 iş gününde kapında'], [Return, '7 gün içinde iade', 'Koşulsuz iade imkânı'], [Shield, '30 gün garanti', 'Solarsa yenisi bizden'], [Drop, 'Kendi kendini sular', '2–4 hafta su haznesi']].map(([I, t, d]) => (
            <div key={t} className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mint text-moss-dark"><I width={22} height={22} /></span>
              <div><p className="text-sm font-semibold">{t}</p><p className="text-xs text-ink/55">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <ProductRow title="En çok satanlar" items={best} to="/bitkiler" />

      {/* Kampanya bannerları */}
      <section className="container-x grid gap-4 md:grid-cols-2">
        {[
          { key: 'cat-buyuk', title: 'Salonun yıldızı', text: 'Büyük bitkilerle tropik bir köşe', to: '/bitkiler?kategori=buyuk' },
          { key: 'cat-evcil-dostu', title: 'Patili dostlar güvende', text: 'Evcil hayvan dostu bitkiler', to: '/bitkiler?kategori=evcil-dostu' },
        ].map((b) => (
          <Link key={b.key} to={b.to} className="group relative block h-64 overflow-hidden sm:h-72">
            <img src={img(b.key, 900, 500)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-extrabold sm:text-3xl">{b.title}</h3>
              <p className="mt-1 text-sm text-white/85">{b.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide underline-offset-4 group-hover:underline">Keşfet <ChevronRight width={16} height={16} /></span>
            </div>
          </Link>
        ))}
      </section>

      <ProductRow title="Yeni gelenler" items={fresh} to="/bitkiler" />

      {/* Yorumlar */}
      <section className="bg-sand">
        <div className="container-x py-14">
          <h2 className="section-title">Müşterilerimiz ne diyor?</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-white p-6 shadow-sm">
                <Stars rating={5} />
                <blockquote className="mt-3 text-[15px] leading-relaxed text-ink/85">“{t.text}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold">{t.name} <span className="font-normal text-ink/55">· {t.city}</span></figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-ink/40">Örnek yorumlar — demo içerik.</p>
        </div>
      </section>

      {/* Bülten */}
      <section className="relative overflow-hidden">
        <img src={img('how', 1800, 600)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-moss-dark/80" />
        <div className="container-x relative py-16 text-center text-white">
          <h2 className="text-3xl font-black sm:text-4xl">İndirimleri kaçırma!</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/85">Yeni ürünler, stok güncellemeleri ve bakım ipuçları için e-posta listemize katıl.</p>
          {done ? (
            <p className="mt-6 font-medium text-mint">Teşekkürler! Listeye eklendin.</p>
          ) : (
            <form className="mx-auto mt-6 flex max-w-md" onSubmit={(e) => { e.preventDefault(); if (email) setDone(true) }}>
              <label htmlFor="home-nl" className="sr-only">E-posta</label>
              <input id="home-nl" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta adresin" className="w-full bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none" />
              <button className="shrink-0 bg-moss px-5 text-sm font-bold uppercase tracking-wide hover:bg-moss-light">Bize katıl</button>
            </form>
          )}
        </div>
      </section>

      <HomeFaq />
    </>
  )
}
