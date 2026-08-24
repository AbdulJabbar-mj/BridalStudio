import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/admin')
    } catch
    //(err) {console.error(err.code, err.message);  
      {setError('Incorrect email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <p className="label-caps text-ink/40 mb-2">Staff sign in</p>
      <h1 className="font-display text-3xl mb-8">Manage the galleries</h1>
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div>
          <label htmlFor="email" className="label-caps block mb-2 text-ink/60">Email</label>
          <input
            id="email" type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus-ring"
          />
        </div>
        <div>
          <label htmlFor="password" className="label-caps block mb-2 text-ink/60">Password</label>
          <input
            id="password" type="password" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus-ring"
          />
        </div>
        {error && <p className="text-maroon text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="label-caps bg-ink text-linen px-6 py-3 rounded-sm hover:bg-ink/85 disabled:opacity-50 transition-colors focus-ring w-fit"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="text-xs text-ink/40 mt-8">
        Staff accounts are created by the site administrator in the Firebase console —
        there is no public sign-up.
      </p>
    </div>
  )
}
