import { useEffect, useState } from 'react'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { db, storage } from '../firebase'

/**
 * Dynamic image panel.
 * - category: 'boutique' | 'bridal-studio' — used as the Firestore collection
 *   name and the Storage folder, so the two panels never mix.
 * - editable: when true (admin dashboard), shows upload + remove controls.
 *   The public-facing pages render this with editable={false}.
 */
export default function Gallery({ category, editable = false, emptyLabel = 'No images yet.' }) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const q = query(collection(db, category), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setImages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
        setLoading(false)
      },
      (err) => {
        console.error(err)
        setError('Could not load images right now.')
        setLoading(false)
      }
    )
    return () => unsubscribe()
  }, [category])

  async function handleUpload(e) {
    e.preventDefault()
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const path = `${category}/${Date.now()}-${file.name}`
      const storageRef = ref(storage, path)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)

      await addDoc(collection(db, category), {
        url,
        storagePath: path,
        caption: caption.trim(),
        createdAt: serverTimestamp(),
      })

      setFile(null)
      setCaption('')
      e.target.reset()
    } catch (err) {
      console.error(err)
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  async function handleRemove(image) {
    if (!window.confirm('Remove this image? This cannot be undone.')) return
    try {
      await deleteDoc(doc(db, category, image.id))
      if (image.storagePath) {
        await deleteObject(ref(storage, image.storagePath)).catch(() => {})
      }
    } catch (err) {
      console.error(err)
      setError('Could not remove image. Please try again.')
    }
  }

  return (
    <div>
      {editable && (
        <form
          onSubmit={handleUpload}
          className="mb-10 p-6 bg-white/60 border border-ink/10 rounded-sm grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
        >
          <div>
            <label className="label-caps block mb-2 text-ink/60">Image file</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm focus-ring"
            />
          </div>
          <div>
            <label className="label-caps block mb-2 text-ink/60">Caption (optional)</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Silk lehenga, festive collection"
              className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm bg-white focus-ring"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="label-caps bg-ink text-linen px-5 py-2.5 rounded-sm hover:bg-ink/85 disabled:opacity-50 transition-colors focus-ring"
          >
            {uploading ? 'Adding…' : 'Add image'}
          </button>
        </form>
      )}

      {error && <p className="text-maroon text-sm mb-6">{error}</p>}

      {loading ? (
        <p className="text-ink/50 text-sm">Loading images…</p>
      ) : images.length === 0 ? (
        <p className="text-ink/50 text-sm italic">{emptyLabel}</p>
      ) : (
        <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {images.map((img) => (
            <figure key={img.id} className="relative group overflow-hidden rounded-sm bg-ink/5 mb-4 break-inside-avoid">
              <img
                src={img.url}
                alt={img.caption || 'Studio work'}
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {img.caption && (
                <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/80 to-transparent text-linen text-xs px-3 py-3">
                  {img.caption}
                </figcaption>
              )}
              {editable && (
                <button
                  onClick={() => handleRemove(img)}
                  className="absolute top-2 right-2 bg-maroon text-linen text-xs px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity focus-ring"
                  aria-label="Remove image"
                >
                  Remove
                </button>
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}
