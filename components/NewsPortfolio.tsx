"use client"

import { useRef, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import PersonalityTicker from "./PersonalityTicker"
import { ArrowUpRight, ChevronLeft, ChevronRight, FileText, Laptop, Mail, Search, X } from "lucide-react"
import { sections, stories, type SectionId } from "./news-data"

function ContactIcon({ kind }: { kind: "email" | "linkedin" | "resume" }) {
  const Icon = { email: Mail, linkedin: Laptop, resume: FileText }[kind]
  return <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
}

function readSection(): SectionId {
  const hash = window.location.hash.slice(1)
  return sections.some(section => section.id === hash) ? hash as SectionId : "about-me"
}
function subscribe(listener: () => void) {
  window.addEventListener("hashchange", listener)
  return () => window.removeEventListener("hashchange", listener)
}

export default function NewsPortfolio({ onReturnToIntro }: { onReturnToIntro?: () => void }) {
  const section = useSyncExternalStore(subscribe, readSection, () => "about-me" as SectionId)
  const [selection, setSelection] = useState("")
  const [filters, setFilters] = useState({ section, category: "All", query: "" })
  const [searchOpen, setSearchOpen] = useState(false)
  const articleRef = useRef<HTMLElement>(null)
  const workspaceRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const current = sections.find(item => item.id === section)!
  const category = filters.section === section ? filters.category : "All"
  const query = filters.section === section ? filters.query : ""
  const categories = section === "experience" ? ["All", "Work", "Extracurricular"] : ["All", ...new Set(stories[section].map(story => story.category))]
  const filtered = stories[section].filter(story => (category === "All" || (section === "experience" ? story.experienceType : story.category) === category) && `${story.title} ${story.role ?? ""} ${story.source} ${story.date ?? ""} ${story.experienceType ?? ""} ${story.summary} ${story.tags?.join(" ") ?? ""}`.toLowerCase().includes(query.toLowerCase()))
  const story = filtered.find(item => item.id === selection) ?? filtered[0]

  const selectStory = (id: string) => {
    setSelection(id)
    requestAnimationFrame(() => {
      articleRef.current?.scrollTo({ top: 0, behavior: "instant" })
      // Scroll only the mobile reading pane. scrollIntoView also moves the
      // outer intro timeline and can make the entire portfolio inert.
      const workspace = workspaceRef.current
      const article = articleRef.current
      if (workspace && article && window.matchMedia("(max-width: 760px)").matches) {
        workspace.scrollTo({ top: workspace.scrollTop + article.getBoundingClientRect().top - workspace.getBoundingClientRect().top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })
      }
    })
  }
  const navigate = (id: SectionId, storyId = "") => {
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`)
      window.dispatchEvent(new HashChangeEvent("hashchange"))
    }
    setFilters({ section: id, category: "All", query: "" })
    setSelection(storyId)
    requestAnimationFrame(() => {
      workspaceRef.current?.scrollTo({ top: 0, behavior: "instant" })
      listRef.current?.scrollTo({ top: 0, behavior: "instant" })
      articleRef.current?.scrollTo({ top: 0, behavior: "instant" })
    })
  }
  const step = (direction: number) => navigate(sections[(sections.findIndex(item => item.id === section) + direction + sections.length) % sections.length].id)

  return (
    <div className="news-screen">
      <main className="news-paper" aria-label="Laila El Attar’s portfolio">
        <header className="news-masthead">
          {onReturnToIntro ? <button type="button" className="news-edition news-return-intro" onClick={onReturnToIntro}>← Back to the couch</button> : <span className="news-edition">The personal edition</span>}
          <a href="#about-me" className="news-name" onClick={event => { event.preventDefault(); navigate("about-me") }}>Laila El Attar</a>
          <div className="news-header-actions">
            <a className="news-header-link" href="/Laila El attar Resume.pdf" target="_blank" rel="noopener noreferrer"><FileText size={14} aria-hidden="true" />Résumé <ArrowUpRight size={12} aria-hidden="true" /></a>
          <button type="button" className="news-search-toggle" aria-expanded={searchOpen} aria-label={searchOpen ? "Close search" : "Search this section"} onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setFilters({ section, category, query: "" }); else requestAnimationFrame(() => searchRef.current?.focus()) }}>
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>
          </div>
        </header>
        <PersonalityTicker />
        <nav className="news-sections" aria-label="Portfolio sections">
          <button className="news-nav-step" type="button" onClick={() => step(-1)} aria-label="Previous section"><ChevronLeft size={18} /></button>
          <div className="news-section-links">
            {sections.map(item => <a href={`#${item.id}`} key={item.id} aria-current={item.id === section ? "page" : undefined} onClick={event => { event.preventDefault(); navigate(item.id) }}>{item.label}<span aria-hidden="true">·</span></a>)}
          </div>
          <button className="news-nav-step" type="button" onClick={() => step(1)} aria-label="Next section"><ChevronRight size={18} /></button>
        </nav>
        {searchOpen && <form className="news-search" role="search" onSubmit={event => event.preventDefault()}><label htmlFor="portfolio-search">Search {current.label.toLowerCase()}</label><input ref={searchRef} id="portfolio-search" type="search" value={query} placeholder="Title, topic, or organization…" onChange={event => setFilters({ section, category, query: event.target.value })} /><span>{filtered.length} results</span></form>}
        <div ref={workspaceRef} className="news-workspace">
          <aside className="news-topics" aria-label="Filter by topic">
            <p className="news-small-label">Browse</p>
            {categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setFilters({ section, category: item, query })}>{item}<span aria-hidden="true">{category === item ? "●" : ""}</span></button>)}
          </aside>
          <section ref={listRef} className="news-story-list" aria-label={`${current.label} stories`}>
            {filtered.length ? filtered.map(item => <button type="button" className="news-story" key={item.id} aria-controls="selected-article" aria-pressed={story?.id === item.id} onClick={() => selectStory(item.id)}>
              {item.icon ? <div className="news-contact-thumb" aria-hidden="true"><ContactIcon kind={item.icon} /></div> : item.image && !item.experienceType ? <div className="news-thumb"><Image src={item.image} alt="" fill sizes="(max-width: 760px) 130px, (max-width: 1000px) 140px, 220px" /></div> : <div className="news-type-thumb news-organization-thumb" aria-hidden="true">{item.organization ?? item.source}</div>}
              <div>
                {item.experienceType && <div className="news-experience-meta"><span>{item.experienceType}</span>{item.date && <span>{item.date}</span>}</div>}
                <h2>{item.role ?? item.title}</h2>{item.date && !item.experienceType && <span className="news-story-source">{item.date}</span>}<p>{item.summary}</p><span className="news-story-source">{item.source}</span>
              </div>
            </button>) : <div className="news-empty"><h2>No stories found.</h2><p>Try a different search or topic.</p><button type="button" onClick={() => setFilters({ section, category: "All", query: "" })}>Show all {current.label.toLowerCase()}</button></div>}
            <div className="news-list-end">End of this section <span aria-hidden="true">◇</span></div>
          </section>
          <article key={`${section}-${story?.id ?? "empty"}`} id="selected-article" ref={articleRef} className="news-article" aria-label="Selected story" tabIndex={0}>
            {story ? <div key={`${section}-${story.id}`} className="news-article-content">
              {story.icon && <div className="news-contact-badge"><ContactIcon kind={story.icon} /></div>}
              {story.image && !story.experienceType && <figure className={`news-hero-image ${story.id === "profile" ? "news-portrait" : ""}`}><Image src={story.image} alt={story.imageAlt ?? story.source} fill sizes="(max-width: 760px) 100vw, 65vw" priority={story.id === "lens"} /></figure>}
              <div className="news-story-meta"><span>{story.experienceType ?? story.category}</span><span>{story.source}</span></div>
              <h1>{story.role ?? story.title}</h1>
              {story.date && <p className="news-dateline">{story.date}</p>}
              <p className="news-deck">{story.summary}</p>
              <div className="news-article-body">{story.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
              {story.id === "profile" && <nav className="news-contact-shortcuts" aria-label="Connect with Laila">
                {["linkedin", "resume", "email"].map(id => {
                  const item = stories.contact.find(contact => contact.id === id)!
                  return <a key={id} href={item.link} target={id === "email" ? undefined : "_blank"} rel="noopener noreferrer">
                    <span className="news-contact-badge"><ContactIcon kind={item.icon!} /></span><span>{item.source}</span>
                  </a>
                })}
              </nav>}
              {story.highlights && <section className="news-more news-selected-work" aria-label="Selected work">
                <h2>Start with the work</h2>
                <div>{story.highlights.map(item => <button type="button" key={item.storyId} onClick={() => navigate(item.section, item.storyId)}>
                  <h3>{item.label}</h3><span>{item.detail}</span><ArrowUpRight size={17} aria-hidden="true" />
                </button>)}</div>
              </section>}
              {story.caseStudy && <div className="news-case-study">{story.caseStudy.map(part => <section key={part.heading}>
                <h2>{part.heading}</h2><p>{part.text}</p>
              </section>)}</div>}
              {story.tags && <ul className="news-tags" aria-label="Skills and tools">{story.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
              {story.link && <a className="news-read-link" href={story.link} target={story.link.startsWith("http") || /\.(pdf|mov)$/.test(story.link) ? "_blank" : undefined} rel="noopener noreferrer">{story.linkLabel ?? "Read more"}<ArrowUpRight size={17} aria-hidden="true" /></a>}
              {filtered.length > 1 && <section className="news-more" aria-label="More in this section">
                <h2>Continue exploring</h2>
                <div>{filtered.filter(item => item.id !== story.id).slice(0, 2).map(item => <button type="button" key={item.id} onClick={() => selectStory(item.id)}>
                  <span>{item.source}</span><h3>{item.role ?? item.title}</h3><ArrowUpRight size={17} aria-hidden="true" />
                </button>)}</div>
              </section>}
              <div className="news-article-end"><span>Selected from {current.label.toLowerCase()}</span><span aria-hidden="true">LE / Portfolio</span></div>
            </div> : <div className="news-empty"><p>Select another topic or clear your search to continue reading.</p></div>}
          </article>
        </div>
        <footer className="news-footer"><span>Laila El Attar / Portfolio</span><a href="mailto:laylaattar@live.com"><Mail size={12} aria-hidden="true" />laylaattar@live.com <ArrowUpRight size={11} aria-hidden="true" /></a></footer>
      </main>
    </div>
  )
}
