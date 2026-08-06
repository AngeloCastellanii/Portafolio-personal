import { openDB, type DBSchema, type IDBPDatabase } from 'idb'

export interface UserRecord {
  id: string
  email: string
  name: string
  passwordHash: string
  createdAt: number
}

export type ProjectEvidence =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; title: string }
  | { type: 'code'; language: string; content: string }
  | { type: 'link'; url: string; label: string }

export interface ProjectRecord {
  id: string
  slug: string
  title: string
  summary: string
  description: string
  coverImage: string
  technologies: string[]
  liveUrl: string
  evidence: ProjectEvidence[]
  featured: boolean
  createdAt: number
}

interface PortfolioDB extends DBSchema {
  users: {
    key: string
    value: UserRecord
    indexes: { 'by-email': string }
  }
  projects: {
    key: string
    value: ProjectRecord
    indexes: { 'by-slug': string }
  }
}

const DB_NAME = 'portfolio-db'
const DB_VERSION = 2

let dbPromise: Promise<IDBPDatabase<PortfolioDB>> | null = null

export function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<PortfolioDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          const users = db.createObjectStore('users', { keyPath: 'id' })
          users.createIndex('by-email', 'email', { unique: true })
        }

        if (oldVersion < 2 && !db.objectStoreNames.contains('projects')) {
          const projects = db.createObjectStore('projects', { keyPath: 'id' })
          projects.createIndex('by-slug', 'slug', { unique: true })
        }
      },
    })
  }
  return dbPromise
}
