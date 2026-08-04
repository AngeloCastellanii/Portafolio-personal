import { useAuth } from '../context/AuthContext'
import './Page.css'

export function Projects() {
  const { user } = useAuth()

  return (
    <section className="page">
      <h1 className="page__title">Proyectos</h1>
      <p className="page__text">
        Hola, {user?.name}. Aquí aparecerán los proyectos del portafolio.
      </p>
    </section>
  )
}
