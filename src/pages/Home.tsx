import { Link } from 'react-router-dom'
import { Accordion } from '../components/Accordion'
import { Carousel } from '../components/Carousel'
import { SkillsChart } from '../components/SkillsChart'
import { CarouselSkeleton } from '../components/Skeleton'
import { useAuth } from '../context/AuthContext'
import { useProjects } from '../hooks/useProjects'
import './Home.css'

const highlightOrder = [
  'stravagante-watches',
  'life-control',
  'gym-init',
  'mantenimiento-autos',
  'sleep-cycles',
  'portafolio-angelo',
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
    href: isAuthenticated ? `/proyectos/${project.slug}` : project.liveUrl,
  }))

  return (
    <div className="home-page">
      <section className="home">
        <div className="home__copy">
          <p className="home__eyebrow">Desarrollador frontend</p>
          <h1 className="home__title">Angelo</h1>
          <p className="home__lead">
            Diseño y desarrollo productos digitales con interfaces claras,
            accesibles y con intención visual. Del concepto al deploy.
          </p>
          <div className="home__actions">
            <Link to="/proyectos" className="home__btn home__btn--primary">
              Ver proyectos
            </Link>
            <a
              className="home__btn home__btn--ghost"
              href="https://github.com/AngeloCastellanii"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            {!isAuthenticated ? (
              <Link to="/login" className="home__btn home__btn--ghost">
                Iniciar sesión
              </Link>
            ) : (
              <Link to="/perfil" className="home__btn home__btn--ghost">
                Mi perfil
              </Link>
            )}
          </div>
        </div>
        <aside className="home__panel" aria-label="Resumen">
          <div className="home__stat">
            <strong>{projects.length || 6}</strong>
            <span>proyectos en vivo</span>
          </div>
          <div className="home__stat">
            <strong>React</strong>
            <span>stack principal</span>
          </div>
          <div className="home__stat">
            <strong>UI</strong>
            <span>detalle y motion</span>
          </div>
        </aside>
      </section>

      <section className="home-section">
        <div className="home-section__heading">
          <h2 className="home-section__title">Destacados</h2>
          <p className="home-section__text">
            Casos reales en producción. El carrusel avanza cada 5 segundos.
          </p>
        </div>
        {loading ? <CarouselSkeleton /> : <Carousel slides={slides} />}
      </section>

      <section className="home-section">
        <div className="home-section__heading">
          <h2 className="home-section__title">Cómo trabajo</h2>
          <p className="home-section__text">
            Principios que aplico en cada interfaz.
          </p>
        </div>
        <Accordion
          items={[
            {
              id: 'claridad',
              title: 'Claridad primero',
              content:
                'Jerarquía tipográfica, contraste y flujos cortos para que el usuario entienda sin fricción.',
            },
            {
              id: 'detalle',
              title: 'Detalle que se siente',
              content:
                'Microinteracciones, estados vacíos y feedback visual para que el producto se sienta vivo.',
            },
            {
              id: 'entrega',
              title: 'Listo para producción',
              content:
                'Responsive, accesible y desplegable. Código mantenible con React y TypeScript.',
            },
          ]}
        />
      </section>

      <section className="home-section">
        <div className="home-section__heading">
          <h2 className="home-section__title">Stack</h2>
          <p className="home-section__text">
            Tecnologías que más uso en mis proyectos.
          </p>
        </div>
        <SkillsChart />
      </section>
    </div>
  )
}
