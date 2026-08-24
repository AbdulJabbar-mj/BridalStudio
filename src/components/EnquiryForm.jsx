import { useState } from 'react'

// Uses Formspree (https://formspree.io) — no backend required.
// Set VITE_FORMSPREE_ID in your .env to your form's endpoint id.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

export default function EnquiryForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-sage/40 bg-sage/10 rounded-sm p-8 text-center">
        <p className="font-display text-2xl mb-2">Thank you.</p>
        <p className="text-ink/70">
          Your enquiry has been sent. We'll get back to you within a day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="label-caps block mb-2 text-ink/60">Name</label>
          <input
            id="name" name="name" type="text" required
            className="w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus-ring"
          />
        </div>
        <div>
          <label htmlFor="phone" className="label-caps block mb-2 text-ink/60">Phone</label>
          <input
            id="phone" name="phone" type="tel" required
            className="w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus-ring"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="label-caps block mb-2 text-ink/60">Email</label>
        <input
          id="email" name="email" type="email" required
          className="w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus-ring"
        />
      </div>

      <div>
        <label htmlFor="interest" className="label-caps block mb-2 text-ink/60">Enquiring about</label>
        <select
          id="interest" name="interest" required
          className="w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus-ring"
        >
          <option value="">Select one</option>
          <option value="Boutique — custom fashion design">Boutique — custom fashion design</option>
          <option value="Bridal makeup & hairstyling">Bridal makeup &amp; hairstyling</option>
          <option value="Both">Both</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="label-caps block mb-2 text-ink/60">Message</label>
        <textarea
          id="message" name="message" rows="4" required
          placeholder="Tell us your event date, style preferences, or anything else useful."
          className="w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus-ring"
        />
      </div>

      {status === 'error' && (
        <p className="text-maroon text-sm">
          Something went wrong sending your enquiry. Please try again, or call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="label-caps bg-maroon text-linen px-6 py-3 rounded-sm hover:bg-maroondeep disabled:opacity-50 transition-colors focus-ring w-fit"
      >
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  )
}
