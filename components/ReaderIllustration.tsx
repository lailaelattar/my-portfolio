"use client"

import { useId } from "react"

const art = "/illustrations/newspaper-reader-cartoon.png"
const head = "374,369 370,318 386,286 386,254 407,224 415,180 442,157 470,139 483,109 514,85 532,56 569,40 610,44 646,66 675,79 699,117 714,147 725,211 670,253 441,251 448,314 420,331 402,373"
const leftHand = "441,397 449,384 475,375 502,384 520,398 525,417 515,432 487,450 477,474 456,476 441,461"
const rightHand = "810,345 844,331 861,332 875,345 880,364 873,383 866,395 856,431 843,435 830,429 834,401 815,398 806,379 804,361"

/** The cover stays in front of the moving inside leaf, with hands in front of both. */
export default function ReaderIllustration() {
  const id = useId()
  return <svg className="reader-illustration" viewBox="0 0 1374 1145" aria-hidden="true">
    <defs>
      <clipPath id={`${id}-head`}><polygon points={head} /></clipPath>
      <clipPath id={`${id}-left-hand`}><polygon points={leftHand} /></clipPath>
      <clipPath id={`${id}-right-hand`}><polygon points={rightHand} /></clipPath>
      <mask id={`${id}-body`} maskUnits="userSpaceOnUse" x="0" y="0" width="1374" height="1145" style={{ maskType: "luminance" }}>
        <rect width="1374" height="1145" fill="white" />
        <polygon points={head} fill="black" stroke="white" strokeWidth="4" />
        <polygon points={leftHand} fill="black" stroke="white" strokeWidth="2" />
        <polygon points={rightHand} fill="black" stroke="white" strokeWidth="2" />
      </mask>
      <clipPath id={`${id}-cover-left`}><path d="M445 250L663 254L649 526L476 530Z" /></clipPath>
      <clipPath id={`${id}-cover-right`}><path d="M663 254L886 148L856 466L649 526Z" /></clipPath>
      <linearGradient id={`${id}-paper`}><stop stopColor="#e5d7bf" /><stop offset=".5" stopColor="#f2e6d0" /><stop offset="1" stopColor="#dfd0b6" /></linearGradient>
    </defs>
    <image href={art} width="1374" height="1145" mask={`url(#${id}-body)`} />
    <g className="reader-head"><image href={art} width="1374" height="1145" clipPath={`url(#${id}-head)`} /></g>


    <g className="reader-inside-pages">
      <path d="M661 252L881 140L851 463L650 522Z" fill="#d1c3aa" stroke="#82725d" strokeWidth="2" />
      <g className="reader-inner-leaf">
        <path d="M660 249Q770 178 883 139L850 459L650 521Z" fill="#f5ead6" stroke="#8b7b65" strokeWidth="2" />
        <path d="M690 253L863 174M687 271L861 194M684 290L859 214M680 310L857 235M678 330L855 256" stroke="#baac96" strokeWidth="3" />
      </g>
    </g>

    <g className="reader-outer-cover">
      <path d="M445 250L663 254L886 148L856 466L649 526L476 530Z" fill={`url(#${id}-paper)`} stroke="#493d31" strokeWidth="5" strokeLinejoin="round" />
      <g clipPath={`url(#${id}-cover-left)`}>
        <g transform="matrix(.72 .025 .06 .85 457 264)">
          <text x="0" y="22" className="reader-cover-name" textLength="250" lengthAdjust="spacingAndGlyphs">Laila El Attar</text>
          <path d="M0 32H250M0 36H250" stroke="#4d4338" strokeWidth="1.5" />
          <text x="2" y="49" className="reader-cover-small">ABOUT · EXPERIENCE · PROJECTS</text>
          <path d="M0 57H250" stroke="#776957" />
          <text x="2" y="82" className="reader-cover-headline">A BUILDER WITH</text>
          <text x="2" y="104" className="reader-cover-headline">A WRITER’S EYE</text>
          <image href="/laila-portfolio 2.png" x="2" y="118" width="105" height="99" preserveAspectRatio="xMidYMid slice" />
          <text x="121" y="129" className="reader-cover-label">THE PERSONAL</text>
          <text x="121" y="143" className="reader-cover-label">EDITION</text>
          {[159, 168, 177, 186, 195, 204].map(y => <path key={y} d={`M121 ${y}H246`} stroke="#a49782" strokeWidth="2" />)}
          <path d="M0 229H250" stroke="#776957" />
          <text x="2" y="246" className="reader-cover-small">RESEARCH. BUILD. WRITE.</text>
          <path d="M0 257H250M0 266H250M0 275H168" stroke="#a49782" strokeWidth="2" />
        </g>
      </g>
      <g clipPath={`url(#${id}-cover-right)`}>
        <g transform="matrix(.82 -.39 -.04 .88 674 270)">
          <text x="0" y="0" className="reader-cover-small">SELECTED WORK</text>
          <path d="M0 10H250M0 14H250" stroke="#4d4338" strokeWidth="1.5" />
          <text x="0" y="40" className="reader-cover-headline">SMALL DETAILS.</text>
          <text x="0" y="62" className="reader-cover-headline">USEFUL TOOLS.</text>
          <image href="/IOI.png" x="0" y="77" width="245" height="86" preserveAspectRatio="xMidYMid slice" />
          <path d="M0 174H250" stroke="#776957" />
          <text x="0" y="192" className="reader-cover-label">SOFTWARE · RESEARCH · AI</text>
          {[207, 217, 227, 237, 247, 257, 267].map(y => <path key={y} d={`M0 ${y}H248`} stroke="#a49782" strokeWidth="2" />)}
        </g>
      </g>
      <path d="M663 254L649 526" stroke="#aa997e" strokeWidth="3" />
    </g>
    <g className="reader-hand-left"><image href={art} width="1374" height="1145" clipPath={`url(#${id}-left-hand)`} /></g>
    <g className="reader-hand-right"><image href={art} width="1374" height="1145" clipPath={`url(#${id}-right-hand)`} /></g>
  </svg>
}
