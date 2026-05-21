import { Link } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import Logo from './Logo'

export default function Footer() {
  const { locale, t } = useI18n()
  const f = t.footer

  return (
    <footer className="border-t hairline mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4 flex flex-col gap-4">
          <Link to="/$locale" params={{ locale }} className="text-text inline-block" aria-label="Arti Studio">
            <Logo size="sm" />
          </Link>
          <p className="text-sm text-muted">
            {f.tagline}
          </p>
        </div>

        <div className="md:col-span-3 flex flex-col gap-3">
          <p className="eyebrow flex items-center gap-2">
            <PinIcon /> {f.addressLabel}
          </p>
          <p className="text-sm">{f.address}</p>
          <p className="text-xs text-muted-2">
            {f.hours}
          </p>
        </div>

        <div className="md:col-span-3 flex flex-col gap-3">
          <p className="eyebrow flex items-center gap-2">
            <PhoneIcon /> {f.phoneLabel}
          </p>
          <a href={`tel:${f.phone.replace(/\s/g, '')}`} className="text-sm hover:text-accent transition-colors">
            {f.phone}
          </a>
          <a href={`tel:${f.phoneAlt.replace(/\s/g, '')}`} className="text-sm hover:text-accent transition-colors">
            {f.phoneAlt}
          </a>
          <p className="eyebrow flex items-center gap-2 mt-2">
            <MailIcon /> {f.emailLabel}
          </p>
          <a href={`mailto:${f.email}`} className="text-sm hover:text-accent transition-colors break-all">
            {f.email}
          </a>
          <a href={`mailto:${f.emailAlt}`} className="text-sm hover:text-accent transition-colors break-all">
            {f.emailAlt}
          </a>
        </div>

        <div className="md:col-span-2 flex flex-col gap-3">
          <p className="eyebrow">{f.socialLabel}</p>
          <div className="flex gap-3">
            <SocialIcon href="https://www.facebook.com/profile.php?id=100089499761060" label="Facebook">
              <FacebookIcon />
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com/arti_studio_design/" label="Instagram">
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon href="https://www.youtube.com/watch?v=uySn1BZiWWs" label="YouTube">
              <YoutubeIcon />
            </SocialIcon>
          </div>
        </div>
      </div>

      <div className="border-t hairline-soft">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-xs text-muted-2" suppressHydrationWarning>
            {f.rights.replace('{year}', String(new Date().getFullYear()))}
          </p>
          <Link
            to="/$locale/confidentialitate"
            params={{ locale }}
            className="text-xs text-muted-2 hover:text-accent transition-colors"
          >
            {t.nav.confidentialitate}
          </Link>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 inline-flex items-center justify-center hairline-frame hover:border-accent hover:text-accent transition-colors"
    >
      {children}
    </a>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.4-1.5 1.5-1.5H17V2.2C16.6 2.1 15.3 2 14 2c-2.8 0-4 1.7-4 4v4H7v4h3v8h3Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2c-.2-1-1-1.8-2-2C17.8 5 12 5 12 5s-5.8 0-7.6.2c-1 .2-1.8 1-2 2C2 9 2 12 2 12s0 3 .4 4.8c.2 1 1 1.8 2 2 1.8.2 7.6.2 7.6.2s5.8 0 7.6-.2c1-.2 1.8-1 2-2 .4-1.8.4-4.8.4-4.8s0-3-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  )
}
