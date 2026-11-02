import type { Metadata } from "next";

export const metadata: Metadata = { title: "Route Ready Vending" };

const machines = [
  { name: "Snack + drink combo", fit: "Breakrooms with 25 to 80 staff", note: "Most popular" },
  { name: "Cold drink tower", fit: "Gyms, lobbies, warehouses", note: "Card + mobile pay" },
  { name: "Fresh food cooler", fit: "Offices with 100+ staff", note: "Stocked 3x weekly" },
];

export default function RouteReadyDemo() {
  return (
    <div className="min-h-screen bg-[#fbf7f0] font-sans text-[#1c1a17]">
      <header className="border-b border-[#e8e0d2] bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded bg-[#d9531e] font-heading text-lg font-extrabold text-white">R</span>
            <span className="font-heading text-xl font-extrabold uppercase tracking-tight">Route Ready Vending</span>
          </div>
          <nav className="hidden gap-7 text-sm font-semibold md:flex">
            <span>Machines</span>
            <span>Locations</span>
            <span>Service</span>
            <span>About</span>
          </nav>
          <span className="rounded bg-[#d9531e] px-4 py-2 text-sm font-bold text-white">Request a machine</span>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9531e]">Palm Beach &amp; Broward County</p>
          <h1 className="mt-3 font-heading text-5xl font-extrabold uppercase leading-none md:text-6xl">
            Free vending for your breakroom. Stocked weekly. Never empty.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-[#4a463f]">
            We place and service snack and drink machines at no cost to your business. You pick the products. We keep
            them full and fix anything the same day.
          </p>
          <div className="mt-7 flex gap-3">
            <span className="rounded bg-[#d9531e] px-5 py-3 font-bold text-white">Request a machine</span>
            <span className="rounded border-2 border-[#1c1a17] px-5 py-3 font-bold">See locations we serve</span>
          </div>
          <p className="mt-5 text-sm text-[#6b665c]">No contract. No cost to the location. Commission available for 50+ staff.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="row-span-2 rounded-lg bg-[#1c1a17] p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f0a98e]">Placed this year</p>
            <p className="mt-2 font-heading text-6xl font-extrabold">212</p>
            <p className="text-sm text-white/70">machines across 140 locations</p>
            <div className="mt-6 space-y-2 text-sm">
              <p className="flex justify-between border-t border-white/10 pt-2"><span>Avg restock</span><span className="font-bold">5 days</span></p>
              <p className="flex justify-between border-t border-white/10 pt-2"><span>Service response</span><span className="font-bold">Same day</span></p>
              <p className="flex justify-between border-t border-white/10 pt-2"><span>Card + tap pay</span><span className="font-bold">Every machine</span></p>
            </div>
          </div>
          <div className="rounded-lg border border-[#e8e0d2] bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b665c]">Snacks</p>
            <p className="mt-1 font-heading text-2xl font-extrabold">40+ options</p>
          </div>
          <div className="rounded-lg border border-[#e8e0d2] bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b665c]">Drinks</p>
            <p className="mt-1 font-heading text-2xl font-extrabold">Cold, always</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-heading text-3xl font-extrabold uppercase">Pick the machine that fits your space</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {machines.map((m) => (
              <div key={m.name} className="rounded-lg border border-[#e8e0d2] p-5">
                <div className="flex h-28 items-end rounded bg-[#f1ebe0] p-3">
                  <span className="rounded bg-[#d9531e] px-2 py-0.5 text-xs font-bold text-white">{m.note}</span>
                </div>
                <h3 className="mt-4 font-heading text-xl font-extrabold">{m.name}</h3>
                <p className="mt-1 text-sm text-[#4a463f]">{m.fit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
