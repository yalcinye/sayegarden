import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <section className="container-x py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="h-display mt-2 text-5xl text-moss">Bu sayfa kurumuş.</h1>
      <Link to="/" className="btn-primary mt-8">Ana sayfaya dön</Link>
    </section>
  )
}
