import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { supabase } from './lib/supabase.js'
import { products as fallback } from './data/products.js'

const ProductsContext = createContext(null)

export const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 4"><rect width="4" height="4" fill="#F4F6F4"/></svg>')

export function toProduct(row) {
  const gallery = [...(row.product_images || [])].sort((a, b) => a.sort - b.sort || a.id - b.id).map((i) => i.url)
  return {
    id: row.id, slug: row.slug, name: row.name, latin: row.latin, price: row.price, size: row.size,
    light: row.light, water: row.water, blurb: row.blurb, badge: row.badge, categories: row.categories || [],
    rating: Number(row.rating), reviews: row.reviews, active: row.active,
    image: gallery[0] || PLACEHOLDER, gallery: gallery.length ? gallery : [PLACEHOLDER],
  }
}

export const PRODUCT_SELECT = '*, product_images(id, url, path, sort)'

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(supabase ? [] : fallback)
  const [loading, setLoading] = useState(Boolean(supabase))

  const reload = useCallback(async () => {
    if (!supabase) return
    const { data, error } = await supabase.from('products').select(PRODUCT_SELECT).eq('active', true).order('sort').order('id')
    if (error) {
      console.error('Ürünler yüklenemedi, yerel veriler gösteriliyor:', error.message)
      setProducts(fallback)
    } else {
      setProducts(data.map(toProduct))
    }
    setLoading(false)
  }, [])

  useEffect(() => { reload() }, [reload])

  return <ProductsContext.Provider value={{ products, loading, reload }}>{children}</ProductsContext.Provider>
}

export const useProducts = () => useContext(ProductsContext)
