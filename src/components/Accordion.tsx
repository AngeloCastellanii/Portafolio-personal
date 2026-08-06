import { useId, useState, type ReactNode } from 'react'
import './Accordion.css'

export interface AccordionItem {
  id: string
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const baseId = useId()
  const [openIds, setOpenIds] = useState<string[]>(items[0] ? [items[0].id] : [])

  function toggle(id: string) {
    setOpenIds((current) => {
      const isOpen = current.includes(id)
      if (allowMultiple) {
        return isOpen ? current.filter((item) => item !== id) : [...current, id]
      }
      return isOpen ? [] : [id]
    })
  }

  return (
    <div className="accordion">
      {items.map((item) => {
        const open = openIds.includes(item.id)
        return (
          <div key={item.id} className="accordion__item">
            <h3 className="accordion__heading">
              <button
                type="button"
                className="accordion__trigger"
                id={`${baseId}-trigger-${item.id}`}
                aria-expanded={open}
                aria-controls={`${baseId}-panel-${item.id}`}
                onClick={() => toggle(item.id)}
              >
                <span>{item.title}</span>
                <span className="accordion__icon" aria-hidden="true">
                  {open ? '−' : '+'}
                </span>
              </button>
            </h3>
            {open ? (
              <div
                className="accordion__panel"
                id={`${baseId}-panel-${item.id}`}
                role="region"
                aria-labelledby={`${baseId}-trigger-${item.id}`}
              >
                {item.content}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
