/**
 * Auto-scrolling strip of search engines and map services, shown under the hero.
 * Pure CSS marquee, pauses on hover, static for users who prefer reduced motion.
 * Text wordmarks only (no third-party logo files), each with its own accent color.
 */
const ENGINES = [
  { name: "Google", color: "#4285f4" },
  { name: "Bing", color: "#008373" },
  { name: "DuckDuckGo", color: "#de5833" },
  { name: "Yahoo", color: "#6001d2" },
  { name: "Brave Search", color: "#fb542b" },
  { name: "Google Maps", color: "#34a853" },
  { name: "Apple Maps", color: "#1d1d1f" },
  { name: "Ecosia", color: "#008009" },
  { name: "Yelp", color: "#d32323" },
  { name: "ChatGPT Search", color: "#10a37f" },
];

function Item({ name, color }: { name: string; color: string }) {
  return (
    <li className="flex shrink-0 items-center gap-3 px-7">
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
      <span className="whitespace-nowrap font-heading text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{name}</span>
    </li>
  );
}

export function SearchEngineStrip() {
  return (
    <section aria-labelledby="found-everywhere" className="border-y-4 border-brand bg-paper py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="found-everywhere" className="text-center text-sm font-bold uppercase tracking-[0.18em] text-brand-text">
          Built to get found on every search engine
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-ink-soft">
          Every site we build ships with the speed, structured data, and local pages that search engines, map apps, and
          AI assistants look for. When someone searches for what you do, you show up. Not just on Google.
        </p>
      </div>
      <div className="marquee mt-6" aria-hidden="true">
        <ul className="marquee-track flex w-max items-center">
          {ENGINES.map((e) => (
            <Item key={e.name} {...e} />
          ))}
          {ENGINES.map((e) => (
            <Item key={`${e.name}-dup`} {...e} />
          ))}
        </ul>
      </div>
      <ul className="sr-only">
        {ENGINES.map((e) => (
          <li key={e.name}>{e.name}</li>
        ))}
      </ul>
    </section>
  );
}
