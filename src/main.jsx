import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { preloadRoute } from './routes'
import './fonts.css'
import './styles.css'
import './styles-premium.css'
import './styles-editorial.css'
import './styles-homepage-ribbon-contact.css'
import './styles-transformation.css'
import './styles-seo.css'

// The `js` class (which enables the scroll reveals) is added by an inline script in index.html before first paint.
// Pre-rendered pages are hydrated; the dev server (empty #root) renders from scratch.
const root = document.getElementById('root')
const start = () => {
  if (root.hasChildNodes()) hydrateRoot(root, <App />)
  else createRoot(root).render(<App />)
  window.__skHydrated = true
}
preloadRoute(window.location.pathname).then(start, start)
