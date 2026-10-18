import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import { Bag, Menu, Close } from './Icons.jsx'
import { useCart, FREE_SHIPPING, tl } from '../cart.jsx'

const links = [
  { to: '/bitkiler', label: 'Tüm Bitkiler' },
  { to: '/bitkiler?kategori=kolay', label: 'Bakımı Kolay' },
  { to: '/bitkiler?kategori=evcil-dostu', label: 'Evcil Dostu' },
  { to: '/bitkiler?kategori=hediye', label: 'Hediye' },
  { to: '/sss', label: 'SSS' },
]

export default function Header() {
  const { count, setOpen } = useCart()
  const [mobile, setMobile] = useState(false)
  return (
    <header className="sticky top-0 z-30">
      <div className="bg-moss py-2 text-center text-xs text-cream/90">
        {tl(FREE_SHIPPING)} üzeri siparişlerde ücretsiz kargo · 30 gün bitki garantisi
      </div>
      <div className="border-b border-moss/10 bg-cream/90 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <button className="md:hidden" onClick={() => setMobile(true)} aria-label="Menüyü aç"><Menu /></button>
          <Logo />
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {links.map((l) => (
              <NavLink key={l.label} to={l.to} className="text-ink/80 transition-colors hover:text-clay">{l.label}</NavLink>
            ))}
          </nav>
          <button onClick={() => setOpen(true)} className="relative p-1 text-moss" aria-label={`Sepet, ${count} ürün`}>
            <Bag width={24} height={24} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[10px] font-bold text-cream">{count}</span>
            )}
          </button>
        </div>
      </div>
      {mobile && (
        <div className="fixed inset-0 z-40 bg-cream md:hidden">
          <div className="container-x flex h-16 items-center justify-between">
            <Logo />
            <button onClick={() => setMobile(false)} aria-label="Menüyü kapat"><Close /></button>
          </div>
          <nav className="container-x mt-6 flex flex-col gap-5">
            {links.map((l) => (
              <NavLink key={l.label} to={l.to} onClick={() => setMobile(false)} className="font-serif text-3xl text-moss">{l.label}</NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
