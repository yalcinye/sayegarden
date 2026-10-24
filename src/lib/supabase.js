import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Ortam değişkenleri yoksa site src/data/products.js'teki sabit verilerle çalışır.
export const supabase = url && key ? createClient(url, key) : null
export const BUCKET = 'urun-gorselleri'
