import type { CSSProperties } from 'react'
import './Skeleton.css'

interface SkeletonProps {
  className?: string
  style?: CSSProperties
}

export function Skeleton({ className = '', style }: SkeletonProps) {
  return <div className={`skeleton ${className}`.trim()} style={style} aria-hidden="true" />
}

export function CarouselSkeleton() {
  return (
    <div className="skeleton-carousel" aria-busy="true" aria-label="Cargando destacados">
      <Skeleton className="skeleton-carousel__frame" />
      <div className="skeleton-carousel__meta">
        <Skeleton className="skeleton-line skeleton-line--lg" />
        <Skeleton className="skeleton-line" />
      </div>
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <Skeleton className="skeleton-card__media" />
      <div className="skeleton-card__body">
        <Skeleton className="skeleton-line skeleton-line--md" />
        <Skeleton className="skeleton-line" />
        <Skeleton className="skeleton-line skeleton-line--sm" />
        <div className="skeleton-card__tags">
          <Skeleton className="skeleton-chip" />
          <Skeleton className="skeleton-chip" />
          <Skeleton className="skeleton-chip" />
        </div>
      </div>
    </div>
  )
}

export function ProjectDetailSkeleton() {
  return (
    <div className="skeleton-detail" aria-busy="true" aria-label="Cargando proyecto">
      <Skeleton className="skeleton-line skeleton-line--sm" style={{ width: '8rem' }} />
      <Skeleton className="skeleton-line skeleton-line--xl" style={{ width: '60%' }} />
      <Skeleton className="skeleton-line" style={{ width: '80%' }} />
      <Skeleton className="skeleton-detail__cover" />
      <div className="skeleton-card__tags">
        <Skeleton className="skeleton-chip" />
        <Skeleton className="skeleton-chip" />
        <Skeleton className="skeleton-chip" />
      </div>
    </div>
  )
}
