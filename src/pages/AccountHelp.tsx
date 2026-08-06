import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  deleteAccount,
  resetPassword,
} from '../services/authService'
import { isValidEmail } from '../utils/validation'
import './Page.css'
import './AuthForm.css'

type Mode = 'reset' | 'delete'

export function AccountHelp() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('reset')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!isValidEmail(email)) {
      setError('El correo no es válido.')
      return
    }

    setLoading(true)
    try {
      if (mode === 'reset') {
        if (password.length < 6) {
          throw new Error('La contraseña debe tener al menos 6 caracteres.')
        }
        await resetPassword({ email, password })
        setSuccess('Contraseña actualizada. Ya puedes iniciar sesión.')
        setPassword('')
      } else {
        await deleteAccount(email)
        setSuccess('Cuenta eliminada. Puedes registrarte de nuevo.')
        setEmail('')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo completar la acción.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page">
      <h1 className="page__title">Cuenta</h1>
      <p className="page__text">
        Recupera el acceso cambiando la contraseña o elimina la cuenta para
        registrarte otra vez.
      </p>

      <div className="auth-form__modes" role="tablist" aria-label="Acción">
        <button
          type="button"
          className={
            mode === 'reset'
              ? 'auth-form__mode auth-form__mode--active'
              : 'auth-form__mode'
          }
          onClick={() => {
            setMode('reset')
            setError('')
            setSuccess('')
          }}
        >
          Cambiar contraseña
        </button>
        <button
          type="button"
          className={
            mode === 'delete'
              ? 'auth-form__mode auth-form__mode--active'
              : 'auth-form__mode'
          }
          onClick={() => {
            setMode('delete')
            setError('')
            setSuccess('')
          }}
        >
          Borrar cuenta
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {error ? <p className="auth-form__error" role="alert">{error}</p> : null}
        {success ? (
          <p className="auth-form__success" role="status">
            {success}{' '}
            <button
              type="button"
              className="auth-form__inline-link"
              onClick={() => navigate('/login')}
            >
              Ir a iniciar sesión
            </button>
          </p>
        ) : null}

        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="help-email">
            Correo
          </label>
          <input
            id="help-email"
            className="auth-form__input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {mode === 'reset' ? (
          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="help-password">
              Nueva contraseña
            </label>
            <input
              id="help-password"
              className="auth-form__input"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>
        ) : (
          <p className="page__text">
            Esto borra la cuenta de este navegador de forma permanente.
          </p>
        )}

        <button className="auth-form__submit" type="submit" disabled={loading}>
          {loading
            ? 'Procesando…'
            : mode === 'reset'
              ? 'Guardar contraseña'
              : 'Eliminar cuenta'}
        </button>

        <p className="auth-form__footer">
          <Link to="/login">Volver a iniciar sesión</Link>
        </p>
      </form>
    </section>
  )
}
