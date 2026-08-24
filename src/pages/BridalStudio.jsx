import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'
import SeamDivider from '../components/SeamDivider'

export default function BridalStudio() {
  return (
    <div>
      <section className="bg-ink text-linen px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <p className="label-caps mb-3" style={{ color: '#D98E9C' }}>The Bridal Studio</p>
          <h1 className="font-display text-4xl md:text-5xl mb-5 leading-tight">
            Makeup, hairstyling, and grooming for your wedding day.
          </h1>
          <p className="text-linen/60 max-w-xl leading-relaxed">
            From engagement looks to the big day itself — bridal makeup,
            hairstyling, and grooming, with trial sessions available so
            there are no surprises on the day.
          </p>
        </div>
      </section>

      <SeamDivider tone="maroon" className="bg-linen" />

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="label-caps text-ink/40 mb-8">Work by our beauticians</h2>
        <Gallery
          category="bridal-studio"
          emptyLabel="New bridal looks are added after every event — check back soon."
        />
      </section>

      <section className="bg-linen2 px-6 py-16 text-center">
        <h3 className="font-display text-2xl md:text-3xl mb-4">
          Planning a wedding date?
        </h3>
        <Link
          to="/contact"
          className="inline-block label-caps bg-maroon text-linen px-7 py-3.5 rounded-sm hover:bg-maroondeep transition-colors focus-ring"
        >
          Check availability
        </Link>
      </section>
    </div>
  )
}
