import { Link } from 'react-router-dom'
import { Carousel } from '../components/Carousel'
import { SkillsChart } from '../components/SkillsChart'
import { useAuth } from '../context/AuthContext'
import { useProjects } from '../hooks/useProjects'
import './Home.css'

const highlightOrder = [
  'stravagante-watches',
  'life-control',
  'gym-init',
  'mantenimiento-autos',
  'sleep-cycles',
]

export function Home() {
  const { isAuthenticated } = useAuth()
  const { projects, loading } = useProjects()

  const sorted = highlightOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project))

  const slides = sorted.map((project) => ({
    id: project.id,
    title: project.title,
    subtitle: project.summary,
    image: project.coverImage,
    href: isAuthenticated
      ? `/proyectos/${project.slug}`
      : project.liveUrl,
  }))

  return (
    <div className="home-page">
      <section className="home">
        <p className="home__eyebrow">Desarrollador frontend</p>
        <h1 className="home__title">Angelo</h1>
        <p className="home__lead">
          Construcción de interfaces claras, accesibles y con intención visual.
        </p>
        <div className="home__actions">
          <Link to="/proyectos" className="home__btn home__btn--primary">
            Ver proyectos
          </Link>
          {!isAuthenticated ? (
            <Link to="/login" className="home__btn home__btn--ghost">
              Iniciar sesión
            </Link>
          ) : null}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-section__title">Destacados</h2>
        <p className="home-section__text">
          Trabajos recientes en producción.
        </p>
        {loading ? (
          <p className="home-section__text">Cargando destacados…</p>
        ) : (
          <Carousel slides={slides} />
        )}
      </section>

      <section className="home-section">
        <h2 className="home-section__title">Stack</h2>
        <p className="home-section__text">
          Tecnologías que más uso en mis proyectos.
        </p>
        <SkillsChart />
      </section>
    </div>
  )
}
