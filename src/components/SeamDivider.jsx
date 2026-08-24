// The site's signature motif: a hand-stitched tailor's seam.
// Used as a section divider throughout — ties the boutique (tailoring)
// and bridal studio (mehndi thread) halves of the business together.
export default function SeamDivider({ tone = 'ink', className = '' }) {
  const colorMap = { ink: '#231D19', gold: '#B8863B', maroon: '#7A1F2B' }
  const stroke = colorMap[tone] || colorMap.ink

  return (
    <div className={`w-full flex items-center justify-center py-2 ${className}`} aria-hidden="true">
      <svg width="100%" height="18" viewBox="0 0 1200 18" preserveAspectRatio="none" className="max-w-5xl px-6">
        <line
          x1="0" y1="9" x2="1200" y2="9"
          stroke={stroke}
          strokeWidth="1.5"
          strokeDasharray="10 9"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
