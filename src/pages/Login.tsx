import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validateLogin } from '../utils/validation'
import './Page.css'
import './AuthForm.css'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as { from?: string } | null)?.from ?? '/proyectos'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const validationError = validateLogin({ email, password })
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page">
      <h1 className="page__title">Iniciar sesión</h1>
      <p className="page__text">Accede para ver tus proyectos.</p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {error ? <p className="auth-form__error" role="alert">{error}</p> : null}

        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="login-email">
            Correo
          </label>
          <input
            id="login-email"
            className="auth-form__input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="login-password">
            Contraseña
          </label>
          <input
            id="login-password"
            className="auth-form__input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="auth-form__submit" type="submit" disabled={loading}>
          {loading ? 'Entrando…' : 'Entrar'}
        </button>

        <p className="auth-form__footer">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          <br />
          ¿Problemas para entrar? <Link to="/cuenta">Recuperar o borrar cuenta</Link>
        </p>
      </form>
    </section>
  )
}
