import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

const cols = [
  { t: 'Tüm Ürünler', l: [['Tüm bitkiler', '/bitkiler'], ['Bakımı kolay', '/bitkiler?kategori=kolay'], ['Az ışık sever', '/bitkiler?kategori=az-isik'], ['Büyük bitkiler', '/bitkiler?kategori=buyuk'], ['Hediyelik', '/bitkiler?kategori=hediye']] },
  { t: 'Hesabım', l: [['Sepetim', '/sepet'], ['Siparişim nerede?', '/sss'], ['İade talebi', '/sss']] },
  { t: 'Yardım', l: [['Sıkça sorulan sorular', '/sss'], ['Kargo & paketleme', '/sss'], ['Bitki garantisi', '/sss'], ['İletişim', '/sss']] },
  { t: 'Saye Garden', l: [['Hakkımızda', '/'], ['Bakım rehberi', '/sss'], ['Kurumsal siparişler', '/']] },
]

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-ink/5 bg-white">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink/60">Kendi kendini sulayan saksılarda, kapına kadar gelen sağlıklı iç mekân bitkileri.</p>
        </div>
        {cols.map((c) => (
          <div key={c.t}>
            <h3 className="text-sm font-semibold text-ink">{c.t}</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/55">
              {c.l.map(([label, to]) => (<li key={label}><Link to={to} className="hover:text-moss">{label}</Link></li>))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-moss-dark">
        <div className="container-x flex flex-col justify-between gap-1 py-4 text-xs text-white/75 sm:flex-row">
          <span>© {new Date().getFullYear()} Saye Garden. Tüm hakları saklıdır.</span>
          <span>Demo proje · Görseller Unsplash'ten.</span>
        </div>
      </div>
    </footer>
  )
}
