import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProjects } from '../hooks/useProjects'
import { ProjectCardSkeleton } from '../components/Skeleton'
import './Page.css'
import './Projects.css'

export function Projects() {
  const { user } = useAuth()
  const { projects, loading, error } = useProjects()
  const [tech, setTech] = useState('Todas')
  const [query, setQuery] = useState('')

  const technologies = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((project) => {
      project.technologies.forEach((item) => set.add(item))
    })
    return ['Todas', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [projects])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesTech = tech === 'Todas' || project.technologies.includes(tech)
      const matchesQuery =
        !normalized ||
        project.title.toLowerCase().includes(normalized) ||
        project.summary.toLowerCase().includes(normalized)
      return matchesTech && matchesQuery
    })
  }, [projects, tech, query])

  return (
    <section className="projects-page">
      <header className="projects-page__header">
        <p className="projects-page__eyebrow">Portafolio</p>
        <h1 className="page__title">Proyectos</h1>
        <p className="page__text">
          Hola, {user?.name}. Explora trabajos en producción con evidencias,
          stack y demos en vivo.
        </p>
      </header>

      <div className="projects-toolbar">
        <label className="projects-search">
          <span className="sr-only">Buscar proyectos</span>
          <input
            type="search"
            placeholder="Buscar por nombre o descripción…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="projects-filters" role="group" aria-label="Filtrar por tecnología">
          {technologies.map((item) => (
            <button
              key={item}
              type="button"
              className={
                tech === item
                  ? 'projects-filters__chip projects-filters__chip--active'
                  : 'projects-filters__chip'
              }
              onClick={() => setTech(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <p className="projects-page__error" role="alert">
          {error}
        </p>
      ) : null}

      {loading ? (
        <div className="projects-grid" aria-busy="true" aria-label="Cargando proyectos">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      ) : null}

      {!loading && !error && filtered.length === 0 ? (
        <div className="projects-empty">
          <h2>Sin resultados</h2>
          <p>Prueba otra tecnología o limpia la búsqueda.</p>
          <button
            type="button"
            className="projects-empty__reset"
            onClick={() => {
              setTech('Todas')
              setQuery('')
            }}
          >
            Limpiar filtros
          </button>
        </div>
      ) : null}

      {!loading ? (
        <div className="projects-grid">
          {filtered.map((project, index) => (
            <article
              key={project.id}
              className="project-card"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <Link to={`/proyectos/${project.slug}`} className="project-card__media">
                <img src={project.coverImage} alt={project.title} loading="lazy" />
                <span className="project-card__badge">Ver caso</span>
              </Link>
              <div className="project-card__body">
                <h2 className="project-card__title">
                  <Link to={`/proyectos/${project.slug}`}>{project.title}</Link>
                </h2>
                <p className="project-card__summary">{project.summary}</p>
                <ul className="project-card__tags">
                  {project.technologies.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="project-card__footer">
                  <Link to={`/proyectos/${project.slug}`} className="project-card__link">
                    Ver detalle
                  </Link>
                  <a
                    className="project-card__live"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Live
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
