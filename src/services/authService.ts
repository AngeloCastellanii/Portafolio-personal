import { getDb, type UserRecord } from '../db'

export type SessionUser = Pick<UserRecord, 'id' | 'email' | 'name'>

const SESSION_KEY = 'portfolio-session'

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function toSessionUser(user: UserRecord): SessionUser {
  return { id: user.id, email: user.email, name: user.name }
}

export function getSession(): SessionUser | null {
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as SessionUser
  } catch {
    sessionStorage.removeItem(SESSION_KEY)
    return null
  }
}

function setSession(user: SessionUser) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
}

export async function register(input: {
  name: string
  email: string
  password: string
}): Promise<SessionUser> {
  const name = input.name.trim()
  const email = input.email.trim().toLowerCase()
  const password = input.password

  if (!name || !email || password.length < 6) {
    throw new Error('Completa todos los campos. La contraseña debe tener al menos 6 caracteres.')
  }

  const db = await getDb()
  const existing = await db.getFromIndex('users', 'by-email', email)
  if (existing) {
    throw new Error('Ya existe una cuenta con ese correo.')
  }

  const user: UserRecord = {
    id: crypto.randomUUID(),
    email,
    name,
    passwordHash: await hashPassword(password),
    createdAt: Date.now(),
  }

  await db.put('users', user)
  const session = toSessionUser(user)
  setSession(session)
  return session
}

export async function login(input: {
  email: string
  password: string
}): Promise<SessionUser> {
  const email = input.email.trim().toLowerCase()
  const password = input.password

  if (!email || !password) {
    throw new Error('Ingresa correo y contraseña.')
  }

  const db = await getDb()
  const user = await db.getFromIndex('users', 'by-email', email)
  if (!user) {
    throw new Error('Correo o contraseña incorrectos.')
  }

  const passwordHash = await hashPassword(password)
  if (passwordHash !== user.passwordHash) {
    throw new Error('Correo o contraseña incorrectos.')
  }

  const session = toSessionUser(user)
  setSession(session)
  return session
}

export function logout() {
  clearSession()
}
