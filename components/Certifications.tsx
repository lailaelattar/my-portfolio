import { ArrowUpRight, Award } from "lucide-react"

export default function Certifications() {
  return (
    <section id="certifications" className="w-full scroll-mt-24 py-20">
      <h2 className="text-center text-4xl sm:text-4xl sm:text-5xl font-semibold mb-4">
        Certifications
      </h2>
      <p className="text-center text-muted-foreground mb-10">
        Continuing to learn, alongside the work.
      </p>
      <a
        href="https://www.pendo.io/learninglab/certificates/cmvbmc2mz00122ylopk0rwmi8/"
        target="_blank"
        rel="noopener noreferrer"
        className="group mx-auto flex max-w-2xl items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <Award className="h-10 w-10 shrink-0 text-primary" aria-hidden="true" />
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">Pendo Learning Lab</p>
          <h3 className="text-xl font-semibold text-foreground">Pendo certification</h3>
          <p className="mt-2 text-sm text-primary">View credential</p>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
        <span className="sr-only">Opens in a new tab</span>
      </a>
    </section>
  )
}
