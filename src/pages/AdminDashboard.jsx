import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import Gallery from '../components/Gallery'
import SeamDivider from '../components/SeamDivider'

export default function AdminDashboard() {
  const [tab, setTab] = useState('boutique')
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut(auth)
    navigate('/admin/login')
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="label-caps text-ink/40 mb-2">Admin</p>
          <h1 className="font-display text-3xl">Gallery management</h1>
        </div>
        <button
          onClick={handleSignOut}
          className="label-caps text-ink/50 hover:text-ink underline underline-offset-4 focus-ring"
        >
          Sign out
        </button>
      </div>

      <div className="flex gap-2 mt-10 mb-8">
        <button
          onClick={() => setTab('boutique')}
          className={`label-caps px-5 py-2.5 rounded-sm border transition-colors focus-ring ${
            tab === 'boutique' ? 'bg-gold text-linen border-gold' : 'border-ink/20 text-ink/60 hover:text-ink'
          }`}
        >
          Boutique
        </button>
        <button
          onClick={() => setTab('bridal-studio')}
          className={`label-caps px-5 py-2.5 rounded-sm border transition-colors focus-ring ${
            tab === 'bridal-studio' ? 'bg-maroon text-linen border-maroon' : 'border-ink/20 text-ink/60 hover:text-ink'
          }`}
        >
          Bridal Studio
        </button>
      </div>

      <SeamDivider tone={tab === 'boutique' ? 'gold' : 'maroon'} className="mb-8" />

      {tab === 'boutique' ? (
        <Gallery category="boutique" editable emptyLabel="No boutique images added yet." />
      ) : (
        <Gallery category="bridal-studio" editable emptyLabel="No bridal studio images added yet." />
      )}
    </div>
  )
}
