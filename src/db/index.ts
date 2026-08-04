import { openDB, type DBSchema, type IDBPDatabase } from 'idb'

export interface UserRecord {
  id: string
  email: string
  name: string
  passwordHash: string
  createdAt: number
}

interface PortfolioDB extends DBSchema {
  users: {
    key: string
    value: UserRecord
    indexes: { 'by-email': string }
  }
}

const DB_NAME = 'portfolio-db'
const DB_VERSION = 1

let dbPromise: Promise<IDBPDatabase<PortfolioDB>> | null = null

export function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<PortfolioDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const users = db.createObjectStore('users', { keyPath: 'id' })
        users.createIndex('by-email', 'email', { unique: true })
      },
    })
  }
  return dbPromise
}
