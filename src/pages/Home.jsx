import { Link } from 'react-router-dom'
import SeamDivider from '../components/SeamDivider'
import HeroPanelCarousel from '../components/HeroPanelCarousel'

export default function Home() {
  return (
    <div>
      {/* Split hero — the two halves of the business, joined by a stitched seam.
          Each panel's background is a live carousel of that side's real work. */}
      <section className="grid md:grid-cols-2 min-h-[80vh]">
        <Link
          to="/boutique"
          className="group relative flex flex-col justify-end px-8 py-14 md:py-20 bg-linen2 overflow-hidden focus-ring"
        >
          <HeroPanelCarousel category="boutique" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-linen2 via-linen2/70 to-linen2/10 group-hover:from-linen2/95 transition-colors" />
          <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors z-[2]" />

          <div className="relative z-10">
            <p className="label-caps text-golddeep mb-3">01 — The Boutique</p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-4">
              Fashion, cut<br />and stitched<br />to you.
            </h2>
            <p className="text-ink/70 max-w-sm mb-6">
              Custom blouses, lehengas, and ready-to-wear, designed in-house
              from fabric selection to final fitting.
            </p>
            <span className="label-caps text-golddeep group-hover:translate-x-1 transition-transform inline-block w-fit">
              View the collection →
            </span>
          </div>
        </Link>

        <Link
          to="/bridal-studio"
          className="group relative flex flex-col justify-end px-8 py-14 md:py-20 bg-ink text-linen overflow-hidden focus-ring"
        >
          <HeroPanelCarousel category="bridal-studio" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink via-ink/70 to-ink/10 group-hover:from-ink/95 transition-colors" />
          <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/25 transition-colors z-[2]" />

          <div className="relative z-10">
            <p className="label-caps mb-3" style={{ color: '#D98E9C' }}>02 — The Bridal Studio</p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-4">
              Makeup and<br />hair, for your<br />biggest day.
            </h2>
            <p className="text-linen/70 max-w-sm mb-6">
              Bridal grooming, makeup, and hairstyling — trial sessions
              available before you commit to your look.
            </p>
            <span className="label-caps group-hover:translate-x-1 transition-transform inline-block w-fit" style={{ color: '#D98E9C' }}>
              See recent work →
            </span>
          </div>
        </Link>
      </section>

      <SeamDivider tone="ink" className="bg-linen" />

      {/* Introduction — subtle stitched-thread pattern behind the copy,
          echoing the seam motif without needing any photo content. */}
      <section
        className="px-6 py-20 text-center"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(184,134,59,0.10) 0px, rgba(184,134,59,0.10) 1px, transparent 1px, transparent 14px)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="label-caps text-ink/40 mb-4">One roof, two crafts</p>
          <h3 className="font-display text-3xl md:text-4xl mb-6 leading-snug">
            Get dressed and get ready, without leaving the chair.
          </h3>
          <p className="text-ink/60 leading-relaxed">
            Studio &amp; Seam brings together a fashion design boutique and a
            bridal beauty studio under one address — so an outfit and its
            finishing look can be planned together, not separately.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-8 label-caps bg-ink text-linen px-7 py-3.5 rounded-sm hover:bg-ink/85 transition-colors focus-ring"
          >
            Book a consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
