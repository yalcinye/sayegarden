import { Link } from 'react-router-dom'
import QtyPicker from './QtyPicker.jsx'
import { useCart, tl } from '../cart.jsx'
import { potColors } from '../data/products.js'

export default function CartLines({ onNavigate }) {
  const { items, setQty, remove } = useCart()
  return (
    <ul className="divide-y divide-moss/10">
      {items.map((i) => {
        const pot = potColors.find((c) => c.id === i.potColor)
        return (
          <li key={i.key} className="flex gap-4 py-4">
            <Link to={`/bitkiler/${i.product.slug}`} onClick={onNavigate} className="shrink-0">
              <img src={i.product.image} alt="" className="h-24 w-20 rounded-xl bg-sand object-cover" />
            </Link>
            <div className="flex flex-1 flex-col">
              <div className="flex justify-between gap-2">
                <Link to={`/bitkiler/${i.product.slug}`} onClick={onNavigate} className="font-serif leading-tight">{i.product.name}</Link>
                <span className="text-sm font-medium">{tl(i.product.price * i.qty)}</span>
              </div>
              <span className="mt-0.5 flex items-center gap-1.5 text-xs text-ink/55">
                <span className="h-3 w-3 rounded-full border border-ink/10" style={{ background: pot?.hex }} /> {pot?.name} saksı
              </span>
              <div className="mt-auto flex items-center justify-between pt-2">
                <QtyPicker small value={i.qty} onChange={(q) => setQty(i.key, q)} />
                <button onClick={() => remove(i.key)} className="text-xs text-ink/50 underline-offset-2 hover:text-clay hover:underline">Kaldır</button>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
