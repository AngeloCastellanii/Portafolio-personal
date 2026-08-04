import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  getSession,
  login as loginService,
  logout as logoutService,
  register as registerService,
  type SessionUser,
} from '../services/authService'

interface AuthContextValue {
  user: SessionUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => getSession())

  const login = useCallback(async (email: string, password: string) => {
    const session = await loginService({ email, password })
    setUser(session)
  }, [])

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const session = await registerService({ name, email, password })
      setUser(session)
    },
    [],
  )

  const logout = useCallback(() => {
    logoutService()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      register,
      logout,
    }),
    [user, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
