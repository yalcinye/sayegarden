import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message === 'Invalid login credentials' ? 'E-posta ya da şifre hatalı.' : error.message)
    setBusy(false)
  }

  const input = 'mt-1 w-full rounded-md border border-ink/20 px-3 py-2.5 text-sm focus:border-moss focus:outline-none'
  return (
    <form onSubmit={submit} className="mx-auto mt-10 max-w-sm rounded-md bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">Admin girişi</h1>
      <p className="mt-1 text-sm text-ink/55">Ürün ve fotoğraf yönetimi için giriş yapın.</p>
      <label className="mt-6 block text-sm font-medium">E-posta
        <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
      </label>
      <label className="mt-4 block text-sm font-medium">Şifre
        <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
      </label>
      {error && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button disabled={busy} className="btn-primary mt-6 w-full disabled:opacity-60">{busy ? 'Giriş yapılıyor…' : 'Giriş yap'}</button>
    </form>
  )
}
