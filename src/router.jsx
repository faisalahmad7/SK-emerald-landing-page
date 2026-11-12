import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

// Small History-API router: no dependency, direct URLs and refresh work (host must rewrite to index.html).
const Ctx = createContext({ path: '/', go: () => {} })
const clean = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/'

// `initialPath` is passed when pages are pre-rendered at build time (there is no window there).
export function Router({ children, initialPath }) {
  const [path, setPath] = useState(() => initialPath ?? clean(window.location.pathname))
  const current = useRef(path)
  current.current = path
  const go = useCallback((to, { replace = false } = {}) => {
    const [p, hash] = to.split('#')
    if (replace) window.history.replaceState({}, '', to)
    else if (clean(p) !== path) window.history.pushState({}, '', to)
    setPath(clean(p))
    requestAnimationFrame(() => {
      const el = hash && document.getElementById(hash)
      if (el) el.scrollIntoView()
      else { window.scrollTo(0, 0); document.getElementById('main')?.focus({ preventScroll: true }) }
    })
  }, [path])
  useEffect(() => {
    // Back/forward between pages scrolls to the top; in-page jumps (#section links) keep the browser's own scroll.
    const on = () => { const p = clean(window.location.pathname); if (p !== current.current) window.scrollTo(0, 0); setPath(p) }
    window.addEventListener('popstate', on)
    return () => window.removeEventListener('popstate', on)
  }, [])
  return <Ctx.Provider value={{ path, go }}>{children}</Ctx.Provider>
}
export const useRouter = () => useContext(Ctx)

export function Link({ to, children, onClick, ...rest }) {
  const { go } = useRouter()
  const external = /^(https?:|tel:|mailto:)/.test(to)
  if (external) return <a href={to} onClick={onClick} {...rest}>{children}</a>
  return (
    <a href={to} {...rest} onClick={(e) => {
      onClick?.(e)
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target) return
      e.preventDefault(); go(to)
    }}>{children}</a>
  )
}
export function NavLink({ to, className = '', ...rest }) {
  const { path } = useRouter()
  const on = path === to || (to !== '/' && path.startsWith(to + '/'))
  return <Link to={to} className={`${className}${on ? ' on' : ''}`} aria-current={on ? 'page' : undefined} {...rest} />
}
