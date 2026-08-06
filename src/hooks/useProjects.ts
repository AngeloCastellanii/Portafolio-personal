import { useEffect, useState } from 'react'
import type { ProjectRecord } from '../db'
import {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
} from '../services/projectsService'

export function useProjects() {
  const [projects, setProjects] = useState<ProjectRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getAllProjects()
      .then((data) => {
        if (active) setProjects(data)
      })
      .catch(() => {
        if (active) setError('No se pudieron cargar los proyectos.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return { projects, loading, error }
}

export function useFeaturedProjects() {
  const [projects, setProjects] = useState<ProjectRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getFeaturedProjects()
      .then((data) => {
        if (active) setProjects(data)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return { projects, loading }
}

export function useProject(slug: string | undefined) {
  const [project, setProject] = useState<ProjectRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      setError('Proyecto no encontrado.')
      return
    }

    let active = true
    setLoading(true)
    getProjectBySlug(slug)
      .then((data) => {
        if (!active) return
        if (!data) {
          setError('Proyecto no encontrado.')
          setProject(null)
          return
        }
        setProject(data)
        setError('')
      })
      .catch(() => {
        if (active) setError('No se pudo cargar el proyecto.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [slug])

  return { project, loading, error }
}
