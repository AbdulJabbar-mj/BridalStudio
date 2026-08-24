import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-ink text-linen mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-xl mb-2">Studio &amp; Seam</p>
          <p className="text-linen/60 text-sm leading-relaxed">
            Custom fashion design and bridal beauty, under one roof.
          </p>
        </div>
        <div className="text-sm text-linen/70 space-y-1">
          <p className="label-caps text-linen/40 mb-2">Visit</p>
          <p>Hyderabad, Telangana</p>
          <p>Open Sun–Sun, 10am–8pm</p>
        </div>
        <div className="text-sm text-linen/70 space-y-1">
          <p className="label-caps text-linen/40 mb-2">Site</p>
          <Link to="/contact" className="block hover:text-linen focus-ring">Enquire about a booking</Link>
          <Link to="/admin/login" className="block text-linen/30 hover:text-linen/60 focus-ring text-xs mt-4">
            Staff sign in
          </Link>
        </div>
      </div>
      <div className="border-t border-linen/10 text-center text-xs text-linen/40 py-4">
        © {new Date().getFullYear()} Studio &amp; Seam. All rights reserved.
      </div>
    </footer>
  )
}
