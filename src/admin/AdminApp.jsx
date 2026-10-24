import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import Logo from '../components/Logo.jsx'
import Login from './Login.jsx'
import ProductList from './ProductList.jsx'
import ProductEdit from './ProductEdit.jsx'

function Shell({ email, children }) {
  return (
    <div className="min-h-screen bg-sand">
      <header className="border-b border-ink/10 bg-white">
        <div className="container-x flex h-16 items-center gap-4">
          <Logo />
          <span className="rounded bg-moss px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">Admin</span>
          <nav className="ml-auto flex items-center gap-4 text-sm">
            {email && <span className="hidden text-ink/50 sm:inline">{email}</span>}
            <Link to="/" className="text-moss-dark hover:underline">Siteyi gör</Link>
            {email && <button onClick={() => supabase.auth.signOut()} className="font-medium text-ink/70 hover:text-ink">Çıkış</button>}
          </nav>
        </div>
      </header>
      <main className="container-x py-8">{children}</main>
    </div>
  )
}

export default function AdminApp() {
  const [session, setSession] = useState(undefined)
  const [isAdmin, setIsAdmin] = useState(null)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  const userId = session?.user?.id
  useEffect(() => {
    if (!userId) { setIsAdmin(null); return }
    let alive = true
    supabase.from('admins').select('user_id').eq('user_id', userId).maybeSingle().then(({ data, error }) => {
      if (alive) setIsAdmin(!error && Boolean(data))
    })
    return () => { alive = false }
  }, [userId])

  if (!supabase) {
    return <Shell><p className="rounded-md bg-white p-6">Supabase ayarları bulunamadı. <code>.env.local</code> dosyasına <code>VITE_SUPABASE_URL</code> ve <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> değerlerini ekleyin.</p></Shell>
  }
  if (session === undefined || (session && isAdmin === null)) {
    return <Shell><p className="text-center text-ink/50">Yükleniyor…</p></Shell>
  }
  if (!session) return <Shell><Login /></Shell>
  if (!isAdmin) {
    return (
      <Shell email={session.user.email}>
        <div className="mx-auto max-w-md rounded-md bg-white p-6 text-center">
          <p className="font-semibold">Bu hesabın admin yetkisi yok.</p>
          <button onClick={() => supabase.auth.signOut()} className="btn-ghost mt-4">Çıkış yap</button>
        </div>
      </Shell>
    )
  }
  return (
    <Shell email={session.user.email}>
      <Routes>
        <Route index element={<ProductList />} />
        <Route path="urun/yeni" element={<ProductEdit />} />
        <Route path="urun/:id" element={<ProductEdit />} />
        <Route path="*" element={<ProductList />} />
      </Routes>
    </Shell>
  )
}
