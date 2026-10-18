import { Link } from 'react-router-dom'
export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${light ? 'text-white' : 'text-ink'}`} aria-label="Saye Garden ana sayfa">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M16 25V15M16 15c0-4.5 3.5-7 8-7 0 4.5-3.5 7-8 7zm0 2.5c0-3.6-2.8-6-7-6 0 3.6 2.8 6 7 6z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-xl font-bold tracking-tight">saye<span className="font-medium text-moss">garden</span></span>
    </Link>
  )
}
