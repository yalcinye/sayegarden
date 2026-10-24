import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { toProduct, PRODUCT_SELECT } from '../products.jsx'
import { tl } from '../cart.jsx'

export default function ProductList() {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.from('products').select(PRODUCT_SELECT).order('sort').order('id').then(({ data, error }) => {
      if (error) setError(error.message)
      else setRows(data.map((r) => ({ ...toProduct(r), photoCount: r.product_images.length })))
    })
  }, [])

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Ürünler</h1>
        <Link to="/admin/urun/yeni" className="btn-primary">+ Yeni ürün</Link>
      </div>
      {error && <p className="mt-6 rounded-md bg-red-50 p-4 text-sm text-red-700">Ürünler yüklenemedi: {error}</p>}
      {!rows && !error && <p className="mt-6 text-ink/50">Yükleniyor…</p>}
      {rows && (
        <ul className="mt-6 divide-y divide-ink/5 overflow-hidden rounded-md bg-white shadow-sm">
          {rows.length === 0 && <li className="p-6 text-center text-ink/50">Henüz ürün yok.</li>}
          {rows.map((p) => (
            <li key={p.id}>
              <Link to={`/admin/urun/${p.id}`} className="flex items-center gap-4 p-3 hover:bg-sand/60">
                <img src={p.image} alt="" className="h-14 w-14 shrink-0 rounded bg-sand object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{p.name}</p>
                  <p className="text-xs text-ink/50">{p.photoCount} fotoğraf{p.active ? '' : ' · Yayında değil'}</p>
                </div>
                <span className="text-sm font-semibold">{tl(p.price)}</span>
                <span className="text-sm text-moss">Düzenle →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
