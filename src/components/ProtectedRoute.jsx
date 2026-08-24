import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined) // undefined = checking, null = signed out

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u))
  }, [])

  if (user === undefined) {
    return <div className="max-w-6xl mx-auto px-6 py-24 text-center text-ink/50">Checking sign-in…</div>
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
