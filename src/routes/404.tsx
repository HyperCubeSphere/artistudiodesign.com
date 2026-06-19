import { createFileRoute } from '@tanstack/react-router'
import { NotFoundWithUrlLocale } from '../components/NotFound'

export const Route = createFileRoute('/404')({
  component: NotFoundPage,
  head: () => ({
    meta: [{ title: '404 — Arti Studio' }],
  }),
})

function NotFoundPage() {
  return <NotFoundWithUrlLocale />
}
