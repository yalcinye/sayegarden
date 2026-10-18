import { useState } from 'react'
import { faqs } from '../data/products.js'
import { Plus, Minus } from '../components/Icons.jsx'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="container-x max-w-3xl py-12">
      <p className="eyebrow">Yardım</p>
      <h1 className="h-display mt-2 text-5xl text-moss">Sıkça sorulan sorular</h1>
      <div className="mt-10 divide-y divide-moss/10 border-y border-moss/10">
        {faqs.map((f, i) => (
          <div key={f.q}>
            <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left" aria-expanded={open === i}>
              <span className="font-serif text-xl">{f.q}</span>
              <span className="shrink-0 text-moss">{open === i ? <Minus /> : <Plus />}</span>
            </button>
            {open === i && <p className="pb-6 pr-10 text-ink/70">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
