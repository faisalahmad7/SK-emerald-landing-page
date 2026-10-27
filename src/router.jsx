import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// Small History-API router: no dependency, direct URLs and refresh work (host must rewrite to index.html).
const Ctx = createContext({ path: '/', go: () => {} })
const clean = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/'

export function Router({ children }) {
  const [path, setPath] = useState(() => clean(window.location.pathname))
  const go = useCallback((to) => {
    const [p, hash] = to.split('#')
    if (clean(p) !== path) window.history.pushState({}, '', to)
    setPath(clean(p))
    requestAnimationFrame(() => {
      const el = hash && document.getElementById(hash)
      if (el) el.scrollIntoView()
      else { window.scrollTo(0, 0); document.getElementById('main')?.focus({ preventScroll: true }) }
    })
  }, [path])
  useEffect(() => {
    const on = () => { setPath(clean(window.location.pathname)); window.scrollTo(0, 0) }
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
