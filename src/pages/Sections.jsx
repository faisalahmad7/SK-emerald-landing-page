// Small shared page sections. They reuse the existing `.options` and `.faq` styles so they match the site.

// Quick facts: a definition list that is easy to scan (and easy for search engines and AI tools to quote).
export function Facts({ title, facts }) {
  return (
    <section className="wrap options facts" aria-label={title}>
      <h2>{title}</h2>
      <dl>{facts.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
    </section>
  )
}

// Visible FAQs. The same list is passed to <Seo faqs={...}> so the FAQPage markup always matches what is on the page.
export function FaqList({ title = 'Common questions', faqs }) {
  return (
    <section className="wrap faq page-faq">
      <h2>{title}</h2>
      {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
    </section>
  )
}
