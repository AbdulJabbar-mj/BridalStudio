import { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

/**
 * Full-bleed background carousel for a hero panel.
 * Pulls the latest images from the given Firestore category and
 * crossfades between them. Uses object-fit: contain so photos are
 * never cropped — any empty space letterboxes against the panel's
 * own background color instead of cutting the image off.
 */
export default function HeroPanelCarousel({ category, intervalMs = 4000 }) {
  const [images, setImages] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const q = query(collection(db, category), orderBy('createdAt', 'desc'), limit(6))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setImages(snapshot.docs.map((d) => d.data().url).filter(Boolean))
    })
    return () => unsubscribe()
  }, [category])

  useEffect(() => {
    if (images.length < 2) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [images.length, intervalMs])

  if (images.length === 0) {
    // No highlight photos uploaded yet — panel keeps its plain
    // background color (set by the parent) rather than showing nothing.
    return null
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {images.map((url, i) => (
        <img
          key={url + i}
          src={url}
          alt=""
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-[1200ms]"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
    </div>
  )
}
