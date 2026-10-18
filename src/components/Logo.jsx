import { Link } from 'react-router-dom'
export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${light ? 'text-cream' : 'text-moss'}`} aria-label="Filiz Bitki Evi ana sayfa">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="currentColor" />
        <path d="M16 26V14M16 14c0-5 4-8 9-8 0 5-4 8-9 8zm0 3c0-4-3-7-8-7 0 4 3 7 8 7z" stroke={light ? '#2F4A35' : '#F6F1E7'} strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <span className="font-serif text-xl">filiz</span>
    </Link>
  )
}
