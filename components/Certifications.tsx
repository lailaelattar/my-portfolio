import { ArrowUpRight, Award } from "lucide-react"

export default function Certifications() {
  return (
    <section id="certifications" className="w-full scroll-mt-24 py-20">
      <h2 className="text-center text-4xl sm:text-6xl font-semibold mb-4">
        Certifications
      </h2>
      <p className="text-center text-zinc-400 mb-10">
        Continuing to learn, alongside the work.
      </p>
      <a
        href="https://www.pendo.io/learninglab/certificates/cmvbmc2mz00122ylopk0rwmi8/"
        target="_blank"
        rel="noopener noreferrer"
        className="group mx-auto flex max-w-2xl items-center gap-4 rounded-2xl border border-zinc-700 bg-zinc-800/40 p-6 transition-colors hover:border-violet-400 hover:bg-zinc-800/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
      >
        <Award className="h-10 w-10 shrink-0 text-violet-300" aria-hidden="true" />
        <div className="flex-1">
          <p className="text-sm text-zinc-400 mb-1">Pendo Learning Lab</p>
          <h3 className="text-xl font-semibold text-zinc-50">Pendo certification</h3>
          <p className="mt-2 text-sm text-violet-300">View credential</p>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-400 group-hover:text-violet-300" aria-hidden="true" />
        <span className="sr-only">Opens in a new tab</span>
      </a>
    </section>
  )
}
