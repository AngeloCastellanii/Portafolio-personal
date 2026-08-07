import type { ProjectRecord } from '../db'

function preview(id: string, ext: 'jpg' | 'png' = 'jpg') {
  return `/previews/${id}.${ext}`
}

export const projectsSeed: ProjectRecord[] = [
  {
    id: 'proj-stravagante',
    slug: 'stravagante-watches',
    title: 'Stravagante Watches',
    summary:
      'Tienda online de relojes de diseño con catálogo, detalle de producto y experiencia de compra cuidada.',
    description:
      'Stravagante es una vitrina digital para relojes de diseño. El sitio prioriza presentación visual del producto, navegación clara del catálogo y un recorrido de compra enfocado en la marca.',
    coverImage: preview('stravagante', 'png'),
    technologies: ['React', 'TypeScript', 'CSS', 'Vite'],
    liveUrl: 'https://www.stravagantewatches.com/',
    featured: true,
    createdAt: Date.parse('2025-11-01'),
    evidence: [
      {
        type: 'image',
        src: preview('stravagante', 'png'),
        alt: 'Captura de Stravagante Watches',
      },
      {
        type: 'video',
        src: 'https://www.stravagantewatches.com/',
        title: 'Demo en vivo — Stravagante',
      },
      {
        type: 'code',
        language: 'tsx',
        content: `export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{formatPrice(product.price)}</p>
      <a href={\`/producto/\${product.slug}\`}>Ver detalle</a>
    </article>
  )
}`,
      },
      {
        type: 'link',
        url: 'https://www.stravagantewatches.com/',
        label: 'Abrir sitio en producción',
      },
    ],
  },
  {
    id: 'proj-life-control',
    slug: 'life-control',
    title: 'Life Control',
    summary:
      'Aplicación web para organizar hábitos, seguimiento personal y control del día a día.',
    description:
      'Life Control concentra herramientas de organización personal en una interfaz limpia. Permite visualizar progreso, gestionar rutinas y mantener el control de actividades cotidianas desde el navegador.',
    coverImage: preview('life-control'),
    technologies: ['React', 'TypeScript', 'Vite', 'Vercel'],
    liveUrl: 'https://life-control-ten.vercel.app/',
    featured: true,
    createdAt: Date.parse('2026-02-15'),
    evidence: [
      {
        type: 'image',
        src: preview('life-control'),
        alt: 'Captura de Life Control',
      },
      {
        type: 'video',
        src: 'https://life-control-ten.vercel.app/',
        title: 'Demo en vivo — Life Control',
      },
      {
        type: 'code',
        language: 'tsx',
        content: `export function HabitProgress({ done, total }: Props) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <section className="habit-progress">
      <header>
        <h2>Progreso del día</h2>
        <span>{percent}%</span>
      </header>
      <div className="habit-progress__bar" style={{ width: \`\${percent}%\` }} />
    </section>
  )
}`,
      },
      {
        type: 'link',
        url: 'https://life-control-ten.vercel.app/',
        label: 'Abrir app en producción',
      },
    ],
  },
  {
    id: 'proj-gym-init',
    slug: 'gym-init',
    title: 'Gym-Init',
    summary:
      'Tracker de entrenamiento para registrar rutinas, seguimiento de progreso y dashboard de actividad.',
    description:
      'Gym-Init es un tracker de entrenamiento con panel de control. Facilita registrar sesiones, revisar el progreso y mantener constancia en la rutina de ejercicio desde una interfaz web.',
    coverImage: preview('gym-init'),
    technologies: ['React', 'TypeScript', 'Vite', 'Vercel'],
    liveUrl: 'https://gyminit-ashen.vercel.app/#dashboard',
    featured: true,
    createdAt: Date.parse('2026-03-10'),
    evidence: [
      {
        type: 'image',
        src: preview('gym-init'),
        alt: 'Captura de Gym-Init',
      },
      {
        type: 'video',
        src: 'https://gyminit-ashen.vercel.app/#dashboard',
        title: 'Demo en vivo — Gym-Init',
      },
      {
        type: 'code',
        language: 'tsx',
        content: `export function WorkoutSummary({ sessions }: { sessions: Session[] }) {
  const totalVolume = sessions.reduce((sum, s) => sum + s.volume, 0)

  return (
    <section className="workout-summary">
      <h2>Resumen semanal</h2>
      <p>{sessions.length} sesiones</p>
      <p>{totalVolume} kg levantados</p>
    </section>
  )
}`,
      },
      {
        type: 'link',
        url: 'https://gyminit-ashen.vercel.app/#dashboard',
        label: 'Abrir Gym-Init',
      },
    ],
  },
  {
    id: 'proj-sleep-cycles',
    slug: 'sleep-cycles',
    title: 'Ciclos de Sueño',
    summary:
      'Herramienta para calcular ciclos de sueño y sugerir horarios de despertar más recuperativos.',
    description:
      'Ciclos de Sueño ayuda a planificar el descanso según ciclos de aproximadamente 90 minutos. La app sugiere horarios de dormir y despertar para mejorar la calidad del sueño.',
    coverImage: preview('sleep-cycles'),
    technologies: ['React', 'TypeScript', 'CSS', 'Vercel'],
    liveUrl: 'https://sleep-cycles-five.vercel.app/',
    featured: true,
    createdAt: Date.parse('2026-01-20'),
    evidence: [
      {
        type: 'image',
        src: preview('sleep-cycles'),
        alt: 'Captura de Ciclos de Sueño',
      },
      {
        type: 'video',
        src: 'https://sleep-cycles-five.vercel.app/',
        title: 'Demo en vivo — Ciclos de Sueño',
      },
      {
        type: 'code',
        language: 'ts',
        content: `const CYCLE_MINUTES = 90

export function suggestWakeTimes(bedtime: Date, cycles = 5): Date[] {
  return Array.from({ length: cycles }, (_, index) => {
    const wake = new Date(bedtime)
    wake.setMinutes(wake.getMinutes() + CYCLE_MINUTES * (index + 1))
    return wake
  })
}`,
      },
      {
        type: 'link',
        url: 'https://sleep-cycles-five.vercel.app/',
        label: 'Abrir Ciclos de Sueño',
      },
    ],
  },
  {
    id: 'proj-contactos',
    slug: 'agenda-de-contactos',
    title: 'Agenda de contactos',
    summary:
      'Aplicación para gestionar contactos con alta, edición, búsqueda y organización de la agenda personal.',
    description:
      'Agenda de contactos permite administrar personas de forma simple: crear, editar y consultar información de contacto desde una interfaz web desplegada en Vercel.',
    coverImage: preview('contactos'),
    technologies: ['React', 'JavaScript', 'CSS', 'Vercel'],
    liveUrl: 'https://aplicacion-de-contactos.vercel.app/',
    featured: true,
    createdAt: Date.parse('2025-09-12'),
    evidence: [
      {
        type: 'image',
        src: preview('contactos'),
        alt: 'Captura de Agenda de contactos',
      },
      {
        type: 'video',
        src: 'https://aplicacion-de-contactos.vercel.app/',
        title: 'Demo en vivo — Agenda de contactos',
      },
      {
        type: 'code',
        language: 'tsx',
        content: `export function ContactList({ contacts, query }: Props) {
  const filtered = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <ul>
      {filtered.map((contact) => (
        <li key={contact.id}>
          <strong>{contact.name}</strong>
          <span>{contact.phone}</span>
        </li>
      ))}
    </ul>
  )
}`,
      },
      {
        type: 'link',
        url: 'https://aplicacion-de-contactos.vercel.app/',
        label: 'Abrir Agenda de contactos',
      },
    ],
  },
  {
    id: 'proj-carro-servizio',
    slug: 'mantenimiento-autos',
    title: 'CarroServizio',
    summary:
      'Garaje digital para registrar vehículos, historial de mantenimiento y recordatorios de servicio.',
    description:
      'CarroServizio funciona como un garaje digital: centraliza el mantenimiento del auto, el historial de servicios y la información útil del vehículo en una sola aplicación web.',
    coverImage: preview('carro-servizio'),
    technologies: ['React', 'TypeScript', 'Vite', 'Vercel'],
    liveUrl: 'https://mantenimiento-autos.vercel.app/',
    featured: true,
    createdAt: Date.parse('2026-04-05'),
    evidence: [
      {
        type: 'image',
        src: preview('carro-servizio'),
        alt: 'Captura de CarroServizio',
      },
      {
        type: 'video',
        src: 'https://mantenimiento-autos.vercel.app/',
        title: 'Demo en vivo — CarroServizio',
      },
      {
        type: 'code',
        language: 'tsx',
        content: `export function ServiceReminder({ vehicle, nextServiceKm }: Props) {
  const remaining = nextServiceKm - vehicle.odometer
  const dueSoon = remaining <= 500

  return (
    <aside className={dueSoon ? 'reminder reminder--urgent' : 'reminder'}>
      <h3>{vehicle.name}</h3>
      <p>Próximo servicio en {remaining} km</p>
    </aside>
  )
}`,
      },
      {
        type: 'link',
        url: 'https://mantenimiento-autos.vercel.app/',
        label: 'Abrir CarroServizio',
      },
    ],
  },
  {
    id: 'proj-portafolio-angelo',
    slug: 'portafolio-angelo',
    title: 'Portafolio Angelo',
    summary:
      'Catálogo personal de páginas web con presentación de proyectos y navegación clara entre casos.',
    description:
      'Portafolio Angelo es una vitrina digital de trabajos web. Organiza proyectos en un catálogo visual para mostrar entregas, demos y el estilo de interfaz de cada producto.',
    coverImage: preview('portafolio-angelo'),
    technologies: ['React', 'TypeScript', 'Vite', 'Vercel'],
    liveUrl: 'https://portafolio-angelo-sage.vercel.app/',
    featured: true,
    createdAt: Date.parse('2026-05-20'),
    evidence: [
      {
        type: 'image',
        src: preview('portafolio-angelo'),
        alt: 'Captura de Portafolio Angelo',
      },
      {
        type: 'video',
        src: 'https://portafolio-angelo-sage.vercel.app/',
        title: 'Demo en vivo — Portafolio Angelo',
      },
      {
        type: 'code',
        language: 'tsx',
        content: `export function ProjectCatalog({ projects }: { projects: Project[] }) {
  return (
    <section className="catalog">
      <h1>Catálogo de páginas web</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <a href={project.url}>{project.title}</a>
          </li>
        ))}
      </ul>
    </section>
  )
}`,
      },
      {
        type: 'link',
        url: 'https://portafolio-angelo-sage.vercel.app/',
        label: 'Abrir Portafolio Angelo',
      },
    ],
  },
]
