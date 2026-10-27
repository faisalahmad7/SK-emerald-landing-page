import { Router, useRouter } from './router'
import { Header, Footer, WhatsAppFab } from './components/Layout'
import GsapReveals from './components/GsapReveals'
import Home from './pages/Home'
import { Collections, Collection } from './pages/Collections'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import { Interiors, About, Materials, Faq, Privacy, NotFound } from './pages/Info'
import { bySlug } from './data/collections'

function Routes() {
  const { path } = useRouter()
  const m = path.match(/^\/collections\/([^/]+)$/)
  if (m) return bySlug(m[1]) ? <Collection slug={m[1]} /> : <NotFound />
  switch (path) {
    case '/': return <Home />
    case '/collections': return <Collections />
    case '/interiors': return <Interiors />
    case '/gallery': return <Gallery />
    case '/about': return <About />
    case '/materials': return <Materials />
    case '/contact': return <Contact />
    case '/faq': return <Faq />
    case '/privacy': return <Privacy />
    default: return <NotFound />
  }
}
export default function App() {
  return (
    <Router>
      <Header />
      <main id="main" tabIndex={-1}><Routes /></main>
      <GsapReveals />
      <Footer />
      <WhatsAppFab />
    </Router>
  )
}
