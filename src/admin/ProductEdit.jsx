import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { supabase, BUCKET } from '../lib/supabase.js'
import { useProducts } from '../products.jsx'
import { categories } from '../data/products.js'
import { resizeImage } from './image.js'

const empty = { name: '', slug: '', latin: '', price: '', size: 'Orta', light: '', water: '', blurb: '', badge: '', categories: [], sort: 0, active: true }
const sizes = ['Küçük', 'Orta', 'Büyük']

const slugify = (s) =>
  s.toLocaleLowerCase('tr-TR')
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

export default function ProductEdit() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const location = useLocation()
  const { reload } = useProducts()
  const [form, setForm] = useState(empty)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(!isNew)
  const [msg, setMsg] = useState(location.state?.created ? { type: 'ok', text: 'Ürün oluşturuldu. Şimdi fotoğraf ekleyebilirsiniz.' } : null)
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const slugTouched = useRef(!isNew)
  const fileInput = useRef(null)

  useEffect(() => {
    if (isNew) { setForm(empty); setImages([]); setLoading(false); slugTouched.current = false; return }
    setLoading(true)
    supabase.from('products').select('*, product_images(id, url, path, sort)').eq('id', id).maybeSingle().then(({ data, error }) => {
      if (error || !data) setMsg({ type: 'error', text: error?.message || 'Ürün bulunamadı.' })
      else {
        const { product_images, ...rest } = data
        setForm({ ...empty, ...Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, v ?? ''])) })
        setImages([...product_images].sort((a, b) => a.sort - b.sort || a.id - b.id))
      }
      setLoading(false)
    })
  }, [id, isNew])

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [k]: v, ...(k === 'name' && !slugTouched.current ? { slug: slugify(v) } : {}) }))
  }
  const toggleCat = (c) => setForm((f) => ({ ...f, categories: f.categories.includes(c) ? f.categories.filter((x) => x !== c) : [...f.categories, c] }))

  const save = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    const payload = {
      name: form.name.trim(), slug: slugify(form.slug || form.name), latin: form.latin.trim() || null,
      price: Math.round(Number(form.price)), size: form.size, light: form.light.trim() || null, water: form.water.trim() || null,
      blurb: form.blurb.trim() || null, badge: form.badge.trim() || null, categories: form.categories,
      sort: Number(form.sort) || 0, active: form.active,
    }
    const q = isNew ? supabase.from('products').insert(payload).select('id').single() : supabase.from('products').update(payload).eq('id', id).select('id').single()
    const { data, error } = await q
    setBusy(false)
    if (error) {
      setMsg({ type: 'error', text: error.code === '23505' ? 'Bu adres (slug) başka bir üründe kullanılıyor.' : error.message })
      return
    }
    reload()
    if (isNew) navigate(`/admin/urun/${data.id}`, { replace: true, state: { created: true } })
    else setMsg({ type: 'ok', text: 'Kaydedildi.' })
  }

  const upload = async (files) => {
    const list = [...files].filter((f) => f.type.startsWith('image/'))
    if (!list.length) return
    setMsg(null)
    let next = images.length ? Math.max(...images.map((i) => i.sort)) + 1 : 0
    const added = []
    try {
      for (const [n, file] of list.entries()) {
        setUploading(`${n + 1}/${list.length} yükleniyor…`)
        const blob = await resizeImage(file)
        const ext = blob.type === 'image/webp' ? 'webp' : 'jpg'
        const path = `${id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
        const up = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: blob.type, cacheControl: '31536000' })
        if (up.error) throw up.error
        const url = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
        const { data, error } = await supabase.from('product_images').insert({ product_id: Number(id), url, path, sort: next++ }).select('id, url, path, sort').single()
        if (error) { await supabase.storage.from(BUCKET).remove([path]); throw error }
        added.push(data)
        setImages((prev) => [...prev, data])
      }
      setMsg({ type: 'ok', text: `${added.length} fotoğraf yüklendi.` })
    } catch (err) {
      setMsg({ type: 'error', text: `Yükleme hatası: ${err.message}` })
    } finally {
      setUploading('')
      if (fileInput.current) fileInput.current.value = ''
      reload()
    }
  }

  const persistOrder = async (list) => {
    const ordered = list.map((img, sort) => ({ ...img, sort }))
    const changed = ordered.filter((img) => img.sort !== images.find((x) => x.id === img.id)?.sort)
    setImages(ordered)
    const results = await Promise.all(changed.map((img) => supabase.from('product_images').update({ sort: img.sort }).eq('id', img.id)))
    const failed = results.find((r) => r.error)
    if (failed) setMsg({ type: 'error', text: failed.error.message })
    reload()
  }
  const move = (i, d) => {
    const j = i + d
    if (j < 0 || j >= images.length) return
    const list = [...images]
    ;[list[i], list[j]] = [list[j], list[i]]
    persistOrder(list)
  }
  const makeCover = (i) => persistOrder([images[i], ...images.filter((_, k) => k !== i)])

  const removeImage = async (img) => {
    if (!confirm('Bu fotoğraf silinsin mi?')) return
    const { error } = await supabase.from('product_images').delete().eq('id', img.id)
    if (error) { setMsg({ type: 'error', text: error.message }); return }
    if (img.path) await supabase.storage.from(BUCKET).remove([img.path])
    setImages((prev) => prev.filter((x) => x.id !== img.id))
    reload()
  }

  const removeProduct = async () => {
    if (!confirm(`"${form.name}" ve tüm fotoğrafları kalıcı olarak silinsin mi?`)) return
    setBusy(true)
    const paths = images.map((i) => i.path).filter(Boolean)
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) { setBusy(false); setMsg({ type: 'error', text: error.message }); return }
    if (paths.length) await supabase.storage.from(BUCKET).remove(paths)
    reload()
    navigate('/admin', { replace: true })
  }

  if (loading) return <p className="text-ink/50">Yükleniyor…</p>

  const input = 'mt-1 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm focus:border-moss focus:outline-none'
  const label = 'block text-sm font-medium'
  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/admin" className="text-sm text-moss hover:underline">← Ürünler</Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{isNew ? 'Yeni ürün' : form.name || 'Ürün'}</h1>
        {!isNew && form.active && <a href={`/bitkiler/${form.slug}`} target="_blank" rel="noreferrer" className="text-sm text-moss hover:underline">Sitede gör ↗</a>}
      </div>

      {msg && <p className={`mt-4 rounded-md px-4 py-3 text-sm ${msg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-mint text-moss-dark'}`}>{msg.text}</p>}

      {!isNew && (
        <section className="mt-6 rounded-md bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Fotoğraflar</h2>
          <p className="mt-1 text-xs text-ink/55">İlk fotoğraf kapak olarak kullanılır. Fotoğraflar yüklenmeden önce otomatik küçültülür.</p>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); upload(e.dataTransfer.files) }}
            className={`mt-4 rounded-md border-2 border-dashed p-6 text-center text-sm transition-colors ${dragOver ? 'border-moss bg-mint/40' : 'border-ink/15'}`}
          >
            {uploading ? <p className="font-medium text-moss">{uploading}</p> : (
              <>
                <p className="text-ink/60">Fotoğrafları buraya sürükleyin ya da</p>
                <button type="button" onClick={() => fileInput.current?.click()} className="btn-accent mt-3 px-5 py-2">Fotoğraf seç</button>
              </>
            )}
            <input ref={fileInput} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
          </div>
          {images.length > 0 && (
            <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {images.map((img, i) => (
                <li key={img.id} className="overflow-hidden rounded-md border border-ink/10">
                  <div className="relative">
                    <img src={img.url} alt="" className="aspect-square w-full bg-sand object-cover" />
                    {i === 0 && <span className="absolute left-2 top-2 rounded bg-moss px-2 py-0.5 text-[11px] font-semibold text-white">Kapak</span>}
                  </div>
                  <div className="flex items-center justify-between gap-1 p-2 text-xs">
                    <div className="flex gap-1">
                      <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="rounded border border-ink/15 px-2 py-1 disabled:opacity-30" aria-label="Sola taşı">←</button>
                      <button type="button" onClick={() => move(i, 1)} disabled={i === images.length - 1} className="rounded border border-ink/15 px-2 py-1 disabled:opacity-30" aria-label="Sağa taşı">→</button>
                    </div>
                    {i !== 0 && <button type="button" onClick={() => makeCover(i)} className="text-moss hover:underline">Kapak yap</button>}
                    <button type="button" onClick={() => removeImage(img)} className="text-red-600 hover:underline">Sil</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <form onSubmit={save} className="mt-6 grid gap-5 rounded-md bg-white p-6 shadow-sm sm:grid-cols-2">
        <h2 className="font-semibold sm:col-span-2">Ürün bilgileri</h2>
        {isNew && <p className="-mt-3 text-xs text-ink/55 sm:col-span-2">Ürünü kaydettikten sonra fotoğraf ekleyebilirsiniz.</p>}
        <label className={label}>Ürün adı *<input required value={form.name} onChange={set('name')} className={input} /></label>
        <label className={label}>Latince adı<input value={form.latin} onChange={set('latin')} className={input} /></label>
        <label className={label}>Fiyat (₺) *<input required type="number" min="0" step="1" value={form.price} onChange={set('price')} className={input} /></label>
        <label className={label}>Boyut
          <select value={form.size} onChange={set('size')} className={input}>{sizes.map((s) => <option key={s}>{s}</option>)}</select>
        </label>
        <label className={label}>Işık ihtiyacı<input value={form.light} onChange={set('light')} placeholder="ör. Parlak dolaylı" className={input} /></label>
        <label className={label}>Sulama<input value={form.water} onChange={set('water')} placeholder="ör. Haftada bir" className={input} /></label>
        <label className={`${label} sm:col-span-2`}>Kısa açıklama<textarea rows={3} value={form.blurb} onChange={set('blurb')} className={input} /></label>
        <label className={label}>Etiket<input value={form.badge} onChange={set('badge')} placeholder="ör. Çok Satan (boş bırakılabilir)" className={input} /></label>
        <label className={label}>Sayfa adresi (slug)
          <input value={form.slug} onChange={(e) => { slugTouched.current = true; set('slug')(e) }} className={input} />
          <span className="mt-1 block text-xs font-normal text-ink/50">/bitkiler/{slugify(form.slug || form.name) || '…'}</span>
        </label>
        <fieldset className="sm:col-span-2">
          <legend className={label}>Kategoriler</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((c) => (
              <label key={c.id} className={`cursor-pointer rounded-md border px-3 py-1.5 text-sm ${form.categories.includes(c.id) ? 'border-moss bg-moss text-white' : 'border-ink/20'}`}>
                <input type="checkbox" className="sr-only" checked={form.categories.includes(c.id)} onChange={() => toggleCat(c.id)} />{c.name}
              </label>
            ))}
          </div>
        </fieldset>
        <label className={label}>Sıra<input type="number" value={form.sort} onChange={set('sort')} className={input} /><span className="mt-1 block text-xs font-normal text-ink/50">Küçük sayı önce görünür.</span></label>
        <label className="flex items-center gap-2 self-center text-sm font-medium"><input type="checkbox" checked={form.active} onChange={set('active')} className="h-4 w-4 accent-moss" /> Sitede yayında</label>
        <div className="flex flex-wrap items-center gap-3 border-t border-ink/5 pt-5 sm:col-span-2">
          <button disabled={busy} className="btn-primary disabled:opacity-60">{busy ? 'Kaydediliyor…' : isNew ? 'Ürünü oluştur' : 'Kaydet'}</button>
          {!isNew && <button type="button" onClick={removeProduct} disabled={busy} className="ml-auto text-sm text-red-600 hover:underline">Ürünü sil</button>}
        </div>
      </form>
    </div>
  )
}
