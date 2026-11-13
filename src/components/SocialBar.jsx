import { BUSINESS, waLink, mapsLink, gmailLink } from '../data/business'

// Official brand marks, drawn inline so they load with the page (no third-party requests).
const Instagram = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <defs>
      <radialGradient id="sk-ig-grad" cx="30%" cy="107%" r="150%">
        <stop offset="0" stopColor="#fdf497" /><stop offset=".05" stopColor="#fdf497" />
        <stop offset=".45" stopColor="#fd5949" /><stop offset=".6" stopColor="#d6249f" /><stop offset=".9" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect width="48" height="48" rx="12" fill="url(#sk-ig-grad)" />
    <rect x="11" y="11" width="26" height="26" rx="8" fill="none" stroke="#fff" strokeWidth="3" />
    <circle cx="24" cy="24" r="6.2" fill="none" stroke="#fff" strokeWidth="3" />
    <circle cx="31.6" cy="16.4" r="1.9" fill="#fff" />
  </svg>
)
const WhatsApp = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)
const Maps = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#34A853" d="M35.76 26.36h.01s-3.77 5.53-6.94 9.64c-2.74 3.55-3.54 6.59-3.77 8.06-.09.54-.53.94-1.06.94s-.97-.4-1.06-.94c-.23-1.47-1.03-4.51-3.77-8.06-.42-.55-.85-1.12-1.28-1.7L28.24 22l8.33-9.88A14.4 14.4 0 0 1 38 18.5c0 2.9-.83 5.59-2.24 7.86z" />
    <path fill="#FBBC04" d="M28.24 22 17.89 34.3c-2.82-3.78-5.66-7.94-5.66-7.94h.01c-.3-.48-.57-.97-.8-1.48L19.76 15a5.48 5.48 0 0 0-1.26 3.5c0 3.04 2.46 5.5 5.5 5.5 1.71 0 3.24-.78 4.24-2z" />
    <path fill="#1A73E8" d="m28.4 4.74-8.57 10.18-6.56-5.72A14.5 14.5 0 0 1 24 4c1.54 0 3.02.26 4.4.74z" />
    <path fill="#EA4335" d="m19.83 14.92-.07.08-8.32 9.88A14.4 14.4 0 0 1 10 18.5c0-3.54 1.23-6.79 3.27-9.3l6.56 5.72z" />
    <path fill="#4285F4" d="M28.24 22a5.48 5.48 0 0 0 1.26-3.5c0-3.04-2.46-5.5-5.5-5.5-1.71 0-3.24.78-4.24 1.98l8.64-10.24a14.5 14.5 0 0 1 8.17 7.38L28.24 22z" />
  </svg>
)
const Google = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FBBC05" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#EA4335" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#34A853" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
)
const Gmail = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#34A853" d="m45 16.2-5 2.75-5 4.75V40h7a3 3 0 0 0 3-3V16.2z" />
    <path fill="#4285F4" d="m3 16.2 3.614 1.71L13 23.7V40H6a3 3 0 0 1-3-3V16.2z" />
    <path fill="#EA4335" d="M35 11.2 24 19.45 13 11.2 12 17l1 6.7 11 8.25 11-8.25L36 17z" />
    <path fill="#C5221F" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859A4.3 4.3 0 0 0 7.298 8 4.298 4.298 0 0 0 3 12.298z" />
    <path fill="#FBBC04" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341A4.3 4.3 0 0 1 40.702 8 4.298 4.298 0 0 1 45 12.298z" />
  </svg>
)

const LINKS = [
  { name: 'Instagram', note: BUSINESS.instagramHandle, href: BUSINESS.instagram, Icon: Instagram },
  { name: 'WhatsApp', note: 'Chat with us', href: waLink(), Icon: WhatsApp },
  { name: 'Google Maps', note: 'Get directions', href: mapsLink, Icon: Maps },
  { name: 'Google', note: 'Reviews and profile', href: BUSINESS.googleProfile, Icon: Google },
  { name: 'Gmail', note: 'Email us', href: gmailLink, Icon: Gmail },
]

export default function SocialBar({ className = '' }) {
  return (
    <section className={`social-bar ${className}`} aria-labelledby="social-bar-h">
      <div className="wrap social-bar-inner">
        <div className="social-bar-head">
          <p className="editorial-eyebrow"><span /> Our socials</p>
          <h2 id="social-bar-h">Find us and follow along</h2>
        </div>
        <ul className="social-bar-list">
          {LINKS.map(({ name, note, href, Icon }) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name}: ${note} (opens in a new tab)`}>
                <span className="social-bar-icon"><Icon /></span>
                <span className="social-bar-text"><strong>{name}</strong><small>{note}</small></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
