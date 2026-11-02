import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bluewater Pool Care" };

const plans = [
  { name: "Weekly Chemical", price: "$95", per: "/mo", items: ["Water tested + balanced", "Chemicals included", "Equipment check"] },
  { name: "Weekly Full Service", price: "$165", per: "/mo", items: ["Everything in Chemical", "Skim, brush, vacuum", "Baskets + filter rinse"], featured: true },
  { name: "Openings & Repairs", price: "Quote", per: "", items: ["Pump + filter repair", "Green pool recovery", "Salt cell service"] },
];

export default function BluewaterDemo() {
  return (
    <div className="min-h-screen bg-[#f3f8f8] font-sans text-[#0f2a2a]">
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <span className="flex items-center gap-2 font-heading text-2xl font-extrabold uppercase tracking-tight">
            <span className="h-7 w-7 rounded-full bg-[#1f8a8a]" />
            Bluewater Pool Care
          </span>
          <nav className="hidden gap-7 text-sm font-semibold md:flex">
            <span>Weekly service</span>
            <span>Repairs</span>
            <span>Pricing</span>
            <span>Reviews</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-[#1f8a8a]">Customer login</span>
            <span className="rounded-full bg-[#1f8a8a] px-4 py-2 text-sm font-bold text-white">Start weekly service</span>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1f8a8a]">Boca Raton · Delray · Boynton</p>
          <h1 className="mt-3 font-heading text-5xl font-extrabold uppercase leading-none md:text-6xl">
            Swim-ready every week. Proof in your inbox.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-[#355252]">
            Same tech, same day, every week. After each visit you get a photo, the water readings, and what we did.
            No guessing whether we showed up.
          </p>
          <div className="mt-7 flex gap-3">
            <span className="rounded-full bg-[#1f8a8a] px-5 py-3 font-bold text-white">Get my weekly price</span>
            <span className="rounded-full border-2 border-[#0f2a2a] px-5 py-3 font-bold">See a sample report</span>
          </div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-[0_10px_40px_rgba(15,42,42,0.08)]">
          <div className="flex items-center justify-between">
            <p className="font-heading text-lg font-extrabold">Service report · Tue, Jun 3</p>
            <span className="rounded-full bg-[#e0f2f1] px-2.5 py-0.5 text-xs font-bold text-[#1f8a8a]">Completed 9:42 AM</span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            {[
              ["7.4", "pH"],
              ["2.5", "Chlorine"],
              ["90", "Alkalinity"],
              ["45", "CYA"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-lg bg-[#f3f8f8] py-3">
                <p className="font-heading text-2xl font-extrabold">{v}</p>
                <p className="text-xs text-[#5a7474]">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 h-28 rounded-lg bg-[linear-gradient(180deg,#9fdbe3_0%,#3fb3c4_100%)]" />
          <ul className="mt-4 space-y-1.5 text-sm">
            <li className="flex gap-2"><span className="text-[#1f8a8a]">&#10003;</span> Skimmed, brushed walls, vacuumed</li>
            <li className="flex gap-2"><span className="text-[#1f8a8a]">&#10003;</span> Emptied baskets, rinsed filter</li>
            <li className="flex gap-2"><span className="text-[#1f8a8a]">&#10003;</span> Added 1 lb shock, 1 qt algaecide</li>
          </ul>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-heading text-3xl font-extrabold uppercase">Simple monthly pricing</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {plans.map((p) => (
              <div key={p.name} className={`rounded-xl border p-5 ${p.featured ? "border-[#1f8a8a] bg-[#f3f8f8]" : "border-[#dbe8e8]"}`}>
                <p className="font-heading text-xl font-extrabold">{p.name}</p>
                <p className="mt-2 font-heading text-4xl font-extrabold">
                  {p.price}
                  <span className="text-base text-[#5a7474]">{p.per}</span>
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-[#355252]">
                  {p.items.map((i) => (
                    <li key={i}>&#10003; {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
