import EnquiryForm from '../components/EnquiryForm'
import SeamDivider from '../components/SeamDivider'

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-20">
      <p className="label-caps text-ink/40 mb-3">Get in touch</p>
      <h1 className="font-display text-4xl mb-4">Send an enquiry</h1>
      <p className="text-ink/60 mb-10 leading-relaxed">
        Whether it's a custom outfit, a bridal booking, or both — tell us
        a little about what you need and we'll follow up directly.
      </p>
      <SeamDivider tone="ink" className="mb-10 justify-start [&>svg]:max-w-none" />
      <EnquiryForm />
    </div>
  )
}
