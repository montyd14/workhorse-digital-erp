import type { Metadata } from "next";
import Image from "next/image";
import { DemoCredits } from "@/components/demo-credits";

export const metadata: Metadata = { title: "Route Ready Vending" };

const machines = [
  { name: "Snack + drink combo", fit: "Breakrooms with 25 to 80 staff", note: "Most popular", img: "/demo/vending-lobby.jpg", pos: "object-right" },
  { name: "Snack tower", fit: "Lobbies, waiting rooms, gyms", note: "Card + mobile pay", img: "/demo/vending-snacks.jpg", pos: "object-center" },
  { name: "Cold drink cooler", fit: "Warehouses and shop floors", note: "Stocked 3x weekly", img: "/demo/vending-lobby.jpg", pos: "object-left" },
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

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[1fr_1.1fr]">
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
        <div className="relative">
          <Image src="/demo/vending-lobby.jpg" alt="Snack and drink vending machines in an office lobby" width={1600} height={1148} priority className="aspect-[4/3] w-full rounded-lg object-cover" />
          <div className="absolute -bottom-5 left-5 flex gap-5 rounded-lg bg-[#1c1a17] px-5 py-4 text-white shadow-xl">
            <div>
              <p className="font-heading text-3xl font-extrabold leading-none">212</p>
              <p className="text-xs text-white/70">machines placed</p>
            </div>
            <div className="border-l border-white/15 pl-5">
              <p className="font-heading text-3xl font-extrabold leading-none">Same day</p>
              <p className="text-xs text-white/70">service response</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-heading text-3xl font-extrabold uppercase">Pick the machine that fits your space</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {machines.map((m) => (
              <div key={m.name} className="overflow-hidden rounded-lg border border-[#e8e0d2]">
                <div className="relative h-40">
                  <Image src={m.img} alt="" width={800} height={600} className={`h-full w-full object-cover ${m.pos}`} />
                  <span className="absolute bottom-3 left-3 rounded bg-[#d9531e] px-2 py-0.5 text-xs font-bold text-white">{m.note}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-xl font-extrabold">{m.name}</h3>
                  <p className="mt-1 text-sm text-[#4a463f]">{m.fit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <DemoCredits
        credits={[
          { what: "Vending machines, Chico", by: "Frank Schulenburg", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Soft_drink_and_snack_vending_machines,_Chico_(2025)-L1007024.jpg" },
          { what: "Snack machine", by: "Nenyedi", license: "Public domain", href: "https://commons.wikimedia.org/wiki/File:Snack_machine_3538.JPG" },
        ]}
      />
    </div>
  );
}
