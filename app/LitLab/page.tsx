import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { sections } from "@/components/news-data"
import styles from "./litlab.module.css"

const steps = ["Research", "Ideate", "Prototype", "Feedback"]

function Figure({ file, caption, width, height, priority = false }: { file: string; caption: string; width: number; height: number; priority?: boolean }) {
  return <figure className={styles.figure}>
    <a href={`/LitLab Images/${file}.png`} target="_blank" rel="noopener noreferrer" aria-label={`Open full image: ${caption}`}>
      <Image src={`/LitLab Images/${file}.png`} alt={caption} width={width} height={height} sizes="(max-width: 760px) 90vw, 65vw" priority={priority} />
    </a>
    <figcaption>{caption}<ArrowUpRight size={13} aria-hidden="true" /></figcaption>
  </figure>
}

export default function LitLabPage() {
  return <div className={styles.page}>
    <div className={styles.paper}>
      <header className={`news-masthead ${styles.masthead}`}>
        <Link href="/#work" className={styles.back}><ArrowLeft size={15} aria-hidden="true" />Back to projects</Link>
        <Link href="/#about-me" className="news-name">Laila El Attar</Link>
        <span className={styles.edition}>The design edition</span>
      </header>
      <nav className="news-sections" aria-label="Portfolio sections">
        <div className="news-section-links">{sections.map(section => <Link key={section.id} href={`/#${section.id}`} aria-current={section.id === "work" ? "page" : undefined}>{section.label}<span aria-hidden="true">·</span></Link>)}</div>
      </nav>
      <main>
        <header className={styles.hero}>
          <div>
            <p className={styles.kicker}>LitLab / UX case study</p>
            <h1>A more thoughtful scroll.</h1>
            <p className={styles.deck}>A media literacy app concept that helps people pause, question, and build better habits around online information.</p>
            <p className={styles.context}>From firsthand interviews to a high-fidelity prototype.</p>
          </div>
          <Figure file="Hero" caption="LitLab: a media literacy app concept" width={1516} height={1248} priority />
        </header>
        <dl className={styles.facts}>
          {[['Role', 'UI/UX Designer'], ['Scope', 'Research, UX flows, prototyping'], ['Type', 'Academic product concept'], ['Tools', 'Figma, FigJam']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <div className={styles.overview}>
          <div><p className={styles.kicker}>The problem</p><h2>Information moves quickly. Judgment takes practice.</h2><p>Students encounter fast-moving, unverified information online. AI-generated content can make credibility harder to assess, while tools that encourage a pause and reflection are easy to overlook.</p></div>
          <div><p className={styles.kicker}>The approach</p><h2>Make critical thinking an everyday habit.</h2><p>LitLab explores guided evaluation prompts, interactive learning modules, and practical toolkits that help people question what they read. It is a prototype, with research and iteration informing the design.</p></div>
        </div>
        <nav className={styles.process} aria-label="Case study chapters">{steps.map((step, index) => <a key={step} href={`#${step.toLowerCase()}`}><span>0{index + 1}</span>{step}</a>)}</nav>
        <section id="research" className={styles.chapter}>
          <header><p className={styles.kicker}>01 / Listen</p><h2>Research</h2><p>Understanding people before designing solutions.</p></header>
          <div className={styles.body}>
            <h3>Three interviews. Two perspectives.</h3>
            <p>I conducted three user interviews to understand how people encounter and evaluate online information. I synthesized the insights into two personas, Max Wilson and Carrie Ann.</p>
            <p>Mapping their actions, thoughts, and emotions helped surface frustrations, motivations, and opportunities that informed the product’s direction.</p>
            <div className={styles.imagePair}>
              <Figure file="MaxEmpathy" caption="Max Wilson’s empathy map" width={2210} height={1240} />
              <Figure file="CarrieEmpathy" caption="Carrie Ann’s empathy map" width={2216} height={1246} />
            </div>
            <h3>From observations to personas</h3>
            <p>I translated the empathy maps into two personas representing different ways people engage with media, keeping their needs visible as I explored features and navigation.</p>
            <div className={styles.imagePair}>
              <Figure file="MaxPersona" caption="Max Wilson’s persona" width={2216} height={1252} />
              <Figure file="CarriePersona" caption="Carrie Ann’s persona" width={2216} height={1252} />
            </div>
          </div>
        </section>
        <section id="ideate" className={styles.chapter}>
          <header><p className={styles.kicker}>02 / Make choices</p><h2>Ideate</h2><p>Turning pain points into a focused experience.</p></header>
          <div className={styles.body}>
            <h3>Explore, then organize</h3>
            <p>I used mind mapping to explore potential features, learning modules, and quick-action tools. Card sorting helped group related features into clearer pages and sections.</p>
            <Figure file="MindMap" caption="Mapping potential features and learning tools" width={2172} height={1140} />
            <Figure file="CardSorting" caption="Card sorting to organize the app’s navigation" width={1974} height={1262} />
            <div className={styles.notes}>
              <div><h3>What needed work</h3><ul><li>Onboarding with too many prompts.</li><li>Long-form articles competing for attention in the app.</li></ul></div>
              <div><h3>What I changed</h3><ul><li>Focused the home screen on three core actions.</li><li>Replaced long articles with smaller prompts.</li></ul></div>
            </div>
            <h3>What made it into the prototype</h3>
            <ul><li>Daily media check-in prompts.</li><li>A credibility rating tool with guided questions.</li><li>A habit tracker with streaks.</li><li>Modular learning cards.</li></ul>
          </div>
        </section>
        <section id="prototype" className={styles.chapter}>
          <header><p className={styles.kicker}>03 / Build & refine</p><h2>Prototype</h2><p>From a paper sketch to an interactive flow.</p></header>
          <div className={styles.body}>
            <h3>Start with structure</h3>
            <p>I sketched the screens on paper, using the card-sorted structure as a foundation for the navigation and layout.</p>
            <Figure file="Sketches" caption="Early paper sketches" width={1964} height={1262} />
            <h3>Test the flow before polishing</h3>
            <p>I translated the sketches into a low-fidelity prototype and gathered feedback from peers, AI-assisted usability analysis, and instructor input.</p>
            <Figure file="Lo-fi" caption="Low-fidelity screens and user flows" width={2212} height={958} />
            <h3>Refine the experience</h3>
            <p>The high-fidelity prototype refined LitLab’s visual design, interactions, and flow based on earlier feedback.</p>
            <Figure file="Hi-fi" caption="High-fidelity LitLab prototype" width={2182} height={1260} />
          </div>
        </section>
        <section id="feedback" className={styles.chapter}>
          <header><p className={styles.kicker}>04 / Reflect</p><h2>Feedback</h2><p>The lesson beyond the screens.</p></header>
          <div className={styles.body}><h3>Clarity is a design decision.</h3><p>LitLab challenged me to think about scope and user attention within mobile design. A meaningful idea still needs a clear, approachable interaction.</p><p>The process strengthened my understanding of iterative design, visual hierarchy, and balancing useful content with usability. The outcome is a researched prototype rather than a launched product with measured adoption.</p></div>
        </section>
      </main>
      <footer className={styles.footer}><Link href="/#work"><ArrowLeft size={15} aria-hidden="true" />Back to projects</Link><a href="mailto:laylaattar@live.com">Let’s talk<ArrowUpRight size={15} aria-hidden="true" /></a></footer>
    </div>
  </div>
}
