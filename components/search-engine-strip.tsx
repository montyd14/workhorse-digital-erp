import Image from "next/image";

/**
 * Auto-scrolling strip of search engine and discovery platform logos under the hero.
 * Logos come from the Simple Icons set (CC0) in public/logos. Pure CSS marquee,
 * pauses on hover, static for users who prefer reduced motion.
 */
const LOGOS = [
  { file: "google", name: "Google" },
  { file: "googlemaps", name: "Google Maps" },
  { file: "duckduckgo", name: "DuckDuckGo" },
  { file: "brave", name: "Brave Search" },
  { file: "apple", name: "Apple Maps" },
  { file: "perplexity", name: "Perplexity" },
  { file: "ecosia", name: "Ecosia" },
  { file: "yelp", name: "Yelp" },
  { file: "qwant", name: "Qwant" },
  { file: "startpage", name: "Startpage" },
  { file: "nextdoor", name: "Nextdoor" },
  { file: "facebook", name: "Facebook" },
  { file: "instagram", name: "Instagram" },
];

function Logo({ file, name }: { file: string; name: string }) {
  return (
    <li className="flex shrink-0 items-center px-8">
      <Image src={`/logos/${file}.svg`} alt={name} width={44} height={44} unoptimized className="h-10 w-10 sm:h-11 sm:w-11" />
    </li>
  );
}

export function SearchEngineStrip() {
  return (
    <section aria-label="Where your customers will find you" className="border-y-4 border-brand bg-paper py-6">
      <div className="marquee">
        <ul className="marquee-track flex w-max items-center">
          {LOGOS.map((l) => (
            <Logo key={l.file} {...l} />
          ))}
          {LOGOS.map((l) => (
            <li key={`${l.file}-dup`} className="flex shrink-0 items-center px-8" aria-hidden="true">
              <Image src={`/logos/${l.file}.svg`} alt="" width={44} height={44} unoptimized className="h-10 w-10 sm:h-11 sm:w-11" />
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
        Built to get found on every search engine
      </p>
    </section>
  );
}
