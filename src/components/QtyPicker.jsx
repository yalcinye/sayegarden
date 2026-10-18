import { Plus, Minus } from './Icons.jsx'
export default function QtyPicker({ value, onChange, small }) {
  const s = small ? 'h-8' : 'h-11'
  return (
    <div className={`inline-flex ${s} items-center rounded-full border border-moss/25`}>
      <button className="px-3 text-moss" onClick={() => onChange(value - 1)} aria-label="Azalt"><Minus /></button>
      <span className="w-6 text-center text-sm tabular-nums">{value}</span>
      <button className="px-3 text-moss" onClick={() => onChange(value + 1)} aria-label="Artır"><Plus /></button>
    </div>
  )
}
