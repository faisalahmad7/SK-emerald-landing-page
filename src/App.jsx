import { useEffect } from 'react'
import { Router, useRouter } from './router'
import { Header, Footer, WhatsAppFab } from './components/Layout'
import GsapReveals from './components/GsapReveals'
import Home from './pages/Home'
import { Collections, Collection } from './pages/Collections'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import { Interiors, Materials, Faq, Privacy, NotFound } from './pages/Info'
import { About, Reviews } from './pages/About'
import { Blog, BlogPost } from './pages/Blog'
import { bySlug } from './data/collections'
import { roomBySlug } from './data/rooms'
import { postBySlug } from './content/posts'
import { Room } from './pages/Room'

// Old URLs that moved (the host also answers these with a 301 via public/_redirects).
const MOVED = { '/collections/office-spaces': '/interiors/office-spaces', '/interiors/kitchen': '/interiors/modular-kitchen' }

function Redirect({ to }) {
  const { go } = useRouter()
  useEffect(() => { go(to, { replace: true }) }, [to])
  return null
}

// The intro curtain is plain HTML/CSS in index.html (once per visit, no sound), so it never delays React.
function Routes() {
  const { path } = useRouter()
  if (MOVED[path]) return <Redirect to={MOVED[path]} />
  const m = path.match(/^\/collections\/([^/]+)$/)
  if (m) return bySlug(m[1]) ? <Collection slug={m[1]} /> : <NotFound />
  const rm = path.match(/^\/interiors\/([^/]+)$/)
  if (rm) return roomBySlug(rm[1]) ? <Room slug={rm[1]} /> : <NotFound />
  const bm = path.match(/^\/blog\/([^/]+)$/)
  if (bm) return postBySlug(bm[1]) ? <BlogPost slug={bm[1]} /> : <NotFound />
  switch (path) {
    case '/': return <Home />
    case '/collections': return <Collections />
    case '/interiors': return <Interiors />
    case '/gallery': return <Gallery set="work" />
    case '/design-ideas': return <Gallery set="inspiration" />
    case '/about': return <About />
    case '/reviews': return <Reviews />
    case '/blog': return <Blog />
    case '/materials': return <Materials />
    case '/contact': return <Contact />
    case '/faq': return <Faq />
    case '/privacy': return <Privacy />
    default: return <NotFound />
  }
}

export default function App({ path }) {
  return (
    <Router initialPath={path}>
      <Header />
      <main id="main" tabIndex={-1}><Routes /></main>
      <GsapReveals />
      <Footer />
      <WhatsAppFab />
    </Router>
  )
}
