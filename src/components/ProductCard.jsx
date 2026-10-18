import { Link } from 'react-router-dom'
import Stars from './Stars.jsx'
import { useCart, tl } from '../cart.jsx'
import { potColors } from '../data/products.js'

export default function ProductCard({ product }) {
  const { add } = useCart()
  return (
    <article className="group">
      <Link to={`/bitkiler/${product.slug}`} className="relative block overflow-hidden rounded-2xl bg-sand">
        <img src={product.image} alt={product.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-[11px] font-medium text-moss">{product.badge}</span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); add(product.id, potColors[0].id) }}
          className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-moss py-2.5 text-sm font-medium text-cream opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
        >
          Hızlı ekle
        </button>
      </Link>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <Link to={`/bitkiler/${product.slug}`} className="font-serif text-lg leading-tight hover:text-clay">{product.name}</Link>
          <p className="text-xs italic text-ink/50">{product.latin}</p>
        </div>
        <span className="shrink-0 text-sm font-medium">{tl(product.price)}</span>
      </div>
      <div className="mt-1.5"><Stars rating={product.rating} reviews={product.reviews} /></div>
    </article>
  )
}
