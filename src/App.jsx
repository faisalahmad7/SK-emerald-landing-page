import { Suspense, useEffect } from 'react'
import { Router, useRouter } from './router'
import { Header, Footer, WhatsAppFab } from './components/Layout'
import GsapReveals from './components/GsapReveals'
import { MOVED, PAGES, pageFor, preloadRoute } from './routes'

function Redirect({ to }) {
  const { go } = useRouter()
  useEffect(() => { go(to, { replace: true }) }, [to])
  return null
}

// The intro curtain is plain HTML/CSS in index.html (once per visit, no sound), so it never delays React.
// Page chunks are loaded before they render (preloadRoute), so this never suspends in practice.
function Routes() {
  const { path } = useRouter()
  if (MOVED[path]) return <Redirect to={MOVED[path]} />
  const [key, name, props] = pageFor(path)
  const mod = PAGES[key].get()
  if (!mod) throw PAGES[key].load()
  const Page = mod[name]
  return <Page {...props} />
}

export default function App({ path }) {
  return (
    <Router initialPath={path} preload={preloadRoute}>
      <Header />
      <main id="main" tabIndex={-1}><Suspense fallback={null}><Routes /></Suspense></main>
      <GsapReveals />
      <Footer />
      <WhatsAppFab />
    </Router>
  )
}
