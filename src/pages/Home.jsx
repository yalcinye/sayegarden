import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { products, testimonials, categories, img } from '../data/products.js'
import { Drop, Leaf, Truck, Shield, Arrow } from '../components/Icons.jsx'
import Stars from '../components/Stars.jsx'

export default function Home() {
  const best = products.filter((p) => p.badge === 'Çok Satan' || p.rating >= 4.8).slice(0, 4)
  return (
    <>
      {/* Hero */}
      <section className="container-x grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="eyebrow">Yeni sezon · Sonbahar</p>
          <h1 className="h-display mt-4 text-5xl text-moss sm:text-6xl lg:text-7xl">
            Sulamayı <em className="text-clay">unut</em>,<br />bitkin unutmasın.
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink/70">
            Her bitki, haftalarca yetecek su haznesi olan kendi kendini sulayan saksısında, bakım kartıyla birlikte kapına gelir.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/bitkiler" className="btn-primary">Bitkileri keşfet <Arrow /></Link>
            <a href="#nasil" className="btn-ghost">Nasıl çalışır?</a>
          </div>
          <div className="mt-8 flex items-center gap-3"><Stars rating={4.8} /><span className="text-sm text-ink/60">2.400+ mutlu bitki ebeveyni</span></div>
        </div>
        <div className="relative">
          <img src={img('hero', 900, 1100)} alt="Saksıda yeşil bir iç mekân bitkisi" className="aspect-[4/5] w-full rounded-[2rem] bg-sand object-cover" />
          <div className="absolute -bottom-5 -left-3 rounded-2xl bg-cream p-4 shadow-xl sm:-left-6">
            <p className="flex items-center gap-2 text-sm font-medium text-moss"><Drop width={18} height={18} /> Hazne doluluğu</p>
            <div className="mt-2 h-2 w-40 overflow-hidden rounded-full bg-sand"><div className="h-full w-3/4 bg-moss" /></div>
            <p className="mt-1.5 text-xs text-ink/55">~18 gün yeter</p>
          </div>
        </div>
      </section>

      {/* Değerler */}
      <section className="border-y border-moss/10 bg-sand/50">
        <div className="container-x grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {[[Drop, 'Kendi kendini sular', '2–4 hafta su haznesi'], [Leaf, 'Seraya özel bakım', 'Kargo öncesi kontrol'], [Truck, 'Hızlı teslimat', '1–3 iş günü'], [Shield, '30 gün garanti', 'Solarsa yenisi bizden']].map(([I, t, d]) => (
            <div key={t} className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-moss"><I /></span>
              <div><p className="text-sm font-medium">{t}</p><p className="text-xs text-ink/55">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Çok satanlar */}
      <section className="container-x py-20">
        <div className="flex items-end justify-between gap-4">
          <div><p className="eyebrow">Favoriler</p><h2 className="h-display mt-2 text-4xl text-moss">En çok sevilenler</h2></div>
          <Link to="/bitkiler" className="hidden items-center gap-1 text-sm text-moss hover:text-clay sm:flex">Tümünü gör <Arrow /></Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {best.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Nasıl çalışır */}
      <section id="nasil" className="scroll-mt-28 bg-moss text-cream">
        <div className="container-x grid gap-12 py-20 md:grid-cols-[1fr_1.2fr] md:items-center">
          <img src={img('how', 800, 900)} alt="Saksı detayı" className="aspect-[8/9] w-full rounded-[2rem] bg-sand object-cover" />
          <div>
            <p className="eyebrow text-sand">Nasıl çalışır</p>
            <h2 className="h-display mt-2 text-4xl sm:text-5xl">Üç adımda yeşil bir ev</h2>
            <ol className="mt-10 space-y-8">
              {[
                ['Bitkini seç', 'Işık durumuna ve tarzına uygun bitkiyi filtrele, saksı rengini belirle.'],
                ['Hazneyi doldur', 'Geldiğinde alt hazneye su doldur. Fitil sistemi suyu toprağa kendisi taşır.'],
                ['Göstergeyi izle', 'Su seviyesi göstergesi düşünce tekrar doldur — genelde ayda bir ya da iki kez.'],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-5">
                  <span className="font-serif text-4xl text-clay">0{i + 1}</span>
                  <div><h3 className="text-lg font-medium">{t}</h3><p className="mt-1 text-cream/70">{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Kategoriler */}
      <section className="container-x py-20">
        <p className="eyebrow">Keşfet</p>
        <h2 className="h-display mt-2 text-4xl text-moss">Evine göre seç</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((c) => (
            <Link key={c.id} to={`/bitkiler?kategori=${c.id}`} className="group relative overflow-hidden rounded-2xl">
              <img src={img(`cat-${c.id}`, 500, 600)} alt="" loading="lazy" className="aspect-[5/6] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 font-serif text-xl text-cream">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Yorumlar */}
      <section className="bg-sand/50">
        <div className="container-x py-20">
          <h2 className="h-display text-center text-4xl text-moss">Bitki ebeveynleri ne diyor?</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl bg-cream p-7">
                <Stars rating={5} />
                <blockquote className="mt-4 font-serif text-lg leading-snug">“{t.text}”</blockquote>
                <figcaption className="mt-5 text-sm text-ink/60">{t.name} · {t.city}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-ink/40">Örnek yorumlar — demo içerik.</p>
        </div>
      </section>

      {/* Hediye CTA */}
      <section className="container-x pt-20">
        <div className="grid overflow-hidden rounded-[2rem] bg-clay text-cream md:grid-cols-2">
          <div className="p-10 sm:p-14">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-cream/80">Hediye</p>
            <h2 className="h-display mt-3 text-4xl sm:text-5xl">Çiçekten uzun ömürlü bir hediye</h2>
            <p className="mt-4 max-w-sm text-cream/85">Kişisel notunla, fiyat etiketi olmadan, özel kutusunda gönderelim.</p>
            <Link to="/bitkiler?kategori=hediye" className="btn mt-8 bg-cream text-clay-dark hover:bg-sand">Hediyelik bitkiler <Arrow /></Link>
          </div>
          <img src={img('gift', 800, 600)} alt="" loading="lazy" className="h-full min-h-64 w-full object-cover" />
        </div>
      </section>
    </>
  )
}
