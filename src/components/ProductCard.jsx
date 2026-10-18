import { Link } from 'react-router-dom'
import Stars from './Stars.jsx'
import { useCart, tl } from '../cart.jsx'
import { potColors } from '../data/products.js'

export default function ProductCard({ product }) {
  const { add } = useCart()
  return (
    <article className="group flex flex-col">
      <Link to={`/bitkiler/${product.slug}`} className="relative block overflow-hidden bg-sand">
        <img src={product.image} alt={product.name} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        {product.badge && (
          <span className="absolute left-2 top-2 bg-moss px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">{product.badge}</span>
        )}
      </Link>
      <button
        onClick={() => add(product.id, potColors[0].id)}
        className="mt-2 w-full border border-ink/80 py-2.5 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-white"
      >
        Sepete ekle
      </button>
      <Link to={`/bitkiler/${product.slug}`} className="mt-2 line-clamp-2 text-sm leading-snug text-ink hover:text-moss">
        {product.name} <span className="text-ink/50">({product.latin})</span>
      </Link>
      <div className="mt-1"><Stars rating={product.rating} reviews={product.reviews} /></div>
      <p className="mt-1.5 text-base font-bold text-ink">{tl(product.price)}</p>
    </article>
  )
}
