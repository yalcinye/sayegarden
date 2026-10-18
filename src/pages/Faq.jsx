import { useState } from 'react'
import { faqs } from '../data/products.js'
import { Plus, Minus } from '../components/Icons.jsx'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="container-x max-w-4xl py-12">
      <p className="eyebrow text-center">Yardım</p>
      <h1 className="mt-2 text-center text-3xl font-semibold text-ink sm:text-4xl">Sıkça Sorulan Sorular</h1>
      <div className="mt-10 space-y-2.5">
        {faqs.map((f, i) => (
          <div key={f.q} className="overflow-hidden rounded-full bg-moss-dark text-white data-[open=true]:rounded-2xl" data-open={open === i}>
            <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center gap-3 px-5 py-3.5 text-left text-[15px]" aria-expanded={open === i}>
              <span className="shrink-0">{open === i ? <Minus width={14} height={14} /> : <Plus width={14} height={14} />}</span>
              <span>{f.q}</span>
            </button>
            {open === i && <p className="px-12 pb-5 text-sm leading-relaxed text-white/80">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
