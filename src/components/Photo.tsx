import type { ImgHTMLAttributes } from 'react'
import photos from '../data/photos.json'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height' | 'alt'> & {
  id: string
  alt: string
}

const manifest: Record<string, { w: number; h: number }> = photos

export function Photo({ id, alt, sizes = '100vw', loading = 'lazy', ...rest }: Props) {
  const { w, h } = manifest[id]
  return (
    <img
      src={`/img/${id}-lg.webp`}
      srcSet={`/img/${id}-sm.webp ${Math.min(800, w)}w, /img/${id}-lg.webp ${Math.min(1600, w)}w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={loading}
      decoding="async"
      {...rest}
    />
  )
}
