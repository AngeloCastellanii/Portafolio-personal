import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProjects } from '../hooks/useProjects'
import './Page.css'
import './Projects.css'

export function Projects() {
  const { user } = useAuth()
  const { projects, loading, error } = useProjects()

  return (
    <section className="projects-page">
      <header className="projects-page__header">
        <h1 className="page__title">Proyectos</h1>
        <p className="page__text">
          Hola, {user?.name}. Estos son los trabajos destacados del portafolio.
        </p>
      </header>

      {loading ? <p className="page__text">Cargando proyectos…</p> : null}
      {error ? (
        <p className="projects-page__error" role="alert">
          {error}
        </p>
      ) : null}

      {!loading && !error && projects.length === 0 ? (
        <p className="page__text">Aún no hay proyectos publicados.</p>
      ) : null}

      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
            <Link to={`/proyectos/${project.slug}`} className="project-card__media">
              <img src={project.coverImage} alt={project.title} loading="lazy" />
            </Link>
            <div className="project-card__body">
              <h2 className="project-card__title">
                <Link to={`/proyectos/${project.slug}`}>{project.title}</Link>
              </h2>
              <p className="project-card__summary">{project.summary}</p>
              <ul className="project-card__tags">
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <Link to={`/proyectos/${project.slug}`} className="project-card__link">
                Ver detalle
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
