import { Link, useParams } from 'react-router-dom'
import { Accordion } from '../components/Accordion'
import { EvidenceList } from '../components/EvidenceList'
import { Tabs } from '../components/Tabs'
import { useProject } from '../hooks/useProjects'
import './Page.css'
import './ProjectDetail.css'

export function ProjectDetail() {
  const { slug } = useParams()
  const { project, loading, error } = useProject(slug)

  if (loading) {
    return (
      <section className="page">
        <p className="page__text">Cargando proyecto…</p>
      </section>
    )
  }

  if (error || !project) {
    return (
      <section className="page">
        <h1 className="page__title">Proyecto no encontrado</h1>
        <p className="page__text">{error || 'No existe ese proyecto.'}</p>
        <Link to="/proyectos" className="detail__back">
          Volver a proyectos
        </Link>
      </section>
    )
  }

  const images = project.evidence.filter((item) => item.type === 'image')
  const videos = project.evidence.filter((item) => item.type === 'video')
  const code = project.evidence.filter((item) => item.type === 'code')
  const links = project.evidence.filter((item) => item.type === 'link')

  return (
    <article className="detail">
      <Link to="/proyectos" className="detail__back">
        ← Proyectos
      </Link>

      <header className="detail__header">
        <h1 className="page__title">{project.title}</h1>
        <p className="page__text">{project.summary}</p>
        <ul className="detail__tags">
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <a
          className="detail__live"
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
        >
          Ver en vivo
        </a>
      </header>

      <img
        className="detail__cover"
        src={project.coverImage}
        alt={project.title}
      />

      <Tabs
        items={[
          {
            id: 'descripcion',
            label: 'Descripción',
            content: <p className="detail__description">{project.description}</p>,
          },
          {
            id: 'codigo',
            label: 'Código',
            content:
              code.length > 0 ? (
                <EvidenceList items={code} />
              ) : (
                <p className="page__text">Sin snippets disponibles.</p>
              ),
          },
          {
            id: 'media',
            label: 'Media',
            content:
              images.length + videos.length > 0 ? (
                <EvidenceList items={[...images, ...videos]} />
              ) : (
                <p className="page__text">Sin media disponible.</p>
              ),
          },
        ]}
      />

      <section className="detail__section">
        <h2 className="detail__section-title">Más evidencias</h2>
        <Accordion
          items={[
            {
              id: 'galeria',
              title: 'Galería de capturas',
              content:
                images.length > 0 ? (
                  <EvidenceList items={images} />
                ) : (
                  <p>Sin capturas.</p>
                ),
            },
            {
              id: 'demo',
              title: 'Demo interactiva',
              content:
                videos.length > 0 ? (
                  <EvidenceList items={videos} />
                ) : (
                  <p>Sin demo embebida.</p>
                ),
            },
            {
              id: 'enlaces',
              title: 'Enlaces',
              content:
                links.length > 0 ? (
                  <EvidenceList items={links} />
                ) : (
                  <p>Sin enlaces adicionales.</p>
                ),
            },
          ]}
        />
      </section>
    </article>
  )
}
