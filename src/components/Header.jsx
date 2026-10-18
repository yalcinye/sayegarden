import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { Bag, Menu, Close, Search, User } from './Icons.jsx'
import { useCart, FREE_SHIPPING, tl } from '../cart.jsx'

const links = [
  { to: '/bitkiler', label: 'Tüm Bitkiler' },
  { to: '/bitkiler?kategori=kolay', label: 'Bakımı Kolay' },
  { to: '/bitkiler?kategori=az-isik', label: 'Az Işık Sever' },
  { to: '/bitkiler?kategori=evcil-dostu', label: 'Evcil Dostu' },
  { to: '/bitkiler?kategori=buyuk', label: 'Büyük Bitkiler' },
  { to: '/bitkiler?kategori=hediye', label: 'Hediyelik' },
  { to: '/sss', label: 'SSS' },
]

const promos = [
  `${tl(FREE_SHIPPING)} üzeri siparişlerde ücretsiz kargo`,
  'Kendi kendini sulayan saksıda teslimat',
  '30 gün sağlıklı bitki garantisi',
  'Hafta içi 14:00’e kadar verilen siparişler aynı gün kargoda',
]

export default function Header() {
  const { count, setOpen } = useCart()
  const [mobile, setMobile] = useState(false)
  return (
    <header className="sticky top-0 z-30 bg-white">
      <div className="bg-moss py-2 text-center text-xs font-medium text-white sm:text-sm">
        81 ile özenli paketlerde hızlı teslimat
      </div>
      <div className="border-b border-ink/5 bg-white">
        <div className="container-x flex h-16 items-center gap-4">
          <button className="lg:hidden" onClick={() => setMobile(true)} aria-label="Menüyü aç"><Menu width={24} height={24} /></button>
          <Logo />
          <nav className="mx-auto hidden items-center gap-6 text-[15px] font-medium lg:flex">
            {links.map((l) => (
              <NavLink key={l.label} to={l.to} className="text-moss-dark transition-colors hover:text-moss">{l.label}</NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-ink lg:ml-0">
            <Link to="/bitkiler" className="p-1 hover:text-moss" aria-label="Bitkilerde ara"><Search width={22} height={22} /></Link>
            <Link to="/sepet" className="hidden p-1 hover:text-moss sm:block" aria-label="Hesabım"><User width={22} height={22} /></Link>
            <button onClick={() => setOpen(true)} className="relative p-1 hover:text-moss" aria-label={`Sepet, ${count} ürün`}>
              <Bag width={22} height={22} />
              <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-moss px-1 text-[10px] font-bold text-white">{count}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden border-b border-ink/5 bg-sand py-2">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-sm font-medium text-ink/80 motion-reduce:animate-none">
          {[...promos, ...promos].map((t, i) => (
            <span key={i} className="flex items-center gap-10">{t}<span className="text-moss" aria-hidden="true">✦</span></span>
          ))}
        </div>
      </div>
      {mobile && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden">
          <div className="container-x flex h-16 items-center justify-between border-b border-ink/5">
            <Logo />
            <button onClick={() => setMobile(false)} aria-label="Menüyü kapat"><Close width={24} height={24} /></button>
          </div>
          <nav className="container-x mt-2 flex flex-col divide-y divide-ink/5">
            {links.map((l) => (
              <NavLink key={l.label} to={l.to} onClick={() => setMobile(false)} className="py-4 text-lg font-semibold text-moss-dark">{l.label}</NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
