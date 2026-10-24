import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Faq from './pages/Faq.jsx'
import NotFound from './pages/NotFound.jsx'

// Admin paneli ayrı bir paket olarak yüklenir; ziyaretçiler bu kodu indirmez.
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={<p className="p-10 text-center text-ink/50">Yükleniyor…</p>}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    )
  }
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bitkiler" element={<Shop />} />
          <Route path="/bitkiler/:slug" element={<ProductDetail />} />
          <Route path="/sepet" element={<Cart />} />
          <Route path="/sss" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <CartDrawer />
    </div>
  )
}
