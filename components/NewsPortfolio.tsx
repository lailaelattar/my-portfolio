"use client"

import { useRef, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import { sections, stories, type SectionId } from "./news-data"

function readSection(): SectionId {
  const hash = window.location.hash.slice(1)
  return sections.some(section => section.id === hash) ? hash as SectionId : "work"
}
function subscribe(listener: () => void) {
  window.addEventListener("hashchange", listener)
  return () => window.removeEventListener("hashchange", listener)
}

export default function NewsPortfolio() {
  const section = useSyncExternalStore(subscribe, readSection, () => "work" as SectionId)
  const [selection, setSelection] = useState("")
  const [filters, setFilters] = useState({ section, category: "All", query: "" })
  const [searchOpen, setSearchOpen] = useState(false)
  const articleRef = useRef<HTMLElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const current = sections.find(item => item.id === section)!
  const category = filters.section === section ? filters.category : "All"
  const query = filters.section === section ? filters.query : ""
  const categories = ["All", ...new Set(stories[section].map(story => story.category))]
  const filtered = stories[section].filter(story => (category === "All" || story.category === category) && `${story.title} ${story.source} ${story.summary} ${story.tags?.join(" ") ?? ""}`.toLowerCase().includes(query.toLowerCase()))
  const story = filtered.find(item => item.id === selection) ?? filtered[0]

  const navigate = (id: SectionId) => {
    window.location.hash = id
    setFilters({ section: id, category: "All", query: "" })
    setSelection("")
  }
  const step = (direction: number) => navigate(sections[(sections.findIndex(item => item.id === section) + direction + sections.length) % sections.length].id)

  return (
    <div className="news-screen">
      <main className="news-paper" aria-label="Laila El Attar’s portfolio">
        <header className="news-masthead">
          <span className="news-edition">The personal edition</span>
          <a href="#about-me" className="news-name">Laila El Attar</a>
          <a className="news-header-link" href="mailto:laylaattar@live.com">Let’s talk <ArrowUpRight size={12} aria-hidden="true" /></a>
        </header>
        <div className="news-toolbar">
          <span className="news-monogram" aria-hidden="true">LE</span>
          <span className="news-toolbar-title">Portfolio index</span>
          <span className="news-current-section">{current.label}</span>
          <a href="/Laila El attar Resume.pdf" target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={12} aria-hidden="true" /></a>
          <button type="button" className="news-search-toggle" aria-expanded={searchOpen} aria-label={searchOpen ? "Close search" : "Search this section"} onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setFilters({ section, category, query: "" }); else requestAnimationFrame(() => searchRef.current?.focus()) }}>
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>
        </div>
        <nav className="news-sections" aria-label="Portfolio sections">
          <button className="news-nav-step" type="button" onClick={() => step(-1)} aria-label="Previous section"><ChevronLeft size={18} /></button>
          <div className="news-section-links">
            {sections.map(item => <a href={`#${item.id}`} key={item.id} aria-current={item.id === section ? "page" : undefined} onClick={event => { event.preventDefault(); navigate(item.id) }}>{item.label}<span aria-hidden="true">·</span></a>)}
          </div>
          <button className="news-nav-step" type="button" onClick={() => step(1)} aria-label="Next section"><ChevronRight size={18} /></button>
        </nav>
        {searchOpen && <form className="news-search" role="search" onSubmit={event => event.preventDefault()}><label htmlFor="portfolio-search">Search {current.label.toLowerCase()}</label><input ref={searchRef} id="portfolio-search" type="search" value={query} placeholder="Title, topic, or organization…" onChange={event => setFilters({ section, category, query: event.target.value })} /><span>{filtered.length} results</span></form>}
        <div className="news-workspace">
          <aside className="news-topics" aria-label="Filter by topic">
            <p className="news-small-label">Browse</p>
            {categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setFilters({ section, category: item, query })}>{item}<span aria-hidden="true">{category === item ? "●" : ""}</span></button>)}
            <p className="news-sidebar-note">Software.<br />Research.<br />Media.<br /><span>One curious mind.</span></p>
          </aside>
          <section className="news-story-list" aria-label={`${current.label} stories`}>
            {filtered.length ? filtered.map(item => <button type="button" className="news-story" key={item.id} aria-controls="selected-article" aria-pressed={story?.id === item.id} onClick={() => {
              setSelection(item.id)
              if (window.matchMedia("(max-width: 760px)").matches) requestAnimationFrame(() => articleRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }))
            }}>
              {item.image ? <div className="news-thumb"><Image src={item.image} alt="" fill sizes="140px" /></div> : <div className="news-type-thumb" aria-hidden="true">{item.source.split(" ").slice(0, 2).map(word => word[0]).join("")}</div>}
              <div><h2>{item.title}</h2><p>{item.summary}</p><span className="news-story-source">{item.source}</span></div>
            </button>) : <div className="news-empty"><h2>No stories found.</h2><p>Try a different search or topic.</p><button type="button" onClick={() => setFilters({ section, category: "All", query: "" })}>Show all {current.label.toLowerCase()}</button></div>}
            <div className="news-list-end">End of this section <span aria-hidden="true">◇</span></div>
          </section>
          <article key={`${section}-${story?.id ?? "empty"}`} id="selected-article" ref={articleRef} className="news-article" aria-label="Selected story" tabIndex={0}>
            {story ? <div key={`${section}-${story.id}`} className="news-article-content">
              {story.image && <figure className={`news-hero-image ${story.id === "profile" ? "news-portrait" : ""}`}><Image src={story.image} alt={story.imageAlt ?? story.source} fill sizes="(max-width: 760px) 90vw, 650px" priority={story.id === "lens"} /></figure>}
              <div className="news-story-meta"><span>{story.category}</span><span>{story.source}</span></div>
              <h1>{story.title}</h1>
              {story.date && <p className="news-dateline">{story.date}</p>}
              <p className="news-deck">{story.summary}</p>
              <div className="news-article-body">{story.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
              {story.tags && <ul className="news-tags" aria-label="Skills and tools">{story.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
              {story.link && <a className="news-read-link" href={story.link} target={story.link.startsWith("http") || /\.(pdf|mov)$/.test(story.link) ? "_blank" : undefined} rel="noopener noreferrer">{story.linkLabel ?? "Read more"}<ArrowUpRight size={17} aria-hidden="true" /></a>}
              <div className="news-article-end"><span>Selected from {current.label.toLowerCase()}</span><span aria-hidden="true">LE / Portfolio</span></div>
            </div> : <div className="news-empty"><p>Select another topic or clear your search to continue reading.</p></div>}
          </article>
          <div className="news-scroll-note" aria-hidden="true"><span>Scroll to read</span><ArrowDown size={21} /></div>
        </div>
        <footer className="news-footer"><span>Laila El Attar / Portfolio</span><a href="mailto:laylaattar@live.com">laylaattar@live.com <ArrowUpRight size={11} aria-hidden="true" /></a></footer>
      </main>
    </div>
  )
}
