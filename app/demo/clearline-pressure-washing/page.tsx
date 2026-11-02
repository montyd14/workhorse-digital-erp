import type { Metadata } from "next";

export const metadata: Metadata = { title: "Clearline Pressure Washing" };

const services = ["Driveways & walkways", "House & soft wash", "Roof cleaning", "Decks & fences", "Commercial lots", "Fleet washing"];

export default function ClearlineDemo() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#10202b]">
      <header className="bg-[#10202b] text-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <span className="font-heading text-2xl font-extrabold uppercase tracking-tight">
            Clear<span className="text-[#38bdf8]">line</span>
          </span>
          <nav className="hidden gap-7 text-sm font-semibold md:flex">
            <span>Services</span>
            <span>Before &amp; after</span>
            <span>Reviews</span>
            <span>Areas</span>
          </nav>
          <span className="rounded bg-[#38bdf8] px-4 py-2 text-sm font-bold text-[#10202b]">Get a quote in 2 hours</span>
        </div>
      </header>

      <section className="bg-[#0b5c8a] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">Licensed &amp; insured · Fort Lauderdale</p>
            <h1 className="mt-3 font-heading text-5xl font-extrabold uppercase leading-none md:text-6xl">
              Your driveway, like the day it was poured.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/85">
              Send two photos. Get a firm price back the same morning. We show up when we say, and the before-and-after
              speaks for itself.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded bg-[#38bdf8] px-5 py-3 font-bold text-[#10202b]">Text photos for a quote</span>
              <span className="rounded border-2 border-white px-5 py-3 font-bold">Call (954) 555-0188</span>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className="text-[#fbbf24]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="text-white/80">4.9 from 312 Google reviews</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border-4 border-white/20">
            <div className="grid h-72 grid-cols-2">
              <div className="relative bg-[linear-gradient(160deg,#6b705c_0%,#4e5340_50%,#3a3d2f_100%)]">
                <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-0.5 text-xs font-bold">BEFORE</span>
              </div>
              <div className="relative bg-[linear-gradient(160deg,#d6d3cc_0%,#bfbbb2_50%,#a9a59b_100%)]">
                <span className="absolute right-3 top-3 rounded bg-[#38bdf8] px-2 py-0.5 text-xs font-bold text-[#10202b]">AFTER</span>
              </div>
            </div>
            <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-white" />
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#10202b]">
              &#8596;
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex items-end justify-between">
          <h2 className="font-heading text-3xl font-extrabold uppercase">What we clean</h2>
          <span className="text-sm font-semibold text-[#0b5c8a] underline">All services</span>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {services.map((s) => (
            <li key={s} className="flex items-center gap-3 rounded border border-[#dbe4ea] p-4 font-semibold">
              <span className="h-2.5 w-2.5 rounded-full bg-[#38bdf8]" />
              {s}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
