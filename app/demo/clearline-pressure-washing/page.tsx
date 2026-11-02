import type { Metadata } from "next";
import Image from "next/image";
import { DemoCredits } from "@/components/demo-credits";

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
            <span>Our work</span>
            <span>Reviews</span>
            <span>Areas</span>
          </nav>
          <span className="rounded bg-[#38bdf8] px-4 py-2 text-sm font-bold text-[#10202b]">Get a quote in 2 hours</span>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#0b5c8a] text-white">
        <Image src="/demo/pw-action.jpg" alt="" width={1600} height={1060} priority className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">Licensed &amp; insured · Fort Lauderdale</p>
            <h1 className="mt-3 font-heading text-5xl font-extrabold uppercase leading-none md:text-6xl">
              Your driveway, like the day it was poured.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/90">
              Send two photos. Get a firm price back the same morning. We show up when we say, and the before-and-after
              speaks for itself.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded bg-[#38bdf8] px-5 py-3 font-bold text-[#10202b]">Text photos for a quote</span>
              <span className="rounded border-2 border-white px-5 py-3 font-bold">Call (954) 555-0188</span>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className="text-[#fbbf24]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="text-white/85">4.9 from 312 Google reviews</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border-4 border-white/30 shadow-2xl">
            <Image src="/demo/pw-action.jpg" alt="Pressure washing in progress" width={1600} height={1060} className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative overflow-hidden rounded-lg">
              <Image src="/demo/pw-before.jpg" alt="Stained pavement before cleaning" width={800} height={450} className="aspect-square w-full object-cover" />
              <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-0.5 text-xs font-bold text-white">BEFORE</span>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image src="/demo/pw-commercial.jpg" alt="Commercial pressure washing" width={800} height={620} className="aspect-square w-full object-cover" />
              <span className="absolute left-3 top-3 rounded bg-[#38bdf8] px-2 py-0.5 text-xs font-bold text-[#10202b]">COMMERCIAL</span>
            </div>
          </div>
          <div>
            <h2 className="font-heading text-3xl font-extrabold uppercase">What we clean</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-3 rounded border border-[#dbe4ea] p-3 text-sm font-semibold">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#38bdf8]" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <DemoCredits
        credits={[
          { what: "Land Rover being pressure washed", by: "Lewis Collard", license: "CC BY 3.0", href: "https://commons.wikimedia.org/wiki/File:Land_Rover_being_pressure_washed.JPG" },
          { what: "Soiled granite surface", by: "OathOn", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Heavily_soiled_granite_surface_with_ingrained_dirt_showing_complete_absence_of_pressure_washing_by_Medway_Norse_at_The_Paddock_park,_Chatham,_Kent,_England.jpg" },
          { what: "High-pressure cleaning", by: "CEphoto, Uwe Aranas", license: "CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:High-pressure-cleaning-of-a-concrete-floor-in-petrochemical-industry-01.jpg" },
        ]}
      />
    </div>
  );
}
