"use client"

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type MouseEvent } from "react"
import Image from "next/image"
import PersonalityTicker from "./PersonalityTicker"
import { ArrowUpRight, FileText, Laptop, Mail, Zap } from "lucide-react"
import { sections, stories, type SectionId, type Story } from "./news-data"

function OrganizationLogo({ story }: { story: Story }) {
  const clipId = useId()
  const label = `${story.organization ?? story.source} logo`
  // Trim display margins while keeping original image files unchanged.
  if (story.logoCrop) {
    const [x, y, width, height] = story.logoCrop.viewBox.split(" ").map(Number)
    return <svg viewBox={story.logoCrop.viewBox} role="img" aria-label={label}>
      <defs><clipPath id={clipId}>{story.logoCrop.clipPath ? <path d={story.logoCrop.clipPath} /> : <rect x={x} y={y} width={width} height={height} />}</clipPath></defs>
      <image href={story.logo} width={story.logoCrop.width} height={story.logoCrop.height} clipPath={`url(#${clipId})`} />
    </svg>
  }
  return <Image src={story.logo!} alt={label} fill sizes="(max-width: 760px) 120px, 220px" />
}

function ContactIcon({ kind }: { kind: NonNullable<Story["icon"]> }) {
  const Icon = { email: Mail, linkedin: Laptop, resume: FileText, electricity: Zap }[kind]
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

function topicFor(story: Story, section: SectionId) {
  if (section === "experience") return story.experienceType ?? story.category
  if (section === "contact") return story.source
  return story.category
}

export default function NewsPortfolio({ onReturnToIntro }: { onReturnToIntro?: () => void }) {
  const section = useSyncExternalStore(subscribe, readSection, () => "about-me" as SectionId)
  const [position, setPosition] = useState({ section, topic: "", storyId: "" })
  const articleRef = useRef<HTMLElement>(null)
  const workspaceRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLElement>(null)
  const current = sections.find(item => item.id === section)!
  const groups = useMemo(() => {
    const result: { topic: string; entries: Story[] }[] = []
    for (const story of stories[section]) {
      const topic = topicFor(story, section)
      let group = result.find(item => item.topic === topic)
      if (!group) { group = { topic, entries: [] }; result.push(group) }
      group.entries.push(story)
    }
    return result
  }, [section])
  const activeTopic = position.section === section && groups.some(group => group.topic === position.topic) ? position.topic : groups[0]?.topic
  const activeStory = position.section === section && groups.some(group => group.entries.some(story => story.id === position.storyId)) ? position.storyId : groups[0]?.entries[0]?.id

  const readingRoot = () => window.matchMedia("(max-width: 760px)").matches ? workspaceRef.current : articleRef.current
  const scrollReadingTo = (target: HTMLElement, behavior: ScrollBehavior) => {
    const root = readingRoot()
    const inset = window.matchMedia("(max-width: 760px)").matches ? workspaceRef.current?.querySelector(".news-topics")?.getBoundingClientRect().height ?? 0 : 0
    if (root) root.scrollTo({ top: root.scrollTop + target.getBoundingClientRect().top - root.getBoundingClientRect().top - inset - 16, behavior })
  }
  const behavior = (): ScrollBehavior => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
  const selectStory = (id: string) => {
    const target = articleRef.current?.querySelector<HTMLElement>(`.news-entry[data-story-id="${id}"]`)
    if (target) { scrollReadingTo(target, behavior()); target.focus({ preventScroll: true }) }
  }
  const jumpToTopic = (topic: string) => {
    const target = [...articleRef.current?.querySelectorAll<HTMLElement>("[data-topic]") ?? []].find(item => item.dataset.topic === topic)
    if (target) scrollReadingTo(target, behavior())
    const preview = [...listRef.current?.querySelectorAll<HTMLElement>("[data-preview-topic]") ?? []].find(item => item.dataset.previewTopic === topic)
    const list = listRef.current
    if (preview && list && !window.matchMedia("(max-width: 760px)").matches) {
      list.scrollTo({ top: list.scrollTop + preview.getBoundingClientRect().top - list.getBoundingClientRect().top, behavior: behavior() })
    }
  }
  const navigate = (id: SectionId, storyId = "") => {
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`)
      window.dispatchEvent(new HashChangeEvent("hashchange"))
    }
    requestAnimationFrame(() => {
      workspaceRef.current?.scrollTo({ top: 0, behavior: "instant" })
      listRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" })
      articleRef.current?.scrollTo({ top: 0, behavior: "instant" })
      if (storyId) {
        const target = articleRef.current?.querySelector<HTMLElement>(`.news-entry[data-story-id="${storyId}"]`)
        if (target) scrollReadingTo(target, "instant")
      }
    })
  }
  const openHighlight = (event: MouseEvent<HTMLButtonElement>) => {
    const { section: id, storyId } = event.currentTarget.dataset
    if (sections.some(item => item.id === id)) navigate(id as SectionId, storyId)
  }

  useEffect(() => {
    const article = articleRef.current
    const workspace = workspaceRef.current
    if (!article || !workspace) return
    let frame = 0
    const update = () => {
      frame = 0
      const root = window.matchMedia("(max-width: 760px)").matches ? workspace : article
      const inset = root === workspace ? workspace.querySelector(".news-topics")?.getBoundingClientRect().height ?? 0 : 0
      const marker = root.getBoundingClientRect().top + inset + Math.min(96, root.clientHeight * .18)
      const entries = [...article.querySelectorAll<HTMLElement>(".news-entry[data-story-id]")]
      let active: HTMLElement | undefined = entries[0]
      for (const entry of entries) { if (entry.getBoundingClientRect().top <= marker) active = entry }
      if (root.scrollTop > 0 && root.scrollTop + root.clientHeight >= root.scrollHeight - 2) active = entries.at(-1)
      const topic = active?.closest<HTMLElement>("[data-topic]")?.dataset.topic ?? ""
      const storyId = active?.dataset.storyId ?? ""
      setPosition(previous => previous.section === section && previous.topic === topic && previous.storyId === storyId ? previous : { section, topic, storyId })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    article.addEventListener("scroll", schedule, { passive: true })
    workspace.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(article)
    for (const group of article.querySelectorAll("[data-topic]")) observer.observe(group)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      article.removeEventListener("scroll", schedule)
      workspace.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      observer.disconnect()
    }
  }, [section, groups])

  return (
    <div className="news-screen">
      <main className="news-paper" aria-label="Laila El Attar’s portfolio">
        <header className="news-masthead">
          {onReturnToIntro ? <button type="button" className="news-edition news-return-intro" onClick={onReturnToIntro}>← Back to the couch</button> : <span className="news-edition">The personal edition</span>}
          <a href="#about-me" className="news-name" onClick={event => { event.preventDefault(); navigate("about-me") }}>Laila El Attar</a>
          <div className="news-header-actions">
            <a className="news-header-link" href="/Laila_El_Attar_Resume_Final.pdf" target="_blank" rel="noopener noreferrer"><FileText size={14} aria-hidden="true" />Résumé <ArrowUpRight size={12} aria-hidden="true" /></a>
          </div>
        </header>
        <PersonalityTicker />
        <nav className="news-sections" aria-label="Portfolio sections">
          <div className="news-section-links">
            {sections.map(item => <a href={`#${item.id}`} key={item.id} aria-current={item.id === section ? "page" : undefined} onClick={event => { event.preventDefault(); navigate(item.id) }}>{item.label}<span aria-hidden="true">·</span></a>)}
          </div>
        </nav>
        <div ref={workspaceRef} className="news-workspace">
          <aside className="news-topics" aria-label="Subsections">
            <p className="news-small-label">Browse</p>
            {groups.map(group => <button type="button" key={group.topic} aria-current={activeTopic === group.topic ? "location" : undefined} onClick={() => jumpToTopic(group.topic)}>{group.topic}<span aria-hidden="true">{activeTopic === group.topic ? "●" : ""}</span></button>)}
          </aside>
          <section ref={listRef} className="news-story-list" aria-label={`${current.label} previews`}>
            {groups.map(group => <div className="news-preview-group" data-preview-topic={group.topic} key={group.topic}>
              <h2 className="news-preview-group-heading">{group.topic}</h2>
              {group.entries.map(item => <button type="button" className="news-story" key={item.id} aria-pressed={activeStory === item.id} onClick={() => selectStory(item.id)}>
                {item.logo ? <div className="news-logo-thumb"><OrganizationLogo story={item} /></div> : item.icon ? <div className={item.icon === "electricity" ? "news-symbol-thumb" : "news-contact-thumb"} aria-hidden="true"><ContactIcon kind={item.icon} /></div> : item.image && !item.experienceType ? <div className="news-thumb"><Image src={item.image} alt="" fill sizes="(max-width: 760px) 120px, 220px" /></div> : <div className="news-type-thumb news-organization-thumb" aria-hidden="true">{item.organization ?? item.source}</div>}
                <div>
                  {item.experienceType && <div className="news-experience-meta"><span>{item.experienceType}</span>{item.date && <span>{item.date}</span>}</div>}
                  <h3>{item.role ?? item.title}</h3>{item.date && !item.experienceType && <span className="news-story-source">{item.date}</span>}<p>{item.summary}</p><span className="news-story-source">{item.source}</span>
                </div>
              </button>)}
            </div>)}
          </section>
          <article key={section} ref={articleRef} className="news-article" aria-label={`${current.label} reading column`} tabIndex={0}>
            <h1 className="sr-only">{current.label}</h1>
            <div className="news-article-content">
              {groups.length ? groups.map(group => <section className="news-subsection" data-topic={group.topic} key={group.topic}>
                <h2 className="news-subsection-heading">{group.topic}</h2>
                {group.entries.map(story => <section key={story.id} data-story-id={story.id} className="news-entry" tabIndex={-1} aria-label={story.role ?? story.title}>
                  <div className={story.id === "profile" ? "news-entry-content news-profile-layout" : "news-entry-content"}>
                    {story.id === "profile" && <figure className="news-profile-photo"><Image src={story.image!} alt="Laila El Attar" fill sizes="(max-width: 760px) calc(100vw - 56px), (max-width: 1280px) 45vw, 480px" /></figure>}
                    <div className="news-entry-copy">
                      {story.icon && <div className={story.icon === "electricity" ? "news-entry-symbol" : "news-contact-badge"}><ContactIcon kind={story.icon} /></div>}
                      {story.logo && <div className={`news-article-logo${section === "certifications" ? " news-issuer-logo" : ""}`}><OrganizationLogo story={story} /></div>}
                      {story.id !== "profile" && story.image && !story.experienceType && <figure className="news-hero-image"><Image src={story.image} alt={story.imageAlt ?? story.source} fill sizes="(max-width: 760px) 100vw, 65vw" /></figure>}
                      <div className="news-story-meta"><span>{story.experienceType ?? story.category}</span><span>{story.source}</span></div>
                      <h2 className="news-entry-title">{story.role ?? story.title}</h2>
                      {story.date && <p className="news-dateline">{story.date}</p>}
                      <p className="news-deck">{story.summary}</p>
                      <div className="news-article-body">{story.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
                      {story.id === "profile" && <nav className="news-contact-shortcuts" aria-label="Connect with Laila">
                        {["linkedin", "resume", "email"].map(id => {
                          const item = stories.contact.find(contact => contact.id === id)!
                          return <a key={id} href={item.link} target={id === "email" ? undefined : "_blank"} rel="noopener noreferrer"><span className="news-contact-badge"><ContactIcon kind={item.icon!} /></span><span>{item.source}</span></a>
                        })}
                      </nav>}
                      {story.highlights && <section className="news-more news-selected-work" aria-label="Selected work"><h2>Start with the work</h2><div>{story.highlights.map(item => <button type="button" key={item.storyId} data-section={item.section} data-story-id={item.storyId} onClick={openHighlight}><h3>{item.label}</h3><span>{item.detail}</span><ArrowUpRight size={17} aria-hidden="true" /></button>)}</div></section>}
                      {story.caseStudy && <div className="news-case-study">{story.caseStudy.map(part => <section key={part.heading}><h3>{part.heading}</h3><p>{part.text}</p></section>)}</div>}
                      {story.tags && <ul className="news-tags" aria-label="Skills and tools">{story.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
                      {story.link && <a className="news-read-link" href={story.link} target={story.link.startsWith("http") || /\.(pdf|mov)$/.test(story.link) ? "_blank" : undefined} rel="noopener noreferrer">{story.linkLabel ?? "Read more"}<ArrowUpRight size={17} aria-hidden="true" /></a>}
                    </div>
                  </div>
                </section>)}
              </section>) : <div className="news-empty"><h2>No entries yet.</h2></div>}
            </div>
          </article>
        </div>
        <footer className="news-footer"><span>Laila El Attar / Portfolio</span><a href="mailto:laylaattar@live.com"><Mail size={12} aria-hidden="true" />laylaattar@live.com <ArrowUpRight size={11} aria-hidden="true" /></a></footer>
      </main>
    </div>
  )
}
