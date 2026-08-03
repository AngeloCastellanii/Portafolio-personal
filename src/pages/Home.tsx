import { Link } from 'react-router-dom'
import './Home.css'

export function Home() {
  return (
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
        <Link to="/login" className="home__btn home__btn--ghost">
          Iniciar sesión
        </Link>
      </div>
    </section>
  )
}
