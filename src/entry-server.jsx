// Build-time renderer: scripts/prerender.mjs calls render(path) for every route and writes the HTML into dist/.
import { renderToString } from 'react-dom/server'
import App from './App'
import { HeadContext } from './components/ui'
import { renderHead } from './seo/head'
import { preloadAllPosts } from './content/posts'
import { POSTS } from './content/posts'
import { BUSINESS } from './data/business'
import { SITE_URL, CONTENT_UPDATED } from './seo/site'

export { routeList, lastModified } from './routes'
export { preloadAllPosts, renderHead, POSTS, BUSINESS, SITE_URL, CONTENT_UPDATED }

export function render(path) {
  const collector = {}
  const html = renderToString(
    <HeadContext.Provider value={collector}>
      <App path={path} />
    </HeadContext.Provider>,
  )
  if (!collector.meta) throw new Error(`No <Seo> rendered for ${path}`)
  return { html, meta: collector.meta }
}
