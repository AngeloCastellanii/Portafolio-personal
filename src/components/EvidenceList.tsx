import type { ProjectEvidence } from '../db'
import './Evidence.css'

export function EvidenceList({ items }: { items: ProjectEvidence[] }) {
  return (
    <div className="evidence">
      {items.map((item, index) => {
        const key = `${item.type}-${index}`

        if (item.type === 'image') {
          return (
            <figure key={key} className="evidence__block">
              <img className="evidence__image" src={item.src} alt={item.alt} loading="lazy" />
              <figcaption className="evidence__caption">{item.alt}</figcaption>
            </figure>
          )
        }

        if (item.type === 'video') {
          return (
            <div key={key} className="evidence__block">
              <p className="evidence__label">{item.title}</p>
              <div className="evidence__frame">
                <iframe
                  title={item.title}
                  src={item.src}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )
        }

        if (item.type === 'code') {
          return (
            <div key={key} className="evidence__block">
              <p className="evidence__label">Código · {item.language}</p>
              <pre className="evidence__code">
                <code>{item.content}</code>
              </pre>
            </div>
          )
        }

        return (
          <div key={key} className="evidence__block">
            <a
              className="evidence__link"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              {item.label}
            </a>
          </div>
        )
      })}
    </div>
  )
}
