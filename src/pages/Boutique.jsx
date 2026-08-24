import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'
import SeamDivider from '../components/SeamDivider'

export default function Boutique() {
  return (
    <div>
      <section className="bg-linen2 px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <p className="label-caps text-golddeep mb-3">The Boutique</p>
          <h1 className="font-display text-4xl md:text-5xl mb-5 leading-tight">
            Fashion designed around your fit, not a size chart.
          </h1>
          <p className="text-ink/60 max-w-xl leading-relaxed">
            Every piece is designed and stitched in-house — from festive
            lehengas to tailored everyday wear. Browse recent work below,
            or bring your own fabric and design idea to a consultation.
          </p>
        </div>
      </section>

      <SeamDivider tone="gold" className="bg-linen" />

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="label-caps text-ink/40 mb-8">Recent boutique work</h2>
        <Gallery
          category="boutique"
          emptyLabel="New boutique pieces are added regularly — check back soon."
        />
      </section>

      <section className="bg-ink text-linen px-6 py-16 text-center">
        <h3 className="font-display text-2xl md:text-3xl mb-4">
          Have a design in mind?
        </h3>
        <Link
          to="/contact"
          className="inline-block label-caps bg-gold text-ink px-7 py-3.5 rounded-sm hover:bg-golddeep hover:text-linen transition-colors focus-ring"
        >
          Start an enquiry
        </Link>
      </section>
    </div>
  )
}
