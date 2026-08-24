import { NavLink } from 'react-router-dom'

const linkBase = 'label-caps px-1 py-2 border-b-2 border-transparent transition-colors focus-ring'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-linen/95 backdrop-blur border-b border-ink/10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 h-20">
        <NavLink to="/" className="font-display text-2xl tracking-tight text-ink">
          Jowel Studio <span className="text-maroon">&amp;</span> Seam
        </NavLink>
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/boutique"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'border-gold text-golddeep' : 'text-ink/70 hover:text-ink'}`
            }
          >
            Boutique
          </NavLink>
          <NavLink
            to="/bridal-studio"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'border-maroon text-maroondeep' : 'text-ink/70 hover:text-ink'}`
            }
          >
            Bridal Studio
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'border-ink text-ink' : 'text-ink/70 hover:text-ink'}`
            }
          >
            Enquire
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
