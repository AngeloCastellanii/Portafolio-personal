import { useId, useState, type ReactNode } from 'react'
import './Tabs.css'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  items: TabItem[]
  defaultId?: string
}

export function Tabs({ items, defaultId }: TabsProps) {
  const baseId = useId()
  const [activeId, setActiveId] = useState(defaultId ?? items[0]?.id)
  const active = items.find((item) => item.id === activeId) ?? items[0]

  if (!active) return null

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label="Secciones">
        {items.map((item) => {
          const selected = item.id === active.id
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              className={selected ? 'tabs__tab tabs__tab--active' : 'tabs__tab'}
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div
        className="tabs__panel"
        role="tabpanel"
        id={`${baseId}-panel-${active.id}`}
        aria-labelledby={`${baseId}-${active.id}`}
      >
        {active.content}
      </div>
    </div>
  )
}
