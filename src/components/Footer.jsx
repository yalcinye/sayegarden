import { Link } from 'react-router-dom'
import { useState } from 'react'
import Logo from './Logo.jsx'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return (
    <footer className="mt-24 bg-moss-dark text-cream">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-cream/70">Kendi kendini sulayan saksılarda, kapına kadar gelen sağlıklı iç mekân bitkileri.</p>
          <form className="mt-6 flex max-w-sm gap-2" onSubmit={(e) => { e.preventDefault(); if (email) setDone(true) }}>
            {done ? (
              <p className="text-sm text-sand">Teşekkürler! İlk bakım rehberin yolda.</p>
            ) : (
              <>
                <label htmlFor="nl" className="sr-only">E-posta</label>
                <input id="nl" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta adresin" className="w-full rounded-full border border-cream/20 bg-transparent px-4 py-2.5 text-sm placeholder:text-cream/40 focus:border-sand focus:outline-none" />
                <button className="btn-accent shrink-0 px-5 py-2.5">Abone ol</button>
              </>
            )}
          </form>
        </div>
        {[
          { t: 'Alışveriş', l: [['Tüm bitkiler', '/bitkiler'], ['Bakımı kolay', '/bitkiler?kategori=kolay'], ['Büyük bitkiler', '/bitkiler?kategori=buyuk'], ['Hediye', '/bitkiler?kategori=hediye']] },
          { t: 'Yardım', l: [['SSS', '/sss'], ['Kargo & iade', '/sss'], ['Bitki garantisi', '/sss'], ['Sepetim', '/sepet']] },
          { t: 'Saye Garden', l: [['Hakkımızda', '/'], ['Bakım rehberi', '/sss'], ['Kurumsal', '/'], ['İletişim', '/sss']] },
        ].map((c) => (
          <div key={c.t}>
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-sand">{c.t}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
              {c.l.map(([label, to]) => (<li key={label}><Link to={to} className="hover:text-cream">{label}</Link></li>))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col justify-between gap-2 py-6 text-xs text-cream/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Saye Garden. Demo proje.</span>
          <span>Görseller placeholder'dır.</span>
        </div>
      </div>
    </footer>
  )
}
