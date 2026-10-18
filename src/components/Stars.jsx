import { Star } from './Icons.jsx'
export default function Stars({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-ink/60">
      <span className="flex text-clay" aria-label={`5 üzerinden ${rating}`}>
        {[1, 2, 3, 4, 5].map((i) => <Star key={i} filled={i <= Math.round(rating)} />)}
      </span>
      {reviews != null && <span>({reviews})</span>}
    </div>
  )
}
