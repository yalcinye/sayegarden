# Saye Garden

Kendi kendini sulayan saksılarda iç mekân bitkileri satan örnek bir e-ticaret frontend'i.

**Stack:** React 18 · Vite 5 · Tailwind CSS 3 · React Router 6

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ klasörüne üretim çıktısı
```

## Sayfalar

| Route | Açıklama |
|---|---|
| `/` | Ana sayfa: hero, değerler, çok satanlar, nasıl çalışır, kategoriler, yorumlar, hediye CTA |
| `/bitkiler` | Ürün listesi; `?kategori=` filtresi, boyut filtresi, sıralama |
| `/bitkiler/:slug` | Ürün detayı: galeri, saksı rengi seçimi, adet, bakım sekmeleri, benzer ürünler |
| `/sepet` | Sepet, kargo hesabı, hediye notu, demo sipariş |
| `/sss` | Akordeon SSS |

Sepet `localStorage`'da tutulur; sağdan açılan bir çekmece (drawer) de vardır.

## Notlar

- Görseller Unsplash'ten seçilmiş **çiçek fotoğraflarıdır** (Unsplash Lisansı, ücretsiz kullanım). Her görsel `src/data/products.js` içindeki `photos` tablosunda sabit bir fotoğrafa bağlı; kendi görsellerine geçmek için bu tabloyu veya `img()` fonksiyonunu değiştir.
- Ürün, yorum ve SSS verileri `src/data/products.js` içinde mock olarak durur; backend'e bağlarken buradan API çağrısına geçebilirsin.
- Ödeme akışı demo amaçlıdır, gerçek ödeme alınmaz.
- SPA olduğu için deploy ederken tüm route'ları `index.html`'e yönlendir (Netlify `_redirects`, Vercel `rewrites`, Azure Static Web Apps `navigationFallback`).
