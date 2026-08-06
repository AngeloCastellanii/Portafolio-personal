import { getDb, type ProjectRecord } from '../db'
import { projectsSeed } from '../data/projectsSeed'

async function ensureSeed() {
  const db = await getDb()
  const tx = db.transaction('projects', 'readwrite')
  await Promise.all([
    ...projectsSeed.map((project) => tx.store.put(project)),
    tx.done,
  ])
}

export async function getAllProjects(): Promise<ProjectRecord[]> {
  await ensureSeed()
  const db = await getDb()
  const projects = await db.getAll('projects')
  return projects.sort((a, b) => b.createdAt - a.createdAt)
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectRecord | undefined> {
  await ensureSeed()
  const db = await getDb()
  return db.getFromIndex('projects', 'by-slug', slug)
}

export async function getFeaturedProjects(): Promise<ProjectRecord[]> {
  const projects = await getAllProjects()
  return projects.filter((project) => project.featured)
}
