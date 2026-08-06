import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Carousel.css'

export interface CarouselSlide {
  id: string
  title: string
  subtitle?: string
  image: string
  href?: string
}

interface CarouselProps {
  slides: CarouselSlide[]
  intervalMs?: number
}

export function Carousel({ slides, intervalMs = 5000 }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (slides.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [slides.length, intervalMs])

  if (slides.length === 0) return null

  const slide = slides[index]
  const imageBroken = brokenImages[slide.id]

  function go(next: number) {
    setIndex((next + slides.length) % slides.length)
  }

  const content: ReactNode = (
    <>
      {imageBroken ? (
        <div className="carousel__fallback" aria-hidden="true">
          <span>{slide.title}</span>
        </div>
      ) : (
        <img
          className="carousel__image"
          src={slide.image}
          alt={slide.title}
          onError={() =>
            setBrokenImages((current) => ({ ...current, [slide.id]: true }))
          }
        />
      )}
      <div className="carousel__overlay">
        <h3 className="carousel__title">{slide.title}</h3>
        {slide.subtitle ? (
          <p className="carousel__subtitle">{slide.subtitle}</p>
        ) : null}
      </div>
    </>
  )

  const isInternal = Boolean(slide.href?.startsWith('/'))

  return (
    <div className="carousel" aria-roledescription="carrusel">
      {slide.href && isInternal ? (
        <Link className="carousel__frame" to={slide.href}>
          {content}
        </Link>
      ) : slide.href ? (
        <a className="carousel__frame" href={slide.href} target="_blank" rel="noreferrer">
          {content}
        </a>
      ) : (
        <div className="carousel__frame">{content}</div>
      )}

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            className="carousel__nav carousel__nav--prev"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              go(index - 1)
            }}
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel__nav carousel__nav--next"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              go(index + 1)
            }}
            aria-label="Siguiente"
          >
            ›
          </button>
          <div className="carousel__dots" role="tablist" aria-label="Diapositivas">
            {slides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                className={
                  i === index
                    ? 'carousel__dot carousel__dot--active'
                    : 'carousel__dot'
                }
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  setIndex(i)
                }}
                aria-label={`Ir a ${item.title}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
